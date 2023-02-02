export interface Product {
  id: number;
  name: string;
  proteins: number;
  calories: number;
  carbs: number;
  fats: number;
}

export interface FormValues {
  name: string;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
}
