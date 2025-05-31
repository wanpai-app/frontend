<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import Button from 'primevue/button'


const products = ref([])
const categories = ['模型', '週邊', '限量']
for (let i = 1; i <= 60; i++) {
  const category = categories[(i - 1) % categories.length]
  products.value.push({
    id: i,
    name: `商品 ${i}`,
    image:'',
    price: 100 + i * 5,
    category
  })
}


const allCategories = ['全部', ...categories]
const activeCategory = ref('全部')


const currentPage = ref(1)
const itemsPerPage = 20

const filteredProducts = computed(() => {
  if (activeCategory.value === '全部') return products.value
  return products.value.filter(p => p.category === activeCategory.value)
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProducts.value.length / itemsPerPage))
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

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
</script>

<template>    
  <div class="p-6 max-w-screen-xl mx-auto">
    
    <div class="flex flex-wrap gap-2 justify-center mb-6">
      <Button
        v-for="c in allCategories"
        :key="c"
        :label="c"
        :outlined="activeCategory !== c"
        :severity="activeCategory === c ? 'primary' : undefined"
        @click="handleCategoryClick(c)"
        class="rounded-full text-sm px-4 py-2"
      />
    </div>

    
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

    
    <div v-if="paginatedProducts.length === 0" class="text-center text-gray-400 py-10">
      查無資料
    </div>

    
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
