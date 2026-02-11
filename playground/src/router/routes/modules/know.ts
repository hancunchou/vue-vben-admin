import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'simple-icons:known',
      order: 3,
      title: $t('page.know.title'),
    },
    name: 'know',
    path: '/know',
    children: [
      {
        name: 'Know',
        path: '/know',
        component: () => import('#/views/know/index.vue'),
        meta: {
          affixTab: true,
          order: -1,
          icon: 'tabler:math-pi-divide-2',
          title: $t('page.know.list'),
        },
        children: [],
      },
    ],
  },
];

export default routes;
