<template>
  <div
    class="bg-white w-full px-5 h-60 md:h-20 mb-10 p-2 flex items-end flex-col md:flex-row gap-4"
  >
    <p>admin</p>
  </div>
</template>

<script setup lang="ts">
import { useStatisticAdminStore } from '@/stores/adminStatisticStore'

const statisticAdminStore = useStatisticAdminStore()
</script>
