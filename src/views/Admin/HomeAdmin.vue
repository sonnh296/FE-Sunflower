<template>
  <div class="bg-white w-full px-5 p-4">
    <h1 class="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

    <div class="flex justify-end mb-4">
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
    >
      <!-- <Column field="id" header="ID" sortable></Column> -->
      <Column field="name" header="Tên sản phẩm" sortable>
        <template #body="slotProps">
          <div class="flex items-center">
            {{ slotProps.data.name }}
          </div>
        </template>
      </Column>
      <Column field="description" header="Mô tả" sortable>
        <template #body="slotProps">
          <div class="flex items-center">
            {{ slotProps.data.description }}
          </div>
        </template>
      </Column>
      <Column header="Thao tác">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              class="p-button-sm p-button-warning"
              @click="navigateToProduct(slotProps.data.id)"
            />
            <Button icon="pi pi-trash" class="p-button-sm p-button-danger" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog v-model:visible="productDialog" header="Chỉnh sửa sản phẩm" :modal="true" class="p-fluid">
    <div class="formgrid grid">
      <div class="flex justify-between m-1">
        <label for="color" class="min-w-10">Tên sản phẩm</label>
        <InputText id="color" v-model="editedProduct.name" required />
      </div>

      <div class="flex justify-between m-1">
        <label for="size" class="min-w-10">Mô tả</label>
        <InputText id="size" v-model="editedProduct.description" required />
      </div>
    </div>

    <template #footer>
      <Button label="Hủy" icon="pi pi-times" class="p-button-text" @click="productDialog = false" />
      <Button label="Lưu" icon="pi pi-check" class="p-button-success" @click="saveEditedProduct" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/productStore'
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
const productStore = useProductStore()
const router = useRouter()
const productDialog = ref(false)
const editedProduct = ref({
  id: '',
  name: '',
  description: ''
})
const openNewProductDialog = () => {
  productDialog.value = true
}

onMounted(async () => {
  await productStore.getProducts()
})

const saveEditedProduct = async () => {
  if (editedProduct.value.id) {
    await productStore.updateProduct({
      id: editedProduct.value.id,
      name: editedProduct.value.name,
      description: editedProduct.value.description
    })
  } else {
    await productStore.createProduct({
      name: editedProduct.value.name,
      description: editedProduct.value.description
    })
    productStore.products.push({
      id: editedProduct.value.id,
      name: editedProduct.value.name,
      description: editedProduct.value.description
    })
  }
  productDialog.value = false
  editedProduct.value = {
    id: '',
    name: '',
    description: ''
  }
}

const navigateToProduct = (id: string) => {
  console.log('id', id)
  router.push({ name: 'admin-products', params: { id } })
}
</script>
