<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import Divider from 'primevue/divider'
  import axios from '@/utils/axiosInstance'
  import { useNotificationStore } from '@/stores/notifications'

  const notificationStore = useNotificationStore()
  const notifications = computed(() => notificationStore.list)
  const categories = ref([
    { label: '訂單訊息', type: 'order' },
    { label: '帳戶訊息', type: 'account' },
  ])

  const selectedCategory = ref(null)
  const loading = ref(false)
  const error = ref('')
  const token = localStorage.getItem('token')

  onMounted(async () => {
    loading.value = true
    error.value = ''
    try {
      await notificationStore.fetch()
    } catch {
      error.value = '通知載入失敗，請稍後再試'
    } finally {
      loading.value = false
    }
  })

  watch(selectedCategory, (newType) => {
    notifications.value.forEach((n) => {
      if (n.type === newType) {
        n.expanded = true
      }
    })
  })

  const filteredNotifications = computed(() =>
    notifications.value.filter((n) => n.type === selectedCategory.value)
  )

  const currentLabel = computed(
    () =>
      categories.value.find((c) => c.type === selectedCategory.value)?.label ||
      ''
  )

  async function toggleExpanded(item) {
    item.expanded = !item.expanded
    if (!item.read) {
      try {
        await axios.patch(
          `/notifications/${item.id}/read`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        item.read = true
      } catch {
        // 忽略錯誤
      }
    }
  }

  function hasUnread(type) {
    return notifications.value.some((n) => n.type === type && !n.read)
  }
</script>

<template>
  <div class="min-h-screen p-6 font-sans text-black bg-white">
    <h2 class="mb-6 ml-4 text-2xl font-bold sm:ml-8">我的通知</h2>
    <div class="flex flex-col gap-6 md:flex-row">
      <aside class="w-full mb-4 md:w-40 md:mb-0">
        <ul class="p-0 m-0 list-none">
          <li
            v-for="(item, index) in categories"
            :key="index"
            @click="selectedCategory = item.type"
            :class="[
              'p-3 mb-2 cursor-pointer text-center rounded relative transition',
              selectedCategory === item.type
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 ',
            ]"
          >
            {{ item.label }}
            <span
              v-if="hasUnread(item.type)"
              class="inline-block w-2 h-2 bg-red-600 rounded-full ml-1.5 transition-opacity"
            ></span>
          </li>
        </ul>
      </aside>

      <section class="flex items-center justify-center flex-1">
        <div v-if="loading" class="py-10 text-center text-gray-500">
          載入中...
        </div>

        <div v-else-if="error" class="py-10 text-center text-red-500">
          {{ error }}
        </div>

        <div v-else-if="!selectedCategory" class="text-center">
          <span
            class="block mx-auto mb-6 text-gray-400 pi pi-inbox text-9xl"
            aria-hidden="true"
          ></span>
          <h3 class="mb-2 text-xl font-semibold">歡迎來到通知中心</h3>
          <p class="text-gray-500">選擇想查看的通知類型</p>
        </div>

        <div v-else class="w-full">
          <div
            class="flex items-center justify-between px-6 text-sm text-gray-500"
          >
            <span>{{ currentLabel }}</span>
            <span>共 {{ filteredNotifications.length }} 條</span>
          </div>
          <Divider class="my-2" />

          <div
            v-if="filteredNotifications.length === 0"
            class="py-10 text-center text-gray-500"
          >
            沒有新通知
          </div>

          <div
            v-else
            v-for="(item, index) in filteredNotifications"
            :key="index"
            @click="toggleExpanded(item)"
            class="px-6 py-2 transition rounded cursor-pointer hover:bg-gray-100"
          >
            <p class="text-sm text-gray-600 flex items-center gap-1.5 mb-1.5">
              {{ item.time }}
              <span
                v-if="!item.read"
                class="inline-block w-2 h-2 ml-2 align-middle bg-red-500 rounded-full"
              ></span>
            </p>

            <div v-if="item.expanded">
              <p class="mb-1 text-base">
                <strong class="font-bold text-red-600">
                  {{ item.username }}
                </strong>
                {{ item.message }}
              </p>
              <p v-if="item.orderId" class="text-sm text-gray-700">
                訂單編號：{{ item.orderId }}
              </p>
            </div>

            <Divider
              v-if="index < filteredNotifications.length - 1"
              class="my-3"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
