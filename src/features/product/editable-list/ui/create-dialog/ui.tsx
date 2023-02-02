import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, InputNumber } from 'antd';
import { ApolloError } from '@apollo/client';

import { useCreateProduct, useUpdateProduct } from './api';
import { FormValues, Product } from './types';

interface CreateProductDialogProps {
  isOpen?: boolean;
  onOpenChange?: (payload: boolean) => void;
  product?: Product;
  activatorSlot?: (args: { onClick: () => void }) => JSX.Element;
  onCreated?: () => void;
  onUpdated?: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

export const CreateProductDialog = (props: CreateProductDialogProps) => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // handle open / closed state
  const [isOpen, setOpen] = useState(props.isOpen || false);
  useEffect(() => setOpen(props.isOpen || false), [props.isOpen]);
  useEffect(() => props.onOpenChange && props.onOpenChange(isOpen), [isOpen, props.onOpenChange]);

  // create / update mutations
  const onError = (error: ApolloError) => {
    if (error) {
      for (const { message } of error.graphQLErrors) {
        if (message.includes('Unique constraint failed on the fields')) {
          if (message.match(/(`name`)/)) {
            form.setFields([
              {
                name: 'name',
                errors: ['Такой продукт уже существует']
              }
            ]);
          }
        }
      }
    }
  };
  const onFinish = async (values: FormValues) => {
    setLoading(true);
    if (props.product) {
      await updateProduct(props.product.id, values);
    } else {
      await createProduct(values);
    }
    setLoading(false);
  };
  const [createProduct] = useCreateProduct({
    onError,
    onCompleted: () => {
      props.onCreated && props.onCreated();
      setOpen(false);
    }
  });
  const [updateProduct] = useUpdateProduct({
    onError,
    onCompleted: () => {
      props.onUpdated && props.onUpdated();
      setOpen(false);
    }
  });

  // set initial values
  useEffect(() => {
    form.setFieldsValue({
      name: props.product?.name,
      calories: props.product?.calories,
      proteins: props.product?.proteins,
      carbs: props.product?.carbs,
      fats: props.product?.fats
    });
  }, [props.product, form]);
  const initialValues: Partial<FormValues> = {
    name: props.product?.name,
    calories: props.product?.calories,
    proteins: props.product?.proteins,
    carbs: props.product?.carbs,
    fats: props.product?.fats
  };

  const validateNumber = (v: unknown, emptyMessage: string, lessThanZero: string) => {
    if (typeof v !== 'number') {
      return Promise.reject(emptyMessage);
    }
    if (v < 0) {
      return Promise.reject(lessThanZero);
    }
    return Promise.resolve();
  };

  // add forceRender to modal to prerender children and set form from useForm hook
  return (
    <>
      {props.activatorSlot && props.activatorSlot({ onClick: () => setOpen(true) })}

      <Modal
        forceRender
        title={props.product ? 'Редактировать продукт: ' + props.product.name : 'Новый продукт'}
        open={isOpen}
        onCancel={() => setOpen(false)}
        confirmLoading={isLoading}
        footer={
          <Button form="product-editor-form" loading={isLoading} type="primary" htmlType="submit">
            Сохранить
          </Button>
        }>
        <Form
          {...layout}
          id="product-editor-form"
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Название продукта"
            name="name"
            rules={[{ required: true, message: 'Укажите имя продукта' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Калорийность, ккал"
            name="calories"
            rules={[
              {
                required: true,
                validator: (r, v) =>
                  validateNumber(
                    v,
                    'Укажите калорийность продукта',
                    'Калорий не может быть меньше 0'
                  )
              }
            ]}>
            <InputNumber width="100%" />
          </Form.Item>

          <Form.Item
            label="Белки, г"
            name="proteins"
            rules={[
              {
                required: true,
                validator: (r, v) =>
                  validateNumber(v, 'Укажите количество белков', 'Белков не может быть меньше 0')
              }
            ]}>
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Жиры, г"
            name="fats"
            rules={[
              {
                required: true,
                validator: (r, v) =>
                  validateNumber(v, 'Укажите количество жиров', 'Жиров не может быть меньше 0')
              }
            ]}>
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Углеводы, г"
            name="carbs"
            rules={[
              {
                required: true,
                validator: (r, v) =>
                  validateNumber(
                    v,
                    'Укажите количество углеводов',
                    'Углеводов не может быть меньше 0'
                  )
              }
            ]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
