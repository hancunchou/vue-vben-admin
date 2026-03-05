<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ColPage, Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { doParseQuestionResult, doPaperViewHtml } from '#/api/tiku/question';

import { Alert, Button, Card, Checkbox, Slider, Tag, Tooltip } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudyDocIndexLists } from '#/api/tiku/paper';

import { getDocxBlob, getPaperView } from '#/api/tiku/paper';
import { getAbsUrl } from '#/api/core/cdn';

import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { ref, reactive } from 'vue';
import { renderAsync } from 'docx-preview';

const route = useRoute();
const recordid = ref(route.query.id).value;

const props = reactive({
  leftCollapsedWidth: 5,
  leftCollapsible: true,
  leftMaxWidth: 100,
  leftMinWidth: 20,
  leftWidth: 80,
  resizable: true,
  rightWidth: 20,
  splitHandle: true,
  splitLine: true,
});
const leftMinWidth = ref(props.leftMinWidth || 1);
const leftMaxWidth = ref(props.leftMaxWidth || 100);

if (recordid) {
  getDocxBlob(recordid).then((data: Blob) => {
    renderAsync(data, document.getElementById('container'), null, { useBase64URL: true }).then(
      (doc: any) => console.log(doc)
    );
    loadPaperHtml();
  });
}

function loadPaperHtml() {
  getPaperView(recordid, 0).then((res) => {
    const baseUri = getAbsUrl(res.imgBaseUrl);
    res.htmlContent = '';
    const div: HTMLDivElement = document.createElement('div');

    if (res.htmlParagraphs)
      for (const p of res.htmlParagraphs) {
        if (p === '') continue;
          console.log(p)

        div.innerHTML = p;
        div.querySelectorAll('img').forEach((node, index) => {
          const img: HTMLImageElement = node as HTMLImageElement;


          const src = img.getAttribute('src');
          if (src && !src.startsWith('http') && !src.startsWith('data:image')) {
            img.src = baseUri + src;
          }
          const dataSrc = img.getAttribute('data-src');
          if ((!src || !src.startsWith('data:image')) && dataSrc && !dataSrc.startsWith('http')) {
            const style = img.getAttribute('style');
            img.setAttribute('style', style + ';background-image: url(' + baseUri + dataSrc + ')');
            img.src =
              'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          }


        });
        res.htmlContent = res.htmlContent + div.innerHTML;
      }
    const contentHtml: any = document.getElementById('paperhtml');
    if (contentHtml) contentHtml.innerHTML = res.htmlContent;
  });
}

function parseDocxHtml() {
  doPaperViewHtml(recordid).then(() => {
    loadPaperHtml();
  });
}
function doParseQuestionResult() {
  doParseQuestionResult(recordid).then(() => {
    loadPaperHtml();
  });
}
</script>
<style lang="less">
.question-nz-content {
  nz-card {
    overflow-x: scroll;
  }
  .questionContent {
    clear: both;
    padding-bottom: 200px;
    .wpwrap{
      // white-space: pre-line;
    }
  }

}
</style>

<template>
  <ColPage
    auto-content-height
    description="解析导入试题"
    v-bind="props"
    title="查看试题"
  >
    <template #title>
      <span class="mr-2 text-2xl font-bold">试卷查看、解析</span>
      <!-- <Tag color="hsl(var(--destructive))">Alpha</Tag> -->
    </template>
    <template #extra>
      <Button type="primary" @click="doParseQuestionResult()" class="mr-2" >解析试题</Button>
      <Button type="primary" @click="parseDocxHtml()">生成预览</Button>
    </template>

    <template #left="{ isCollapsed, expand }">
      <Card class="ml-2 question-nz-content">
        <Page auto-content-height>
          <div id="paperhtml" class="questionContent"></div>
        </Page>
      </Card>
    </template>
    <!-- <Card title="试卷解析">
      <Page auto-content-height>
        <div id="container"></div>
      </Page>
    </Card> -->
  </ColPage>
</template>
