<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';
import { $t } from '#/locales';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getQuestionTypesApi } from '#/api/tiku/question';
import type { QuestionTableApi } from '#/api/tiku/question';
import { useRouter } from 'vue-router';
const router = useRouter();

import type { OnActionClickParams, VxeTableGridOptions } from '#/adapter/vxe-table';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const gridOptions: VxeGridProps<QuestionTableApi.QuestionType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'title', sortable: false, title: '题型', width: 150 },
    { field: 'desc', sortable: false, title: '描述' },
    { field: 'subjectNames', sortable: false, title: '科目' },
    { field: 'gradeNames', sortable: false, title: '年级' },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.role.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'edit',
            text: '编辑',
          },
          {
            code: 'delete',
            text: '删除',
          },
        ],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.role.operation'),
      width: 130,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page, sort }) => {
        return await getQuestionTypesApi({
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
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    export: false,
    refresh: true,
    search: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

function onActionClick(e: OnActionClickParams<QuestionTableApi.QuestionType>) {
  switch (e.code) {
    case 'delete': {
      // onDelete(e.row);
      break;
    }
    case 'edit': {
      router.push({ path: '/add_question_type', query: { id: e.row.id } });
      break;
    }
  }
}
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="数据列表" table-title-help="提示">
      <template #toolbar-tools>
        <router-link to="/add_question_type">
          <Button class="mr-2" type="primary"> 添加题型 </Button>
        </router-link>
        <Button class="mr-2" type="primary" @click="() => gridApi.query()"> 刷新当前页面 </Button>
        <Button type="primary" @click="() => gridApi.reload()"> 刷新并返回第一页 </Button>
      </template>
    </Grid>
  </Page>
</template>
