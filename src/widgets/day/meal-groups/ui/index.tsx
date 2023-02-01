import React from 'react';
import { Button, Spin } from 'antd';
import { Dayjs } from 'dayjs';

import { MealProduct } from '../types';
import { NutrientsInfo } from './nutrients-info';
import { MealsList } from './meals-list';
import { AddProductToMealDialog } from './add-product-to-meal';
import { useDayProducts } from '../api';

interface DayMealGroupsProps {
  date: Dayjs;
}

export const DayMealGroups = (props: DayMealGroupsProps) => {
  const [isAddingNewProduct, setAddingNewProduct] = React.useState(false);
  const { data, loading, refetch } = useDayProducts({ date: props.date.toDate() });
  const addedProducts = data?.addedProducts || [];
  const products = addedProducts.map((a) => a.product);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spin />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <NutrientsInfo
        carbsPlan={55}
        fatsPlan={55}
        proteinsPlan={20}
        caloriesPlan={1200}
        products={products}
      />

      <MealsList products={addedProducts} className="flex-1" />

      <div className="flex justify-end">
        <AddProductToMealDialog
          date={props.date}
          isOpen={isAddingNewProduct}
          onOpenChange={setAddingNewProduct}
          onProductAdded={() => refetch()}
        />
        <Button onClick={() => setAddingNewProduct(true)}>Добавить продукт</Button>
      </div>
    </div>
  );
};
