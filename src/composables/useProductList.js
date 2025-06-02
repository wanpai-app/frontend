import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useProductList() {
  const route = useRoute()
  const router = useRouter()

  const categories = ['模型', '週邊', '限量']
  const allCategories = ['全部', ...categories]
  const itemsPerPage = 20

  // ✅ 狀態來自 URL
  const activeCategory = computed({
    get: () => route.query.category || '全部',
    set: (val) => {
      router.push({ query: { ...route.query, category: val, page: 1 } })
    },
  })

  const keyword = computed(() => route.query.keyword || '')

  const currentPage = computed({
    get: () => parseInt(route.query.page, 10) || 1,
    set: (val) => {
      router.push({ query: { ...route.query, page: val } })
    },
  })

  // ✅ 搜尋欄位輸入的暫存值
  const inputKeyword = ref(route.query.keyword || '')

  // ✅ 關鍵補強：當 URL keyword 改變時同步到輸入欄
  watch(
    () => route.query.keyword,
    (val) => {
      inputKeyword.value = val || ''
    }
  )

  // ✅ 點搜尋按鈕 → 更新 URL query（觸發篩選）
  function submitSearch() {
    router.push({
      query: {
        ...route.query,
        keyword: inputKeyword.value,
        page: 1,
      },
    })
  }

  // ✅ 假資料初始化
  const products = ref([])
  for (let i = 1; i <= 60; i++) {
    const category = categories[(i - 1) % categories.length]
    products.value.push({
      id: i,
      name: `商品 ${i}`,
      image: `/img/p${(i % 5) + 1}.jpg`,
      price: 100 + i * 5,
      category,
    })
  }

  const filteredProducts = computed(() => {
    let result = products.value
    if (activeCategory.value !== '全部') {
      result = result.filter((p) => p.category === activeCategory.value)
    }
    if (keyword.value.trim().length >= 2) {
      result = result.filter((p) =>
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

  const productSection = ref(null)

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      productSection.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  function handleCategoryClick(category) {
    activeCategory.value = category
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
    inputKeyword,
    keyword,
    submitSearch,
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
    productSection,
  }
}
