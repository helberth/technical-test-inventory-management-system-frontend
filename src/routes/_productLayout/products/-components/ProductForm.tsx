import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import {
  useCreateProduct,
  useUpdateProduct,
  useGetProduct,
} from '../-api/query-auth-products';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ImageUploaderField } from '../../../../components/ImageUploaderField';
import { useImageUploadHandlers } from '../-hooks/useImageUploadHandlers';
import { getApiMedia } from '@/utils/config.ts';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const productFormSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
  price: z.coerce.number().min(0.01).max(1000000),
  quantity: z.coerce.number().int().min(0).max(1000000),
  // image: z
  //   .union([
  //     z.string().url().startsWith('https://').or(z.literal('')),
  //     z.instanceof(File).optional().nullable(),
  //     z.null(),
  //   ])
  //   .optional(),
  // imageUrl: z.string().optional(),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'Max file size is 5MB.',
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
    }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  isEdit?: boolean;
}

export function ProductForm({ isEdit = false }: ProductFormProps) {
  console.log(`ProductForm Props: ${isEdit}`);
  const { productId } = isEdit
    ? useParams({ from: '/_productLayout/products/$productId' } as const)
    : { productId: undefined };

  console.log(`ProductForm productId: ${productId}`);

  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    data: existingProduct,
    isLoading: isLoadingProduct,
  } = useGetProduct(productId || '', {
    enabled: isEdit && !!productId,
  });

  console.log(`ProductForm existingProduct: ${existingProduct}`);
  console.log(`ProductForm isLoadingProduct: ${isLoadingProduct}`);
  

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      // image: null,
      imageFile: undefined,
      // imageUrl: '',
    },
  });

  const {
    previewUrl,
    setPreviewUrl,
    isDragging,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useImageUploadHandlers(form);

  // const hasReset = useRef(false);

  useEffect(() => {
    if (isEdit && existingProduct && !form.formState.isDirty) {
      // hasReset.current = true;
      const productData = {
        name: existingProduct?.data?.name,
        description: existingProduct?.data?.description ?? '',
        price: existingProduct?.data?.price,
        quantity: existingProduct?.data?.quantity,
        image: existingProduct?.data?.image_url || null,
        imageFile: undefined,
        // imageUrl: existingProduct?.data?.image_url || ''
      };
      
      // Only reset if the form hasn't been modified yet
      if (JSON.stringify(form.getValues()) !== JSON.stringify(productData)) {
        form.reset(productData, {
          keepDirty: true,
          keepErrors: false,
          keepIsSubmitted: false,
          keepTouched: false,
          keepIsValid: false,
          keepSubmitCount: false,
        });
      }
      
      // Set the preview URL directly if there's an image URL
      const imageUrl = getApiMedia(existingProduct?.data?.image_url);
      if (imageUrl) {
        setPreviewUrl(imageUrl);
      } else {
        setPreviewUrl(null);
      }
    }
  }, [existingProduct, form, isEdit, setPreviewUrl]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      console.log("OnSubmit called");
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description || '');
      formData.append('price', data.price.toString());
      formData.append('quantity', data.quantity.toString());

      if (data.imageFile instanceof File) {
        formData.append('image', data.imageFile); // ✅ nombre debe ser 'image'
      }

      const mutationArgs = {
        data: formData,
        isFormData: true,
      };

      if (isEdit && productId) {
        await updateProduct.mutateAsync(
          { id: productId, ...mutationArgs },
          {
            onSuccess: () => {
              toast.success('Product updated successfully');
              navigate({ to: '/products' });
            },
            onError: (error) => {
              toast.error(
                error instanceof Error
                  ? `Failed to update product: ${error.message}`
                  : 'Failed to update product. Please try again.'
              );
            },
          }
        );
      } else {
        await createProduct.mutateAsync(mutationArgs, {
          onSuccess: () => {
            toast.success('Product created successfully');
            navigate({ to: '/products' });
          },
          onError: (error) => {
            toast.error(
              error instanceof Error
                ? `Failed to create product: ${error.message}`
                : 'Failed to create product. Please try again.'
            );
          },
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  if (isEdit && isLoadingProduct) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading product data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Product' : 'Create New Product'}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ImageUploaderField
            control={form.control}
            setPreviewUrl={setPreviewUrl}
            previewUrl={previewUrl}
            isDragging={isDragging}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            handleRemoveImage={handleRemoveImage}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity in Stock</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/products' })}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : isEdit ? (
                'Update Product'
              ) : (
                'Create Product'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
