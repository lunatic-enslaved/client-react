import { FC } from 'react';

import { ProductListWithEditor } from '@/widgets/product-list-with-editor';

const ProductsPage: FC = () => {
  document.title = 'Продукты';

  return (
    <div className="p-4 w-full h-full">
      <ProductListWithEditor />
    </div>
  );
};

export default ProductsPage;
