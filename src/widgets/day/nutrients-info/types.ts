import { Nutrients } from '@/entities/product/types';

export interface Product extends Nutrients {
  id: number;
  name: string;
}
