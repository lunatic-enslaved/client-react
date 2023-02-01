import { ApolloClient, InMemoryCache, ApolloProvider as DefaultProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

export const ApolloProvider = (props: PropsWithChildren) => {
  return <DefaultProvider client={client}>{props.children}</DefaultProvider>;
};
