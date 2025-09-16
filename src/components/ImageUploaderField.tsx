import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';

interface Props {
  control: any;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  isDragging: boolean;
  handleFileChange: (file: File) => void;
  handleRemoveImage: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
}

export function ImageUploaderField({
  control,
  fileInputRef,
  previewUrl,
  isDragging,
  handleFileChange,
  handleRemoveImage,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}: Props) {
  return (
    <>
      <FormField
        control={control}
        name="imageFile"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Product Image</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {previewUrl ? (
                  <div className="relative group">
                    <div className="relative w-full max-w-md h-48 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                        title="Remove image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex justify-center">
                      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-blue-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, WEBP (MAX. 5MB)
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  ref={(e) => {
                    fileInputRef.current = e;
                    field.ref?.(e);
                  }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileChange(file);
                      onChange(file);
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
