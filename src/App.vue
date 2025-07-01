<script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import Navbar from '@/components/layout/NavBar.vue'
  import Footer from '@/components/layout/Footer.vue'
  import Toast from 'primevue/toast'
  import FloatingBubble from '@/components/FloatingBubble.vue'
  import BubbleBackground from '@/components/BubbleBackground.vue'
  import { useToast } from 'primevue/usetoast'
  import { setGlobalToast } from '@/utils/toast'

  const toast = useToast()
  setGlobalToast(toast)
  const route = useRoute()
  const isAdmin = computed(() => route.path.startsWith('/admin'))

  const bubbleRef = ref(null)

  const handleScroll = () => {
    const isHome = route.path === '/'
    const isSearching = !!route.query.keyword
    if (
      isHome &&
      !isSearching &&
      window.scrollY > 100 &&
      Math.random() > 0.85
    ) {
      bubbleRef.value?.spawnBubble()
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<template>
  <div class="min-h-screen flex flex-col relative overflow-x-hidden">
    <Toast />
    <BubbleBackground class="absolute inset-0 -z-10" />
    <FloatingBubble ref="bubbleRef" />
    <Navbar v-if="!isAdmin" />

    <main :class="!isAdmin ? 'flex-1' : ''">
      <RouterView />
    </main>

    <Footer v-if="!isAdmin" />
  </div>
</template>
