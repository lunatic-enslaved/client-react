import { useMutation, gql, ApolloError } from '@apollo/client';

import { FormValues, Product } from './types';

export function useCreateProduct({
  onCompleted,
  onError
}: {
  onCompleted: (product: Product | undefined) => void;
  onError: (error: ApolloError) => void;
}) {
  const result = useMutation<{ CREATE_PRODUCT: Product }, { data: FormValues }>(
    gql`
      mutation CREATE_PRODUCT($data: ProductCreateInput!) {
        CREATE_PRODUCT: createOneProduct(data: $data) {
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
      onCompleted: (res) => onCompleted(res?.CREATE_PRODUCT),
      onError: (error) => onError(error)
    }
  );

  const fn = async (values: FormValues) => {
    const data = {
      name: values.name,
      calories: values.calories,
      proteins: values.proteins,
      carbs: values.carbs,
      fats: values.fats
    };
    await result[0]({ variables: { data } });
  };

  return [fn];
}

export function useUpdateProduct({
  onCompleted,
  onError
}: {
  onCompleted: (product: Product | undefined) => void;
  onError: (error: ApolloError) => void;
}) {
  const result = useMutation<{ UPDATE_PRODUCT: Product }>(
    gql`
      mutation UPDATE_PRODUCT($productId: Int!, $data: ProductUpdateInput!) {
        UPDATE_PRODUCT: updateOneProduct(where: { id: $productId }, data: $data) {
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
      onCompleted: (res) => res?.UPDATE_PRODUCT && onCompleted(res?.UPDATE_PRODUCT),
      onError: (error) => onError(error)
    }
  );

  const fn = async (productId: number, values: FormValues) => {
    const data = {
      name: { set: values.name },
      calories: { set: values.calories },
      proteins: { set: values.proteins },
      carbs: { set: values.carbs },
      fats: { set: values.fats }
    };
    await result[0]({ variables: { productId, data } });
  };

  return [fn];
}
