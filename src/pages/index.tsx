// https://github.com/select-name/sharead-frontend/blob/master/src/pages/index.tsx

import { FC, lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';

import { TheSidebar } from '@/widgets/the-sidebar';
import { TheNavbar } from '@/widgets/the-navbar';

const IndexPage = lazy(() => import('./home-page'));
const NoPage = lazy(() => import('./no-page'));
const ProductsPage = lazy(() => import('./products-page'));
const CaloriesPlannerPage = lazy(() => import('./calories-planner-page'));

const Loader: FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spin></Spin>
    </div>
  );
};

export const Pages = () => {
  return (
    <div className="flex flex-nowrap h-full w-full bg-gray-100">
      <BrowserRouter>
        <TheSidebar />

        <div className="flex flex-col flex-1">
          <TheNavbar />

          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/calories-planner" element={<CaloriesPlannerPage />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
};
