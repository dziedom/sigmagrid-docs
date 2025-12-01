import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '344'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'bfa'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'eb0'),
            routes: [
              {
                path: '/docs/api-reference',
                component: ComponentCreator('/docs/api-reference', '0a0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/fields',
                component: ComponentCreator('/docs/fields', '94a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', 'a6e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/pricing',
                component: ComponentCreator('/docs/pricing', 'b35'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/purpose',
                component: ComponentCreator('/docs/purpose', 'bf5'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
