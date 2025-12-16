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
      <Column field="id" header="ID" :sortable="true"></Column>
      <Column field="name" header="Tên sản phẩm" :sortable="true"></Column>
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

        <!-- Product Category Field -->
        <div class="form-field">
          <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">
            <i class="pi pi-tags text-gray-400 mr-2"></i>
            Danh mục (Category)
          </label>
          <div class="relative">
            <AutoComplete
              id="category"
              v-model="editedProduct.category"
              :suggestions="categorySuggestions"
              @complete="onCategoryComplete"
              placeholder="Ví dụ: Thời Trang, Phụ kiện"
              class="w-full p-3 border-2 rounded-lg focus:border-blue-500 transition-all"
            />
          </div>
          <small class="text-gray-500 mt-1 block">
            Nhập tên danh mục. Nếu danh mục chưa tồn tại, hệ thống sẽ tạo mới.
          </small>
        </div>

        <!-- Product Variants Section -->
        <div class="form-field">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <i class="pi pi-list text-gray-400 mr-2"></i>
            Loại sản phẩm và kích cỡ
            <span class="text-red-500 ml-1">*</span>
          </label>

          <div class="space-y-3" v-if="editedProduct.variants && editedProduct.variants.length > 0">
            <div
              v-for="(variant, index) in editedProduct.variants"
              :key="index"
              class="p-4 bg-gray-50 rounded-lg border border-gray-300"
            >
              <!-- Variant Name -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Tên loại <span class="text-red-500">*</span></label
                >
                <input
                  v-model="variant.variantName"
                  type="text"
                  placeholder="Ví dụ: Màu đỏ, Kiểu A"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Sizes for this variant -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Kích cỡ</label>
                <div class="space-y-2" v-if="variant.sizes && variant.sizes.length > 0">
                  <div
                    v-for="(sizeItem, sizeIndex) in variant.sizes"
                    :key="sizeIndex"
                    class="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 bg-white rounded border"
                  >
                    <!-- Size Field -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Kích cỡ <span class="text-red-500">*</span></label
                      >
                      <AutoComplete
                        v-model="sizeItem.size"
                        :suggestions="(sizeSuggestionsByIndex[index] || []).map((s) => s.name)"
                        placeholder="S, M, L, XL..."
                        @input="onVariantSizeInput($event, index, sizeIndex)"
                        class="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <!-- Price Field -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Giá (VNĐ) <span class="text-red-500">*</span></label
                      >
                      <input
                        v-model.number="sizeItem.price"
                        type="number"
                        min="0"
                        step="1000"
                        placeholder="100000"
                        class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <!-- Stock Field -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Số lượng <span class="text-red-500">*</span></label
                      >
                      <input
                        v-model.number="sizeItem.stock"
                        type="number"
                        min="0"
                        placeholder="10"
                        class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <button
                  @click="addSize(index)"
                  type="button"
                  class="w-full p-2 border border-dashed border-gray-300 rounded hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                >
                  <i class="pi pi-plus mr-1"></i>
                  Thêm kích cỡ
                </button>
              </div>

              <!-- Category Field -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <AutoComplete
                  v-model="(variant as any).categoryName"
                  :suggestions="categories.map((c) => c.name)"
                  placeholder="Chọn hoặc nhập danh mục"
                  @input="onVariantCategoryInput($event, index)"
                  class="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <!-- Remove Variant Button -->
              <div v-if="editedProduct.variants.length > 1" class="mt-3 text-right">
                <button
                  @click="removeVariant(index)"
                  type="button"
                  class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  <i class="pi pi-trash mr-1"></i>
                  Xóa loại này
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
              Thêm loại mới
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Message from 'primevue/message'
import { useProductStore } from '@/stores/productStore'
import { getCategoriesApi, getSizesApi, type Category, type Size } from '@/api/categoryApi'
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
  category?: string
  variants: ProductVariant[]
}>({
  name: '',
  description: '',
  category: '',
  variants: [{ variantName: 'Default', sizes: [{ size: 'M', price: 0, stock: 0 }] }]
})

// Categories & sizes for per-variant selection
const categories = ref<Category[]>([])
const sizeSuggestionsByIndex = ref<Record<number, Size[]>>({})
// Suggestions for product-level category AutoComplete (string names)
const categorySuggestions = ref<string[]>([])

const updateCategorySuggestions = () => {
  const cats = productStore.products.map((p: any) => p.categoryName ?? p.category).filter(Boolean)
  // also include categories fetched from the API (ensures we show names when product list lacks them)
  const apiCats = categories.value.map((c) => c.name).filter(Boolean)
  categorySuggestions.value = Array.from(new Set([...cats, ...apiCats]))
}

