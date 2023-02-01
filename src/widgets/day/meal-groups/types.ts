export interface Nutrients {
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
}

export interface Product extends Nutrients {
  id: number;
  name: string;
}

export interface MealProduct {
  id: number;
  time: string;
  grams: number;
  product: Product;
}
