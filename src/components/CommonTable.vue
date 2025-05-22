<template>
  <div class="card">
    <Tabs :value="tabs[1].value">
      <TabList>
        <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
          <div class="card">
            <DataTable
              v-model:selection="selectedRows"
              :value="value"
              removable-sort
              pt:table="min-w-200"
              data-key="id"
              scrollable
              scroll-height="500px"
            >
              <Column selection-mode="multiple" header-style="width: 3rem"></Column>
              <Column field="img" style="width: 25%"></Column>
              <Column
                v-for="col in columns"
                :key="col.field"
                :field="col.field"
                :header="col.header"
                sortable
                :style="col.style"
              ></Column>
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
import DataTable from '@/volt/DataTable.vue'
import Column from 'primevue/column'
import { ref } from 'vue'

const selectedRows = ref([])

defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  value: {
    type: Array,
    required: true,
  },
  scrollable: { type: Boolean, default: true },
  scrollHeight: { type: String, default: '500px' },
  selectable: { type: Boolean, default: true },
})
</script>
