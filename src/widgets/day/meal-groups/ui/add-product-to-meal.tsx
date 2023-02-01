import React from 'react';
import { Button, Modal, Steps, Form, InputNumber, TimePicker } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Dayjs } from 'dayjs';

import dayjs from '@/shared/lib/dayjs';
import { Product } from '@/entities/product/list';
import { ProductListWithEditor } from '@/widgets/product-list-with-editor';
import { useAddProduct } from '../api';

// FIXME: перенести ProductListWithEditor в entities ?
// FIXME: добавить onError

interface AddProductToMealDialogProps {
  date: Dayjs;
  isOpen: boolean;
  onOpenChange: (payload: boolean) => void;
  onProductAdded: () => void;
}

interface FormValues {
  grams: number;
  time: Dayjs;
}

const steps = [{ title: 'Выберите продукт' }, { title: 'Укажите вес' }];

export const AddProductToMealDialog = (props: AddProductToMealDialogProps) => {
  const [step, setStep] = React.useState(1);
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();
  const { mutate: addProduct, loading: isSubmitting } = useAddProduct({
    onCompleted: () => {
      props.onProductAdded();
      props.onOpenChange(false);
      setStep(1);
    },
    onError: () => {
      //
    }
  });

  const onProductClick = (product: Product) => {
    setSelectedProduct(product);
    setStep(2);
  };

  const onSubmit = (values: FormValues) => {
    if (!selectedProduct) return;

    addProduct({
      product: selectedProduct,
      grams: values.grams,
      time: values.time
    });
  };

  let content: JSX.Element;
  let footerButtons: JSX.Element[];

  if (step === 1) {
    content = <ProductListWithEditor onProductClick={onProductClick} />;
    footerButtons = [];
  } else {
    const formId = uuidv4();
    const initialValues = {
      time: dayjs()
    };

    content = (
      <Form id={formId} onFinish={onSubmit} initialValues={initialValues} autoComplete="off">
        <Form.Item
          label="Вес, г"
          name="grams"
          rules={[
            {
              required: true,
              validator: (r, v) => {
                if (typeof v !== 'number' || v === 0) {
                  return Promise.reject('Укажите калорийность продукта');
                }
                if (v < 0) {
                  return Promise.reject('Укажите положительное число');
                }

                return Promise.resolve();
              }
            }
          ]}>
          <InputNumber width="100%" />
        </Form.Item>
        <Form.Item
          label="Время"
          name="time"
          rules={[
            {
              required: true,
              validator: (r, v) => {
                if (!v) {
                  return Promise.reject('Укажите время приема пищи');
                }
                return Promise.resolve();
              }
            }
          ]}>
          <TimePicker format="HH:mm" />
        </Form.Item>
      </Form>
    );
    footerButtons = [
      <Button key={0} onClick={() => setStep(1)}>
        Назад
      </Button>,
      <Button key={1} loading={isSubmitting} form={formId} type="primary" htmlType="submit">
        Сохранить
      </Button>
    ];
  }

  return (
    <Modal
      forceRender
      title="Добавить съеденный продукт"
      open={props.isOpen}
      onCancel={() => props.onOpenChange(false)}
      confirmLoading={isSubmitting}
      footer={footerButtons}>
      <Steps current={step} items={steps} className="mb-6" />
      {content}
    </Modal>
  );
};
