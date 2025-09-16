import { createFileRoute, useNavigate, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProductList } from './-components/ProductList.tsx'

export const Route = createFileRoute('/_productLayout/products')({
  component: ProductsPage,
  errorComponent: () => <div>Error loading products</div>,
});

function ProductsPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Inventory</h1>
            <p className="text-muted-foreground">
              Manage your product catalog
            </p>
          </div>
          <Button onClick={() => navigate({ to: '/products/new' })}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Product List */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <ProductList />
            </div>
          </div>
          
          {/* Right column - Form or Details */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
