<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudyDocIndexLists } from '#/api/tiku/paper';

import { formatGrade, formatSubject } from '#/formatter/formatter';
import { GradesConfigAll, allSubjects } from '#/config/study';
import { getDocxBlob } from '#/api/tiku/paper';

import { useRouter } from 'vue-router';
const router = useRouter();

interface RowType {
  questionType: string;
  grade: string;
  id: string;
  subject: string;
  difficulty: string;
  title: string;
  updateTime: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: '所有文档',
            value: 0,
          },
          {
            label: '未识别年级科目',
            value: 1,
          },
          {
            label: '已识别年级科目',
            value: 2,
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'category',
      label: '识别结果',
      value: 2,
      formItemClass: 'col-span-1 items-baseline',
    },

    {
      component: 'Select',
      formItemClass: 'col-span-1 items-baseline',

      componentProps: {
        allowClear: true,
        placeholder: '请选择',
        options: GradesConfigAll,
      },
      fieldName: 'grade',
      label: '年级',
      value: -1,
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        placeholder: '请选择',
        options: allSubjects,
      },
      fieldName: 'subject',
      label: '科目',
      value: -1,
    },
    {
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '',
      },
      fieldName: 'title',
      label: '标题',
      value: '',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<RowType> = {
  stripe: true,
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { field: 'id', title: '序号', type: 'seq', width: 100 },
    { field: 'grade', sortable: true, title: '年级', formatter: formatGrade, width: 100 },
    { field: 'subject', sortable: true, title: '科目', formatter: formatSubject, width: 100 },
    { field: 'province', sortable: false, title: '省份', width: 100 },
    { field: 'statu', sortable: true, title: '状态', width: 60 },
    { field: 'title', sortable: false, title: '标题' },
    { field: 'updateTime', formatter: 'formatDateTime', title: '更新时间', width: 150 },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: '操作',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'parse',
            text: '解析',
          },
          {
            code: 'view',
            text: '查看',
          },
          {
            code: 'down',
            text: '下载',
          },
        ],
      },
      field: 'operation',
      fixed: 'right',
      title: '操作',
      width: 200,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page, sort }, formValues) => {
        const data = await getStudyDocIndexLists({
          pi: page.currentPage,
          ps: page.pageSize,
          sortBy: sort.field,
          sortOrder: sort.order,
          ...formValues,
          finaldoc: false,
        });
        for (const d of data.list) {
          d.createTime = d.createTime * 1000;
          d.updateTime = d.updateTime * 1000;
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
  formOptions,
  gridOptions,
});

function onActionClick(e: any) {
  switch (e.code) {
    case 'parse': {
      router.push({ path: '/question/docximport', query: { id: e.row.id } });
      break;
    }
    case 'view':
      {
        router.push({ path: '/docx/view', query: { id: e.row.id } });
        break;
      }
      break;

    case 'down':
      {
        const d = e.row;
        console.log(d);
        getDocxBlob(d.id).then((data: Blob) => {
          let blobUrl = window.URL.createObjectURL(data);
          let link = document.createElement('a');
          link.download = d.title + '.docx';
          link.style.display = 'none';
          link.href = blobUrl;
          // 触发点击
          document.body.appendChild(link);
          link.click();
        });
      }
      break;
  }
}
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
