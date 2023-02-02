import React from 'react';
import { Button } from 'antd';
import { Dayjs } from 'dayjs';
import cn from 'classnames';

import { MealsList } from './meals-list';
import { AddProductToMealDialog } from './add-product-to-meal';
import { AddedProduct } from '../types';

interface DayMealGroupsProps {
  date: Dayjs;
  products: AddedProduct[];
  onProductAdded: () => void;
  className?: string;
}

export const DayMealGroups = (props: DayMealGroupsProps) => {
  const [isAddingNewProduct, setAddingNewProduct] = React.useState(false);
  const className = cn('flex flex-col', props.className);

  return (
    <div className={className}>
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
