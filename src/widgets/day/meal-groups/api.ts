import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { Dayjs } from 'dayjs';

import dayjs from '@/shared/lib/dayjs';

import { AddedProduct, Product } from './types';

export function useDayProducts({ date }: { date: Date }) {
  const startOfDay = dayjs.utc(date).startOf('day');
  const endOfDay = dayjs.utc(date).endOf('day');

  const result = useQuery<{ addedProducts: AddedProduct[] }>(
    gql`
      query GET_DAY_PRODUCTS($startOfDay: DateTime!, $endOfDay: DateTime!) {
        addedProducts(where: { time: { gte: $startOfDay, lte: $endOfDay } }) {
          id
          time
          grams
          product {
            id
            name
            proteins
            calories
            carbs
            fats
          }
        }
      }
    `,
    {
      variables: { startOfDay, endOfDay },
      fetchPolicy: 'cache-and-network'
    }
  );

  return result;
}

interface PreparedVariables {
  productId: number;
  time: Dayjs;
  grams: number;
}

interface Variables {
  product: Product;
  time: Dayjs;
  grams: number;
}

export function useAddProduct({
  onCompleted,
  onError
}: {
  onCompleted: (product: AddedProduct) => void;
  onError: (error: ApolloError) => void;
}) {
  const [defaultFn, options] = useMutation<{ createOneProduct: AddedProduct }, PreparedVariables>(
    gql`
      mutation CREATE_PRODUCT($productId: Int!, $time: DateTime!, $grams: Float!) {
        createOneAddedProduct(
          data: { product: { connect: { id: $productId } }, time: $time, grams: $grams }
        ) {
          id
          time
          grams
          product {
            id
            name
            proteins
            calories
            carbs
            fats
          }
        }
      }
    `,
    {
      onCompleted: (res) => onCompleted(res?.createOneProduct),
      onError: (error) => onError(error)
    }
  );

  const fn = async (values: Variables) => {
    await defaultFn({
      variables: {
        productId: values.product.id,
        time: values.time,
        grams: values.grams
      }
    });
  };

  return { mutate: fn, ...options };
}
