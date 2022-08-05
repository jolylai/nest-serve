## @prisma/client

Prisma Client 会根据数据模型自动生成数据库客户端 ，默认 Prisma Client 生成在 `node_modules/.prisma/client` 文件夹下
![image.png](https://cdn.nlark.com/yuque/0/2022/png/226152/1648027517122-d3149a4b-ba71-4e82-b674-5300f2ffbd33.png#clientId=uc9bf9cc4-199d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=211&id=u5bd6a68a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=422&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=69710&status=done&style=none&taskId=u1b24a65c-3124-4893-9830-400c22ef637&title=&width=800)

1. 安装 Prisma CLI 和 `@prisma/client` 包

```bash
yarn add prisma @prisma/client
```

2. 在 `schema.prisma` 添加 `generator` 定义

```typescript
generator client {
  provider = "prisma-client-js"
}
```

3. 使用以下命令生成 Prisma Client

```shell
npx prisma generate
```

对 Prisma schema 更新之后都需要重新执行以上命令来更新 Prisma Client 的代码

4. 在代码中实例化 Prisma Client

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your D
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/226152/1648028812297-063f1d96-c06a-4158-9c64-714d931f572d.png#clientId=uf22cd7a7-2a15-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=566&id=u205acf0d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=460&originWidth=650&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45233&status=done&style=none&taskId=u07742d89-c213-414c-ac0a-7b7472aa4bd&title=&width=800)
`@prisma/client` 包由两部分组成

1. `@prisma/client` 自身包，只用在重新安装后才会改变
1. `.prisma/client` 文件夹，存储根据模型生成的唯一的客户端数据

`@prisma/client/index.d.ts` exports `.prisma/client`

```typescript
export * from '.prisma/client';
```

这样就就可以仍然在 `@prisma/client` 导入

```typescript
import { PrismaClient } from '@prisma/client';
```

## 查询

- Use the take query option to get the number of items you need
- Use the select query option to get the fields that you need
- Use the include query option if you have any relations you'd also like to add. (e.g a User might have some Posts, where Posts is a separate model but associated to a User ID).
