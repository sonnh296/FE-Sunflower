<template>
  <div class="bg-white w-full px-5 p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Quản lý sản phẩm</h1>
      <Button
        icon="pi pi-plus"
        label="Thêm sản phẩm mới"
        class="p-button-success"
        @click="openNewProductDialog"
      />
    </div>

    <DataTable
      :value="productStore.products"
      :paginator="true"
      :rows="10"
      :loading="productStore.loading"
      stripedRows
      v-model:selection="selectedProducts"
      dataKey="id"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="id" header="ID" sortable></Column>
      <Column field="name" header="Tên sản phẩm" sortable></Column>
      <Column header="Hình ảnh">
        <template #body="slotProps">
          <div class="flex gap-2">
            <img
              v-for="(imageUrl, index) in slotProps.data.imageUrls?.slice(0, 3)"
              :key="index"
              :src="imageUrl"
              :alt="`Product ${index + 1}`"
              class="w-16 h-16 object-cover rounded"
            />
            <span
              v-if="slotProps.data.imageUrls && slotProps.data.imageUrls.length > 3"
              class="text-sm text-gray-500 self-center"
            >
              +{{ slotProps.data.imageUrls.length - 3 }} ảnh
            </span>
            <span
              v-if="!slotProps.data.imageUrls || slotProps.data.imageUrls.length === 0"
              class="text-sm text-gray-400 self-center"
            >
              Chưa có ảnh
            </span>
          </div>
        </template>
      </Column>
      <Column field="description" header="Mô tả">
        <template #body="slotProps">
          <div class="max-w-xs truncate">{{ slotProps.data.description }}</div>
        </template>
      </Column>
      <Column header="Thao tác">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi pi-images"
              class="p-button-sm p-button-info"
              v-tooltip.top="'Quản lý ảnh'"
              @click="openImageManager(slotProps.data)"
            />
            <Button
              icon="pi pi-pencil"
              class="p-button-sm p-button-warning"
              v-tooltip.top="'Sửa thông tin'"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-sm p-button-danger"
              v-tooltip.top="'Xóa'"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Delete Product Confirmation Dialog -->
    <Dialog v-model:visible="deleteProductDialog" header="Xác nhận xóa" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span
          >Bạn có chắc chắn muốn xóa sản phẩm <strong>{{ productToDelete?.name }}</strong
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Không"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductDialog = false"
        />
        <Button label="Có" icon="pi pi-check" class="p-button-danger" @click="deleteProduct" />
      </template>
    </Dialog>

    <!-- Create/Edit Product Dialog -->
    <Dialog
      v-model:visible="productDialog"
      :modal="true"
      :closable="true"
      :draggable="false"
      class="product-dialog"
      style="width: 650px; max-width: 95vw; max-height: 90vh"
      :contentStyle="{ maxHeight: '60vh', overflow: 'auto' }"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <div
            class="flex items-center justify-center w-12 h-12 rounded-full"
            :class="editMode ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'"
          >
            <i :class="editMode ? 'pi pi-pencil' : 'pi pi-plus'" class="text-xl"></i>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-800 m-0">
              {{ editMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}
            </h2>
            <p class="text-sm text-gray-500 m-0 mt-1">
              {{ editMode ? 'Cập nhật thông tin sản phẩm' : 'Điền thông tin để tạo sản phẩm mới' }}
            </p>
          </div>
        </div>
      </template>

      <div class="space-y-6 py-4">
        <!-- Product Name Field -->
        <div class="form-field">
          <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
            <i class="pi pi-tag text-gray-400 mr-2"></i>
            Tên sản phẩm
            <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="relative">
            <InputText
              id="name"
              v-model="editedProduct.name"
              required
              placeholder="Ví dụ: Áo sơ mi công sở cao cấp"
              class="w-full p-3 border-2 rounded-lg focus:border-blue-500 transition-all"
              :class="!editedProduct.name ? 'border-gray-300' : 'border-green-400'"
            />
            <i
              v-if="editedProduct.name"
              class="pi pi-check-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
            ></i>
          </div>
          <small class="text-gray-500 mt-1 block">
            Nhập tên rõ ràng, dễ hiểu để khách hàng dễ tìm kiếm
          </small>
        </div>

        <!-- Product Description Field -->
        <div class="form-field">
          <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
            <i class="pi pi-align-left text-gray-400 mr-2"></i>
            Mô tả sản phẩm
            <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="relative">
            <Textarea
              id="description"
              v-model="editedProduct.description"
              rows="6"
              placeholder="Mô tả chi tiết về sản phẩm: chất liệu, màu sắc, kích thước, tính năng đặc biệt..."
              class="w-full p-3 border-2 rounded-lg focus:border-blue-500 transition-all resize-none"
              :class="!editedProduct.description ? 'border-gray-300' : 'border-green-400'"
            />
          </div>
          <div class="flex justify-between items-center mt-1">
            <small class="text-gray-500">
              Mô tả chi tiết giúp khách hàng hiểu rõ hơn về sản phẩm
            </small>
            <small
              class="text-gray-400"
              :class="
                editedProduct.description && editedProduct.description.length > 200
                  ? 'text-orange-500 font-semibold'
                  : ''
              "
            >
              {{ editedProduct.description?.length || 0 }} ký tự
            </small>
          </div>
        </div>

        <!-- Product Variants Section -->
        <div class="form-field">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <i class="pi pi-list text-gray-400 mr-2"></i>
            Kích cỡ và giá bán
            <span class="text-red-500 ml-1">*</span>
          </label>

          <div class="space-y-3" v-if="editedProduct.variants && editedProduct.variants.length > 0">
            <div v-for="(variant, index) in editedProduct.variants" :key="index" class="p-4 bg-gray-50 rounded-lg border border-gray-300">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Size Field -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Kích cỡ <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="variant.size"
                    type="text"
                    placeholder="S, M, L, XL..."
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <!-- Price Field -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Giá (VNĐ) <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="variant.price"
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="100000"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <!-- Stock Field -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Số lượng <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="variant.stock"
                    type="number"
                    min="0"
                    placeholder="10"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <!-- Remove Button -->
              <div v-if="editedProduct.variants.length > 1" class="mt-3 text-right">
                <button
                  @click="removeVariant(index)"
                  type="button"
                  class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  <i class="pi pi-trash mr-1"></i>
                  Xóa kích cỡ này
                </button>
              </div>
            </div>

            <!-- Add Variant Button -->
            <button
              @click="addVariant"
              type="button"
              class="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-gray-600 hover:text-blue-600 font-medium"
            >
              <i class="pi pi-plus mr-2"></i>
              Thêm kích cỡ mới
            </button>
          </div>

          <small class="text-gray-500 mt-2 block">
            <i class="pi pi-info-circle mr-1"></i>
            Thêm các kích cỡ khác nhau với giá riêng biệt cho từng size
          </small>
        </div>

        <!-- Info Box -->
        <div
          class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4"
        >
          <div class="flex items-start gap-3">
            <i class="pi pi-info-circle text-blue-600 text-xl mt-0.5"></i>
            <div>
              <p class="font-semibold text-blue-900 text-sm mb-1">Lưu ý quan trọng</p>
              <ul class="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Sau khi tạo, bạn có thể thêm hình ảnh cho sản phẩm</li>
                <li>Tên và mô tả có thể chỉnh sửa bất cứ lúc nào</li>
                <li>Hình ảnh đẹp sẽ thu hút khách hàng hơn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between items-center gap-3 pt-4 border-t">
          <Button
            label="Hủy bỏ"
            icon="pi pi-times"
            class="p-button-text p-button-secondary flex-1 !py-3 hover:!bg-gray-100"
            @click="productDialog = false"
          />
          <Button
            :label="editMode ? 'Cập nhật' : 'Tạo sản phẩm'"
            :icon="editMode ? 'pi pi-check' : 'pi pi-plus'"
            class="flex-1 !py-3"
            :class="
              editMode
                ? 'p-button-primary !bg-blue-600 hover:!bg-blue-700'
                : 'p-button-success !bg-green-600 hover:!bg-green-700'
            "
            @click="saveProduct"
            :loading="productStore.creating || productStore.updating"
            :disabled="!editedProduct.name || !editedProduct.description"
          />
        </div>
      </template>
    </Dialog>

    <!-- Image Manager Dialog -->
    <Dialog
      v-model:visible="imageManagerDialog"
      :header="`Quản lý ảnh - ${currentProduct?.name}`"
      :modal="true"
      class="p-fluid"
      style="width: 800px; max-height: 90vh"
    >
      <div class="space-y-4">
        <!-- Upload Section -->
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <h3 class="text-lg font-semibold mb-4">Tải ảnh lên</h3>

          <!-- Multiple Upload -->
          <div class="mb-4">
            <FileUpload
              ref="multipleFileUpload"
              mode="basic"
              name="images[]"
              accept="image/*"
              :maxFileSize="10000000"
              :multiple="true"
              :auto="false"
              chooseLabel="Chọn nhiều ảnh"
              @select="handleMultipleFileSelect"
            />
            <Button
              v-if="selectedFiles.length > 0"
              :label="`Tải lên ${selectedFiles.length} ảnh`"
              icon="pi pi-upload"
              class="p-button-success mt-2"
              @click="uploadMultipleImages"
              :loading="isUploading"
            />
            <p class="text-xs text-gray-500 mt-2">
              Tối đa 10MB mỗi ảnh, định dạng JPG, PNG, GIF, WEBP
            </p>
          </div>

          <!-- Single Upload -->
          <div class="mt-4 pt-4 border-t">
            <FileUpload
              ref="singleFileUpload"
              mode="basic"
              name="image"
              accept="image/*"
              :maxFileSize="10000000"
              :auto="false"
              chooseLabel="Thêm 1 ảnh"
              @select="handleSingleFileSelect"
            />
            <Button
              v-if="selectedSingleFile"
              label="Tải lên ảnh này"
              icon="pi pi-upload"
              class="p-button-info mt-2"
              @click="uploadSingleImage"
              :loading="isUploading"
            />
          </div>
        </div>

        <!-- Image Gallery -->
        <div v-if="currentProduct?.imageUrls && currentProduct.imageUrls.length > 0" class="mt-6">
          <h3 class="text-lg font-semibold mb-4">
            Ảnh hiện tại ({{ currentProduct.imageUrls.length }})
          </h3>
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(imageUrl, index) in currentProduct.imageUrls"
              :key="index"
              class="relative group"
            >
              <img
                :src="imageUrl"
                :alt="`Product ${index + 1}`"
                class="w-full h-40 object-cover rounded-lg"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-danger p-button-sm absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="confirmDeleteImage(imageUrl)"
                v-tooltip.top="'Xóa ảnh'"
              />
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-8">
          <i class="pi pi-images text-4xl mb-2"></i>
          <p>Chưa có ảnh nào. Hãy tải ảnh lên!</p>
        </div>

        <!-- Status Message -->
        <Message v-if="statusMessage" :severity="statusType" @close="statusMessage = ''">
          {{ statusMessage }}
        </Message>
      </div>

      <template #footer>
        <Button
          label="Đóng"
          icon="pi pi-times"
          class="p-button-text"
          @click="imageManagerDialog = false"
        />
      </template>
    </Dialog>

    <!-- Delete Image Confirmation Dialog -->
    <Dialog v-model:visible="deleteImageDialog" header="Xác nhận xóa ảnh" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Bạn có chắc chắn muốn xóa ảnh này?</span>
      </div>
      <template #footer>
        <Button
          label="Không"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteImageDialog = false"
        />
        <Button label="Có" icon="pi pi-check" class="p-button-danger" @click="deleteImage" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Message from 'primevue/message'
import { useProductStore } from '@/stores/productStore'
import { useToast } from 'primevue/usetoast'
import type { Product, ProductVariant } from '@/types/Product'
import {
  uploadProductImagesApi,
  uploadProductSingleImageApi,
  deleteProductImageApi,
  deleteProductApi
} from '@/api/productApi'

const toast = useToast()
const productStore = useProductStore()

// Dialogs
const productDialog = ref(false)
const deleteProductDialog = ref(false)
const imageManagerDialog = ref(false)
const deleteImageDialog = ref(false)

// Data
const editMode = ref(false)
const selectedProducts = ref()
const productToDelete = ref<Product | null>(null)
const currentProduct = ref<Product | null>(null)
const imageToDelete = ref('')

// Form data with proper TypeScript typing
const editedProduct = ref<{
  id?: string
  name: string
  description: string
  variants: ProductVariant[]
}>({
  name: '',
  description: '',
  variants: [{ size: 'M', price: 0, stock: 0 }]
})

// Image upload
const selectedFiles = ref<File[]>([])
const selectedSingleFile = ref<File | null>(null)
const isUploading = ref(false)
const statusMessage = ref('')
const statusType = ref<'success' | 'error' | 'info' | 'warn'>('success')

const multipleFileUpload = ref()
const singleFileUpload = ref()

// Variant management functions
const addVariant = () => {
  editedProduct.value.variants.push({ size: '', price: 0, stock: 0 })
}

const removeVariant = (index: number) => {
  if (editedProduct.value.variants.length > 1) {
    editedProduct.value.variants.splice(index, 1)
  }
}

// Product CRUD
const openNewProductDialog = () => {
  editMode.value = false
  editedProduct.value = {
    name: '',
    description: '',
    variants: [{ size: 'M', price: 0, stock: 0 }]
  }
  productDialog.value = true
}

const editProduct = async (product: Product) => {
  editMode.value = true

  // Use data from the product list directly - no need to call API again
  // The list now includes variants and imageUrls from backend
  editedProduct.value = {
    id: product.id,
    name: product.name,
    description: product.description,
    variants: product.variants && product.variants.length > 0
      ? JSON.parse(JSON.stringify(product.variants)) // Deep copy to avoid reference issues
      : [{ size: 'M', price: 0, stock: 0 }]
  }

  console.log('Editing product with variants:', editedProduct.value.variants)
  productDialog.value = true
}

const saveProduct = async () => {
  try {
    // Validate variants
    const hasValidVariants = editedProduct.value.variants.every(v =>
      v.size.trim() !== '' && v.price > 0 && v.stock >= 0
    )

    if (!hasValidVariants) {
      toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Vui lòng điền đầy đủ thông tin kích cỡ, giá và số lượng',
        life: 3000
      })
      return
    }

    // IMPORTANT: Don't include imageUrls when updating - this prevents images from being deleted
    const productData = {
      name: editedProduct.value.name,
      description: editedProduct.value.description,
      variants: editedProduct.value.variants.map(v => ({
        size: v.size,
        price: v.price,
        stock: v.stock
      }))
      // DON'T send imageUrls here - let the backend keep existing images
    }

    if (editMode.value && editedProduct.value.id) {
      await productStore.updateProduct({
        id: editedProduct.value.id,
        ...productData
      })
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã cập nhật sản phẩm (hình ảnh được giữ nguyên)',
        life: 3000
      })
    } else {
      await productStore.createProduct(productData)
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã tạo sản phẩm mới',
        life: 3000
      })
    }
    productDialog.value = false
    await productStore.getProducts()
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: error.response?.data?.message || 'Không thể lưu sản phẩm',
      life: 3000
    })
  }
}

