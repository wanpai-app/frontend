import { ref, computed, watch } from 'vue'

// debounce 函式
function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function useProductList() {
  const products = ref([])
  const categories = ['模型', '週邊', '限量']
  const activeCategory = ref('全部')
  const currentPage = ref(1)
  const itemsPerPage = 20

  // 👉 原始輸入值 + debounce 處理值
  const rawKeyword = ref('')
  const keyword = ref('')

  const updateKeyword = debounce((val) => {
    keyword.value = val
    currentPage.value = 1
  }, 300)

  watch(rawKeyword, (val) => {
    updateKeyword(val)
  })

  for (let i = 1; i <= 60; i++) {
    const category = categories[(i - 1) % categories.length]
    products.value.push({
      id: i,
      name: `商品 ${i}`,
      image: `/img/p${(i % 5) + 1}.jpg`,
      price: 100 + i * 5,
      category
    })
  }

  const filteredProducts = computed(() => {
    let result = products.value
    if (activeCategory.value !== '全部') {
      result = result.filter(p => p.category === activeCategory.value)
    }
    if (keyword.value.trim().length >= 2) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(keyword.value.toLowerCase())
      )
    }
    return result
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredProducts.value.length / itemsPerPage))
  )

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProducts.value.slice(start, start + itemsPerPage)
  })

  return {
    rawKeyword,
    activeCategory,
    currentPage,
    categories,
    totalPages,
    paginatedProducts
  }
}
