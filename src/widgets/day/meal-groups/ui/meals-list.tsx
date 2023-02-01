import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from 'antd';

import { formatNumber } from '@/shared/lib/formatNumber';
import dayjs from '@/shared/lib/dayjs';
import { calculateTotalWeightOfNutrient } from '@/entities/product/lib';

import { MealProduct } from '../types';

interface MealsListProps {
  products: MealProduct[];
  className?: string;
}

export const MealsList = (props: MealsListProps) => {
  const onProductClick = () => {
    //
  };

  const onProductDelete = () => {
    //
  };

  return (
    <div className={props.className}>
      <ul role="list" className="divide-y divide-gray-200">
        {props.products.map((p) => (
          <ProductListItem
            key={p.id}
            mealProduct={p}
            onClick={onProductClick}
            onDeleteClick={onProductDelete}
          />
        ))}
      </ul>
    </div>
  );
};

interface ProductListItemProps {
  mealProduct: MealProduct;
  onClick: (mealProduct: MealProduct) => void;
  onDeleteClick: (mealProduct: MealProduct) => void;
}

const ProductListItem = (props: ProductListItemProps) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter') {
      props.onClick(props.mealProduct);
    }
  };

  const onClick = () => {
    props.onClick(props.mealProduct);
  };

  const onDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onDeleteClick(props.mealProduct);
  };

  return (
    <li
      className="flex flex-nowrap items-center hover:bg-gray-50 px-6 cursor-pointer"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}>
      <div className="py-4 text-sm flex-0 pr-6">
        <p className="font-medium text-base text-sky-600 truncate">
          {props.mealProduct.product.name}
        </p>

        <div className="flex flex-nowrap justify-between w-full">
          <span className="mr-4">
            Б:
            {formatNumber(
              calculateTotalWeightOfNutrient(
                props.mealProduct.product.proteins,
                props.mealProduct.grams
              )
            )}
            г
          </span>
          <span className="mr-4">
            У:
            {formatNumber(
              calculateTotalWeightOfNutrient(
                props.mealProduct.product.carbs,
                props.mealProduct.grams
              )
            )}
            г
          </span>
          <span className="mr-4">
            Ж:
            {formatNumber(
              calculateTotalWeightOfNutrient(
                props.mealProduct.product.fats,
                props.mealProduct.grams
              )
            )}
            г
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-end pr-6">
        <div className="flex flex-nowrap items-center">
          <time dateTime={props.mealProduct.time} className="mr-2 text-gray-500">
            {dayjs(props.mealProduct.time).format('LT')}
          </time>
          <strong>
            {formatNumber((props.mealProduct.product.calories / 100) * props.mealProduct.grams, 0)}
            ккал
          </strong>
        </div>
        <p>{formatNumber(props.mealProduct.grams, 0)} г</p>
      </div>

      <Button onClick={onDeleteClick}>
        <TrashIcon className="h-4 w-4" />
      </Button>
    </li>
  );
};
