import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useGetProducts, useDeleteProduct } from '../-api/query-auth-products';
import { getApiMedia } from '@/utils/config.ts';

export function ProductList() {
  // const { data: products = [], isLoading, isError } = useGetProducts();
  const { data, error, isLoading } = useGetProducts();

  const { mutate: deleteProduct } = useDeleteProduct();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate({ to: `/products/${id}/edit` });
  };

  const handleView = (id: string) => {
    navigate({ to: `/products/${id}` });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id, {
        onSuccess: () => {
          toast.success('Product deleted successfully');
        },
        onError: () => {
          toast.error('Failed to delete product');
        }
      });
    }
  };

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-destructive">Error loading products</div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            {/* <TableHead>Description</TableHead> */}
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((product) => {
            const image_url = getApiMedia(product?.image_url);
            return (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  {image_url && (
                    <img
                      src={image_url}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  )}
                  <div 
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    onClick={() => handleView(product.id.toString())}
                  >
                    {product.name}
                  </div>
                </div>
              </TableCell>
              {/* <TableCell className="max-w-xs truncate">
                <p className="truncate">{product.description}</p>
              </TableCell> */}
              <TableCell className="text-right">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={product.quantity > 0 ? 'default' : 'destructive'}>
                  {product.quantity} in stock
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(product.id.toString());
                    }}
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(product.id.toString());
                    }}
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product.id.toString())}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </div>
  );
}
