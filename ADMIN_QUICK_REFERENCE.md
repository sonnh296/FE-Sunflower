# Quick Reference: Admin Product & Image Management

## Common Operations

### 1. Create a New Product

```
1. Click "Thêm sản phẩm mới" button
2. Fill in:
   - Tên sản phẩm (Product Name)
   - Mô tả (Description)
3. Click "Tạo mới" (Create)
4. Product appears in the table
```

### 2. Upload Product Images

#### Option A: Upload Multiple Images at Once (Replaces all)

```
1. Click 📷 button next to product
2. Click "Chọn nhiều ảnh" (Choose multiple images)
3. Select multiple files from your computer
4. Click "Tải lên X ảnh" (Upload X images)
5. Images appear in gallery immediately
```

#### Option B: Add Single Image (Keeps existing)

```
1. Click 📷 button next to product
2. Scroll to "Thêm 1 ảnh" section
3. Click "Thêm 1 ảnh" button
4. Select one file
5. Click "Tải lên ảnh này" (Upload this image)
6. New image is added to existing ones
```

### 3. Delete an Image

```
1. Click 📷 button next to product
2. Hover over the image you want to delete
3. Click the red trash icon that appears
4. Click "Có" (Yes) to confirm
5. Image is removed
```

### 4. Edit Product Info

```
1. Click ✏️ (pencil) button next to product
2. Update name or description
3. Click "Cập nhật" (Update)
```

### 5. Delete a Product

```
1. Click 🗑️ (trash) button next to product
2. Click "Có" (Yes) to confirm
3. Product and all its images are deleted
```

## Button Icons Guide

| Icon | Name   | Function             |
| ---- | ------ | -------------------- |
| ➕   | Plus   | Create new product   |
| 📷   | Images | Open image manager   |
| ✏️   | Pencil | Edit product         |
| 🗑️   | Trash  | Delete product/image |
| ⬆️   | Upload | Upload images        |
| ❌   | X      | Cancel/Close         |
| ✅   | Check  | Confirm/Save         |

## Status Messages

### Success Messages

- ✅ "Đã tạo sản phẩm mới" - Product created
- ✅ "Đã cập nhật sản phẩm" - Product updated
- ✅ "Đã xóa sản phẩm" - Product deleted
- ✅ "Đã tải lên X ảnh" - Images uploaded
- ✅ "Đã xóa ảnh" - Image deleted

### Error Messages

- ❌ "Không thể lưu sản phẩm" - Cannot save product
- ❌ "Không thể xóa sản phẩm" - Cannot delete product
- ❌ "Không thể tải ảnh lên" - Cannot upload images
- ❌ "Không thể xóa ảnh" - Cannot delete image

## File Upload Requirements

### Accepted Formats

- ✅ JPG/JPEG
- ✅ PNG
- ✅ GIF
- ✅ WEBP
- ✅ BMP

### File Size Limit

- Maximum: 5MB per image
- Recommended: 1-2MB for best performance

### Image Dimensions

- No strict requirements
- Recommended: 800x800px or larger for quality
- Images are automatically resized in the display

## Tips & Best Practices

### 📸 Image Upload Tips

1. **Use high-quality images** - Better product presentation
2. **Upload multiple angles** - Show product from different views
3. **Consistent style** - Use similar lighting/background
4. **Optimize before upload** - Compress images to ~1-2MB
5. **Name files clearly** - Easier to manage on your computer

### 🎯 Product Management Tips

1. **Clear descriptions** - Help customers understand the product
2. **Unique names** - Easy to search and identify
3. **Regular updates** - Keep product info current
4. **Test uploads** - Try with one image first
5. **Backup important images** - Keep copies on your computer

### ⚡ Performance Tips

1. **Don't upload too many images at once** - Max 10 images per batch
2. **Close image manager when done** - Frees up memory
3. **Refresh page if issues occur** - Reloads the data
4. **Check internet connection** - Uploads require stable connection

## Troubleshooting

### "Upload Failed" Error

- Check file size (must be < 5MB)
- Verify file format (must be image)
- Check internet connection
- Try uploading one image at a time

### Images Not Showing

- Wait a few seconds for Azure to process
- Refresh the page (F5)
- Check if upload was successful (green toast message)
- Verify Azure Blob Storage is configured

### Cannot Delete Image

- Check if you have admin permissions
- Verify internet connection
- Try refreshing the page
- Check browser console for errors

### Product Not Saving

- Ensure name is not empty
- Check for special characters
- Verify description is not too long
- Check network connection

## Keyboard Shortcuts

| Keys           | Action                        |
| -------------- | ----------------------------- |
| `Esc`          | Close current dialog          |
| `Enter`        | Submit form (in input fields) |
| `Ctrl/Cmd + R` | Refresh page                  |

## Admin Access

This page is only accessible to:

- ✅ Admin users
- ✅ Users with product management permissions

Regular users cannot:

- ❌ Create products
- ❌ Upload images
- ❌ Edit products
- ❌ Delete products

## Support

If you encounter issues:

1. Check this guide first
2. Refresh the page
3. Check browser console (F12)
4. Contact technical support
5. Report bugs with screenshots

---

**Last Updated:** October 13, 2025  
**Version:** 2.0 (Image-based products)
