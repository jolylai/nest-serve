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
        { text: 'cli', link: '/guide/prisma/cli' },
        { text: 'schema', link: '/guide/prisma/schema' },
        { text: 'relations', link: '/guide/prisma/relations' },
        { text: 'client', link: '/guide/prisma/client' },
        { text: 'Migrate', link: '/guide/prisma/migrate' },
      ],
    },
  ];
}
