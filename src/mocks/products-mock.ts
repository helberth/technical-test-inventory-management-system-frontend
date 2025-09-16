import { v4 as uuidv4 } from 'uuid';
import type { Product, ProductCreateInput } from '../routes/_productLayout/products/-api/fetch-auth-products';

// Sample product names and descriptions for generating mock data
const productNames = [
  'Wireless Earbuds',
  'Smartphone X',
  'Laptop Pro',
  'Wireless Mouse',
  'Mechanical Keyboard',
  '4K Monitor',
  'Bluetooth Speaker',
  'Noise Cancelling Headphones',
  'Smart Watch',
  'Tablet'
];

const productDescriptions = [
  'High-quality product with advanced features',
  'Latest model with improved performance',
  'Premium design and build quality',
  'Energy efficient and eco-friendly',
  'Includes 1-year manufacturer warranty',
  'Perfect for both work and entertainment',
  'Sleek and modern design',
  'Comes with all necessary accessories',
  'Easy to use and maintain',
  'Best in class performance'
];

const productImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1526170375885-4edd8fefb9b7?w=500&auto=format&fit=crop&q=60'
];

// Generate a single mock product
export const generateMockProduct = (id?: string): Product => {
  const name = productNames[Math.floor(Math.random() * productNames.length)];
  const description = productDescriptions[Math.floor(Math.random() * productDescriptions.length)];
  const price = Math.floor(Math.random() * 900) + 100; // Random price between 100 and 1000
  const quantity = Math.floor(Math.random() * 100);
  const image = productImages[Math.floor(Math.random() * productImages.length)];
  const now = new Date().toISOString();

  return {
    id: id || uuidv4(),
    name,
    description,
    price,
    quantity,
    image,
    created_at: now,
    updated_at: now,
  };
};

// Generate an array of mock products
export const generateMockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, () => generateMockProduct());
};

// Mock a single product by ID
export const mockProduct = (id: string): Product => {
  return generateMockProduct(id);
};

// Mock API responses
export const mockProductsApi = {
  getProducts: (count = 10): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockProducts(count));
      }, 500); // Simulate network delay
    });
  },

  getProduct: (id: string): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProduct(id));
      }, 300);
    });
  },

  createProduct: (product: ProductCreateInput): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          ...product,
          id: uuidv4(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          // Ensure image is a string URL, not a File object
          image: typeof product.image === 'string' ? product.image : undefined,
          // If you need to handle File objects, you might want to generate a mock URL
          // image: product.image instanceof File ? `https://example.com/mock-image-${Date.now()}.jpg` : product.image,
        };
        resolve(newProduct);
      }, 300);
    });
  },
  updateProduct: (id: string, updates: Partial<Product>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = generateMockProduct(id);
        const updatedProduct = { ...product, ...updates, updated_at: new Date().toISOString() };
        resolve(updatedProduct);
      }, 500);
    });
  },

  deleteProduct: (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Product ${id} deleted`);
        resolve();
      }, 500);
    });
  },
};
