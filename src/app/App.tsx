import React from 'react';

import { Pages } from '@/pages';

import { ApolloProvider } from './apollo-client';
import { ContextProvider } from '@/shared/context';

import '@/shared/styles/index.css';
import 'antd/dist/reset.css';

export const App = () => {
  return (
    <React.StrictMode>
      <ApolloProvider>
        <ContextProvider>
          <Pages></Pages>
        </ContextProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
};
