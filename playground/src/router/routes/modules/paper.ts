import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'healthicons:i-exam-multiple-choice-outline',
      order: 1,
      title: $t('page.paper.title'),
    },
    name: 'paper',
    path: '/paper',
    children: [
      {
        name: 'Docx',
        path: '/docx',
        component: () => import('#/views/paper/docx/index.vue'),
        meta: {
          affixTab: true,
          icon: 'tabler:math-pi-divide-2',
          title: $t('page.paper.paperList'),
        },
        children: [],
      },
      {
        name: 'RawDoc',
        path: '/rawdoc',
        component: () => import('#/views/paper/rawdoc/index.vue'),
        meta: {
          affixTab: true,
          icon: 'tabler:math-pi-divide-2',
          title: $t('page.paper.rawdocList'),
        },
        children: [],
      },
      
    ],
  },
];

export default routes;
