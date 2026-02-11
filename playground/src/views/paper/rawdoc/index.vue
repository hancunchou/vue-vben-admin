<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getRawDocLists } from '#/api/tiku/paper';

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
    { field: 'wordTitle', title: '标题' },
    { field: 'xfilename', sortable: true, title: '路径', width: 400 },
    { field: 'extname', sortable: true, title: '类型', width: 100 },
    { field: 'createTime', formatter: 'formatDateTime', title: '创建时间', width: 150 },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page, sort }) => {
        const data= await getRawDocLists({
          pi: page.currentPage,
          ps: page.pageSize,
          sortBy: sort.field,
          sortOrder: sort.order,
        });
        for(const d of data.list){
          d.createTime=d.createTime*1000;
          d.updateTime=d.updateTime*1000;
        }
        return data;
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
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="数据列表" table-title-help="提示">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="() => gridApi.query()"> 刷新当前页面 </Button>
        <Button type="primary" @click="() => gridApi.reload()"> 刷新并返回第一页 </Button>
      </template>
    </Grid>
  </Page>
</template>
