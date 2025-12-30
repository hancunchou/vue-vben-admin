<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, TabPane, Tabs } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getSubject } from '#/api/tiku/subject';
import { GradesConfig } from '#/config/study';

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
  schema: [
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
            subjects.value=data
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
         }
      },
      dependencies: {
        trigger(values, form) {
          form.setFieldValue('subject', '');
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['educationalLevel'],
      },
    },

    // {
    //   component: 'Textarea',
    //   fieldName: 'field6',
    //   // 占满三列空间 基线对齐
    //   formItemClass: 'col-span-2 items-baseline',
    //   label: '内容',
    // },
    // {
    //   component: 'Input',
    //   fieldName: 'field7',
    //   // 占满2列空间 从第二列开始 相当于前面空了一列
    //   formItemClass: 'col-span-2 col-start-2',
    //   label: '占满2列',
    // },
    // {
    //   component: 'Input',
    //   fieldName: 'field8',
    //   // 左右留空
    //   formItemClass: 'col-start-2',
    //   label: '左右留空',
    // },
    // {
    //   component: 'InputPassword',
    //   fieldName: 'field9',
    //   formItemClass: 'col-start-1',
    //   label: '字符串',
    // },
  ],
  // 一共三列
  // 大屏一行显示4个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
});

// const [Form, formApi] = useVbenForm({
//   // 提交函数
//   handleSubmit: onSubmit,
//   schema: [
//     {
//       component: 'Input',
//       defaultValue: 'hidden value',
//       dependencies: {
//         show: false,
//         // 随意一个字段改变时，都会触发
//         triggerFields: ['field1Switch'],
//       },
//       fieldName: 'hiddenField',
//       label: '隐藏字段',
//     },
//     {
//       component: 'Switch',
//       defaultValue: true,
//       fieldName: 'field1Switch',
//       help: '通过Dom控制销毁',
//       label: '显示字段1',
//     },
//     {
//       component: 'Switch',
//       defaultValue: true,
//       fieldName: 'field2Switch',
//       help: '通过css控制隐藏',
//       label: '显示字段2',
//     },
//     {
//       component: 'Switch',
//       fieldName: 'field3Switch',
//       label: '禁用字段3',
//     },
//     {
//       component: 'Switch',
//       fieldName: 'field4Switch',
//       label: '字段4必填',
//     },
//     {
//       component: 'Input',
//       dependencies: {
//         if(values) {
//           return !!values.field1Switch;
//         },
//         // 只有指定的字段改变时，才会触发
//         triggerFields: ['field1Switch'],
//       },
//       // 字段名
//       fieldName: 'field1',
//       // 界面显示的label
//       label: '字段1',
//     },
//     {
//       component: 'Input',
//       dependencies: {
//         show(values) {
//           return !!values.field2Switch;
//         },
//         triggerFields: ['field2Switch'],
//       },
//       fieldName: 'field2',
//       label: '字段2',
//     },
//     {
//       component: 'Input',
//       dependencies: {
//         disabled(values) {
//           return !!values.field3Switch;
//         },
//         triggerFields: ['field3Switch'],
//       },
//       fieldName: 'field3',
//       label: '字段3',
//     },
//     {
//       component: 'Input',
//       dependencies: {
//         required(values) {
//           return !!values.field4Switch;
//         },
//         triggerFields: ['field4Switch'],
//       },
//       fieldName: 'field4',
//       label: '字段4',
//     },
//     {
//       component: 'Input',
//       dependencies: {
//         rules(values) {
//           if (values.field1 === '123') {
//             return 'required';
//           }
//           return null;
//         },
//         triggerFields: ['field1'],
//       },
//       fieldName: 'field5',
//       help: '当字段1的值为`123`时，必填',
//       label: '动态rules',
//     },
//     {
//       component: 'Select',
//       componentProps: {
//         allowClear: true,
//         class: 'w-full',
//         filterOption: true,
//         options: [
//           {
//             label: '选项1',
//             value: '1',
//           },
//           {
//             label: '选项2',
//             value: '2',
//           },
//         ],
//         placeholder: '请选择',
//         showSearch: true,
//       },
//       dependencies: {
//         componentProps(values) {
//           if (values.field2 === '123') {
//             return {
//               options: [
//                 {
//                   label: '选项1',
//                   value: '1',
//                 },
//                 {
//                   label: '选项2',
//                   value: '2',
//                 },
//                 {
//                   label: '选项3',
//                   value: '3',
//                 },
//               ],
//             };
//           }
//           return {};
//         },
//         triggerFields: ['field2'],
//       },
//       fieldName: 'field6',
//       help: '当字段2的值为`123`时，更改下拉选项',
//       label: '动态配置',
//     },
//     {
//       component: 'Input',
//       fieldName: 'field7',
//       label: '字段7',
//     },
//   ],
//   // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
//   wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
// });

const [SyncForm] = useVbenForm({
  handleSubmit: onSubmit,
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

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

function handleDelete() {
  formApi.setState((prev) => {
    return {
      schema: prev.schema?.filter((item) => item.fieldName !== 'field7'),
    };
  });
}

function handleAdd() {
  formApi.setState((prev) => {
    return {
      schema: [
        ...(prev?.schema ?? []),
        {
          component: 'Input',
          fieldName: `field${Date.now()}`,
          label: '字段+',
        },
      ],
    };
  });
}

function handleUpdate() {
  formApi.setState((prev) => {
    return {
      schema: prev.schema?.map((item) => {
        if (item.fieldName === 'field3') {
          return {
            ...item,
            label: '字段3-修改',
          };
        }
        return item;
      }),
    };
  });
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
        <TabPane tab="高级设置" key="2">
          <Form />
        </TabPane>
      </Tabs>
    </Card>
  </Page>
</template>
