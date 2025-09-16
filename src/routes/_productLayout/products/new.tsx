import { createFileRoute } from '@tanstack/react-router';
import { ProductForm } from './-components/ProductForm.tsx';

export const Route = createFileRoute('/_productLayout/products/new')({
  component: NewProductPage,
});

function NewProductPage() {
  console.log('NewProductPage');
  return (
    <div className="container mx-auto py-8">
      <ProductForm isEdit={false} />
    </div>
  );
}
