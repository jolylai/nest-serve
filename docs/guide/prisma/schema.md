# Prisma schema

Prisma 配置文件通常命名为 schema.prisma 包含以下三个部分

1. datasource: 指定连接到数据库的详情
2. generator: 指定基于 model 生成对应的客户端
3. model: 定义应用的 model 和 关联关系

```schema
model User {
  id        Int           @id @default(autoincrement())
  name      String
  password  String
  address   UserAddress[]

  createdAt DateTime      @default(now()) @map("created_at")
  createdBy DateTime      @default(now()) @map("created_at")
  updatedAt DateTime      @updatedAt @map("updated_at")

  @@map("user")
}
```
