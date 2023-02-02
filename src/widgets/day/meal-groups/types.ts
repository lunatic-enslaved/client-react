import { Nutrients } from '@/entities/product/types';

export interface Product extends Nutrients {
  id: number;
  name: string;
}

export interface AddedProduct {
  id: number;
  time: string;
  grams: number;
  product: Product;
}
