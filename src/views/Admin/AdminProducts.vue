<script setup>
  import { ref } from 'vue'
  import CommonTable from '@/components/CommonTable.vue'
  import { fetchAllProducts } from '@/api/product'
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import BaseLoader from '@/components/BaseLoader.vue'
  import Toast from 'primevue/toast'
  import Image from 'primevue/image'
  const router = useRouter()
  const isloading = ref(true)
  const hasLoadedOnce = ref(false)

  const productTabs = ref([
    { title: '全部', value: 'all' },
    { title: '上架中', value: 'active' },
    { title: '草稿', value: 'draft' },
    { title: '典藏', value: 'archived' },
  ])
  const productColumns = ref([
    { field: 'coverImage', header: '', style: 'width: 25%', sortable: false },
    { field: 'name', header: '商品', style: 'width: 25%', sortable: false },
    {
      field: 'status',
      header: '狀態',
      style: 'width: 25%',
      sortable: false,
      format: (val) =>
        ({
          active: '上架中',
          draft: '草稿',
          archived: '典藏',
        })[val] || '未知',
    },
    {
      field: 'stockOnHand',
      header: '庫存數量',
      style: 'width: 25%',
      sortable: true,
    },
  ])

  const loadProducts = async (status = 'all', page = 1) => {
    isloading.value = true
    try {
      const res = await fetchAllProducts(status, page, pagination.value.limit)
      productValue.value = res.data || []
      pagination.value = res.pagination || {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        limit: 20,
        hasNextPage: false,
        hasPreviousPage: false,
      }
      currentStatus.value = status
    } catch {
      productValue.value = []
    } finally {
      isloading.value = false
    }
  }

  const handleTabChange = async (tab) => {
    currentStatus.value = tab.value
    await loadProducts(tab.value, 1)
  }

  const productValue = ref([])
  const pagination = ref({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    limit: 20,
    hasNextPage: false,
    hasPreviousPage: false,
  })
  const currentStatus = ref('all')

  const goCreateProduct = () => {
    router.push({ name: 'createProduct' })
  }

  const goEditProduct = (id) => {
    router.push({ name: 'editProduct', params: { id } })
  }

  const handlePageChange = async (page) => {
    await loadProducts(currentStatus.value, page)
  }

  const handleSort = (event) => {
    const { sortField, sortOrder } = event
    if (sortField && sortOrder) {
      productValue.value.sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]

        // 處理數字類型
        if (sortField === 'stockOnHand') {
          aVal = Number(aVal) || 0
          bVal = Number(bVal) || 0
        }

        if (sortOrder === 1) {
          // 升序
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        } else {
          // 降序
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
        }
      })
    }
  }

  onMounted(async () => {
    await loadProducts()
    hasLoadedOnce.value = true
  })
</script>

<template>
  <Toast />
  <BaseLoader :isLoading="isloading" :hasLoadedOnce="hasLoadedOnce">
    <div v-if="!isloading">
      <div class="flex justify-between items-center mr-8 mb-4">
        <h2 class="text-2xl">商品</h2>
        <div class="card flex justify-center">
          <button
            class="text-md text-white px-3 py-2 border-surface-200 rounded-md bg-primary cursor-pointer"
            @click="goCreateProduct"
          >
            新增商品
          </button>
        </div>
      </div>
      <div class="mr-8">
        <CommonTable
          :tabs="productTabs"
          :columns="productColumns"
          :value="productValue"
          :pagination="pagination"
          :active-tab="currentStatus"
          @tab-change="handleTabChange"
          @page-change="handlePageChange"
          @sort="handleSort"
          scrollable
          selectable
          scroll-height="500px"
        >
          <template #body-coverImage="{ data }">
            <Image
              v-if="data.coverImage"
              :src="data.coverImage"
              alt="Product Cover Image"
              imageClass="w-32 h-32 object-cover rounded mx-auto"
              loading="lazy"
            />
          </template>
          <template #body-name="{ data }">
            <a
              class="w-full underline text-primary cursor-pointer"
              @click="goEditProduct(data.id)"
            >
              {{ data.name }}
            </a>
          </template>
        </CommonTable>
      </div>
    </div>
  </BaseLoader>
</template>
