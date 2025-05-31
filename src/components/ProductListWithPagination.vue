<script setup>
<<<<<<< HEAD
  import { ref, computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import ProductCard from '@/components/ProductCard.vue'

  const products = ref([])
  for (let i = 1; i <= 60; i++) {
    products.value.push({
      id: i,
      name: `商品 ${i}`,
      image: `/img/p${(i % 5) + 1}.jpg`,
      price: 100 + i * 5,
    })
  }

  const currentPage = ref(1)
  const itemsPerPage = 20

  const totalPages = computed(() =>
    Math.ceil(products.value.length / itemsPerPage)
  )

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return products.value.slice(start, start + itemsPerPage)
  })

  const productSection = ref(null)

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      if (productSection.value) {
        productSection.value.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }
=======
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'

import ProductCard from '@/components/ProductCard.vue'
import ProductCategoryFilter from '@/components/ProductCategoryFilter.vue'
import ProductSearchBar from '@/components/ProductSearchBar.vue'
import { useProductList } from '@/composables/useProductList'

const {
  rawKeyword,             // 綁定輸入框（debounce 使用者輸入）
  activeCategory,
  currentPage,
  totalPages,
  paginatedProducts,
  categories
} = useProductList()

const allCategories = ['全部', ...categories]
const productSection = ref(null)

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    productSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleCategoryClick(c) {
  activeCategory.value = c
  currentPage.value = 1
}
>>>>>>> 5963fe1 (feat: add ProductSearchBar component with input trigger and category filter)
</script>

<template>
  <div class="p-6 max-w-screen-xl mx-auto">
    <!-- 分類 -->
    <ProductCategoryFilter
      :categories="allCategories"
      :activeCategory="activeCategory"
      @update:category="handleCategoryClick"
    />

    <!-- 搜尋 -->
    <ProductSearchBar
      :keyword="rawKeyword"
      @update:keyword="val => rawKeyword = val"
    />

    <!-- 商品列表 -->
    <div ref="productSection" class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <RouterLink
        v-for="item in paginatedProducts"
        :key="item.id"
        :to="`/products/${item.id}`"
        class="block"
      >
        <ProductCard :product="item" />
      </RouterLink>
    </div>

    <!-- 查無商品 -->
    <div v-if="paginatedProducts.length === 0" class="text-center text-gray-400 py-10">
      <i class="pi pi-info-circle text-xl mb-2"></i>
      <p>查無符合的商品</p>
    </div>

    <!-- 分頁按鈕 -->
    <div class="flex justify-center items-center gap-4 py-6">
      <Button
        label="上一頁"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
        class="px-4 py-2"
      />
      <span>第 {{ currentPage }} / {{ totalPages }} 頁</span>
      <Button
        label="下一頁"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-4 py-2"
      />
    </div>
  </div>
</template>
