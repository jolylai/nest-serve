import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Nest.js',
  description: 'Vite & Vue powered static site generator.',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/guide/prisma/schema',
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
    // { text: '快速开始', link: '/guide/getting-started' },
    {
      text: 'Prisma',
      items: [
        { text: 'cli', link: '/nestjs/prisma/cli' },
        { text: 'schema', link: '/nestjs/prisma/schema' },
        { text: 'relations', link: '/nestjs/prisma/relations' },
        { text: 'client', link: '/nestjs/prisma/client' },
        { text: 'Migrate', link: '/nestjs/prisma/migrate' },
      ],
    },
  ];
}
