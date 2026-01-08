<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getQuestionLists } from '#/api/tiku/question';

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
    { field: 'questionType', title: '题型', width: 100 },
    { field: 'grade', sortable: true, title: '年级', width: 100 },
    { field: 'subject', sortable: true, title: '科目', width: 100 },
    { field: 'difficulty', sortable: true, title: '难度', width: 100 },
    { field: 'title', sortable: false, title: '内容' },
    { field: 'updateTime', formatter: 'formatDateTime', title: '更新时间', width: 150 },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page, sort }) => {
        return await getQuestionLists({
          pi: page.currentPage,
          ps: page.pageSize,
          sortBy: sort.field,
          sortOrder: sort.order,
        });
      },
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
        <router-link to="/add">
          <Button class="mr-2" type="primary"> 添加试题 </Button>
        </router-link>
        <Button class="mr-2" type="primary" @click="() => gridApi.query()"> 刷新当前页面 </Button>
        <Button type="primary" @click="() => gridApi.reload()"> 刷新并返回第一页 </Button>
      </template>
    </Grid>
  </Page>
</template>
