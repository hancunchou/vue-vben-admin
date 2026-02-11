import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'mdi:source-repository-multiple',
      order: 2,
      title: $t('page.tiku.title'),
    },
    name: 'tiku',
    path: '/tiku',
    children: [
      {
        name: 'Question',
        path: '/question',
        component: () => import('#/views/tiku/question/index.vue'),
        meta: {
          affixTab: true,
          icon: 'tabler:math-pi-divide-2',
          title: $t('page.tiku.questionList'),
        },
        children: [],
      },
      {
        name: 'Add',
        path: '/add',
        component: () => import('#/views/tiku/question/add.vue'),
        meta: {
          affixTab: true,
          icon: 'fluent:add-12-filled',
          title: $t('page.tiku.questionAdd'),
        },
      },
      {
        name: 'QuestionType',
        path: '/question_type',
        component: () => import('#/views/tiku/questiontype/index.vue'),
        meta: {
          affixTab: true,
          icon: 'tabler:math-pi-divide-2',
          title: $t('page.tiku.question_type'),
        },
        children: [],
      },
      {
        name: 'AddQuestionType',
        path: '/add_question_type',
        component: () => import('#/views/tiku/questiontype/add.vue'),
        meta: {
          affixTab: true,
          icon: 'fluent:add-12-filled',
          title: $t('page.tiku.addQuestionType'),
        },
      },
      
    ],
  },
];

export default routes;
