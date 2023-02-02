import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly proteins: number;
  readonly carbs: number;
  readonly fats: number;
  readonly calories: number;
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

export interface FormValues {
  name: string;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
}

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
