<script setup>
<<<<<<< HEAD
  import UserSidebar from '@/components/UserSideBar.vue'
  import { ref, computed, onMounted, watch } from 'vue'
  import { RouterLink } from 'vue-router'
  import Button from 'primevue/button'
  import { showToast } from '@/utils/toast'
  import { fetchFavorites, removeFavorite } from '@/api/favorite'
  import { useCartStore } from '@/stores/cart'

  const favorites = ref([])
  const perPage = 10
  const currentPage = ref(1)
  const cartStore = useCartStore()
=======
import UserSidebar from '@/components/UserSideBar.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { useToast } from 'primevue/usetoast'
import { fetchFavorites, removeFavorite } from '@/api/favorite'
import { useCartStore } from '@/stores/cart'

const toast = useToast()
const favorites = ref([])
const perPage = 10
const currentPage = ref(1)
const cartStore = useCartStore()
>>>>>>> ec5aa1c (fixdarkmodebug)

const paginatedFavorites = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return favorites.value.slice(start, start + perPage)
})

const totalPages = computed(() => Math.ceil(favorites.value.length / perPage))

<<<<<<< HEAD
  onMounted(async () => {
    const token = localStorage.getItem('token')
    try {
      const data = await fetchFavorites(token)
      favorites.value = data.map((item) => ({
        id: item.productId,
        refId: item.refId,
        name: item.productName,
        image: item.thumbnail,
        price: item.price,
        quantity: null,
        isAdding: false,
      }))
    } catch {
      showToast({
        severity: 'error',
        summary: '載入失敗',
        detail: '無法取得收藏資料',
      })
    }
  })
=======
onMounted(async () => {
  const token = localStorage.getItem('token')
  try {
    const data = await fetchFavorites(token)
    favorites.value = data.map((item) => ({
      id: item.productId,
      refId: item.refId,
      name: item.productName,
      image: item.thumbnail,
      price: item.price,
      quantity: null,
      isAdding: false,
    }))
  } catch {
    toast.add({
      severity: 'error',
      summary: '載入失敗',
      detail: '無法取得收藏資料',
      life: 3000,
    })
  }
})
>>>>>>> ec5aa1c (fixdarkmodebug)

watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

