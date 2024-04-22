---
title: 测试平台开发 - httprunner 入门
categories:
  - 学习笔记
tags:
  - 测试平台开发
abbrlink: 2c2f779e
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-67.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#000000'
---

## 一、 httpRunner

HttpRunner ： 一款面向 HTTP（s） 协议的通用测试框架，只需要编写和维护一份 YAML/JSON 脚本，即可实现自动化测试、性能测试、线上监控、持续集成等多种测试需求。

充分复用优秀的开源项目，不追求重复造轮子，而是将强大的轮子组装。

遵循 约定大于配置 的准则，在框架功能中融入自动化测试最佳工程实践。

追求投入产出比，一份投入即可实现多种测试需求。

### 1. 特征

- 支持以 YAML/JSON 格式定义测试用例
- 支持响应验证
- 支持初始化清除机制
- 支持套件级别的用例管理
- 支持 Pytest 命令（hrun 底层封装的 pytest）
- 支持 allure 生成测试报告
- 支持 性能测试 （底层 Locust）

### 2. 主流版本差异

![](https://img.pupper.cn/img/20220726095628.png)

## 二、 HttpRunner 安装

httpRunner 使用 python 开发， 支持 Python 3.6 + 和大多数操作系统

安装：

```shell
pip install httpRunner
```

验证：

```shell
httprunner -V

hrun -V
```

#### 五大核心命令：

- `httprunner` ： 主命令，用于所有功能

- `hrun` ： 别名 `httpRunner run` ， 用于运行 YAML/JSON/pytest 测试用例

- `hmake` ： 别名 `httpRunner make` ， 用于将 YAML/JSON 测试案例转换为 pytest 文件

- `har2case` : 别名 `httprunner har2case` ， 用于将 Har 转换为 YAML/JSON 测试用例

  ```shell
  生成 pytest 文件
  har2case xxx.har

  生成 YAML 文件
  har2case -2y xxx.har

  生成 Json 文件
  har2case -2j xxx.har
  ```

- `locusts` ： 用于运行性能测试

## 三、 用例结构 整体结构

### 1. 用例结构 -- config

`config` ： 每个测试用例都必须有的 config 部分，可以配置用例

- 必填项：
  - `name` ： 测试用例的名称，将在 log 和报告中展示
- 选填项
  - base_url（可选） 测试用例中的通用 Host
  - variables（可选） 定义的全局变量，作用域为整个用例
  - parameters（可选） 全局参数，用于实现数据化驱动，作用域为整个用例。
  - verify（可选） 指定是否验证服务器的 TLS 证书
  - export（可选） 指定输出的测试用例变量

### 2. 用例结构 -- teststeps

`teststeps` ： 包含测试步骤相关信息，其中步骤可以引用其他测试用例

- 必填项：
  - name ： 测试步骤的名称，将在 log 和报告中展示
  - request ： 镶嵌字段， 包含请求信息
- 选填项：
  - extract 提取接口响应信息
  - validate
  - hooks

## 四、 生成用例

### 1. 测试用例结构

在 httprunner 中，测试用例组织主要基于三个概念：

- 测试用例集(testsuite): 对应一个 YAML/JSON/Python 文件，包含单个或多个测试用例文件。
- 测试用例(testcase): 对应一个 YAML/JSON/Python 文件，包含单个或多个测试步骤。
- 测试步骤(teststep): 对应 YAML/JSON/Python 中 teststeps 下的一个节点，描述单次接口测试的全
  部内容，包括发起接口请求、解析响应结果、检验结果等。

对于单个 YAML 文件来说，数据存储结构为 list of dict 的形式，其中可能包含一个全局配置项
(config)和若干个测试步骤。

具体地： _ config: 作为整个测试用例的全局配置项 _ 测试步骤：对应单个测试步骤(teststep)，测试用
例存在顺序关系，运行时将从前往后依次运行各个测试步骤。

```yaml
config:
	...
teststeps:
	- # step 1
		...
	- # step 2
		...
```

### 2. 录制用例（使用抓包工具）

fiddler 抓包，生成 har 文件，放到 har 目录中，File > Export Sessions > Selected Sessions >
httparchive v1.2

![](https://img.pupper.cn/img/20220726095656.png)

![](https://img.pupper.cn/img/20220726095718.png)

```shell
har2case -2y xxx.har
```

### 3. 编程测试用例

hr3 支持 python 代码，yaml, json 三种格式用例，以 yml 格式为例，只需要遵循一定规则，就可以写出
符合 hr3 标准的用例

```yaml
config: # 用例配置区
  name: 列出课程测试
  base_url: http://120.55.190.222:7080
  verify: false # 非 https 模式

teststeps: # 测试步骤 -- 对应数据类型：列表
  - name: 登录
    request:
      method: POST
      url: /api/mgr/loginReq
      data:
        username: auto
        password: sdfsdfsdf
    extract:
      cookie: cookies.sessionid
  - name: 步骤1 - 列出课程
    request:
      cookies:
        sessionid: ${cookie}
      method: GET
      url: /api/mgr/sq_mgr/
      params:
        action: list_course
        pagenum: 1
        pagesize: 20

    validate:
      - eq:
          - status_code
          - 200
      - eq:
          - body.retcode
          - 0
```

将该文件保存为 case1.yml, 进入该文件所在目录运行测试用例

```shell
hrun case1.yml
```

## 五、 案例 增、删、改

### 1. 登录

```yaml
config:
  name: 登录
  base_url: http://120.55.190.222:7080
  verify: false
  export:
    - cookie

teststeps:
  - name: 登录
    request:
      method: POST
      url: /api/mgr/loginReq
      data:
        username: auto
        password: sdfsdfsdf
    extract:
      cookie: cookies.sessionid
```

### 2. 增加课程

```yaml
config:
  name: 增加课程
  base_url: http://120.55.190.222:7080
  verify: false
  export:
    - course_id
    - cookie

teststeps:
  - name: 登录
    testcase: login.yml

  - name: 课程增加
    request:
      method: POST
      url: /api/mgr/sq_mgr/
      cookies:
        sessionid: ${cookie}
      data:
        action: add_course
        data: '{"name":"高中物理","desc":"物理","display_idx":222}'
    extract:
      course_id: body.id
    validate:
      - eq: ['status_code', 200]
      - eq: ['body.retcode', 0]
```

### 3. 修改课程

```yaml
config:
  name: 修改课程
  verify: false
  base_url: http://120.55.190.222:7080
  export:
    - course_id
    - cookie

teststeps:
  - name: 添加课程
    testcase: add_course.yml

  - name: 修改课程
    request:
      method: PUT
      url: /api/mgr/sq_mgr/
      cookies:
        sessionid: ${cookie}
      data:
        action: modify_course
        id: ${course_id}
        newdata: '{"name":"高中物理（修改）","desc":"物理（修改）","display_idx":222}'
    validate:
      - eq: ['status_code', 200]
      - eq: ['body.retcode', 0]
```

### 4. 删除课程

```yaml
config:
  name: 删除课程
  verify: false
  base_url: http://120.55.190.222:7080

teststeps:
  - name: 修改课程
    testcase: update_course.yml

  - name: 删除课程
    request:
      method: DELETE
      url: /api/mgr/sq_mgr/
      cookies:
        sessionid: ${cookie}
      data:
        action: delete_course
        id: ${course_id}
    validate:
      - eq: ['status_code', 200]
      - eq: ['body.retcode', 0]
```
