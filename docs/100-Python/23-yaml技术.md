---
title: yaml 技术
categories:
  - 学习笔记
tags:
  - Python基础
toc_style_simple: true
abbrlink: acb44eed
cover: https://img.pupper.cn/top-img/top-img-213.webp
date: '2023-02-20 08:00:01'
update: '2024-01-11 11:16:50'
main_color: '#3e1e5b'
---

## 方法封装

```Python
import yaml

class YamlHandler:
    def __init__(self,file):
        self.file = file

    def read_yaml(self,encoding='utf-8'):
        """读取yaml数据"""
        with open(self.file, encoding=encoding) as f:
            return yaml.load(f.read(), Loader=yaml.FullLoader)

    def write_yaml(self, data, encoding='utf-8'):
        """向yaml文件写入数据"""
        with open(self.file, encoding=encoding, mode='w') as f:
            return yaml.dump(data, stream=f, allow_unicode=True)
```

## 一、 yaml 语法

### 1. 安装 yaml

```shell
pip install PyYaml
```

### 2. 基本规则

- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用 Tab，只允许使用空格
- 缩进的空格数目不重要，只要相同层级的元素左对齐即可
- `#` 表示注释，从它开始到行尾都被忽略

### 3. yaml 转 字典

yaml 文件：

```yaml
# 下面格式读到Python里会是个dict
name: 灰蓝
age: 0
job: Tester
```

python 文件：

```python
import yaml

def yaml_data(fileDir):
    fo = open(fileDir, 'r', encoding='utf-8')
    # 使用第三方库 获取yaml 文件中的内容
    # Loader=yaml.FullLoader --- 处理不安全警告
    res = yaml.load(fo, Loader=yaml.FullLoader)
    print(res)

if __name__ == '__main__':
    yaml_data('../data/test.yaml')
```

运行结果：

```python
{'name': '灰蓝', 'age': 0, 'job': 'Tester'}
```

### 4. yaml 转 列表

yaml 文件：

```yaml
# 下面格式读到Python里会是个dict
- 灰蓝
- 0
- Tester
```

python 文件：

```python
import yaml

def yaml_data(fileDir):
    fo = open(fileDir, 'r', encoding='utf-8')
    # 使用第三方库 获取yaml 文件中的内容
    # Loader=yaml.FullLoader --- 处理不安全警告
    res = yaml.load(fo, Loader=yaml.FullLoader)
    print(res)

if __name__ == '__main__':
    yaml_data('../data/test.yaml')
```

运行结果：

```python
['灰蓝', 0, 'Tester']
```

### 5. 复合结构

#### yaml 文件（列表内包含字典）：

```yaml
- name: 灰蓝
  age: 0
  job: Tester
- name: James
  age: 30
```

运行结果：

```python
[{'name': '灰蓝', 'age': 0, 'job': 'Tester'}, {'name': 'James', 'age': 30}]
```

#### yaml 文件（字典内包含列表）：

```yaml
name:
  - 灰蓝
  - 0
  - Tester
age:
  - James
  - 30
```

运行结果：

```python
{'name': ['灰蓝', 0, 'Tester'], 'age': ['James', 30]}
```

### 6. 基本类型

- 字符串
- 整型
- 浮点型
- 布尔型
- null
- 时间
- 日期

```yaml
# 这个例子输出一个字典，其中value包括所有基本类型
str: 'Hello World!'
int: 110
float: 3.141
boolean: true # or false
None: null # 也可以用 ~ 号来表示 null
time: 2016-09-22t11:43:30.20+08:00 # ISO8601，写法百度
date: 2016-09-22 # 同样ISO8601
```

运行结果：

```python
{'None': None,
 'boolean': True,
 'date': datetime.date(2016, 9, 22),
 'float': 3.141,
 'int': 110,
 'str': 'Hello World!',
 'time': datetime.datetime(2016, 9, 22, 11, 43, 30, 200000, tzinfo=datetime.timezone(datetime.timedelta(seconds=28800)))}
```

> - 如果 字符串 中有空格或特殊字符，则需要 加引号
> - `单引号` 中的 特殊字符 转到 Python 会被 转义
> - `双引号`不会 被 Python 转义，最后是输出了 特殊字符
>   - 如果希望特殊符号有效，可以使用 双引号

```yaml
str1: 'Hello\nWorld'
str2: "Hello\nWorld"
```

运行结果：

```python
Hello\nWorld
Hello
World
```

### 7. 引用 `&` 和 `*`

`&` 和 `*` 用于引用

```yaml
name: &name 灰蓝
tester: *name
```

运行结果：

```python
{'name': '灰蓝', 'tester': '灰蓝'}
```

### 8. 强制转换 `!!`

yaml 是可以进行强制转换的，用 `!!` 实现

```yaml
str: !!str 3.14
int: !!int '123'
```

运行结果：

```python
{'int': 123, 'str': '3.14'}
```

### 9. 分段 `---`

在同一个 yaml 文件中，可以用 `---` 来分段，这样可以将多个文档写在一个文件中

使用 分段时， 需要使用 `load_all()` 方法读取，并用 for 循环输出

```yaml
---
name: James
age: 20
---
name: Lily
age: 19
```

python 文件：

```python
import yaml

def yaml_data(fileDir):
    fo = open(fileDir, 'r', encoding='utf-8')
    # 使用第三方库 获取yaml 文件中的内容
    # Loader=yaml.FullLoader --- 处理不安全警告
    res = yaml.load_all(fo, Loader=yaml.FullLoader)
    for one in res:
        print(one)

if __name__ == '__main__':
    yaml_data('../data/test.yaml')
```

运行结果：

```python
{'name': 'James', 'age': 20}
{'name': 'Lily', 'age': 19}
```

### 10. 写入 yaml 文件

python 文件：

```python
import yaml

def yaml_data(fileDir):
    obj1 = {"name": ["James", "Tom"], "age": [20, 21]}
    obj2 = ["Lily", 19, {"name": "San", "age": 30}]
    with open(fileDir, 'w') as f:
        yaml.dump_all([obj1, obj2], f)

if __name__ == '__main__':
    yaml_data('../data/test.yaml')
```

运行结果：

```yaml
age:
  - 20
  - 21
name:
  - James
  - Tom
---
- Lily
- 19
- age: 30
  name: San
```

## 二、 yaml 操作

### 1. 用例编写

在 yam 中，如果字典的值为 空， 可以使用 `""` 表示，如果不行，则默认为 None， 可能导致程序错误

```yaml
- #login_test_01
  url: /account/sLogin #路径
  method: POST #方法
  detail: 用户名正确，密码正确 #详情
  headers: #请求头
  data: #请求体
    username: sq0777
    password: xintian
  resp:
    code: 20000 #code
    msg: 成功

- #login_test_02
  url: /account/sLogin #路径
  method: POST #方法
  detail: 用户名正确，密码为空 #详情
  headers: #请求头
  data: #请求体
    username: sq0777
    password: '' #密码为空
  resp:
    code: 9999 #code
    msg: 输入的密码错误!
```

```python
def get_yaml_data(fileDir):
    # 1-打开yaml文件
    resList = []
    fo = open(fileDir, 'r', encoding='utf-8')
    # 2- 使用第三方库去获取
    res = yaml.load(fo, Loader=yaml.FullLoader)  # 处理警告
    for one in res:
        resList.append((one['data'], one['resp']))
    # [(字典1，字典2),(字典1，字典2)]
    return resList
```
