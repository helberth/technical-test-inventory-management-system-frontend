import { createFileRoute } from '@tanstack/react-router'
import { ProductForm } from '../-components/ProductForm.tsx';

export const Route = createFileRoute('/_productLayout/products/$productId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log('Route Edit Component');
  return <ProductForm isEdit />;
}
