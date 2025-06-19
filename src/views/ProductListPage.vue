<script setup>
  import ProductCategoryFilter from '@/components/ProductCategoryFilter.vue'
  import ProductCard from '@/components/ProductCard.vue'
  import ProductPagination from '@/components/ProductPagination.vue'
  import { useProductList } from '@/composables/useProductList.js'

  import { RouterLink } from 'vue-router'

  const {
    activeCategory,
    allCategories,
    paginatedProducts,
    currentPage,
    totalPages,
    goToPage,
    pageInput,
    pageButtons,
    productSection,
  } = useProductList()
</script>

<template>
  <div class="px-2 sm:px-4 md:px-6 lg:px-8 py-6 max-w-[1200px] mx-auto">
    <ProductCategoryFilter
      :categories="allCategories"
      v-model:activeCategory="activeCategory"
    />

    <div
      ref="productSection"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      <RouterLink
        v-for="item in paginatedProducts"
        :key="item.id"
        :to="`/products/${item.id}`"
        class="block"
      >
        <ProductCard :product="item" />
      </RouterLink>
    </div>

    <div
      v-if="paginatedProducts.length === 0"
      class="text-center text-gray-400 py-10"
    >
      <i class="pi pi-info-circle text-xl mb-2"></i>
      <p>查無符合的商品</p>
    </div>

    <ProductPagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :pageButtons="pageButtons"
      v-model:pageInput="pageInput"
      @goToPage="goToPage"
    />
  </div>
</template>
