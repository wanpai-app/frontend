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

  const rawKeyword = ref('')
  const keyword = ref('')

  const updateKeyword = debounce((val) => {
    keyword.value = val
    currentPage.value = 1
  }, 300)

  watch(rawKeyword, (val) => {
    updateKeyword(val)
  })

  // 假資料初始化
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

  const allCategories = ['全部', ...categories]
  const productSection = ref(null)

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      productSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function handleCategoryClick(category) {
    activeCategory.value = category
    currentPage.value = 1
  }

  const pageInput = ref('')
  function jumpToPage() {
    const page = parseInt(pageInput.value, 10)
    if (!isNaN(page)) {
      goToPage(page)
      pageInput.value = ''
    }
  }

  const pageButtons = computed(() => {
    const pages = []
    const start = Math.max(1, currentPage.value - 2)
    const end = Math.min(totalPages.value, currentPage.value + 2)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  })

  return {
    rawKeyword,
    keyword,
    updateKeyword,
    activeCategory,
    allCategories,
    products,
    filteredProducts,
    paginatedProducts,
    currentPage,
    totalPages,
    goToPage,
    handleCategoryClick,
    pageInput,
    jumpToPage,
    pageButtons,
    productSection
  }
}
