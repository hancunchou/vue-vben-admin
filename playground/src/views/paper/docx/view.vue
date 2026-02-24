<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import {ColPage, Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { doParseQuestionResult } from '#/api/tiku/question';

import {
  Alert,
  Button,
  Card,
  Checkbox,
  Slider,
  Tag,
  Tooltip,
} from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudyDocIndexLists } from '#/api/tiku/paper';


import { getDocxBlob, getPaperView } from '#/api/tiku/paper';
import { getAbsUrl } from '#/api/core/cdn';


import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { ref,reactive } from 'vue';
import { renderAsync } from 'docx-preview';

const route = useRoute();
const recordid = ref(route.query.id).value;

const props = reactive({
  leftCollapsedWidth: 5,
  leftCollapsible: true,
  leftMaxWidth: 50,
  leftMinWidth: 20,
  leftWidth: 50,
  resizable: true,
  rightWidth: 50,
  splitHandle: true,
  splitLine: true,
});
const leftMinWidth = ref(props.leftMinWidth || 1);
const leftMaxWidth = ref(props.leftMaxWidth || 100);


if(recordid){

  getDocxBlob(recordid).then((data:Blob)=>{
    renderAsync(data, document.getElementById('container'),null,{useBase64URL:true}).then((doc: any) => console.log(doc));
  })
  loadPaperHtml();
}

function loadPaperHtml(){
  getPaperView(recordid,0).then((res)=>{
   
          const baseUri = getAbsUrl(res.imgBaseUrl)
          res.htmlContent=''

          if (res.htmlParagraphs)

            for (const p of res.htmlParagraphs) {
              if (p === "") continue;
              const div: HTMLDivElement = document.createElement("div");
              div.innerHTML = p;

              div.querySelectorAll("img").forEach((node, index) => {
                const img: HTMLImageElement = node as HTMLImageElement;
                const src = img.getAttribute("src");
                if (src && !src.startsWith("http")) {
                  img.src = baseUri + src;
                }
                const dataSrc = img.getAttribute("data-src");
                if (dataSrc && !dataSrc.startsWith("http")) {
                  const style = img.getAttribute("style");
                  img.setAttribute(
                    "style",
                    style + ";background-image: url(" + baseUri + dataSrc + ")"
                  );
                  img.src =
                    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                }
              });
              res.htmlContent = res.htmlContent + div.innerHTML;
            }
            const contentHtml:any =  document.getElementById('paperhtml')
            if(contentHtml) contentHtml.innerHTML=res.htmlContent

  });
}

function parseDocx(){
  doParseQuestionResult(recordid).then(()=>{
    loadPaperHtml();
  })
}

</script>
<style lang="less" >
  .question-nz-content {
    nz-card {
      overflow-x: scroll;
    }
    .questionContent {
      clear: both;
      div {
        table {
          display: inline-block;
          td {
            word-break: keep-all;
            border: 1px #000 solid;
            padding: 5px;
          }
        }
      }
      p {
        position: relative;
        clear: both;
        text-indent: 36px;
        .bh {
          margin-right: 12px;
          font-weight: bold;
          font-size: 16px;
        }
        .bh1 {
          margin-right: 18px;
          font-weight: bold;
          font-size: 18px;
        }
        .embedImg{
           display: unset;
           float:initial;
        }
      
      }
      p.lv0 {
        text-indent: 24px;
      }
      p.lv1 {
        text-indent: 0;
      }
      p.lv2 {
        text-indent: 12px;
      }
      p.bhtitle {
        font-weight: bold;
      }
      p.answer {
        color: red;
      }
      .align_center {
        text-align: center;
      }
      .align_right {
        text-align: right;
      }
      .important {
        font-weight: bold;
      }
    }
    .answerContent {
      clear: both;
      color: red;
      p {
        text-indent: 0;
      }
    }
  
    .wpwrap_anchor {
      float: left;
    }
    .wpwrap_anchor_bothSides {
      float: left;
    }
    .wpwrap_inline {
      float: inline-start;
    }

    .buttonsContent {
      clear: both;
    }

    .fontsize26 {
      font-size: 26px;
    }
    .fontsize25 {
      font-size: 25px;
    }
    .fontsize24 {
      font-size: 24px;
    }
    .fontsize23 {
      font-size: 23px;
    }
    .fontsize22 {
      font-size: 22px;
    }
    .fontsize21 {
      font-size: 21px;
    }
    .fontsize20 {
      font-size: 20px;
    }
    .fontsize19 {
      font-size: 19px;
    }
    .fontsize18 {
      font-size: 18px;
    }
    .fontsize17 {
      font-size: 17px;
    }
    .fontsize16 {
      font-size: 16px;
    }
    .fontsize15 {
      font-size: 15px;
    }
    .fontsize14 {
      font-size: 14px;
    }
    .fontsize13 {
      font-size: 13px;
    }
    .text-decoration-single {
      text-decoration: underline;
    }
    span.va-superscript {
      vertical-align: super;
      font-size: smaller;
    }
    span.va-subscript {
      vertical-align: sub;
      font-size: smaller;
    }
    .decoration-single {
      text-decoration: underline;
    }

    // 改卷处理
    .corretConent {
      .lv4 {
        display: block;
      }
    }
  }
</style>
<template>

 <ColPage
    auto-content-height
    description="ColPage 是一个双列布局组件，支持左侧折叠、拖拽调整宽度等功能。"
    v-bind="props"
    title="ColPage 双列布局组件"
  >
    <template #title>
      <span class="mr-2 text-2xl font-bold">ColPage 双列布局组件</span>
      <Tag color="hsl(var(--destructive))">Alpha</Tag>

      

    </template>
    <template #extra>
        <Button type="primary" @click="parseDocx()">解析文档</Button>
    </template>

    <template #left="{ isCollapsed, expand }">
      <Page auto-content-height>
      <div
        id="container"
      >
      </div>
      </Page>
    </template>
    <Card class="ml-2 question-nz-content" title="试卷解析">
      <Page auto-content-height>
      <div
        id="paperhtml"
        class="questionContent"
      >
      </div>
      </Page>
    </Card>
  </ColPage>
</template>
