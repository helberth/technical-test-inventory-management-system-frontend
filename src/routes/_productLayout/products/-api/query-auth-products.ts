import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import {
  type ProductUpdateInput,
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './fetch-auth-products.ts';
import { ApiResponse, Product, ProductCreateInput } from '../-types/product.ts';
import { toast } from 'sonner';

// import { generateMockProducts, mockProduct } from "@/mocks/products-mock";

// type ApiError = {
//   message?: string;
//   // Add other error properties as needed
// };

export const useProductQueries = () => {
  const queryClient = useQueryClient();

  // Query: Get all products
  const useGetProducts = (options?: Omit<UseQueryOptions<ApiResponse<Product[]>>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ApiResponse<Product[]>>({
      queryKey: ['products'],
      queryFn: async () => {
        try {
          const response = await fetchProducts();
          return { data: response };
        } catch (error: any) {
          return {
            error: {
              message: error.response?.data?.detail || 'Failed to fetch products',
              details: error.response?.data
            }
          };
        }
      },
      ...options,
    });
  };

  // Query: Get single product by ID
  const useGetProduct = (id: string, options?: Omit<UseQueryOptions<ApiResponse<Product>>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ApiResponse<Product>>({
      queryKey: ['products', id],
      queryFn: async () => {
        try {
          const response = await fetchProductById(id);
          return { data: response };
        } catch (error: any) {
          return {
            error: {
              message: error.response?.data?.detail || `Failed to fetch product ${id}`,
              details: error.response?.data
            }
          };
        }
      },
      ...options,
    });
  };

  // Mutation: Create a new product
  const useCreateProduct = (
    options?: Omit<UseMutationOptions<
      ApiResponse<Product>,
      unknown,
      { data: ProductCreateInput | FormData }
    >, 'mutationFn'>
  ) => {
    return useMutation({
      mutationFn: async ({ data }) => {
        return createProduct({ data });
      },
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        options?.onSuccess?.(data, variables, context);
      },
    });
  };

  // Mutation: Update an existing product
  const useUpdateProduct = (options?: Omit<UseMutationOptions<
    ApiResponse<Product>,
    unknown,
    { id: string; data: ProductUpdateInput | FormData }
  >, 'mutationFn'>) => {
    return useMutation({
      mutationFn: async ({ id, data }) => {
        return updateProduct({ id, data });
      },
      ...options,
      onSuccess: (data, variables, context) => {
        // Invalidate and refetch the updated product and products list
        queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
        queryClient.invalidateQueries({ queryKey: ['products'] });
        options?.onSuccess?.(data, variables, context);
      },
    });
  };
  ``
  // Mutation: Delete a product
  // const useDeleteProduct = (options?: Omit<UseMutationOptions<void, ApiError, string>, 'mutationFn'>) => {
  //   return useMutation<void, ApiError, string>({
  //     mutationFn: deleteProduct,
  //     ...options,
  //     onSuccess: () => {
  //       // Invalidate the products list
  //       queryClient.invalidateQueries({ queryKey: ['products'] });
  //     },
  //   });
  // };
  const useDeleteProduct = (options?: Omit<UseMutationOptions<
    ApiResponse<void>,  // Changed from void to ApiResponse<void>
    unknown,            // Changed from ApiError to unknown
    string              // The ID of the product to delete
  >, 'mutationFn'>) => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          await deleteProduct(id);
          return { data: undefined }; // Return success response with no data
        } catch (error: any) {
          const errorMessage = error.response?.data?.detail || `Failed to delete product ${id}`;
          toast.error(errorMessage);
          return {
            error: {
              message: errorMessage,
              details: error.response?.data
            }
          };
        }
      },
      ...options,
      onSuccess: (data, id, context) => {
        // Invalidate the products list and any individual product queries
        queryClient.invalidateQueries({ queryKey: ['products'] });
        queryClient.invalidateQueries({ queryKey: ['products', id] });
        options?.onSuccess?.(data, id, context);
      },
    });
  };

  return {
    useGetProducts,
    useGetProduct,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
  };
};

// Export individual hooks for convenience
// Export individual hooks with proper types
export const useGetProducts = (options?: Omit<UseQueryOptions<ApiResponse<Product[]>>, 'queryKey' | 'queryFn'>) =>
  useProductQueries().useGetProducts(options);

export const useGetProduct = (id: string, options?: Omit<UseQueryOptions<ApiResponse<Product>>, 'queryKey' | 'queryFn'>) =>
  useProductQueries().useGetProduct(id, options);

// Update the exported hooks to match the new types
export const useCreateProduct = (
  options?: Omit<UseMutationOptions<
    ApiResponse<Product>,
    unknown,
    { data: ProductCreateInput | FormData; isFormData?: boolean }
  >, 'mutationFn'>
) => useProductQueries().useCreateProduct(options);

export const useUpdateProduct = (
  options?: Omit<UseMutationOptions<
    ApiResponse<Product>,
    unknown,
    { id: string; data: ProductUpdateInput | FormData; isFormData?: boolean }
  >, 'mutationFn'>
) => useProductQueries().useUpdateProduct(options);

export const useDeleteProduct = (
  options?: Omit<UseMutationOptions<
    ApiResponse<void>,
    unknown,
    string
  >, 'mutationFn'>
) => useProductQueries().useDeleteProduct(options);
