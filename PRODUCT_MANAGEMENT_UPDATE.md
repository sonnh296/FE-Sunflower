# Product Management Update - Image-Based Products

## Overview

The product management system has been updated to focus on **product images** instead of product items (variants). Each product now directly contains multiple images stored in Azure Blob Storage.

## Changes Made

### 1. Backend API Structure (Already Implemented)

The backend supports these image management endpoints:

- `POST /api/products/{productId}/images` - Upload multiple images
- `POST /api/products/{productId}/images/single` - Add a single image
- `DELETE /api/products/{productId}/images/{imageId}` - Remove an image

### 2. Frontend Type Updates

#### Product Type (`src/types/Product.ts`)

```typescript
export type Product = {
  id: string
  name: string
  description: string
  imageUrls?: string[] // Array of Azure Blob Storage URLs
}

export type ProductImage = {
  id: string
  imageUrl: string
  productId: string
}
```

**Key Changes:**

- ✅ Removed `productItem` array from Product type
- ✅ Added `imageUrls` array to store Azure Blob Storage URLs
- ✅ Added new `ProductImage` type for image management

#### API Updates (`src/api/productApi.ts`)

```typescript
export type ProductCreateRequest = {
  name: string
  description: string
  // Removed productItem array
}

export type ProductUpdateRequest = {
  id: string // Changed from number to string
  name: string
  description: string
}
```

**Key Changes:**

- ✅ Removed `productItem` from ProductCreateRequest
- ✅ Changed `id` type from `number` to `string` in ProductUpdateRequest
- ✅ Updated `deleteProductApi` to accept string ID
- ✅ Added image management API functions (already existed)

### 3. Admin UI Complete Redesign (`src/views/Admin/ProductAdmin.vue`)

The ProductAdmin page has been completely redesigned:

#### Main Product Table Features:

- **Product List Display:**

  - ID, Name, Description
  - Image thumbnails (shows first 3 images)
  - Count indicator for additional images
  - "No images" indicator for products without images

- **Action Buttons:**
  - 📷 **Image Manager** - Open dedicated image management dialog
  - ✏️ **Edit** - Edit product name and description
  - 🗑️ **Delete** - Delete product

#### Image Manager Dialog:

A comprehensive image management interface with:

**Upload Section:**

- **Multiple Upload:**

  - Select multiple images at once
  - Shows count of selected images
  - Batch upload all selected images
  - Replaces all existing images

- **Single Upload:**
  - Add one image at a time
  - Keeps existing images
  - Good for adding to existing collection

**Image Gallery:**

- Grid display of all current images (3 columns)
- Each image shows:
  - Full preview (200px height)
  - Delete button (appears on hover)
  - Confirmation dialog before deletion

**Features:**

- Real-time updates after upload/delete
- Loading states during operations
- Success/error messages
- File validation (5MB max, image formats only)
- Toast notifications for all operations

#### Product Create/Edit Dialog:

Simplified to focus on core product info:

- **Name** - Product name (required)
- **Description** - Product description (textarea)
- No image upload here (use Image Manager instead)

## Usage Guide

### Creating a New Product

1. Click **"Thêm sản phẩm mới"** button
2. Enter product name and description
3. Click **"Tạo mới"**
4. Product is created (without images)
5. Click **📷 (Image Manager)** button to add images

### Adding Images to a Product

1. Find the product in the table
2. Click the **📷 (Image Manager)** button
3. In the Image Manager dialog:

   **For Multiple Images:**

   - Click **"Chọn nhiều ảnh"**
   - Select multiple image files
   - Click **"Tải lên X ảnh"**
   - All images are uploaded and replace existing ones

   **For Single Image:**

   - Click **"Thêm 1 ảnh"**
   - Select one image file
   - Click **"Tải lên ảnh này"**
   - Image is added to existing images

### Deleting Images

1. Open Image Manager for the product
2. Hover over the image you want to delete
3. Click the **trash icon** that appears
4. Confirm deletion
5. Image is removed from both database and Azure Blob Storage

### Editing Product Info

1. Click the **✏️ (Edit)** button
2. Update name or description
3. Click **"Cập nhật"**
4. Changes are saved

### Deleting a Product

1. Click the **🗑️ (Delete)** button
2. Confirm deletion
3. Product and all its images are deleted

## Technical Details

### Image Storage

- **Location:** Azure Blob Storage
- **Container:** `product-images`
- **Path Structure:** `products/{productId}/{uuid}_filename.jpg`
- **Max Size:** 5MB per image
- **Formats:** JPG, PNG, GIF, WEBP, BMP

### Image ID Extraction

Images are identified by UUID extracted from the filename:

```
URL: https://storage.blob.core.windows.net/.../uuid_filename.jpg
ImageId: uuid
```

### State Management

- Uses `useProductStore` from Pinia
- Automatically refreshes product list after operations
- Maintains current product state in Image Manager

### Error Handling

- Network errors shown via toast notifications
- File validation before upload
- Confirmation dialogs for destructive actions
- Status messages in Image Manager dialog

## Migration Notes

If you have existing products with `productItem` data:

1. **Backend:** The Product entity still has `productItem` relationship but it's ignored in responses
2. **Frontend:** The old `productItem` type is kept for backward compatibility but not used
3. **Data:** Existing productItem data remains in database but won't be displayed

## Benefits of This Approach

✅ **Simpler Data Model** - Products directly contain images, no nested variants  
✅ **Better UX** - Dedicated image manager with rich features  
✅ **Flexible** - Easy to add/remove images without affecting product data  
✅ **Scalable** - Azure Blob Storage can handle unlimited images  
✅ **Organized** - All images grouped by product in storage  
✅ **Efficient** - Only uploads/downloads what's needed

## Screenshots of Features

### Main Product Table

- Shows product list with image thumbnails
- Three action buttons per product
- Pagination for large lists

### Image Manager Dialog

- Clean two-section layout (Upload & Gallery)
- Multiple and single upload options
- Grid gallery with hover delete
- Real-time status updates

### Create/Edit Product Dialog

- Simple form with name and description
- Validation and error handling
- Loading states during save

## Next Steps

You can now:

1. ✅ Create products with name and description
2. ✅ Upload multiple images to any product
3. ✅ Add individual images to existing products
4. ✅ View all product images in a gallery
5. ✅ Delete specific images
6. ✅ Delete entire products with all images

All operations are integrated with your Azure Blob Storage backend!
