import { Nutrients } from './types';

interface Meal {
  grams: number;
  product: Nutrients;
}

export function calculateNutrients(meal: Meal): Nutrients {
  const { grams, product } = meal;
  return {
    calories: product.calories * 100 * grams,
    fats: product.fats * 100 * grams,
    proteins: product.proteins * 100 * grams,
    carbs: product.carbs * 100 * grams
  };
}
