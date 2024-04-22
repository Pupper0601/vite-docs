---
title: 性能测试 - locust
categories:
  - 学习笔记
  - 软件测试
tags:
  - 性能测试
abbrlink: c5716248
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-58.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#37524f'
---

## 一、 安装 locust

```shell
pip install locust
```

#### 验证是否安装成功

```powershell
import locust
```

### 1. HttpUser(User)

在 User 类中，具有一个`client`属性，它对应着虚拟用户作为客户端所具备的请求能力。

- 继承 `HttpUser` 类。HttpUser 是最常用的用户类。它添加了一个`client`属性，用于发出 HTTP 请求。
  - 其 client 属性绑定了`HttpSession`类，而 HttpSession 又继承自`requests.Session`。
  - 通过 client 属性来使用`Python requests`库的所有方法，调用方式也与 requests 完全一致。
  - client 的方法调用之间就自动具有了`状态记忆`的功能, 从而后续 HTTP 请求操作都能带上登录态。

虽然 Locust 仅内置了对 HTTP/HTTPS 的支持，但它可以扩展到测试几乎任何系统。只需要基于 User 类实现 client 即可。
我们可以使用 [locust-plugins](https://github.com/SvenskaSpel/locust-plugins/) ，这个是第三方维护的库，支持 Kafka、mqtt，webdriver 等测试。

### 2. TaskSet

在 `TaskSet` 子类描述业务测试场景，对所有行为（任务）进行组织和描述，并可以对不同任务的权重进行配置

#### 采用 `@task` 装饰器

```Python
from locust import TaskSet, task

class MyTaskSet(TaskSet):
    def on_start(self):
        print("task is running")

    def on_stop(self):
        print("task is stopped")

    @task(2)
    def task1(self):
        print(f'task1: {self}')

    @task
    def task2(self):
        print(f'task2: {self}')
```

#### 采用 tasks 属性

可以使用 list，也可以使用 dict(使用字典时, 键为任务, 值为权重).

`on_start()`与`on_stop()`方法，分别重写父类的`TaskSet`的`on_start()`与`on_stop()`。分别在用户开始和停止执行此任务集时触发。

```Python
from locust import TaskSet, task

class MyTaskSet(TaskSet):
    def on_start(self):
        print("task is running")

    def on_stop(self):
        print("task is stopped")

    def task1(self):
        print(f'task1: {self}')

    def task2(self):
        print(f'task2: {self}')

    # tasks = [task1, task2]
    tasks = {task1: 2, task2: 1}
```

### 3. 实际案例

```Python
import random

from locust import TaskSet, task, HttpUser, run_single_user
from locust.clients import ResponseContextManager
from locust.runners import logger

class BaiduTask(TaskSet):
    def on_start(self):
        logger.info("hello")

    def on_stop(self):
        logger.info("goodbye")

    @task
    def search_by_baidu(self):
        wd = random.choice(self.user.share_data)
        path = f'/s?wd={wd}'

        with self.client.get(path, catch_response=True) as res:
            res: ResponseContextManager
            if res.status_code != 200:
                res.failure(res.text)

class Baidu(HttpUser):
    host = 'https://www.baidu.com'
    tasks = [BaiduTask]
    share_data = ['波小艺', 'boxiaoyi', '性能测试', 'locust']

if __name__ == '__main__':
    run_single_user(Baidu)
```

## 二、 关键字说明

### 1. wait_time (每个用户执行后的等待时间）

如果没有指定 wait_time ，则下个任务将立即执行

```python
# 随机等待 1~5 秒
wait_time = between(1, 5)
```

### 2. weight 和 fixed_count 属性

多个用户类时，使用 `weight` 来确认 产生的用户比例

```python
class WebUser(User):
    weight = 3
    ...

class MobileUser(User):
    weight = 1
    ...
```

使用 `fixed_count` 来确认用户类产生的个数，与总数无关

```python
class AdminUser(User):
    wait_time = constant(600)
    fixed_count = 1

    @task
    def restart_app(self):
        ...

class WebUser(User):
```

### 3. on_start 和 on_stop 方法

**on_start** : 开始运行前调用（相当于 前置）

**on_stop** ：结束运行时调用（相当于 后置）

### 4. @task 装饰器

- 为用户添加任务的最简单方法
- 接受一个可选的权重参数，可用于指定任务的执行率

```python
from locust import User, task, between

class MyUser(User):
    wait_time = between(5, 15)

    @task
    def task1(self):
        pass

    @task(2)
    def task2(self):
        pass
```

### 5. tasks 任务属性

`tasks` 可以是 列表 或 字典

- 列表： 元素为普通函数，执行时随机选择

  - 例如：`tasks = [my_task, my_task1, my_task2]`

- 字典： 可调用的对象作为键， 整数作为值，值为执行比率，执行时随机选择

  - 例如： `{my_task: 3, another_task: 1}`
  - my_task 被执行的可能性是 another_task 的 3 倍。

```python
from locust import User, constant

def my_task(user):
    pass

class MyUser(User):
    tasks = [my_task]
    wait_time = constant(1)
```

### 6. @tag 装饰器

使用 [@tag](http://docs.locust.io/en/stable/api.html#locust.tag) 装饰器标记任务

```python
from locust import User, constant, task, tag

class MyUser(User):
    wait_time = constant(1)

    @tag('tag1')
    @task
    def task1(self):
        pass

    @tag('tag1', 'tag2')
    @task
    def task2(self):
        pass

    @tag('tag3')
    @task
    def task3(self):
        pass

    @task
    def task4(self):
        pass
```

- --tags : 需要执行的任务

  - `--tags tag2 tag3`
  - 执行 标记为 tag2 和 tag3 的认为

- --exclude-tags ： 除这些之外的任务

  - `--exclude-tags tag3`
  - 执行 标记 tag3 之外的所有任务

### 7. test_start 和 test_stop

用于在开始 和 结束 测试时执行。

```python
from locust import events

@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    print("A new test is starting")

@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    print("A new test is ending")
```

### 8. HttpUser

- Http 继承 User
- 用来模拟用户
- `self.client` ：接口请求

## 三、 压力测试

### 1. 文件编写

```python
# locustfile.py

import random
from locust import HttpUser, task, between

# 定义 class 来模拟发送 Http 请求的用户
class QuickstartUser(HttpUser):
  	# 请求间隔 5~9s
    wait_time = between(5, 9)

    # 通过装饰器将函数定义为用户模拟执行的任务
    @task
    def index_page(self):
        self.client.get("/hello")
        self.client.get("/world")

    # 任务权重，模拟任务执行的比例
    # 发送
    @task(3)
    def view_item(self):
        item_id = random.randint(1, 10000)
        # 发送 get 请求
        self.client.get(f"/item?id={item_id}", name="/item")

    # 模拟的每个用户执行任务前先执行的操作
    def on_start(self):
        # 发送 post 请求
        self.client.post("/login", {"username":"foo", "password":"bar"})
```

### 2. 用测执行

```python
locust -f locust_files/locustfile.py
```

注：如果文件名字是 locustfile.py，可以省略指定名称，因为执行 locust 命令时，源码中默认执行的文件名是 locustfile.py。

### 3、打开 web UI 压测管理界面

在浏览器中输入 http://127.0.0.1:8089/ ，打开管理界面如下：

注意：如果服务部署在服务器，可以通过 IP:8089 访问

输入模拟的用户数，点击开始 start swarming 就可以开始压测啦。

参数说明：

- Number of total users to simulate：模拟的用户数量
- Hatch rate：每秒中产生的发送的用户数
- Host：指定向那台服务器发起压测任务

注：Hatch rate 是客户端向服务器每秒发送多少请求，但是服务器端不一定能处理过来，如果处理不过来，在服务端服请求就会排队等待处理，通过观察服务器 CPU 的负载 Load AVG，可以查看排队情况。

### 4、查看压测监控指标

开始压测后，在监控详情页，可以实时查看服务器请求的成功失败情况，以及每个请求的响应时间，以及

最重要的一个参数：RPS 服务器每秒处理请求的数量

**Statistics 压测概要**

**监控参数说明：**

- Type： 请求的类型，例如 GET/POST
- Name：请求的路径
- request：截止当前为止，客户端已发送请求的数量
- fails：截止当前为止，客户端已发送请求失败的数量
- Median：中间值，单位毫秒，一半的服务器响应时间低于该值，而另一半高于该值
- 90%ile：将请求响应时间从小到大排序，第 90%请求的单个耗时，意味着 90%的请求小于当前值
- Average：平均值，单位毫秒，所有请求的平均响应时间
- Min：请求的最小服务器响应时间，单位毫秒
- Max：请求的最大服务器响应时间，单位毫秒
- Content Size：单个请求的大小，单位字节
- Current RPS：每个任务当前的 RPS 值，即服务器端当前时刻每秒处理当前任务的数量
- Current Failures/s：每秒请求失败数

说明如下：

- Total Requests per second：每秒请求发送数曲线
- Response Times：响应时间曲线
- Number of Users：模拟的用户生成曲线

## 四、 运行模式

### 1. web ui 模式

```shell
locust -f stress_test.py --web-host 10.1.44.31 --web-port 8090
```

- --web-host：指定 web UI IP，默认 localhost

- --web-port：指定 web UI 端口，默认 8089

### 2. no web 模式

```shell
locust -f stress_test.py --no-web -c 100 -r 20 -t 120
```

- --no-web：指定无 web UI 模式

- -c：起多少 locust 用户（等同于起多少 tcp 连接）

- -r：多少时间内，把上述 -c 设置的虚拟用户全部启动

- -t：脚本运行多少时间，单位 s

### 3. 分布式进程

#### 单台多进程：

先启一个 master

```shell
locust -f /home/script/stress_test.py --web-host 10.1.62.223 --master
```

再启 8 个 slave

```shell
locust -f /home/script/stress_test.py --slave
```

slave 节点启动后，在 locust 监控中能看到

#### 多台多进程：

多台机器搭建 Locust 分布式 和 单台搭建多进程差不多。**只有一个区别，如果 slave 和 master 不在一台机器上， slave 需要指定 --master-host 参数：**

```shell
locust -f /home/script/stress_test.py --slave --master-host 10.1.62.223
```

### 4. 使用分布式

#### 开启 Master 实例

```sh
locust -f my_locustfile.py --master
```

#### 然后在每个 **Worker** 上( xxx 为 master 实例的 IP，或者如果您的 Worker 与主计算机在同一台计算机上，则完全省略该参数)：

```sh
locust -f my_locustfile.py --worker --master-host=xxx
```

- `--master`：将 locust 设置为 master 模式。Web 界面将在此节点上运行。
- `--worker`：将蝗虫设置为 worker 模式。
- `--master-host=X.X.X.X`：(可选) 与 --worker 设置 master 节点的`主机名/IP` 一起使用（默认为 127.0.0.1）
- `--master-port=5557`：(可选) 与 --worker 设置 master 节点的`端口号`一起使用（默认为 5557）。
- `--master-bind-host=X.X.X.X`：(可选) 与 --master. 确定 master 节点将绑定到的网络接口。默认为 \*（所有可用接口）。
- `--master-bind-port=5557`：(可选) 与 --master. 确定 master 节点将侦听的网络端口。默认为 5557。
- `--expect-workers=X`：在使用 启动主节点时使用 --headless。然后，主节点将等待 X 个 worker 节点连接，然后再开始测试。