const confirmDeleteProduct = (product: Product) => {
  productToDelete.value = product
  deleteProductDialog.value = true
}

const deleteProduct = async () => {
  if (productToDelete.value) {
    try {
      await deleteProductApi(productToDelete.value.id)
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã xóa sản phẩm',
        life: 3000
      })
      await productStore.getProducts()
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: error.response?.data?.message || 'Không thể xóa sản phẩm',
        life: 3000
      })
    }
  }
  deleteProductDialog.value = false
  productToDelete.value = null
}

// Image Management
const openImageManager = async (product: Product) => {
  currentProduct.value = product
  imageManagerDialog.value = true
  selectedFiles.value = []
  selectedSingleFile.value = null
  statusMessage.value = ''

  // Refresh product to get latest images
  await productStore.getProductById(product.id)
  currentProduct.value = productStore.product ?? product
}

const handleMultipleFileSelect = (event: any) => {
  selectedFiles.value = event.files
}

const handleSingleFileSelect = (event: any) => {
  if (event.files && event.files.length > 0) {
    selectedSingleFile.value = event.files[0]
  }
}

const uploadMultipleImages = async () => {
  if (!currentProduct.value || selectedFiles.value.length === 0) return

  isUploading.value = true
  statusMessage.value = ''

  try {
    const response = await uploadProductImagesApi({
      productId: currentProduct.value.id,
      images: selectedFiles.value
    })

    if (response.data.result) {
      currentProduct.value = response.data.result
      statusMessage.value = `Đã tải lên ${selectedFiles.value.length} ảnh thành công!`
      statusType.value = 'success'

      // Reset
      selectedFiles.value = []
      if (multipleFileUpload.value) {
        multipleFileUpload.value.clear()
      }

      // Refresh product list
      await productStore.getProducts()

      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: `Đã tải lên ${selectedFiles.value.length} ảnh`,
        life: 3000
      })
    }
  } catch (error: any) {
    statusMessage.value = error.response?.data?.message || 'Không thể tải ảnh lên'
    statusType.value = 'error'
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: statusMessage.value,
      life: 3000
    })
  } finally {
    isUploading.value = false
  }
}

