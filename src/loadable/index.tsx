import Loadable from 'react-loadable';

export const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ '../pages/Cart'),
  loading: () => <h1>Loading...</h1>,
});
export const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ '../pages/NotFound'),
  loading: () => <h1>Loading...</h1>,
});

export const FullPizza = Loadable({
  loader: () => import(/* webpackChunkName: "FullPizza" */ '../pages/FullPizza'),
  loading: () => <h1>Loading..</h1>,
});
