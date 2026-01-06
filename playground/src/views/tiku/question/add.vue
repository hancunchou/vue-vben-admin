<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, TabPane, Tabs } from 'ant-design-vue';
import { useVbenForm } from '#/adapter/form';
import { getSubject } from '#/api/tiku/subject';
import { addQuestinBaseInfo, getQuestionTypes } from '#/api/tiku/question';

import { GradesConfig } from '#/config/study';
import { message } from 'ant-design-vue';

const activeKey = ref('1');
const grades = ref([]);
const subjects = ref([]);
const questionTypes = ref([]);

const [CustomLayoutForm, formApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  handleSubmit: onSubmitQuestionBaseInfo,
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
      component: 'ApiSelect',
      fieldName: 'educationalLevel',
      label: '学段',

      componentProps: (values, form) => {
        return {
          allowClear: true,
          filterOption: true,

          options: [
            {
              label: '小学',
              value: '1',
            },
            {
              label: '初中',
              value: '2',
            },
            {
              label: '高中',
              value: '3',
            },
          ],
          placeholder: '学段',
          showSearch: false,
          onChange: async (e: any) => {
            const level: Number = e;
            if (level > 0) {
              grades.value = GradesConfig[level - 1];
              form.setFieldValue('grade', '');
            }
          },
        };
      },
    },
    {
      component: 'ApiSelect',
      fieldName: 'grade',
      label: '年级',
      componentProps: (values, form) => {
        return {
          allowClear: true,
          filterOption: true,
          placeholder: '请选择',
          options: grades,
          onChange: async (e: any) => {
            const data = await getSubject(e);
            subjects.value = data;
          },
        };
      },
    },
    {
      component: 'Select',
      fieldName: 'subject',
      label: '科目',
      componentProps: (values, form) => {
        return {
          allowClear: true,
          filterOption: true,
          placeholder: '科目',
          options: subjects,
          onChange: async (e: any) => {
            const data = await getQuestionTypes(values.grade, values.subject);
            questionTypes.value = data;
          },
        };
      },
      dependencies: {
        trigger(values, form) {
          form.setFieldValue('subject', '');
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['educationalLevel'],
      },
    },
    {
      component: 'Select',
      fieldName: 'questionTypeId',
      label: '题型',
      componentProps: (values, form) => {
        return {
          allowClear: true,
          filterOption: true,
          placeholder: '题型',
          options: questionTypes,
        };
      },
      dependencies: {
        trigger(values, form) {
          form.setFieldValue('questionTypeId', '');
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['subject'],
      },
    },

    {
      component: 'Select',
      fieldName: 'difficulty',
      label: '难度',
      value: 1,

      componentProps: {
        options: [
          {
            label: '简单',
            value: 1,
          },
          {
            label: '中等',
            value: 2,
          },
          {
            label: '中高',
            value: 3,
          },
          {
            label: '困难',
            value: 4,
          },
          {
            label: '高难',
            value: 5,
          },
        ],
      },
      formItemClass: 'col-span-1 items-baseline',
    },
    {
      component: 'InputNumber',
      fieldName: 'score',
      label: '分值',
      value: 2,
      formItemClass: 'col-span-1 items-baseline',
      componentProps: {
        min: 1,
        max: 100,
      },
    },

    {
      component: 'Editor',
      fieldName: 'contentHtml',
      componentProps: {},
      // 占满三列空间 基线对齐
      formItemClass: 'col-span-4 items-baseline',
      label: '内容',
    },
  ],
  // 一共三列
  // 大屏一行显示4个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
});

const [SyncForm] = useVbenForm({
  schema: [
    {
      component: 'Input',
      // 字段名
      fieldName: 'field1',
      // 界面显示的label
      label: '字段1',
    },
    {
      component: 'Input',
      componentProps: {
        disabled: true,
      },
      dependencies: {
        trigger(values, form) {
          form.setFieldValue('field2', values.field1);
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['field1'],
      },
      // 字段名
      fieldName: 'field2',
      // 界面显示的label
      label: '字段2',
    },
  ],
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
});

async function onSubmitQuestionBaseInfo(values: Record<string, any>) {
  const data = await addQuestinBaseInfo(values);
  message.info('保存成功');
}
</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="添加题目到题库，题目要求详细"
    title="添加题目"
  >
    <template #description>
      <div class="text-muted-foreground">
        <p>添加题目到题库，题目要求详细</p>
      </div>
    </template>
    <template #extra>
      <DocButton class="mb-2" path="/components/common-ui/vben-form" />
    </template>

    <Card>
      <Tabs v-model:active-key="activeKey">
        <TabPane tab="题目信息" key="1">
          <CustomLayoutForm />
        </TabPane>
        <TabPane tab="地区信息" key="2">
          <Form />
        </TabPane>
        <TabPane tab="视频讲解" key="3">
          <Form />
        </TabPane>
      </Tabs>
    </Card>
  </Page>
</template>
