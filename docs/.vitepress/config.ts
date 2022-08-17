import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Nest.js',
  description: 'Vite & Vue powered static site generator.',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/guide/restful',
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
    { text: '快速开始', items: [{ text: 'RestFul', link: '/guide/restful' }] },
    {
      text: 'Prisma',
      items: [
        { text: 'cli', link: '/prisma/cli' },
        { text: 'schema', link: '/prisma/schema' },
        { text: 'relations', link: '/prisma/relations' },
        { text: 'client', link: '/prisma/client' },
        { text: 'Migrate', link: '/prisma/migrate' },
      ],
    },
  ];
}
