// Allows us to hook -in different Gatsby APIs
import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

/* We are making a function which allows a plugin to wrap around the elements.
The `Layout` component will always be there in every page so that we don't have
to manually write it on every components. */
export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
