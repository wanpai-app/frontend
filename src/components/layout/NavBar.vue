<script setup>
  import { ref } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import Drawer from 'primevue/drawer'
  import Button from 'primevue/button'
  import { useCartStore } from '@/stores/cart'

  const visible = ref(false)
  const cart = useCartStore()
  const route = useRoute()

  const menuItems = [{ label: '後台首頁', to: '/admin' }]

  function handleHomeClick(e) {
    if (route.path === '/') {
      e.preventDefault()
      window.location.reload()
    }
  }
</script>

<template>
  <header class="bg-white shadow-sm">
    <div
      class="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-6"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        class="text-xl font-bold text-emerald-600"
        @click="handleHomeClick"
      >
        Wanpai
      </RouterLink>

      <!-- 導覽連結 (桌機) -->
      <nav class="hidden md:flex gap-8 text-sm text-gray-700 font-medium">
        <RouterLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          @click="item.to === '/' ? handleHomeClick($event) : null"
          class="hover:text-emerald-600 transition"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- 桌機版購物車 + 登入 -->
      <div class="hidden md:flex items-center gap-4">
        <RouterLink to="/cart" class="relative">
          <div class="relative">
            <Button icon="pi pi-shopping-cart" text rounded />
            <span
              v-if="cart.items.length"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            >
              {{ cart.items.length }}
            </span>
          </div>
        </RouterLink>
        <RouterLink to="/loginsignup">
          <Button label="登入" severity="primary" size="small"></Button>
        </RouterLink>
      </div>

      <!-- 手機版漢堡按鈕 -->
      <div class="md:hidden">
        <Button icon="pi pi-bars" text @click="visible = true" />
      </div>
    </div>

    <!-- Drawer 手機選單 -->
    <Drawer v-model:visible="visible" position="right">
      <template #header>
        <div class="text-lg font-semibold">選單</div>
      </template>
      <div class="flex flex-col gap-5 mt-4 px-4">
        <RouterLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          @click="
            () => {
              visible = false
              if (item.to === '/' && route.path === '/') {
                window.location.reload()
              }
            }
          "
          class="text-gray-800 hover:text-emerald-600 text-base font-medium"
        >
          {{ item.label }}
        </RouterLink>

        <RouterLink
          to="/cart"
          class="text-gray-800 hover:text-emerald-600 text-base font-medium flex items-center"
          @click="visible = false"
        >
          <i class="pi pi-shopping-cart mr-2"></i>
          購物車
          <span
            v-if="cart.items.length"
            class="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
          >
            {{ cart.items.length }}
          </span>
        </RouterLink>

        <RouterLink to="/loginsignup" @click="visible = false">
          <Button label="登入" severity="primary" class="mt-4 w-full"></Button>
        </RouterLink>
      </div>
    </Drawer>
  </header>
</template>
