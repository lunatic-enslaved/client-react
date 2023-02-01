import { FC } from 'react';

import { DefaultLayout } from '@/pages/-layouts/default';

const HomePage: FC = () => {
  document.title = 'My App';

  return (
    <DefaultLayout>
      <div>HomePage</div>
    </DefaultLayout>
  );
};

export default HomePage;
