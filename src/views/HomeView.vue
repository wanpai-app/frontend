<script setup>
  import BannerCarousel from '@/components/BannerCarousel.vue'
  import PaginatedProductList from '@/components/PaginatedProductList.vue'
  import Toast from 'primevue/toast'
</script>

<template>
  <Toast />
  <div>
    <BannerCarousel />
    <PaginatedProductList />
  </div>
</template>
