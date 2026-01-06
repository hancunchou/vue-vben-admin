<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, TabPane, Tabs } from 'ant-design-vue';
import { useVbenForm } from '#/adapter/form';
import { getSubject } from '#/api/tiku/subject';

import { GradesConfig } from '#/config/study';
import { message } from 'ant-design-vue';
import { addQuestinType } from '#/api/tiku/question';

const activeKey = ref('1');
const grades = ref([]);
const subjects = ref([]);
const [CustomLayoutForm, formApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  handleSubmit: onSubmitQuestionType,
  schema: [
    
    {
      component: 'Input',
      dependencies: {
        if(values) {
          return !!0;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['id'],
      },
      // 字段名
      fieldName: 'id',
      defaultValue: 0,
      // 界面显示的label
    },
    {
      component: 'Input',
      fieldName: 'title',
      label: '题型',
      formItemClass: 'col-span-1 items-baseline',
    },
    {
      component: 'Input',
      fieldName: 'desc',
      label: '说明',
      formItemClass: 'col-span-2 items-baseline',
    },
    {
      component: 'Select',
      componentProps: {
        mode: 'multiple',
        name: 'cname',
        options: [...GradesConfig[0],...GradesConfig[1],...GradesConfig[2]],
      },
      fieldName: 'grades',
      value:[1,2,3,4,5,6,7,8,9,10,11,12],
      label: '年级',
       formItemClass: 'col-span-3 items-baseline',
    },
    
    {
      component: 'RadioGroup',
      value: 1,
      componentProps: {
        options: [
          {
            label: '客观题',
            value: 1,
          },
          {
            label: '主观题',
            value: 2,
          },
        ],
      },
      fieldName: 'objective',
      label: '主客观',
      formItemClass: 'col-start-1 items-baseline',

    },
    {
      component: 'ApiSelect',
      fieldName: 'subjects',
      label: '科目',
      value:[1,2,3,4,5,6,7,8],
      componentProps: {
        mode: 'multiple',
        name: 'subject',
        api: async () => {
          const res = await getSubject(0);
          return res;
        },
      },
      formItemClass: 'col-span-3 col-start-1  items-baseline',
    },

    {
      component: 'Textarea',
      fieldName: 'desc',
      formItemClass: 'col-span-3  items-baseline',
      label: '问题描述',
      componentProps: {
        Rows:4
      }
    },
     {
      component: 'Divider',
      fieldName: '_divider',
      formItemClass: 'col-span-4',
      hideLabel: true,
    },
  ],
  // 一共三列
  // 大屏一行显示4个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
});

function  onSubmitQuestionType(values: Record<string, any>) {
   addQuestinType(values)
}


</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="添加题型，题型模板"
    title="添加题型"
  >
 
    <template #extra>
      <DocButton class="mb-2" path="/components/common-ui/vben-form" />
    </template>

    <Card>
       <CustomLayoutForm />
    </Card>
  </Page>
</template>
