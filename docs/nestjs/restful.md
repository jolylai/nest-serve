# RESTful 规范

## 版本号

和其他所有应用一样，我们的 API 也需要迭代、更新功能，所以给我们的 API 制定版本十分重要。
这样做最大的优势是当我们在创建新功能的时候并不影响客户端继续运行旧版本。
我们并不强迫用户直接使用我们的新版本，用户可以继续使用旧的版本，直到新版本稳定后再迁移到新版本。
当下版本和新版本并行运行，互不干扰。

#### 1.1 接口路径以 /api 或 /[version]/api 开头

正确：/api/tasks 或 /v2/api/tasks
错误：/biz/tasks 或 /biz/api/tasks
注意：一个产品无论后端有多少个服务组成也应该只有一个 API 入口

#### 1.2 接口路径以 api/aa-bb/cc-dd 方式命名

正确：/api/task-groups
错误：/api/taskGroups

#### 1.3 接口路径使用资源名词而非动词，动作应由 HTTP Method 体现，资源组可以进行逻辑嵌套

正确：POST /api/tasks 或 /api/task-groups/1/tasks 表示在 id 为 1 的任务组下创建任务
错误：POST /api/create-task

#### 1.4 接口路径中的资源使用复数而非单数

正确：/api/tasks
错误：/api/task

#### 1.5 接口设计面向开放接口，而非单纯前端业务

要求我们在给结构路径命名时候面向通用业务的开放接口，而非单纯前端业务，以获取筛选表单中的任务字段下拉选项为例
正确：/api/tasks
错误：/api/task-select-options
虽然这个接口暂时只用在表单的下拉选择中，但是需要考虑的是在未来可能会被用在任意场景，因此应以更通用方式提供接口交由客户端自由组合

## 响应数据

#### 响应通用字段

所有接口响应值采用 json 格式， 如无特殊说明，每次请求的返回值中，都包含下面字段：

| 参数名称 | 类型   | 描述                                                                                                                                                          |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code     | Number | 接口调用状态，200:正常，其他值：调用出错，返回码见 [响应返回码](https://support.dun.163.com/documents/287305921855672320?docId=289953034527756288#returnCode) |
| msg      | String | 结果说明，如果接口调用出错，那么返回错误描述，成功返回 ok                                                                                                     |
| data     | String | 接口返回结果，各个接口自定义                                                                                                                                  |

#### 响应返回码

当响应返回码（code）不为 200 时， 表示请求未正常执行，返回码描述 (msg) 对该结果进行了细化补充，用户可根据返回码判断 API 的执行情况。
所有接口调用返回值均包含 code 和 msg 字段， code 为返回码值，msg 为返回码描述信息，返回码表如下：

| 返回码 | 返回码描述          | 说明                                                              |
| ------ | ------------------- | ----------------------------------------------------------------- |
| 200    | ok                  | 接口调用成功                                                      |
| 400    | bad request         | 请求缺少 secretId 或 businessId                                   |
| 401    | forbidden           | secretId 或 businessId 错误                                       |
| 405    | param error         | 请求参数异常                                                      |
| 410    | signature failure   | 签名验证失败，请重新参考 demo 签名代码                            |
| 420    | request expired     | 请求过期                                                          |
| 429    | too many requests   | 次数超限                                                          |
| 430    | replay attack       | 重放攻击                                                          |
| 440    | decode error        | 解密错误                                                          |
| 450    | wrong token         | token 错误                                                        |
| 503    | service unavailable | 服务不可用                                                        |
| 507    | balance not enough  | 套餐余量不足                                                      |
| 508    | rate limit          | QPS 超限                                                          |
| 1002   | other errors        | 其他错误(运营商取号网络超时, 用户手机号无法识别等),请联系客服处理 |

#### 不分页数据

```json
{
  "code": 20000,
  "status": 200,
  "message": "请求成功",
  "data": {
    "id": 1,
    "name": "任务 1"
  }
}
```

#### 分页数据

```json
{
  code: 20000,
  status: 200,
  message: '请求成功',
  data: {
    list: [
      {
        id: 1,
        name: '任务 1',
      },
      {
        id: 2,
        name: '任务 2',
      },
    ],
    total: 2,
  },
};
```

#### 参数错误

参数错误以数组形式返回，并附带用户友好的提示

```json
{
  "code": 40000,
  "status": 400,
  "message": "参数错误",
  "data": {
    "errors": [
      {
        "field": "name",
        "message": "缺失"
      }
    ]
  }
}
```

## 创建类接口

创建完成后直接返回 id

```javascript
{
  code: 20000,
  status: 200,
  message: "创建成功",
  data: {
     id: 1,
  }
}
```

## 查询类接口

#### 分页

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

```javascript
axios.get('/api/tasks', {
  params: {
    sort: 'created_at',
    order: 'descend',
  },
});
```

order 为 descend 时表示降序，为 ascend 时表示升序

## 文件类接口

对于要使用到文件的接口应该先上传文件后拿到 id 再进行操作

#### 单文件

统一提供单文件上传接口（/api/files），支持上传所有类型文件

```javascript
const formData = new FormData();
formData.append('file', File);

axios.post('https://httpbin.org/api/files', formData);
```

```json
{
  "code": 20000,
  "status": 200,
  "message": "上传成功",
  "data": {
    "id": "bb313c99",
    "url": "/files/bb313c99.pdf",
    // 或
    "url": "https://cdn.xxx.com/files/bb313c99.png",
    "name": "合同.pdf" // 原文件的名称
  }
}
```

响应的文件路径至少补全至根路径

#### 多文件上传

统一提供多文件上传接口（/api/multiple-files），支持上传所有类型文件

```javascript
const formData = new FormData();
formData.append('file', [File, File]);

axios.post('https://httpbin.org/api/multiple-files', formData);
```

```json
{
  "code": 20000,
  "status": 200,
  "message": "上传成功",
  "data": [
    {
      "id": "bb313c99",
      "url": "/files/bb313c99.pdf",
      "name": "合同1.pdf" // 原文件的名称
    },
    {
      "id": "bb313c88",
      "url": "/files/bb313c88.pdf",
      "name": "合同2.pdf" // 原文件的名称
    }
  ]
}
```

## 图表类接口

#### 曲线图、柱状图

```json
{
  code: 20000,
  status: 200,
  message: "请求成功",
  data: {
    x_axis: ['2022.04.20','2022.04.21', '2022.04.22']
    series: [{
      name: '上海用户'，
      data：[5000,4000,3000],
      color: '#f5f5f5' // 可选，如果加上的话会使用该色值
    }, {
      name: '成都用户'，
      data：[3000,4000,5000],  // 注意，没有数据时候也要使用 0 填充和 x_axis 一一对应
      color: '#f5f5f5'
    }]
  }
}
```

#### 饼图

```json
{
  "code": 20000,
  "status": 200,
  "message": "请求成功",
  "data": {
    "series": [
      {
        "name": "上线用户",
        "value": 1890,
        "color": "#f5f5f5" // 可选，如果加上的话会使用该色值
      },
      {
        "name": "下线用户",
        "value": 2000,
        "color": "#f5f5f5"
      }
    ]
  }
}
```
