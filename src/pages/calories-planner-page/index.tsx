import React from 'react';
import { Spin } from 'antd';

import { Context } from '@/shared/context';
import { DayMealGroups } from '@/widgets/day/meal-groups';
import { DayNutrientsInfo } from '@/widgets/day/nutrients-info';

import { useDayProducts } from './api';

const CaloriesPlannerPage = () => {
  document.title = 'Планировщик калорий';

  const { date } = React.useContext(Context);
  const { data, loading, refetch } = useDayProducts({ date: date.toDate() });
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
    <div className="p-4 w-full h-full">
      <DayNutrientsInfo
        carbsPlan={55}
        fatsPlan={55}
        proteinsPlan={20}
        caloriesPlan={1200}
        products={products}
      />
      <DayMealGroups products={addedProducts} date={date} onProductAdded={() => refetch()} />
    </div>
  );
};

export default CaloriesPlannerPage;
