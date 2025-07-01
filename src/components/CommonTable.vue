<script setup>
  import Tabs from '@/volt/Tabs.vue'
  import TabList from '@/volt/TabList.vue'
  import Tab from '@/volt/Tab.vue'
  import TabPanels from '@/volt/TabPanels.vue'
  import TabPanel from '@/volt/TabPanel.vue'
  import DataTable from '@/volt/DataTable.vue'
  import Column from 'primevue/column'
  import { ref, computed } from 'vue'

  const props = defineProps({
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
    pagination: {
      type: Object,
      default: null,
    },
    scrollable: { type: Boolean, default: true },
    scrollHeight: { type: String, default: '500px' },
    selectable: { type: Boolean, default: true },
    activeTab: {
      type: String,
      default: 'all',
    },
  })

  const selectedRows = ref([])
  const filteredData = computed(() => {
    return props.activeTab === 'all'
      ? props.value
      : props.value.filter((item) => item.status === props.activeTab)
  })

  const emit = defineEmits(['tab-change', 'page-change', 'sort'])

  const handleTabChange = (value) => {
    const tab = props.tabs.find((t) => t.value === value)
    emit('tab-change', tab || { value })
  }

  const handlePageChange = (event) => {
    const page = event.page + 1
    emit('page-change', page)
  }

  const handleSort = (event) => {
    emit('sort', event)
  }
</script>

<template>
  <div class="card">
    <Tabs :value="props.activeTab" @update:value="handleTabChange">
      <TabList>
        <Tab v-for="tab in props.tabs" :key="tab.title" :value="tab.value">
          {{ tab.title }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="tab in props.tabs" :key="tab.value" :value="tab.value">
          <div class="card">
            <DataTable
              v-model:selection="selectedRows"
              :value="filteredData"
              removable-sort
              sort-mode="single"
              data-key="id"
              scrollable
              scroll-height="500px"
              :paginator="!!pagination"
              :rows="pagination?.limit || 20"
              :totalRecords="pagination?.totalCount || filteredData.length"
              :first="
                pagination ? (pagination.currentPage - 1) * pagination.limit : 0
              "
              :lazy="!!pagination"
              @page="handlePageChange"
              @sort="handleSort"
            >
              <Column
                selection-mode="multiple"
                header-style="width: 3rem"
              ></Column>
              <Column
                v-for="col in props.columns"
                :key="col.field"
                :field="col.field"
                :header="col.header"
                :sortable="col.sortable"
                :style="col.style"
              >
                <template #body="slotProps">
                  <slot :name="`body-${col.field}`" :data="slotProps.data">
                    {{
                      col.format
                        ? col.format(slotProps.data[col.field])
                        : slotProps.data[col.field]
                    }}
                  </slot>
                </template>
              </Column>
            </DataTable>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
