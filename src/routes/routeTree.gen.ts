import { Route } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { Route as ProductLayoutRoute } from './_productLayout';
import { Route as ProductsRoute } from './_productLayout/products';
import { Route as ProductDetailRoute } from './_productLayout/products/$id';
import { Route as EditProductRoute } from './_productLayout/products/$id/edit';
import { Route as NewProductRoute } from './_productLayout/products/new';
import { Route as PublicLayoutRoute } from './_publicLayout';
import { Route as HomeRoute } from './_publicLayout/home';
import { Route as LoginRoute } from './_publicLayout/(auth)/login';
import { Route as RegisterRoute } from './_publicLayout/(auth)/register';

// Create the route tree
export const routeTree = rootRoute.addChildren([
  PublicLayoutRoute.addChildren([
    HomeRoute,
    LoginRoute,
    RegisterRoute,
  ]),
  ProductLayoutRoute.addChildren([
    ProductsRoute,
    ProductDetailRoute,
    EditProductRoute,
    NewProductRoute,
  ]),
]);

// Export the route tree type
export type RouteTree = typeof routeTree;
