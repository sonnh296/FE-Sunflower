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
              v-tooltip.top="'Sửa'"
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
      :header="editMode ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'"
      :modal="true"
      class="p-fluid"
      style="width: 500px"
    >
      <div class="formgrid grid gap-4">
        <div class="col-12">
          <label for="name" class="font-semibold">Tên sản phẩm</label>
          <InputText
            id="name"
            v-model="editedProduct.name"
            required
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        <div class="col-12">
          <label for="description" class="font-semibold">Mô tả</label>
          <Textarea
            id="description"
            v-model="editedProduct.description"
            rows="5"
            placeholder="Nhập mô tả sản phẩm"
          />
        </div>
      </div>

      <template #footer>
        <Button
          label="Hủy"
          icon="pi pi-times"
          class="p-button-text"
          @click="productDialog = false"
        />
        <Button
          :label="editMode ? 'Cập nhật' : 'Tạo mới'"
          icon="pi pi-check"
          class="p-button-success"
          @click="saveProduct"
          :loading="productStore.creating || productStore.updating"
        />
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
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Message from 'primevue/message'
import { useProductStore } from '@/stores/productStore'
import { useToast } from 'primevue/usetoast'
import type { Product } from '@/types/Product'
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
const imageToDelete = ref<string>('')

// Form data
const editedProduct = ref<Partial<Product>>({
  name: '',
  description: ''
})

// Image upload
const selectedFiles = ref<File[]>([])
const selectedSingleFile = ref<File | null>(null)
const isUploading = ref(false)
const statusMessage = ref('')
const statusType = ref<'success' | 'error' | 'info' | 'warn'>('success')

const multipleFileUpload = ref()
const singleFileUpload = ref()

// Product CRUD
const openNewProductDialog = () => {
  editMode.value = false
  editedProduct.value = {
    name: '',
    description: ''
  }
  productDialog.value = true
}

const editProduct = (product: Product) => {
  editMode.value = true
  editedProduct.value = {
    id: product.id,
    name: product.name,
    description: product.description
  }
  productDialog.value = true
}

const saveProduct = async () => {
  try {
    if (editMode.value && editedProduct.value.id) {
      await productStore.updateProduct({
        id: editedProduct.value.id,
        name: editedProduct.value.name!,
        description: editedProduct.value.description!
      })
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã cập nhật sản phẩm',
        life: 3000
      })
    } else {
      await productStore.createProduct({
        name: editedProduct.value.name!,
        description: editedProduct.value.description!
      })
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

  // Extract imageId from URL
  const urlParts = imageToDelete.value.split('/')
  const filename = urlParts[urlParts.length - 1]
  const imageId = filename.split('_')[0]

  isUploading.value = true
  statusMessage.value = ''

  try {
    const response = await deleteProductImageApi(currentProduct.value.id, imageId)

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
</style>
