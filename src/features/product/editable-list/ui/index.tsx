import React from 'react';
import { Button } from 'antd';

import { CreateProductDialog } from './create-dialog';
import { ProductList, ProductListProps, ProductListRef } from './product-list';
import { Product } from '../api';

export const ListWithEditor = (props: ProductListProps) => {
  const [isEditorOpen, setEditorOpen] = React.useState(false);
  const [productForEditor, setProductForEditor] = React.useState<Product>();
  const productList = React.createRef<ProductListRef>();

  const onProductCreated = () => {
    productList.current?.refetchProducts();
  };

  const toggleEditor = (open: boolean, product?: Product) => {
    setEditorOpen(open);
    setProductForEditor(product);
  };

  return (
    <>
      {isEditorOpen && (
        <CreateProductDialog
          isOpen={isEditorOpen}
          product={productForEditor}
          onOpenChange={setEditorOpen}
          onCreated={onProductCreated}
        />
      )}

      <ProductList
        {...props}
        ref={productList}
        appendSearchSlot={
          <Button onClick={() => toggleEditor(true)} className="ml-4">
            Создать продукт
          </Button>
        }
        appendProductSlot={(product) => (
          <Button onClick={() => toggleEditor(true, product)} className="ml-4">
            Редактировать
          </Button>
        )}
      />
    </>
  );
};
