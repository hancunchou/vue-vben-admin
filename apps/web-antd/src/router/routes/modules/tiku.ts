import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'arcticons:math-wiki',
      order: -1,
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
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.dashboard.workspace'),
        },
      },
    ],
  },
];

export default routes;