const onCategoryComplete = (event: any) => {
  const q = (event.query || '').toString().toLowerCase()
  if (!q) {
    updateCategorySuggestions()
    return
  }
  categorySuggestions.value = (
    productStore.products.map((p: any) => p.categoryName ?? p.category).filter(Boolean) as string[]
  ).filter((c) => c.toLowerCase().includes(q))
}

const fetchCategories = async () => {
  try {
    const { data } = await getCategoriesApi()
    categories.value = data.result ?? []
    // Update string suggestions used by existing AutoComplete for product-level category
    updateCategorySuggestions()
  } catch (err) {
    console.warn('Failed to fetch categories', err)
  }
}

const fetchSizesForCategory = async (categoryId: string | undefined, index: number) => {
  try {
    const { data } = await getSizesApi(categoryId)
    sizeSuggestionsByIndex.value = {
      ...sizeSuggestionsByIndex.value,
      [index]: data.result ?? []
    }
  } catch (err) {
    console.warn('Failed to fetch sizes for category', categoryId, err)
    sizeSuggestionsByIndex.value = { ...sizeSuggestionsByIndex.value, [index]: [] }
  }
}

const onCategoryChangeForVariant = (value: string, index: number) => {
  const cat = categories.value.find((c) => c.name === value)
  if (cat) {
    // set categoryId/name for variant and load sizes
    ;(editedProduct.value.variants[index] as any).categoryId = cat.id
    ;(editedProduct.value.variants[index] as any).categoryName = cat.name
    fetchSizesForCategory(cat.id, index)
  } else {
    // new category name typed, clear sizes for this variant
    delete (editedProduct.value.variants[index] as any).categoryId
    ;(editedProduct.value.variants[index] as any).categoryName = value
    sizeSuggestionsByIndex.value = { ...sizeSuggestionsByIndex.value, [index]: [] }
  }
}

const onSizeSelectedForVariant = (value: string, index: number, sizeIndex?: number) => {
  const sizes = sizeSuggestionsByIndex.value[index] ?? []
  const selected = sizes.find((s) => s.name === value)
  if (selected && sizeIndex !== undefined) {
    editedProduct.value.variants[index].sizes[sizeIndex].sizeId = selected.id
    editedProduct.value.variants[index].sizes[sizeIndex].size = selected.name
    // ensure variant knows its category
    if (!editedProduct.value.variants[index].categoryId && selected.categoryId) {
      editedProduct.value.variants[index].categoryId = selected.categoryId
      editedProduct.value.variants[index].categoryName = selected.categoryName ?? ''
    }
  }
}

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
  editedProduct.value.variants.push({ variantName: '', sizes: [{ size: '', price: 0, stock: 0 }] })
  // initialize empty suggestions for new index
  const idx = editedProduct.value.variants.length - 1
  sizeSuggestionsByIndex.value = { ...sizeSuggestionsByIndex.value, [idx]: [] }
}

const removeVariant = (index: number) => {
  if (editedProduct.value.variants.length > 1) {
    editedProduct.value.variants.splice(index, 1)
  }
}

const addSize = (variantIndex: number) => {
  editedProduct.value.variants[variantIndex].sizes.push({ size: '', price: 0, stock: 0 })
}

const removeSize = (variantIndex: number, sizeIndex: number) => {
  if (editedProduct.value.variants[variantIndex].sizes.length > 1) {
    editedProduct.value.variants[variantIndex].sizes.splice(sizeIndex, 1)
  }
}

// New typed template handlers to avoid implicit-any in templates
const onVariantCategoryInput = (val: string, index: number) => {
  onCategoryChangeForVariant(val, index)
}

const onVariantSizeInput = (val: string, index: number, sizeIndex?: number) => {
  if (sizeIndex !== undefined) {
    onSizeSelectedForVariant(val, index, sizeIndex)
  }
}

// Product CRUD
const openNewProductDialog = async () => {
  editMode.value = false
  editedProduct.value = {
    name: '',
    description: '',
    category: '',
    variants: [{ variantName: 'Default', sizes: [{ size: 'M', price: 0, stock: 0 }] }]
  }
  // ensure we have categories from API for suggestions
  await fetchCategories()
  updateCategorySuggestions()
  productDialog.value = true
}

