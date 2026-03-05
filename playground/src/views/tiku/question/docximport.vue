<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ColPage, Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { doParseQuestionResult, doPaperViewHtml } from '#/api/tiku/question';

import { Alert, Button, Card, Checkbox, Slider, Tag, Tooltip ,Select} from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudyDocIndexLists } from '#/api/tiku/paper';

import { getDocxBlob, getPaperView } from '#/api/tiku/paper';
import { getAbsUrl } from '#/api/core/cdn';

import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { ref, reactive } from 'vue';
import { renderAsync } from 'docx-preview';
import { GradesConfigAll, allSubjects } from '#/config/study';

import { formatGrade, formatSubject } from '#/formatter/formatter';

interface RowType {
  title: string;
}

const gridOptions: VxeGridProps<RowType> = {
  stripe: true,
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { field: 'grade', sortable: false,slots: { header: 'grade_header' }, title: '年级',formatter: formatGrade, width: 100},
    { field: 'subject', sortable: true, title: '科目', formatter: formatSubject, width: 80  },
    { field: 'title',  sortable: false, title: '试卷' },
   
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
    defaultSort: { field: 'id', order: 'asc' },
    remote: true,
  },
  toolbarConfig: {
    refresh: false,
  },
  pagerConfig: {
      layouts: [ 'Sizes', 'PrevPage', 'Number', 'NextPage'],
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});


const search_options={
  grade:GradesConfigAll[6],
}



const props = reactive({
  leftCollapsedWidth: 5,
  leftCollapsible: true,
  leftMaxWidth: 100,
  leftMinWidth: 45,
  leftWidth: 55,
  resizable: true,
  rightWidth: 30,
  splitHandle: true,
  splitLine: true,
});
const leftMinWidth = ref(props.leftMinWidth || 1);
const leftMaxWidth = ref(props.leftMaxWidth || 100);

</script>


<template>
  <ColPage
    auto-content-height
    description=""
    v-bind="props"
    title=""
  >
    <template #left="{ isCollapsed, expand }">
      <Card class="ml-2 question-nz-content">
        <Page auto-content-height>
          <div id="paperhtml" class="questionContent"></div>
        </Page>
      </Card>
    </template>

      <Grid table-title="" table-title-help="">
        <template #toolbar-tools>
        </template>
        <template #grade_header="{ column }">
         
          <div class="slotBox">
            <p class="titleBox2"> <Select :defaultValue="GradesConfigAll[6]" v-model="search_options.grade"  :options="GradesConfigAll"></Select></p>
          </div>
      </template>
      </Grid>

  </ColPage>
</template>
