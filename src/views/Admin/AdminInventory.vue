<script setup>
  import CommonTable from '@/components/CommonTable.vue'
  import InputText from 'primevue/inputtext'
  import { ref } from 'vue'

  const inventoryTabs = ref([{ title: '全部', value: 'all' }])
  const inventoryColumns = ref([
    { field: 'img', header: '', style: 'width: 25%', sortable: false },
    { field: 'name', header: '商品', style: 'width: 25%', sortable: true },
    {
      field: 'reserved',
      header: '預留數量',
      style: 'width: 25%',
      sortable: true,
    },
    {
      field: 'stockOnHand',
      header: '現有庫存',
      style: 'width: 25%',
      sortable: true,
    },
  ])
  const inventoryValue = ref([
    {
      img: 'f230fh0g3',
      name: '路卡力歐',
      reserved: 2,
      stockOnHand: 24,
    },
  ])
</script>

<template>
  <div class="flex justify-between items-center mr-8 mb-4">
    <h2 class="text-2xl">庫存</h2>
  </div>
  <CommonTable
    :tabs="inventoryTabs"
    :columns="inventoryColumns"
    :value="inventoryValue"
    scrollable
    selectable
    scroll-height="500px"
  >
    <template #body-reserved="{ data }">
      <InputText v-model="data.reserved" class="w-full" />
    </template>

    <template #body-stockOnHand="{ data }">
      <InputText v-model="data.stockOnHand" class="w-full" />
    </template>
  </CommonTable>
</template>
