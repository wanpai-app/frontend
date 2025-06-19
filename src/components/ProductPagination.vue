<script setup>
  import { ref } from 'vue'
  import Button from 'primevue/button'

  const props = defineProps({
    currentPage: Number,
    totalPages: Number,
    pageButtons: Array,
  })

  const emit = defineEmits(['goToPage'])

  const pageInput = ref('')

  function handleJump() {
    const page = parseInt(pageInput.value, 10)
    if (!isNaN(page) && page >= 1 && page <= props.totalPages) {
      emit('goToPage', page)
      pageInput.value = ''
    }
  }
</script>

<template>
  <div
    class="flex flex-col md:flex-row justify-center items-center gap-4 py-6 text-sm"
  >
    <div class="flex items-center gap-1">
      <Button
        icon="pi pi-angle-double-left"
        @click="emit('goToPage', 1)"
        :disabled="props.currentPage === 1"
        text
      />
      <Button
        icon="pi pi-angle-left"
        @click="emit('goToPage', props.currentPage - 1)"
        :disabled="props.currentPage === 1"
        text
      />

      <template v-for="page in props.pageButtons" :key="page">
        <span v-if="page === '...'" class="px-2">...</span>
        <Button
          v-else
          :label="page.toString()"
          :severity="page === props.currentPage ? 'primary' : undefined"
          :outlined="page !== props.currentPage"
          :class="page === props.currentPage ? 'font-bold' : ''"
          @click="emit('goToPage', page)"
        />
      </template>

      <Button
        icon="pi pi-angle-right"
        @click="emit('goToPage', props.currentPage + 1)"
        :disabled="props.currentPage === props.totalPages"
        text
      />
      <Button
        icon="pi pi-angle-double-right"
        @click="emit('goToPage', props.totalPages)"
        :disabled="props.currentPage === props.totalPages"
        text
      />
    </div>

    <div class="flex items-center gap-2 text-black">
      <span>前往</span>
      <input
        v-model="pageInput"
        type="number"
        min="1"
        :max="props.totalPages"
        class="w-16 px-2 py-1 border rounded text-center"
      />
      <span>頁</span>
      <Button label="確定" @click="handleJump" class="!px-3 !py-1.5" />
    </div>
  </div>
</template>
