// Types
// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   imagen?: string;  // Changed from 'image' to 'imagen' to match API
//   created_at?: string;
//   updated_at?: string;
// }



// export interface ProductCreateInput {
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   image?: File;  // For form data uploads
//   imagen?: string;  // For direct API calls
// }

// Import the generated types
import { components } from '@/types/inventory.js';

// Use the generated types
export type Product = components['schemas']['ProductOut'];
export type ProductCreateInput = components['schemas']['Body_create_product_products__post'];
export type ProductUpdateInput = components['schemas']['Body_update_product_products__product_id__put'];

// API response types
export type ApiResponse<T> = {
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
};


// Custom type for API error response
// export interface ApiError {
//   response?: {
//     data?: {
//       detail?: string;
//     };
//   };
//   message?: string;
// }