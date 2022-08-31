import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Nest.js',
  description: 'Vite & Vue powered static site generator.',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: 'Node.js',
        link: '/nodejs/guide/getting-started',
        activeMatch: '^/nodejs/',
      },
      {
        text: 'Nest.js',
        link: '/nestjs/restful',
        activeMatch: '^/nestjs/',
      },
      {
        text: 'Prisma',
        link: '/prisma/crud',
        activeMatch: '^/prisma/',
      },
    ],
    sidebar: {
      '/nodejs/': getNodejsSidebar(),
      '/nestjs/': getNestjsSidebar(),
      '/prisma/': getPrismaSidebar(),
    },
  },
});

function getNodejsSidebar() {
  return [
    {
      text: '指南',
      items: [{ text: '快速开始', link: '/nodejs/guide/getting-started' }],
    },
    {
      text: 'IO 处理',
      items: [
        { text: '路径 path', link: '/nodejs/io/path/' },
        { text: 'buffer', link: '/nodejs/io/buffer' },
        { text: 'stream', link: '/nodejs/io/stream' },
        { text: 'fs', link: '/nodejs/io/fs' },
      ],
    },
    {
      text: 'Cli',
      items: [
        { text: '命令行参数', link: '/nodejs/cli/args' },
        { text: '环境变量', link: '/nodejs/cli/env' },
      ],
    },
  ];
}

function getNestjsSidebar() {
  return [
    { text: '快速开始', items: [{ text: 'RestFul', link: '/nestjs/restful' }] },
    {
      text: '安全',
      items: [{ text: 'authentication', link: '/nestjs/authentication' }],
    },
  ];
}

function getPrismaSidebar() {
  return [
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
