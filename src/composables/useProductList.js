import { ref, computed, watch, onMounted } from 'vue'
import axios from '@/utils/axiosInstance'
import { useRoute, useRouter } from 'vue-router'
import { fetchFilterData } from '@/api/product'

const productCache = new Map()
const CACHE_DURATION = 5 * 60 * 1000

function getCacheKey(type, param = '') {
  return `${type}:${param}`
}

function isCacheValid(timestamp) {
  return Date.now() - timestamp < CACHE_DURATION
}

export function useProductList() {
  const route = useRoute()
  const router = useRouter()

  const keyword = computed(() => route.query.keyword || '')
  const isSearching = computed(() => keyword.value.trim().length > 0)

  const categories = ref([])
  const allCategories = computed(() => ['全部', ...categories.value])

  const itemsPerPage = 20
  const isLoading = ref(false)
  const hasLoadedOnce = ref(false)

  const products = ref([])
  const randomProducts = ref([])
  const productSection = ref(null)

  const currentPage = computed({
    get: () => parseInt(route.query.page, 10) || 1,
    set: (val) => {
      router.push({ query: { ...route.query, page: val } })
    },
  })

  const activeCategory = computed({
    get: () =>
      route.query.category === undefined ? '全部' : route.query.category,
    set: (val) => {
      router.push({
        path: '/products',
        query: {
          ...route.query,
          keyword: '',
          ipTag: '',
          category: val,
          page: 1,
        },
      })
    },
  })

  const activeIpTag = computed({
    get: () => route.query.ipTag || '',
    set: (val) => {
      router.push({
        path: '/products',
        query: {
          ...route.query,
          keyword: '',
          category: '',
          ipTag: val,
          page: 1,
        },
      })
    },
  })

  const loadRandomProducts = async () => {
    const cacheKey = getCacheKey('random', '8')
    const cached = productCache.get(cacheKey)

    if (cached && isCacheValid(cached.timestamp)) {
      randomProducts.value = cached.data
      return
    }

    try {
      const res = await axios.get('/products/random?limit=8')
      randomProducts.value = res.data
      productCache.set(cacheKey, {
        data: res.data,
        timestamp: Date.now(),
      })
    } catch {
      randomProducts.value = []
    }
  }

  const loadFilterData = async () => {
    const cacheKey = getCacheKey('filterData')
    const cached = productCache.get(cacheKey)

    if (cached && isCacheValid(cached.timestamp)) {
      categories.value = cached.data
      return
    }

    try {
      const { series } = await fetchFilterData()
      const categoryData = Array.isArray(series)
        ? series.map((item) => item.tagname)
        : []
      categories.value = categoryData
      productCache.set(cacheKey, {
        data: categoryData,
        timestamp: Date.now(),
      })
    } catch {
      categories.value = []
    }
  }

  const fetchAllProducts = async () => {
    const res = await axios.get('/products')
    return res.data || []
  }

  const loadProductsByCategory = async (category) => {
    const cacheKey = getCacheKey('category', category)
    const cached = productCache.get(cacheKey)

    if (cached && isCacheValid(cached.timestamp)) {
      products.value = cached.data
      hasLoadedOnce.value = true
      return
    }

    products.value = []
    isLoading.value = true

    try {
      let productData = []
      if (category === '全部') {
        const res = await axios.get('/products')
        productData = res.data
      } else {
        const res = await axios.get('/tags/filterByTagnames', {
          params: { tagname: category },
        })
        productData = res.data.products || []
      }

      products.value = productData
      productCache.set(cacheKey, {
        data: productData,
        timestamp: Date.now(),
      })
    } catch {
      products.value = []
    } finally {
      isLoading.value = false
      hasLoadedOnce.value = true
    }
  }

  const loadProductsByIpTag = async (ipTag) => {
    const cacheKey = getCacheKey('ipTag', ipTag)
    const cached = productCache.get(cacheKey)

    if (cached && isCacheValid(cached.timestamp)) {
      products.value = cached.data
      hasLoadedOnce.value = true
      return
    }

    products.value = []
    isLoading.value = true

    try {
      let productData = []
      if (ipTag) {
        const res = await axios.get('/tags/filterByTagnames', {
          params: { tagname: ipTag },
        })
        productData = res.data.products || []
      } else {
        const res = await axios.get('/products')
        productData = res.data
      }

      products.value = productData
      productCache.set(cacheKey, {
        data: productData,
        timestamp: Date.now(),
      })
    } catch {
      products.value = []
    } finally {
      isLoading.value = false
      hasLoadedOnce.value = true
    }
  }

  const loadProducts = async () => {
    if (isSearching.value) {
      const cacheKey = getCacheKey('allProducts')
      const cached = productCache.get(cacheKey)

      if (cached && isCacheValid(cached.timestamp)) {
        products.value = cached.data
        return
      }

      isLoading.value = true
      try {
        const productData = await fetchAllProducts()
        products.value = productData
        productCache.set(cacheKey, {
          data: productData,
          timestamp: Date.now(),
        })
      } catch {
        products.value = []
      } finally {
        isLoading.value = false
      }
    } else if (activeIpTag.value) {
      await loadProductsByIpTag(activeIpTag.value)
    } else if (activeCategory.value && activeCategory.value !== '全部') {
      await loadProductsByCategory(activeCategory.value)
    } else {
      await loadProductsByCategory('全部')
    }
  }

  watch(
    () => [route.query.keyword, route.query.category, route.query.ipTag],
    async () => {
      await loadProducts()
      if (isSearching.value) await loadRandomProducts()
    },
    { immediate: true }
  )

  onMounted(() => {
    loadFilterData()
  })

  const filteredProducts = computed(() => {
    let result = products.value
    if (isSearching.value) {
      const kw = keyword.value.trim().toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(kw))
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

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      productSection.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const pageInput = ref('')
  const pageButtons = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const buttons = []

    if (total <= 5) {
      for (let i = 1; i <= total; i++) buttons.push(i)
    } else {
      if (current <= 3) buttons.push(1, 2, 3, 4, '...', total)
      else if (current >= total - 2)
        buttons.push(1, '...', total - 3, total - 2, total - 1, total)
      else
        buttons.push(1, '...', current - 1, current, current + 1, '...', total)
    }

    return buttons
  })

  const clearCache = () => {
    productCache.clear()
  }

  return {
    keyword,
    isSearching,
    activeCategory,
    activeIpTag,
    allCategories,
    products,
    filteredProducts,
    paginatedProducts,
    currentPage,
    totalPages,
    goToPage,
    pageInput,
    pageButtons,
    productSection,
    isLoading,
    hasLoadedOnce,
    randomProducts,
    loadRandomProducts,
    clearCache,
  }
}
