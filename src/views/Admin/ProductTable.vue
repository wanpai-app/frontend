<template>
  <div class="card">
    <Tabs value="active">
      <TabList>
        <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
          <div class="card">
            <DataTable
              v-model:selection="selectedProducts"
              :value="products"
              removable-sort
              pt:table="min-w-200"
              data-key="id"
              scrollable
              scroll-height="500px"
            >
              <Column selection-mode="multiple" header-style="width: 3rem"></Column>
              <Column field="code" header="Code" sortable style="width: 25%"></Column>
              <Column field="name" header="Name" sortable style="width: 25%"></Column>
              <Column field="category" header="Category" sortable style="width: 25%"></Column>
              <Column field="quantity" header="Quantity" sortable style="width: 25%"></Column>
            </DataTable>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
<script setup>
import Tabs from '@/volt/Tabs.vue'
import TabList from '@/volt/TabList.vue'
import Tab from '@/volt/Tab.vue'
import TabPanels from '@/volt/TabPanels.vue'
import TabPanel from '@/volt/TabPanel.vue'

const tabs = ref([
  { title: '全部', content: 'Tab 1 Content', value: 'all' },
  { title: '上架中', content: 'Tab 1 Content', value: 'active' },
  { title: '草稿', content: 'Tab 2 Content', value: 'draft' },
  { title: '典藏', content: 'Tab 3 Content', value: 'archived' },
])
import DataTable from '@/volt/DataTable.vue'
import Column from 'primevue/column'
import { ref } from 'vue'

const products = ref([
  {
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    category: 'Accessories',
    quantity: 24,
  },
  {
    code: 'nvklal433',
    name: 'Black Watch',
    category: 'Accessories',
    quantity: 61,
  },
  {
    code: 'zz21cz3c1',
    name: 'Blue Band',
    category: 'Fitness',
    quantity: 2,
  },
  {
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    category: 'Accessories',
    quantity: 24,
  },
  {
    code: 'nvklal433',
    name: 'Black Watch',
    category: 'Accessories',
    quantity: 61,
  },
  {
    code: 'zz21cz3c1',
    name: 'Blue Band',
    category: 'Fitness',
    quantity: 2,
  },
  {
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    category: 'Accessories',
    quantity: 24,
  },
  {
    code: 'nvklal433',
    name: 'Black Watch',
    category: 'Accessories',
    quantity: 61,
  },
  {
    code: 'zz21cz3c1',
    name: 'Blue Band',
    category: 'Fitness',
    quantity: 2,
  },
  {
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    category: 'Accessories',
    quantity: 24,
  },
  {
    code: 'nvklal433',
    name: 'Black Watch',
    category: 'Accessories',
    quantity: 61,
  },
  {
    code: 'zz21cz3c1',
    name: 'Blue Band',
    category: 'Fitness',
    quantity: 2,
  },
  {
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    category: 'Accessories',
    quantity: 24,
  },
  {
    code: 'nvklal433',
    name: 'Black Watch',
    category: 'Accessories',
    quantity: 61,
  },
  {
    code: 'zz21cz3c1',
    name: 'Blue Band',
    category: 'Fitness',
    quantity: 2,
  },
])
const selectedProducts = ref(null)
</script>
