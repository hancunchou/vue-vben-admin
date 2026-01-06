<script setup lang="ts">
import type { Editor as TinyMCEEditor } from 'tinymce';

import { ref, watch } from 'vue';

import Editor from '@tinymce/tinymce-vue';

// import { upload_image } from '#/api/file';

interface BlobInfo {
  base64: () => string;
  blob: () => File;
  blobUri: () => string;
  filename: () => string;
  id: () => string;
  name: () => string;
  uri: () => string | undefined;
}
type ProgressFn = (percent: number) => void;

const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;
const toolbar = [
  'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
  'link image | preview fullscreen | forecolor backcolor emoticons',
];

const editorId = `tinymce-editor-${Math.random().toString(36).slice(-6)}`;
const editorRef = ref<null | TinyMCEEditor>(null);
const isDisabled = ref(false);
const isInit = ref(false);

const model = defineModel<string>();

// 核心配置
const editorInit = {
  width: '100%',
  height: 400,
  language: 'zh_CN',
  language_url: 'https://cdn.tiny.cloud/1/no-api-key/tinymce/7/langs/zh_CN.js', // 语言包路径
  menubar: 'edit view insert format tools table',
  plugins: ['code', 'link', 'table', 'image', 'preview', 'fullscreen', 'emoticons'],
  toolbar,
  placeholder: '请输入内容...',
  // 图片上传配置
  images_upload_handler: (blobInfo: BlobInfo, progress: ProgressFn) => {
    return new Promise((resolve, reject) => {
      // 这里替换为你的实际上传接口
      // upload_image({
      //   file: blobInfo.blob(),
      //   onSuccess: (res) => {
      //     resolve(res);
      //   },
      //   onProgress: ({ percent }) => {
      //     // 上传进度回调
      //     progress(percent);
      //   },
      //   onError: (error) => {
      //     // 失败时调用failure并传入错误信息
      //     reject(error);
      //   },
      // });
    });
  },
};

watch(
  () => model.value,
  (value: any) => {
    // 正确触发表单重置操作
    if (isInit.value && !value) {
      editorRef.value?.resetContent();
    }
  }
);

// 编辑器初始化完成
const handleInit = ({ target }: { target: TinyMCEEditor }) => {
  isInit.value = true;
  editorRef.value = target;
};

// 错误处理
const handleError = (error: Error) => {
  console.error('编辑器错误', error);
};
</script>

<template>
  <div class="w-full">
    <div v-if="!isInit" class="text-gray-600">编辑器初始化中...</div>
    <Editor
      :style="{ opacity: !isInit ? 0 : 1 }"
      v-model="model"
      :api-key="apiKey"
      :id="editorId"
      :init="editorInit"
      :disabled="isDisabled"
      @init="handleInit"
      @error="handleError"
    />

    <!-- tinymceScriptSrc="https://cdn.tiny.cloud/1/no-api-key/tinymce/8.3.1-116/tinymce.min.js" -->
  </div>
</template>
<style>
.tox-promotion,
.tox-statusbar__right-container {
  display: none !important;
}
</style>
