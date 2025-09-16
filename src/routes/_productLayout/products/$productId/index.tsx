import { createFileRoute, useNavigate, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Pencil, X } from 'lucide-react';
// import { useGetProduct } from './-api/query-auth-products';
import { Badge } from '@/components/ui/badge';
import { useGetProduct } from '../-api/query-auth-products.ts';
import { getApiMedia } from '@/utils/config.ts';

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const { data:response, isLoading, error } = useGetProduct(productId);
  
  if (isLoading) return <div className="p-8 text-center">Loading product details...</div>;
  if (error || !response) return <div className="p-8 text-center text-destructive">Failed to load product details</div>;

  // After the initial checks
if (!response?.data || typeof response.data.quantity === 'undefined') {
  return <div className="p-8 text-center text-destructive">Invalid product data</div>;
}


  // Now TypeScript knows response.data exists
  const product = response.data;
  const image_url = getApiMedia(product?.image_url);

  return (
    <>
      <div className="container mx-auto px-4 py-0">
        <div className="bg-white overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{product?.name}</h1>
                <div className="mt-2 flex items-center">
                  <Badge variant={product?.quantity > 0 ? 'default' : 'destructive'} className="text-xs sm:text-sm">
                    {product?.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product?.quantity} units available
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => navigate({ to: `/products/${productId}/edit` })}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate({ to: '/products' })}
                  title="Close"
                  className="hidden sm:flex"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-6">
              <div className="flex justify-center">
                {image_url ? (
                  <img
                    src={image_url}
                    alt={product?.name}
                    className="max-h-96 w-auto rounded-lg border"
                  />
                ) : (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">No image available</span>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Description</h2>
                  <p className="mt-2 text-muted-foreground">
                    {product?.description || 'No description available.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                    <p className="text-2xl font-bold">${Number(product?.price).toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Badge 
                      variant={product?.quantity > 0 ? 'default' : 'destructive'} 
                      className="text-xs sm:text-sm"
                    >
                      {product?.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Product Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Product ID</span>
                      <span className="text-sm font-medium">{product?.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Render child routes like /edit */}
      <Outlet />
    </>
  );
}

// Export the component as default to make it easier to import
export default ProductDetailPage;

// Export the route configuration
export const Route = createFileRoute('/_productLayout/products/$productId/')({
  component: ProductDetailPage,
  errorComponent: () => <div>Error loading product details</div>,
});
