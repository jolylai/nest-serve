# CRUD

## Read

#### 分页

不同的系统中分页信息的字段名称可能不同，但在同一个系统中应该规范使用相同的分页信息字段名称，在 Ant Design 中使用 `current` 和 `pageSize` 作为分页信息

```ts
import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly current: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly pageSize: number = 10;

  get skip(): number {
    return (this.current - 1) * this.pageSize;
  }

  get take(): number {
    return this.pageSize;
  }
}
```

#### 排序

返回的列表数据以某个字段，升序或者降序排序

```js
axios.get('/api/tasks', {
  params: {
    sort: 'created_at',
    order: 'descend',
  },
});
```

order 为 descend 时表示降序，为 ascend 时表示升序

## Field

```sql
SELECT * FROM `user`

```
