// Example helper functions for product image management
// You can import and use these in your Vue components

import {
  uploadProductImagesApi,
  uploadProductSingleImageApi,
  deleteProductImageApi,
  getProductByIdApi
} from '@/api/productApi'
import type { Product } from '@/types/Product'

/**
 * Upload multiple images to a product
 * @param productId - The product ID
 * @param files - Array of image files
 * @returns Updated product with new image URLs
 */
export const uploadMultipleProductImages = async (
  productId: string,
  files: File[]
): Promise<Product> => {
  try {
    const response = await uploadProductImagesApi({
      productId,
      images: files
    })
    return response.data.result
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to upload images')
  }
}

/**
 * Upload a single image to a product
 * @param productId - The product ID
 * @param file - Single image file
 * @returns Updated product with new image URL added
 */
export const uploadSingleProductImage = async (productId: string, file: File): Promise<Product> => {
  try {
    const response = await uploadProductSingleImageApi({
      productId,
      image: file
    })
    return response.data.result
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to upload image')
  }
}

/**
 * Delete an image from a product
 * @param productId - The product ID
 * @param imageUrl - The full URL of the image to delete
 * @returns Updated product without the deleted image
 */
export const deleteProductImage = async (productId: string, imageUrl: string): Promise<Product> => {
  try {
    // Extract imageId from the URL
    // Expected format: https://.../product-uuid/imageId_filename.jpg
    const urlParts = imageUrl.split('/')
    const filename = urlParts[urlParts.length - 1]
    const imageId = filename.split('_')[0]

    const response = await deleteProductImageApi(productId, imageId)
    return response.data.result
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete image')
  }
}

/**
 * Get product with its images
 * @param productId - The product ID
 * @returns Product with image URLs
 */
export const getProductWithImages = async (productId: string): Promise<Product> => {
  try {
    const response = await getProductByIdApi(productId)
    return response.data.result
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product')
  }
}

/**
 * Validate image file before upload
 * @param file - File to validate
 * @param maxSizeMB - Maximum file size in MB (default: 10MB)
 * @returns true if valid, throws error if invalid
 */
export const validateImageFile = (file: File, maxSizeMB: number = 10): boolean => {
  // Check if it's an image
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image')
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    throw new Error(`File size must be less than ${maxSizeMB}MB`)
  }

  // Check image format
  const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedFormats.includes(file.type)) {
    throw new Error('Image format not supported. Use JPG, PNG, GIF, or WebP')
  }

  return true
}

/**
 * Validate multiple image files before upload
 * @param files - Files to validate
 * @param maxSizeMB - Maximum file size in MB per file
 * @param maxFiles - Maximum number of files allowed
 * @returns Array of valid files or throws error
 */
export const validateMultipleImageFiles = (
  files: File[],
  maxSizeMB: number = 10,
  maxFiles: number = 10
): File[] => {
  if (files.length === 0) {
    throw new Error('No files selected')
  }

  if (files.length > maxFiles) {
    throw new Error(`Maximum ${maxFiles} files allowed`)
  }

  files.forEach((file, index) => {
    try {
      validateImageFile(file, maxSizeMB)
    } catch (error: any) {
      throw new Error(`File ${index + 1}: ${error.message}`)
    }
  })

  return files
}

/**
 * Create a preview URL for an image file
 * @param file - Image file to preview
 * @returns Object URL for preview
 */
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file)
}

/**
 * Revoke image preview URL to free memory
 * @param url - URL to revoke
 */
export const revokeImagePreview = (url: string): void => {
  URL.revokeObjectURL(url)
}

/**
 * Extract image ID from Azure Blob Storage URL
 * @param imageUrl - Full Azure Blob Storage URL
 * @returns Image ID (UUID)
 */
export const extractImageIdFromUrl = (imageUrl: string): string => {
  const urlParts = imageUrl.split('/')
  const filename = urlParts[urlParts.length - 1]
  return filename.split('_')[0]
}

/**
 * Upload images with validation
 * @param productId - The product ID
 * @param files - Array of image files
 * @param maxSizeMB - Maximum file size in MB
 * @param maxFiles - Maximum number of files
 * @returns Updated product with new image URLs
 */
export const uploadProductImagesWithValidation = async (
  productId: string,
  files: File[],
  maxSizeMB: number = 10,
  maxFiles: number = 10
): Promise<Product> => {
  // Validate files first
  validateMultipleImageFiles(files, maxSizeMB, maxFiles)

  // Upload if validation passes
  return await uploadMultipleProductImages(productId, files)
}

/**
 * Upload single image with validation
 * @param productId - The product ID
 * @param file - Single image file
 * @param maxSizeMB - Maximum file size in MB
 * @returns Updated product with new image URL added
 */
export const uploadSingleProductImageWithValidation = async (
  productId: string,
  file: File,
  maxSizeMB: number = 10
): Promise<Product> => {
  // Validate file first
  validateImageFile(file, maxSizeMB)

  // Upload if validation passes
  return await uploadSingleProductImage(productId, file)
}
