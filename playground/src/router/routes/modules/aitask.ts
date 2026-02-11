import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ri:ai',
      order: 4,
      title: $t('page.aitask.title'),
    },
    name: 'aitask',
    path: '/aitask',
    children: [
      {
        name: 'Aitask',
        path: '/aitask',
        component: () => import('#/views/aitask/index.vue'),
        meta: {
          affixTab: true,
          order: -1,
          icon: 'tabler:math-pi-divide-2',
          title: $t('page.aitask.aitasklist'),
        },
        children: [],
      },
    ],
  },
];

export default routes;
