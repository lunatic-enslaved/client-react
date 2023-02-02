import { FC } from 'react';

import { EditableProductList } from '@/features/product/editable-list';

const ProductsPage: FC = () => {
  document.title = 'Продукты';

  return (
    <div className="p-4 w-full h-full">
      <EditableProductList />
    </div>
  );
};

export default ProductsPage;
