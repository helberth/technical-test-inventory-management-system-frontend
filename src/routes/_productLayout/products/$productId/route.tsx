import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_productLayout/products/$productId')({
  component: ProductLayout,
});

function ProductLayout() {
  return <Outlet />;
}