const uploadSingleImage = async () => {
  if (!currentProduct.value || !selectedSingleFile.value) return

  isUploading.value = true
  statusMessage.value = ''

  try {
    const response = await uploadProductSingleImageApi({
      productId: currentProduct.value.id,
      image: selectedSingleFile.value
    })

    if (response.data.result) {
      currentProduct.value = response.data.result
      statusMessage.value = 'Đã tải lên ảnh thành công!'
      statusType.value = 'success'

      // Reset
      selectedSingleFile.value = null
      if (singleFileUpload.value) {
        singleFileUpload.value.clear()
      }

      // Refresh product list
      await productStore.getProducts()

      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã tải lên ảnh',
        life: 3000
      })
    }
  } catch (error: any) {
    statusMessage.value = error.response?.data?.message || 'Không thể tải ảnh lên'
    statusType.value = 'error'
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: statusMessage.value,
      life: 3000
    })
  } finally {
    isUploading.value = false
  }
}

const confirmDeleteImage = (imageUrl: string) => {
  imageToDelete.value = imageUrl
  deleteImageDialog.value = true
}

const deleteImage = async () => {
  if (!currentProduct.value || !imageToDelete.value) return

  // Find the image ID from the images array
  const imageToRemove = currentProduct.value.images?.find(img => img.imageUrl === imageToDelete.value)

  if (!imageToRemove) {
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không tìm thấy ID của ảnh',
      life: 3000
    })
    deleteImageDialog.value = false
    return
  }

  isUploading.value = true
  statusMessage.value = ''

  try {
    const response = await deleteProductImageApi(currentProduct.value.id, imageToRemove.id)

    if (response.data.result) {
      currentProduct.value = response.data.result
      statusMessage.value = 'Đã xóa ảnh thành công!'
      statusType.value = 'success'

      // Refresh product list
      await productStore.getProducts()

      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã xóa ảnh',
        life: 3000
      })
    }
  } catch (error: any) {
    statusMessage.value = error.response?.data?.message || 'Không thể xóa ảnh'
    statusType.value = 'error'
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: statusMessage.value,
      life: 3000
    })
  } finally {
    isUploading.value = false
    deleteImageDialog.value = false
    imageToDelete.value = ''
  }
}