<<<<<<< HEAD
  async function addToCartHandler(item) {
    if (!item.quantity) {
      showToast({
        severity: 'warn',
        summary: '請先選擇數量',
      })
      return
    }

    item.isAdding = true

    try {
      await cartStore.add({
        id: item.id,
        qty: item.quantity,
      })
      showToast({
        severity: 'success',
        summary: '加入成功',
        detail: `${item.name} 已加入購物車`,
      })
    } catch {
      showToast({
        severity: 'error',
        summary: '加入失敗',
        detail: '請稍後再試',
      })
    } finally {
      item.isAdding = false
    }
  }

  async function removeFavoriteHandler(productId) {
    const token = localStorage.getItem('token')
    try {
      await removeFavorite(productId, token)
      favorites.value = favorites.value.filter((f) => f.id !== productId)
      showToast({
        severity: 'success',
        summary: '已取消收藏',
      })
    } catch {
      showToast({
        severity: 'error',
        summary: '刪除失敗',
        detail: '無法取消收藏',
      })
    }
=======
async function addToCartHandler(item) {
  if (!item.quantity) {
    toast.add({
      severity: 'warn',
      summary: '請先選擇數量',
      life: 2000,
    })
    return
  }

  item.isAdding = true

  try {
    await cartStore.add({
      id: item.id,
      qty: item.quantity,
    })

    toast.add({
      severity: 'success',
      summary: '加入成功',
      detail: `${item.name} 已加入購物車`,
      life: 2000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: '加入失敗',
      detail: '請稍後再試',
      life: 3000,
    })
  } finally {
    item.isAdding = false
>>>>>>> ec5aa1c (fixdarkmodebug)
  }
}

async function removeFavoriteHandler(productId) {
  const token = localStorage.getItem('token')
  try {
    await removeFavorite(productId, token)
    favorites.value = favorites.value.filter((f) => f.id !== productId)
    toast.add({
      severity: 'success',
      summary: '已取消收藏',
      life: 2000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: '刪除失敗',
      detail: '無法取消收藏',
      life: 3000,
    })
  }
}
</script>

<template>
<<<<<<< HEAD
  <div class="relative min-h-screen overflow-hidden py-2 px-4">
    <div
      class="absolute inset-0 z-0 bg-no-repeat bg-cover blur-md"
      style="background-image: url('/src/assets/circle-scatter-haikei.svg')"
    ></div>
    <Toast />
    <div class="relative z-10 flex max-w-7xl mx-auto px-4 py-8 gap-6">
      <aside class="w-64 ml-11">
        <UserSidebar />
      </aside>

      <div class="flex-1 bg-white rounded-xl shadow p-10 max-w-4xl -mt-3">
        <h2
          class="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2"
        >
=======
  <div class="min-h-screen py-2 px-4" style="
      --s: 82px;
      --c1: #ffdb57;
      --c2: #ffffff;
      --_g: radial-gradient(calc(var(--s) / 2), var(--c1) 97%, #0000);
      background:
        var(--_g),
        var(--_g) calc(2 * var(--s)) calc(2 * var(--s)),
        repeating-conic-gradient(from 45deg, #0000 0 25%, var(--c2) 0 50%)
          calc(-0.707 * var(--s)) calc(-0.707 * var(--s)),
        repeating-linear-gradient(
          135deg,
          var(--c1) calc(var(--s) / -2) calc(var(--s) / 2),
          var(--c2) 0 calc(2.328 * var(--s))
        ),
        linear-gradient(to bottom right, #fff9c4, #ffe082);
      background-size: calc(4 * var(--s)) calc(4 * var(--s));
    ">
    <Toast />

    <!-- RWD 主區塊 -->
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start px-4 py-10">
      <!-- Sidebar 手機版隱藏 -->
      <aside class="hidden md:block w-64 ml-0 md:ml-11 -mt-2">
        <UserSidebar />
      </aside>

      <!-- 主內容 -->
      <div class="flex-1 bg-white rounded-xl shadow p-6 max-w-4xl w-full">
        <h2 class="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
>>>>>>> ec5aa1c (fixdarkmodebug)
          <i class="pi pi-heart text-gray-400 text-lg"></i>
          我的收藏
        </h2>

        <!-- 無收藏 -->
        <div v-if="favorites.length === 0" class="text-gray-500 text-center">
          目前沒有收藏商品
        </div>

        <!-- 有收藏 -->
        <div v-else>
          <!-- 標題列（僅 md 以上顯示） -->
          <div class="hidden md:grid grid-cols-12 px-4 py-2 bg-gray-100 text-sm text-gray-600 font-medium rounded-t-xl">
            <div class="col-span-6 text-center">商品資料</div>
            <div class="col-span-2 text-center">單價</div>
            <div class="col-span-4 text-left pl-12">數量</div>
          </div>

          <!-- 商品項目 -->
          <div v-for="(item, index) in paginatedFavorites" :key="item.id" :class="[
            'grid md:grid-cols-12 gap-4 px-4 py-4 items-center',
            index !== paginatedFavorites.length - 1 ? 'border-b border-gray-200' : '',
            'block md:grid',
          ]">
            <!-- 商品資訊 -->
            <div class="md:col-span-6 flex gap-4 items-start mb-4 md:mb-0">
              <img :src="item.image || '/no-image.jpg'" alt="商品圖片" class="w-24 h-24 object-cover rounded-md" />
              <div>
                <div class="text-sm text-gray-500">{{ item.refId }}</div>
                <router-link :to="`/products/${item.id}`"
                  class="text-black font-medium text-sm sm:text-base leading-snug hover:underline">
                  {{ item.name }}
                </router-link>
              </div>
            </div>

            <!-- 價格 -->
            <div class="md:col-span-2 text-gray-800 font-medium text-center mb-2 md:mb-0">
              NT${{ item.price }}
            </div>

<<<<<<< HEAD
            <div class="col-span-4 flex gap-2 items-center justify-center">
              <Dropdown
                v-model="item.quantity"
                :options="[1, 2, 3, 4, 5]"
                placeholder="數量"
                class="w-24"
                :pt="{
                  root: { class: 'h-[36px] text-sm' },
                  input: { class: 'text-sm' },
                }"
              />
              <Button
                label="加入購物車"
                size="small"
                :loading="item.isAdding"
                :disabled="!item.quantity || item.isAdding"
                @click="addToCartHandler(item)"
                :class="[
=======
            <!-- 操作列 -->
            <div class="md:col-span-4 flex flex-wrap gap-2 items-center justify-center">
              <Select v-model="item.quantity" :options="[1, 2, 3, 4, 5]" placeholder="數量" class="w-24" :pt="{
                root: { class: 'h-[36px] text-sm' },
                input: { class: 'text-sm' },
              }" />
              <Button label="加入購物車" size="small" :loading="item.isAdding" :disabled="!item.quantity || item.isAdding"
                @click="addToCartHandler(item)" :class="[
>>>>>>> ec5aa1c (fixdarkmodebug)
                  'transition-all duration-200',
                  item.isAdding ? 'w-[128px]' : 'w-[112px]',
                ]" />
              <Button icon="pi pi-trash" severity="secondary" text size="small"
                @click="removeFavoriteHandler(item.id)" />
            </div>
          </div>

          <!-- 分頁 -->
          <div class="mt-6 flex justify-center items-center flex-wrap gap-2">
            <button @click="currentPage > 1 && currentPage--" :disabled="currentPage === 1"
              class="px-3 py-1 rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50">
              上一頁
            </button>

            <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-3 py-1 rounded border"
              :class="currentPage === page
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'">
              {{ page }}
            </button>

            <button @click="currentPage < totalPages && currentPage++" :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50">
              下一頁
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
