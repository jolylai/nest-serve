import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Nest.js',
  description: 'Vite & Vue powered static site generator.',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/guide/index',
        activeMatch: '^/guide/',
      },
    ],
    sidebar: {
      '/guide/': getGuideSidebar(),
    },
  },
});

function getGuideSidebar() {
  return [
    {
      text: '简介',
      items: [
        { text: '快速开始', link: '/guide/index' },
        { text: 'RestFul', link: '/guide/restful' },
      ],
    },
    {
      text: '安全',
      items: [{ text: 'authentication', link: '/guide/authentication' }],
    },
    {
      text: 'Prisma',
      items: [
        { text: 'cli', link: '/prisma/cli' },
        { text: 'CRUD', link: '/prisma/crud' },
        { text: 'schema', link: '/prisma/schema' },
        { text: 'relations', link: '/prisma/relations' },
        { text: 'client', link: '/prisma/client' },
        { text: 'Migrate', link: '/prisma/migrate' },
      ],
    },
  ];
}
