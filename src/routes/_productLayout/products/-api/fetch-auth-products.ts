import { api } from "@/lib/api";
import { toast } from "sonner";
import { ApiResponse, Product, ProductCreateInput } from '../-types/product.ts';


export type ProductUpdateInput = Partial<ProductCreateInput>;

// API Functions
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log("Fetching products...");
    const response = await api.get("/products/");
    console.log("Products response:", response);
    return response || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to load products");
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    toast.error("Failed to load product details");
    throw error;
  }
};

export const createProduct = async ({
  data,
}: {
  data: ProductCreateInput | FormData;
}): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.post('/products/', data);
    return { data: response };
  } catch (error: any) {
    console.error("Error creating product:", error);
    const errorMessage = error.response?.data?.detail || "Failed to create product";
    toast.error(errorMessage);
    return {
      error: {
        message: errorMessage,
        details: error.response?.data
      }
    };
  }
};

export const updateProduct = async ({
  id,
  data,
  isFormData = false
}: {
  id: string;
  data: ProductUpdateInput | FormData;
  isFormData?: boolean;
}): Promise<ApiResponse<Product>> => {
  try {
    const config = isFormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : undefined;

    const response = await api.put(`/products/${id}`, data, config);
    return { data: response };
  } catch (error: any) {
    console.error(`Error updating product ${id}:`, error);
    const errorMessage = error.response?.data?.detail || `Failed to update product ${id}`;
    toast.error(errorMessage);
    return {
      error: {
        message: errorMessage,
        details: error.response?.data
      }
    };
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
    toast.success("Product deleted successfully");
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    toast.error("Failed to delete product");
    throw error;
  }
};

// React Query hooks
export const useProducts = () => {
  return {
    getProducts: () => ({
      queryKey: ["products"],
      queryFn: fetchProducts,
    }),
    getProduct: (id: string) => ({
      queryKey: ["products", id],
      queryFn: () => fetchProductById(id),
    }),
    createProduct: (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => ({
      mutationFn: (variables: { data: ProductCreateInput | FormData; isFormData?: boolean }) =>
        createProduct(variables),
      ...options,
    }),
    updateProduct: (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => ({
      mutationFn: (variables: { id: string; data: ProductUpdateInput | FormData; isFormData?: boolean }) =>
        updateProduct(variables),
      ...options,
    }),
    deleteProduct: (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => ({
      mutationFn: (id: string) => deleteProduct(id),
      ...options,
    }),
  };
};
