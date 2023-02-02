import { gql, useQuery } from '@apollo/client';

import dayjs from '@/shared/lib/dayjs';

import { AddedProduct } from './types';

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
