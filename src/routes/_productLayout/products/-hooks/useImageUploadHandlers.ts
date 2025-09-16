import { useState, useRef, useCallback, useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

export function useImageUploadHandlers(form: UseFormReturn<any>) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Watch the image URL field
  const imageUrl = useWatch({
    control: form.control,
    name: 'image',
    defaultValue: ''
  });

  // Set preview URL when imageUrl changes
  useEffect(() => {
    if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
      setPreviewUrl(imageUrl);
    } else if (!imageUrl && !form.getValues('imageFile')) {
      setPreviewUrl(null);
    }
  }, [imageUrl, form]);

  const handleFileChange = useCallback((file?: File) => {
    if (file) {
      form.setValue('imageFile', file);
      form.setValue('image', '');
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [form]);

  const handleRemoveImage = useCallback(() => {
    setPreviewUrl(null);
    form.setValue('imageFile', undefined);
    form.setValue('image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [form]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileChange(file);
    }
  }, [handleFileChange]);

  return {
    previewUrl,
    setPreviewUrl,
    isDragging,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
