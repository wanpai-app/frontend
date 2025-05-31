<script setup>
import InputText from 'primevue/inputtext'

defineProps({
  keyword: String
})

const emit = defineEmits(['update:keyword'])
</script>

<template>
  <div class="flex justify-center mb-6">
    <InputText
      :modelValue="keyword"
      @update:modelValue="val => emit('update:keyword', val)"
      placeholder="輸入關鍵字搜尋商品"
      class="w-full max-w-md py-2 px-4 border border-gray-300 rounded-md text-sm bg-white"
    />
  </div>
</template>
