import React from 'react';

// import { TheNavbar } from '@/widgets/the-navbar';

export const DefaultLayout = (props: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col h-full w-full">
      <main className="flex-1 w-full">{props.children}</main>
    </div>
  );
};
