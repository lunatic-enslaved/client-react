import React from 'react';
import { Button } from 'antd';
import { Dayjs } from 'dayjs';

import { MealsList } from './meals-list';
import { AddProductToMealDialog } from './add-product-to-meal';
import { AddedProduct } from '../types';

interface DayMealGroupsProps {
  date: Dayjs;
  products: AddedProduct[];
  onProductAdded: () => void;
}

export const DayMealGroups = (props: DayMealGroupsProps) => {
  const [isAddingNewProduct, setAddingNewProduct] = React.useState(false);

  return (
    <div className="flex flex-col h-full">
      <MealsList products={props.products} className="flex-1" />

      <div className="flex justify-end">
        <AddProductToMealDialog
          date={props.date}
          isOpen={isAddingNewProduct}
          onOpenChange={setAddingNewProduct}
          onProductAdded={props.onProductAdded}
        />
        <Button onClick={() => setAddingNewProduct(true)}>Добавить продукт</Button>
      </div>
    </div>
  );
};
