import React from 'react';
import { Form, Input, List } from 'antd';
import cn from 'classnames';

import { Product, useProducts } from './api';

// TODO: добавить virtual scroll

export interface ProductListProps {
  onProductClick?: (product: Product) => void;
  appendSearchSlot?: JSX.Element;
  appendProductSlot?: (product: Product) => JSX.Element;
}

export interface ProductListRef {
  refetchProducts: () => void;
}

export const ProductList = React.forwardRef(
  (props: ProductListProps, ref: React.Ref<ProductListRef>) => {
    const [search, setSearch] = React.useState('');
    const { data, loading, refetch } = useProducts({ name: search });
    const products = data?.PRODUCTS;

    function setProductSelected(product: Product) {
      return () => {
        props.onProductClick && props.onProductClick(product);
      };
    }
    function onProductKeyDown(product: Product) {
      return (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          props.onProductClick && props.onProductClick(product);
        }
      };
    }

    React.useImperativeHandle(ref, () => ({
      refetchProducts: () => refetch()
    }));

    const listItemClasses = cn(
      { 'cursor-pointer': !!props.onProductClick },
      'hover:bg-gray-50 flex flex-nowrap items-center'
    );

    return (
      <div className="w-full h-full">
        <Form initialValues={{ remember: true }} autoComplete="off" className="flex flex-nowrap">
          <Form.Item name="search" className="flex-1">
            <Input
              placeholder="Поиск"
              value={search}
              allowClear
              onChange={(e) => setSearch(e.target.value || '')}
            />
          </Form.Item>
          {props.appendSearchSlot && props.appendSearchSlot}
        </Form>

        {loading && <p>Loading</p>}
        <List
          size="small"
          dataSource={products || []}
          renderItem={(product) => (
            <List.Item
              tabIndex={0}
              className={listItemClasses}
              onClick={setProductSelected(product)}
              onKeyDown={onProductKeyDown(product)}>
              <div className="py-4 text-sm flex-1">
                <p className="font-medium text-sky-600 truncate">{product.name}</p>

                <div className="flex flex-nowrap justify-between w-full">
                  <span className="mr-4">Б: {product.proteins} г</span>
                  <span className="mr-4">У: {product.carbs} г</span>
                  <span className="mr-4">Ж: {product.fats} г</span>
                  <span>К: {product.calories} ккал</span>
                </div>
              </div>
              {props.appendProductSlot && props.appendProductSlot(product)}
            </List.Item>
          )}
        />
      </div>
    );
  }
);