onMounted(async () => {
  await productStore.getProducts()
})
</script>

<style scoped>
.confirmation-content {
  display: flex;
  align-items: center;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 1rem;
}

:deep(.p-fileupload-choose) {
  width: 100%;
}

/* Product Dialog Enhancements */
:deep(.product-dialog .p-dialog-header) {
  padding: 1.75rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
}

:deep(.product-dialog .p-dialog-content) {
  padding: 0 1.75rem;
  max-height: 70vh;
  overflow-y: auto;
}

:deep(.product-dialog .p-dialog-footer) {
  padding: 1.5rem 1.75rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

/* Form Field Styles */
.form-field {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Input Focus Effects */
:deep(.p-inputtext:focus) {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  border-color: #3b82f6 !important;
}

:deep(.p-inputtextarea:focus) {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  border-color: #3b82f6 !important;
}

/* Button Hover Effects */
:deep(.p-button:not(.p-button-text):hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.p-button:active) {
  transform: translateY(0);
}

/* Scrollbar Styling */
:deep(.p-dialog-content)::-webkit-scrollbar {
  width: 8px;
}

:deep(.p-dialog-content)::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

:deep(.p-dialog-content)::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

:deep(.p-dialog-content)::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  :deep(.product-dialog) {
    width: 95vw !important;
  }

  :deep(.product-dialog .p-dialog-header),
  :deep(.product-dialog .p-dialog-content),
  :deep(.product-dialog .p-dialog-footer) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
