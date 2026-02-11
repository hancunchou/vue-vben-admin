<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getPaperDocxLists } from '#/api/tiku/paper';
import { getAiTaskLists, startAITask } from '#/api/tiku/aitask';
import { $t } from '#/locales';
import { ref, onMounted, onUnmounted } from 'vue'



interface RowType {
  questionType: string;
  grade: string;
  id: string;
  subject: string;
  difficulty: string;
  title: string;
  updateTime: string;
}

const gridOptions: VxeGridProps<RowType> = {
  stripe: true,
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { field: 'id', title: '序号', type: 'seq', width: 100 },
    { field: 'taskName', title: '任务名称', width: 300 },
    { field: 'key', sortable: true, title: 'key', width: 300 },
    { field: 'desc', sortable: true, title: 'desc' },
    {
      align: 'center',
      
      cellRender:{
          attrs: {
            nameField: 'name',
            nameTitle: $t('system.role.name'),
            onClick: onTaskActionClick,
          },
          name: 'CellOperation',
          options: [
            {
              code: 'start',
              text: '开始运行',
              disabled: (row: any) => {
                return row.run==1;
              },
            },
            {
              code: 'stop',
              text: '停止运行',
               disabled: (row: any) => {
                return row.run==0;
              },
            },
            
          ],
          props:{

          },
        
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.role.operation'),
      width: 200,
    },

  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  proxyConfig: {
    loading:false,
    ajax: {
      query: async ({ page, sort }) => {
        const data = await getAiTaskLists({
          pi: page.currentPage,
          ps: page.pageSize,
          sortBy: sort.field,
          sortOrder: sort.order,
        });
        return data
      },
    },
    response: {
          result: 'list',
          total: 'total',
          list: 'list',
    },
    sort: true,
  },
  sortConfig: {
    defaultSort: { field: 'grade', order: 'asc' },
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    export: true,
    // import: true,
    refresh: true,
    zoom: true,
  },

   pagerConfig: {
    enabled: false,
    perfect: false
  },
  
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

async function onTaskActionClick(e: any) {
  switch (e.code) {
    case 'start': {
      const data= await startAITask({key: e.row.key,run:true})
      gridApi.query()
      break;
    }
    case 'stop': {
      startAITask({key: e.row.key,run:false})
      gridApi.query()
      break;
    }
  }
}

let refreshTimer = null
const refreshInterval = 10000 // 10秒
// 启动定时刷新
const startAutoRefresh = () => {
  console.log('startAutoRefresh')
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
  refreshTimer = setInterval(() => {
    if (!document.hidden) {
        gridApi.query()
    }
  }, refreshInterval)
}


// 停止定时刷新
const stopAutoRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

// 处理页面可见性变化
const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAutoRefresh()
  } else {
    startAutoRefresh()
  }
}

onMounted(() => {
 
  
  // // 启动定时刷新
  startAutoRefresh()
  // // 监听页面可见性变化
  document.addEventListener('visibilitychange', handleVisibilityChange)
  // 监听页面卸载
  window.addEventListener('beforeunload', stopAutoRefresh)
})

onUnmounted(() => {
  console.log('onUnmounted')
  // // 清理定时器和监听器
  stopAutoRefresh()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('beforeunload', stopAutoRefresh)
})
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="任务列表" table-title-help="提示">
      <template #toolbar-tools>
     
        <Button class="mr-2" type="primary" @click="() => gridApi.query()"> 刷新任务列表 </Button>
      </template>
    </Grid>
  </Page>
</template>
