# Backend Response Structure Fix

## Issue

The frontend was using the wrong response type for the Product API calls. The backend uses a different response structure than what was previously defined.

## Backend Response Structure (Spring Boot)

```java
public class ApiResponse<T> {
    private int code = 1000;      // Integer, not string!
    private String message;
    private T result;
}
```

**Example Response:**

```json
{
  "code": 1000,
  "message": null,
  "result": {
    "id": "product-123",
    "name": "Áo Thun Nữ",
    "description": "Áo thun cotton cao cấp",
    "imageUrls": [
      "https://storageaccount.blob.core.windows.net/product-images/image1.jpg",
      "https://storageaccount.blob.core.windows.net/product-images/image2.jpg"
    ],
    "productItem": []
  }
}
```

## Frontend Response Structure (Old - Incorrect)

The frontend was using `MfResponse` type:

```typescript
export type MfResponse<T> = {
  code: string        // ❌ Wrong: backend uses number
  result: T
  data: T
  message: 'true'
  success: 'true'
  meta?: {...}
}
```

## Solution

### 1. Created New ApiResponse Type

**File:** `/MFFE/src/types/ApiResponse.ts`

```typescript
export type ApiResponse<T> = {
  code: number // ✅ Correct: matches backend
  message?: string
  result: T
}
```

### 2. Updated Product API Functions

**File:** `/MFFE/src/api/productApi.ts`

Changed from:

```typescript
export const getProductByIdApi = async (
  id: string
): Promise<AxiosResponse<MfResponse<Product>>> => {
  return await api.get('/products/' + id)
}
```

To:

```typescript
export const getProductByIdApi = async (
  id: string
): Promise<AxiosResponse<ApiResponse<Product>>> => {
  return await api.get('/products/' + id)
}
```

Also updated:

- ✅ `uploadProductImagesApi` - Multiple image upload
- ✅ `uploadProductSingleImageApi` - Single image upload
- ✅ `deleteProductImageApi` - Delete image

### 3. Updated ProductDetail.vue

**File:** `/MFFE/src/views/Guest/ProductDetail.vue`

Changed from:

```typescript
if (response.data.code === '1000' && response.data.result) {
  // ❌ Comparing number to string always fails
}
```

To:

```typescript
if (response.data.code === 1000 && response.data.result) {
  // ✅ Correct: comparing number to number
  product.value = response.data.result
}
```

## Files Changed

1. **Created:** `/MFFE/src/types/ApiResponse.ts` - New type definition
2. **Updated:** `/MFFE/src/api/productApi.ts` - All product API functions
3. **Updated:** `/MFFE/src/views/Guest/ProductDetail.vue` - Response handling

## Verification

### ProductAdmin.vue

Already using `response.data.result` correctly, so no changes needed. It will automatically work with the new type.

### Response Code Values

| Code  | Meaning                     |
| ----- | --------------------------- |
| 1000  | Success                     |
| Other | Error (check message field) |

## Testing Checklist

- [x] TypeScript compilation passes (no errors)
- [ ] Product detail page loads correctly
- [ ] Product images display in carousel
- [ ] Admin product image upload works
- [ ] Admin product image deletion works
- [ ] Error handling works when product not found

## Important Notes

- **Code is a number (1000), not a string ("1000")**
- **Backend uses `result` field, not `data` field**
- **No `meta` or `success` fields in backend response**
- **Message is optional and only present on errors**

## Before vs After

**Before:**

```typescript
// ❌ This would never match because types don't match
if (response.data.code === '1000') {
  // code is number 1000, not string '1000'
}
```

**After:**

```typescript
// ✅ Correct comparison
if (response.data.code === 1000) {
  product.value = response.data.result
}
```

## Additional Context

The backend `ProductResponse` also includes a `productItem` field (Set<ProductItemRequest>) which is currently not used in the frontend. This was part of the old structure. The frontend now focuses on the `imageUrls` array for displaying product images.

**Backend ProductResponse:**

```java
public class ProductResponse {
    private String id;
    private String name;
    private String description;
    private List<String> imageUrls;       // ✅ Used in frontend
    private Set<ProductItemRequest> productItem;  // ❌ Not used (legacy)
}
```

If you need to add back product variants (colors, sizes, prices), you would use the `productItem` field, but that requires additional implementation.
