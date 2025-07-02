<script setup>
  import { ref, onMounted, watch } from 'vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Select from 'primevue/select'
  import DatePicker from 'primevue/datepicker'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'
  import { fetchStockLogsByProduct, fetchAllStockLogs } from '@/api/stockLog'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const productId = ref(Number(route.params.id) || null)
  const product = ref({})
  const stockLogs = ref([])
  const loading = ref(false)

  const filters = ref({
    productId: productId.value || '',
    reason: '',
    startDate: null,
    endDate: null,
  })

  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const reasonOptions = ref([
    { label: '全部', value: '' },
    { label: '初始建檔', value: 'initial' },
    { label: '進貨', value: 'stock_in' },
    { label: '出貨', value: 'stock_out' },
    { label: '盤點調整', value: 'adjustment' },
    { label: '退貨', value: 'return' },
    { label: '修正', value: 'correction' },
  ])

  const goEditProduct = (id) => {
    router.push({ name: 'editProduct', params: { id } })
  }

  const loadStockLogs = async () => {
    loading.value = true
    try {
      if (productId.value) {
        const res = await fetchStockLogsByProduct(productId.value)
        stockLogs.value = res.stockLogs || []
        product.value = {
          name: res.product?.name || '',
          coverImage: res.coverImage?.imgUrl || '/no-image.png',
        }
      } else {
        const params = {
          page: pagination.value.page,
          limit: pagination.value.limit,
          ...filters.value,
        }

        if (params.startDate) {
          params.startDate = params.startDate.toISOString().split('T')[0]
        }
        if (params.endDate) {
          params.endDate = params.endDate.toISOString().split('T')[0]
        }

        Object.keys(params).forEach((key) => {
          if (
            params[key] === '' ||
            params[key] === null ||
            params[key] === undefined
          ) {
            delete params[key]
          }
        })

        const res = await fetchAllStockLogs(params)
        stockLogs.value = res.data || []
        pagination.value = { ...pagination.value, ...res.pagination }
      }
    } catch {
      stockLogs.value = []
    } finally {
      loading.value = false
    }
  }

  const onFilterChange = () => {
    pagination.value.page = 1
    loadStockLogs()
  }

  const onPageChange = (event) => {
    pagination.value.page = event.page + 1
    loadStockLogs()
  }

  const resetFilters = () => {
    filters.value = {
      productId: productId.value || '',
      reason: '',
      startDate: null,
      endDate: null,
    }
    pagination.value.page = 1
    loadStockLogs()
  }

  watch(() => filters.value, onFilterChange, { deep: true })

  onMounted(() => {
    loadStockLogs()
  })
</script>

<template>
  <div class="flex justify-center items-start min-h-screen bg-gray-100 py-10">
    <div class="w-full max-w-6xl bg-white rounded-2xl shadow-xl px-10 py-8">
      <h2
        class="text-3xl font-bold mb-6 pb-2 border-b border-gray-200 text-primary"
      >
        庫存異動紀錄
        <span v-if="productId" class="text-lg text-gray-600 ml-2 pb-2">
          (單一商品)
        </span>
      </h2>

      <div v-if="productId" class="text-gray-600 mb-4">
        <a
          @click="goEditProduct(productId)"
          class="font-semibold cursor-pointer hover:text-primary"
        >
          前往商品編輯頁
        </a>
      </div>
      <div v-if="productId" class="flex items-center gap-5 mb-8">
        <img
          :src="product.coverImage"
          alt="商品縮圖"
          class="w-20 h-20 object-cover rounded-lg border"
        />
        <span class="text-2xl font-bold text-gray-800">{{ product.name }}</span>
      </div>

      <div v-if="!productId" class="mb-6 p-4 bg-gray-50 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              商品ID
            </label>
            <InputText
              v-model="filters.productId"
              placeholder="輸入商品ID"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              修改原因
            </label>
            <Select
              v-model="filters.reason"
              :options="reasonOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="選擇原因"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              開始日期
            </label>
            <DatePicker
              v-model="filters.startDate"
              placeholder="選擇開始日期"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              結束日期
            </label>
            <DatePicker
              v-model="filters.endDate"
              placeholder="選擇結束日期"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex justify-end">
          <Button
            @click="resetFilters"
            label="重置篩選"
            severity="secondary"
            size="small"
          />
        </div>
      </div>

      <DataTable
        :value="stockLogs"
        :loading="loading"
        :paginator="!productId"
        :rows="pagination.limit"
        :totalRecords="pagination.total"
        :lazy="!productId"
        @page="onPageChange"
        :rowsPerPageOptions="[10, 20, 50]"
        class="rounded-lg border border-gray-200 overflow-hidden"
      >
        <Column
          v-if="!productId"
          field="productId"
          header="商品ID"
          class="text-center"
        />
        <Column header="修改前" class="text-center">
          <template #body="{ data }">
            {{ data.amountAfter - data.amountChange }}
          </template>
        </Column>
        <Column field="amountAfter" header="修改後" class="text-center" />
        <Column field="amountChange" header="變化" class="text-center">
          <template #body="{ data }">
            <span
              :class="
                data.amountChange > 0
                  ? 'text-green-600 font-bold'
                  : data.amountChange < 0
                    ? 'text-red-600 font-bold'
                    : ''
              "
            >
              {{ data.amountChange > 0 ? '+' : '' }}{{ data.amountChange }}
            </span>
          </template>
        </Column>
        <Column
          field="createdAt"
          header="修改日期"
          class="text-center"
          sortable
        >
          <template #body="{ data }">
            {{
              new Date(data.createdAt).toLocaleString('zh-TW', {
                timeZone: 'Asia/Taipei',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            }}
          </template>
        </Column>
        <Column field="reason" header="修改原因" class="text-center">
          <template #body="{ data }">
            {{
              reasonOptions.find((r) => r.value === data.reason)?.label ||
              data.reason
            }}
          </template>
        </Column>
        <Column field="email" header="修改人" class="text-center" />
      </DataTable>
    </div>
  </div>
</template>