const editProduct = async (product: Product) => {
  editMode.value = true

  // Fetch latest product details from backend to ensure category, sizes and images are present
  try {
    await productStore.getProductById(product.id)
  } catch (err) {
    // fallback to provided product if fetch fails
    console.warn('Failed to fetch latest product details, using provided list item', err)
  }

  const fullProduct = productStore.product ?? product

  editedProduct.value = {
    id: fullProduct.id,
    name: fullProduct.name,
    description: fullProduct.description,
    // Use categoryName returned by backend, fallback to legacy category field
    category: (fullProduct as any).categoryName ?? (fullProduct as any).category ?? '',
    variants:
      fullProduct.optionsWithVariants && fullProduct.optionsWithVariants.length > 0
        ? fullProduct.optionsWithVariants.map((option) => ({
            variantName: option.optionName || 'Default',
            sizes: option.variants.map((v) => ({
              sizeId: v.sizeId,
              size: v.size || 'Mặc định',
              price: v.price,
              stock: v.stock
            })),
            productOptionId: option.optionId
          }))
        : [{ variantName: 'Default', sizes: [{ size: 'M', price: 0, stock: 0 }] }]
  }

  // prepare variant-level size suggestions (fetch sizes for variants that have categoryId)
  editedProduct.value.variants.forEach((v, i) => {
    // try to use variant.categoryId -> fetch sizes for its category if known
    const categoryId = v.categoryId ?? null
    if (categoryId) {
      fetchSizesForCategory(categoryId, i)
    } else {
      sizeSuggestionsByIndex.value = { ...sizeSuggestionsByIndex.value, [i]: [] }
    }
  })

  // fetch categories list
  await fetchCategories()

  // If backend returned only categoryId (no categoryName), map it to the category name we fetched
  if (!editedProduct.value.category && (fullProduct as any).categoryId) {
    const cat = categories.value.find((c) => c.id === (fullProduct as any).categoryId)
    if (cat) editedProduct.value.category = cat.name
  }

  // Ensure each variant has categoryName when backend provided only categoryId
  editedProduct.value.variants.forEach((v) => {
    if (!v.categoryName && v.categoryId) {
      const cat = categories.value.find((c) => c.id === v.categoryId)
      if (cat) v.categoryName = cat.name
    }
  })

  console.log('Editing product with variants:', editedProduct.value.variants)
  productDialog.value = true
}

const saveProduct = async () => {
  try {
    // Validate variants
    const hasValidVariants = editedProduct.value.variants.every(
      (v) =>
        v.variantName.trim() !== '' &&
        v.sizes.every((s) => s.size.trim() !== '' && s.price > 0 && s.stock >= 0)
    )

    if (!hasValidVariants) {
      toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Vui lòng điền đầy đủ thông tin loại, kích cỡ, giá và số lượng',
        life: 3000
      })
      return
    }

    // IMPORTANT: Don't include imageUrls when updating - this prevents images from being deleted
    // Prefer sending category id if the selected category matches a known category name
    const matchedCategory = categories.value.find((c) => c.name === editedProduct.value.category)
    const categoryToSend = matchedCategory ? matchedCategory.id : editedProduct.value.category
    const productData = {
      name: editedProduct.value.name,
      description: editedProduct.value.description,
      // Send category name or id (backend accepts id or name; if it's a name it will create/find)
      categoryId: categoryToSend,
      // Backend expects a flat list of variant entries (one per size). Convert
      // the grouped frontend model into the backend DTO shape ProductVariantRequest:
      // { sizeId, size, price, stock, productOptionId, productOptionName }
      variants: editedProduct.value.variants.flatMap((v: any) =>
        (v.sizes || []).map((s: any) => ({
          sizeId: s.sizeId ?? undefined,
          size: s.size,
          price: s.price,
          stock: s.stock,
          // Map the variant group name to productOptionName so the server can
          // link this size to the option (if any). Leave undefined for Default.
          productOptionName:
            v.variantName && v.variantName !== 'Default' ? v.variantName : undefined,
          productOptionId: (v as any).productOptionId ?? undefined
        }))
      ),
      // Also send productOptions derived from variant groups so the backend
      // can create or update ProductOption entities (e.g., "DRESS"). We
      // include size names for convenience so the server can attach sizes.
      productOptions: (() => {
        const groups = editedProduct.value.variants || []
        const names = Array.from(
          new Set(
            groups
              .map((g: any) => g.variantName || 'Default')
              .filter((n: string) => n && n !== 'Default')
          )
        )
        return names.map((name: string) => ({
          name,
          // collect all distinct size names under this option
          sizes: Array.from(
            new Set(
              groups
                .filter((g: any) => g.variantName === name)
                .flatMap((g: any) => (g.sizes || []).map((s: any) => s.size).filter(Boolean))
            )
          )
        }))
      })()
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
  const imageToRemove = currentProduct.value.images?.find(
    (img) => img.imageUrl === imageToDelete.value
  )

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
  updateCategorySuggestions()
  await fetchCategories()
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
