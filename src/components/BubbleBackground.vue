<script setup>
  import { ref, onMounted } from 'vue'

  const bubbles = ref([])
  const isMobile = ref(window.innerWidth <= 768)

  onMounted(() => {
    if (isMobile.value) return

    const total = 2
    const minDistance = 20 // px
    const maxTries = 300

    const screenW = window.innerWidth
    const screenH = window.innerHeight
    const newBubbles = []

    for (let i = 0; i < total; i++) {
      let tries = 0
      let placed = false

      while (tries < maxTries && !placed) {
        const size = 200 + Math.random() * 30 // 80 ~ 120 px
        const topPercent = Math.random() * 100
        const leftPercent = Math.random() * 100

        // 把百分比位置轉成 px 中心點
        const centerX = (leftPercent / 100) * screenW
        const centerY = (topPercent / 100) * screenH

        const overlaps = newBubbles.some((b) => {
          const otherX = (b.left / 100) * screenW
          const otherY = (b.top / 100) * screenH
          const dx = centerX - otherX
          const dy = centerY - otherY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minAllowed = (b.size + size) / 2 + minDistance
          return distance < minAllowed
        })

        if (!overlaps) {
          newBubbles.push({
            id: i,
            top: topPercent,
            left: leftPercent,
            size,
            opacity: 0.4 + Math.random() * 0.3,
            blur: 'blur-sm',
          })
          placed = true
        }

        tries++
      }
    }

    bubbles.value = newBubbles
  })
</script>

<template>
  <div
    v-if="!isMobile"
    class="fixed inset-0 -z-10 min-h-screen overflow-hidden pointer-events-none"
  >
    <div
      v-for="b in bubbles"
      :key="b.id"
      class="absolute rounded-full bg-yellow-300"
      :class="b.blur"
      :style="{
        top: `${b.top}%`,
        left: `${b.left}%`,
        width: `${b.size}px`,
        height: `${b.size}px`,
        opacity: b.opacity,
        transform: 'translate(-50%, -50%)',
      }"
    ></div>
  </div>
</template>
