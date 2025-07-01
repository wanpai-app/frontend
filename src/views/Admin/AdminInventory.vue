<script setup>
  import CommonTable from '@/components/CommonTable.vue'
  import Image from 'primevue/image'
  import { fetchAllProducts } from '@/api/product'
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import BaseLoader from '@/components/BaseLoader.vue'
  import { ref } from 'vue'
  const router = useRouter()
  const isloading = ref(true)
  const hasLoadedOnce = ref(false)
  const inventoryTabs = ref([
    { title: '全部', value: 'all' },
    { title: '上架中', value: 'active' },
    { title: '草稿', value: 'draft' },
    { title: '典藏', value: 'archived' },
  ])
  const inventoryColumns = ref([
    { field: 'coverImage', header: '', style: 'width: 20%', sortable: false },
    { field: 'name', header: '商品', style: 'width: 20%', sortable: true },
    {
      field: 'status',
      header: '狀態',
      style: 'width: 20%',
      sortable: true,
      format: (val) =>
        ({
          active: '上架中',
          draft: '草稿',
          archived: '典藏',
        })[val] || '未知',
    },
    {
      field: 'stockReserved',
      header: '預留數量',
      style: 'width: 20%',
      sortable: true,
    },
    {
      field: 'stockOnHand',
      header: '現有庫存',
      style: 'width: 20%',
      sortable: true,
    },
  ])
  const productValue = ref([])
  const pagination = ref({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    limit: 20,
    hasNextPage: false,
    hasPreviousPage: false
  })
  const currentStatus = ref('all')

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
        hasPreviousPage: false
      }
      currentStatus.value = status
    } catch {
      productValue.value = []
    } finally {
      isloading.value = false
    }
  }

  const handleTabChange = async (tab) => {
    await loadProducts(tab.value, 1)
  }

  const goStockLog = (id) => {
    router.push({ name: 'stockLog', params: { id } })
  }

  const handlePageChange = async (page) => {
    await loadProducts(currentStatus.value, page)
  }

  onMounted(async () => {
    await loadProducts()
    hasLoadedOnce.value = true
  })
</script>

<template>
  <BaseLoader :isLoading="isloading" :hasLoadedOnce="hasLoadedOnce">
    <div v-if="!isloading">
      <div class="flex justify-between items-center mr-8 mb-4">
        <h2 class="text-2xl">庫存</h2>
      </div>
      <CommonTable
        :tabs="inventoryTabs"
        :columns="inventoryColumns"
        :value="productValue"
        :pagination="pagination"
        @tab-change="handleTabChange"
        @page-change="handlePageChange"
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
            @click="goStockLog(data.id)"
          >
            {{ data.name }}
          </a>
        </template>
      </CommonTable>
    </div>
  </BaseLoader>
</template>
