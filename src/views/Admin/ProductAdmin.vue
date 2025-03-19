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
      :value="productItemStore.productItems"
      :paginator="true"
      :rows="10"
      :loading="productItemStore.loading"
      stripedRows
      v-model:selection="selectedProducts"
      dataKey="id"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="id" header="ID" sortable></Column>
      <Column header="Hình ảnh">
        <template #body="slotProps">
          <img
            :src="slotProps.data.url"
            :alt="slotProps.data.color"
            class="w-20 h-20 object-cover rounded"
          />
        </template>
      </Column>
      <Column field="gender" header="Giới tính" sortable></Column>
      <Column field="color" header="Màu sắc" sortable></Column>
      <Column field="size" header="Kích thước" sortable></Column>
      <Column field="price" header="Giá" sortable>
        <template #body="slotProps"> {{ slotProps.data.price }}đ </template>
      </Column>
      <Column field="stockQuantity" header="Tồn kho" sortable></Column>
      <Column header="Thao tác">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              class="p-button-sm p-button-warning"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-sm p-button-danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="deleteProductDialog" header="Xác nhận" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Bạn có chắc chắn muốn xóa sản phẩm này?</span>
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

    <Dialog v-model:visible="productDialog" header="Sản phẩm" :modal="true" class="p-fluid">
      <div class="formgrid grid">
        <div class="flex justify-between m-1">
          <label for="image" class="min-w-10">Hình ảnh</label>
          <FileUpload
            mode="basic"
            name="demo[]"
            accept="image/png, image/jpeg"
            :maxFileSize="1000000"
            @select="handleUpload"
          />
        </div>
        <div class="flex justify-between m-1">
          <label for="price" class="min-w-10">Giá</label>
          <InputNumber
            id="price"
            v-model="editedProduct.price"
            mode="currency"
            currency="VND"
            locale="vi-VN"
          />
        </div>

        <div class="flex justify-between m-1">
          <label for="gender" class="min-w-10">Giới tính</label>
          <Dropdown
            id="gender"
            v-model="editedProduct.gender"
            :options="['Nam', 'Nữ', 'Unisex']"
            placeholder="Chọn giới tính"
          />
        </div>

        <div class="flex justify-between m-1">
          <label for="color" class="min-w-10">Màu sắc</label>
          <InputText id="color" v-model="editedProduct.color" required />
        </div>

        <div class="flex justify-between m-1">
          <label for="size" class="min-w-10">Kích thước</label>
          <InputText id="size" v-model="editedProduct.size" required />
        </div>

        <div class="flex justify-between m-1">
          <label for="quantity" class="min-w-10">Số lượng tồn kho</label>
          <InputNumber id="quantity" v-model="editedProduct.stockQuantity" />
        </div>
      </div>

      <template #footer>
        <Button label="Hủy" icon="pi pi-times" class="p-button-text" @click="editMode = false" />
        <Button
          label="Lưu"
          icon="pi pi-check"
          class="p-button-success"
          @click="saveEditedProduct"
        />
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
import { useProductItemStore } from '@/stores/productItemStore'
import { useToast } from 'primevue/usetoast'
import type { ProductItem } from '@/types/Product'
import { useRoute } from 'vue-router'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'
import { uploadImageApi } from '@/api/cloudinaryApi'

const toast = useToast()
const productItemStore = useProductItemStore()
const productDialog = ref(false)
const deleteProductDialog = ref(false)
const editMode = ref(false)
const selectedProducts = ref()
const productToDelete = ref<ProductItem | null>(null)
const route = useRoute()

const editedProduct = ref<ProductItem>({
  id: '',
  price: 0,
  gender: '',
  color: '',
  size: '',
  stockQuantity: 0,
  url: '',
  active: true,
  category: ''
})

const openNewProductDialog = () => {
  editMode.value = false
  productDialog.value = true
}

const editProduct = (product: ProductItem) => {
  editMode.value = true
  productDialog.value = true
  productItemStore.getProductItemById(product.id as string)
  productItemStore.productItem = product
  editedProduct.value = product
}

const confirmDeleteProduct = (product: ProductItem) => {
  productToDelete.value = product
  deleteProductDialog.value = true
}

const deleteProduct = async () => {
  if (productToDelete.value) {
    try {
      // Call API to delete product
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã xóa sản phẩm',
        life: 3000
      })
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể xóa sản phẩm',
        life: 3000
      })
    }
  }
  deleteProductDialog.value = false
  productToDelete.value = null
}

const saveEditedProduct = async () => {
  if (editedProduct.value.id) {
    await productItemStore.updateProductItem({
      id: editedProduct.value.id,
      price: editedProduct.value.price,
      gender: editedProduct.value.gender,
      size: editedProduct.value.size,
      color: editedProduct.value.color,
      stockQuantity: editedProduct.value.stockQuantity,
      isActive: editedProduct.value.active,
      url: editedProduct.value.url,
      category: editedProduct.value.category
    })
  } else {
    await productItemStore.createProductItem({
      price: editedProduct.value.price,
      category: editedProduct.value.category,
      productId: route.params.id as string,

      gender: editedProduct.value.gender,
      size: editedProduct.value.size,
      color: editedProduct.value.color,
      stockQuantity: editedProduct.value.stockQuantity,
      url: editedProduct.value.url
    })
    productItemStore.productItems.push(editedProduct.value)
  }
  productDialog.value = false
  editedProduct.value = {
    id: '',
    price: 0,
    gender: '',
    color: '',
    size: '',
    stockQuantity: 0,
    url: '',
    active: true,
    category: ''
  }
}

onMounted(async () => {
  await productItemStore.getProductItems(route.params.id as string)
})

const handleUpload = async (event: any) => {
  const response = await uploadImageApi({ image: event.files[0] })
  editedProduct.value.url = response.data.url
}
</script>
