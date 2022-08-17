# Relations

## 一对一关联

每条记录最多只能有有一条关联的数据。比如每个用户只能有一个配置文件

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  // relation scalar field (used in the `@relation` attribute above)
  userId Int  @unique
}
```

userId 关系标量是基础数据库中外键的直接表示形式。

- 一个用户可以有 0 或 1 个配置文件
- 一个配置文件必须关联到一个用户

您需要使用 `@unique` 属性标记字段，以确保只有一个用户连接到每个配置文件。

```sql
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY
);
CREATE TABLE "Profile" (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL UNIQUE,
    FOREIGN KEY ("userId") REFERENCES "User"(id)
);
```

注意有 `UNIQUE` 约束 `userId` 外键，不然就成了 1-n 的关联

### 多字段关联

```prisma
model User {
  firstName String
  lastName  String
  profile   Profile?

  @@id([firstName, lastName])
}

model Profile {
  id            Int    @id @default(autoincrement())
  user          User   @relation(fields: [userFirstName, userLastName], references: [firstName, lastName])
  userFirstName String // relation scalar field (used in the `@relation` attribute above)
  userLastName  String // relation scalar field (used in the `@relation` attribute above)

  @@unique([userFirstName, userLastName])
}
```

## 一对多关联

一条记录可以关联 0 或 多条记录，比如一个用户可以有零个或多个帖子

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}
```

- 一个用户可以有零个或多个帖子
- 一个帖子必须有一个作者

## 多对多关联

在关系数据库中，m-n-关系通常通过关系表建模。m-n-relations 在 Prisma 模式中可以是显式的，也可以是隐式的。
