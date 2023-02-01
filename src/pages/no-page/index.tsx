import { FC } from 'react';

const NoPage: FC = () => {
  document.title = 'Страница не найдена';

  return <div>NoPage</div>;
};

export default NoPage;
