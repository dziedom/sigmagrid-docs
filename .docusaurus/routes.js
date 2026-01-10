import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/dashboard',
    component: ComponentCreator('/dashboard', '857'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'f47'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '0dc'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '028'),
            routes: [
              {
                path: '/docs/agents',
                component: ComponentCreator('/docs/agents', 'bf8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/api-reference',
                component: ComponentCreator('/docs/api-reference', '0a0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/erc8004',
                component: ComponentCreator('/docs/erc8004', 'de3'),
                exact: true
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
