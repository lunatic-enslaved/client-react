import { useQuery, gql } from '@apollo/client';

// FIXME: добавить debounce

export interface Product {
  id: number;
  name: string;
  proteins: number;
  carbs: number;
  fats: number;
  calories: number;
}

export function useProducts(props: { name: string | null }) {
  const name = props.name;

  const result = useQuery<{ PRODUCTS: Product[] }>(
    gql`
      query GET_PRODUCTS($where: ProductWhereInput) {
        PRODUCTS: products(where: $where, orderBy: { name: asc }) {
          id
          name
          proteins
          calories
          carbs
          fats
        }
      }
    `,
    {
      variables: name ? { where: { name: { contains: name, mode: 'insensitive' } } } : undefined
    }
  );

  return result;
}
