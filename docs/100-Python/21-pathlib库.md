---
title: 二十一、pathlib 库
categories:
  - 学习笔记
tags:
  - Python基础
toc_style_simple: true
date: '2024-01-09 14:20:26'
update: '2024-01-09 14:20:57'
cover: 'https://top-img.pupper.cn/top-img/top-img-154.webp'
main_color: '#5b405b'
abbrlink: 95ac7222
---

# 一. 获取当前文件路径

## 1.1 os 模块获取当前文件路径

```Python
import os

v2 = os.getcwd()  # /Users/pupper/Documents/PythonObject/python_basi/demo4
```

## 1.2 获取当前文件夹路径

```Python
from pathlib import Path

v = Path.cwd()  # /Users/pupper/Documents/PythonObject/python_basi/demo4
```

## 1.3 获取当前文件路径

```Python
from pathlib import Path

p = Path(__file__)
print(p)  # /Users/pupper/Documents/PythonObject/python_basi/demo4/test1.py
```

## 1.4 获取 Path 对象绝对路径

```Python
from pathlib import Path

p = Path('test2.py')
print(p)    # test2.py
print(p.absolute())
# /Users/pupper/Documents/PythonObject/python_basi/demo4/test2.py
```

## 1.5 一些常用的获取文件属性

```Python
from pathlib import Path

# 当前文件路径
p = Path(__file__)
print(p.absolute())   # 获取绝对路径 /Users/pupper/Documents/PythonObject/python_basi/demo4/test1.py
print(p.resolve())    # 获取绝对路径 /Users/pupper/Documents/PythonObject/python_basi/demo4/test1.py
print(p.name)    # 获取文件名称 'test1.py'
print(p.stem)    # 只要文件名，不要后缀 test1
print(p.suffix)  # 获取文件 后缀.py
print(p.suffixes)  # 文件所有的后缀 ['.py']
print(p.parts)   # 拆分('/', 'Users', 'pupper', 'Documents', 'PythonObject', 'python_basi', 'demo4', 'test1.py')
print(p.parent)  # /Users/pupper/Documents/PythonObject/python_basi/demo4
print(p.parent.parent)  # /Users/pupper/Documents/PythonObject/python_basi
print(p.parents)  # 所有的父级 <PosixPath.parents>
print(p.anchor)  # 锚，目录前面的部分 /
```

# 二. 获取上层、上上层目录

## 2.1 os 获取上上层目录

```Python
import  os

print(os.path.dirname(os.path.dirname(os.getcwd())))  # /Users/pupper/Documents/PythonObject
```

## 2.2 pathlib 获取上上层目录

```Python
from pathlib import Path

print(Path.cwd().parent.parent)   # /Users/pupper/Documents/PythonObject
```

# 三. 判断文件、文件夹

## 3.1 `is_file()` 判断是不是文件

```Python
from pathlib import Path

print(Path.cwd().is_file())

# 实例化调用
p = Path("./test.py")
print(p.is_file())
```

## 3.2 `is_dir()` 判断是否为文件夹

```Python
from pathlib import Path

print(Path.cwd().is_dir())

# 实例化调用
p = Path("./test.py")
print(p.is_dir())
```

## 3.3 `exists()` 判断文件或文件夹是否存在

```Python
from pathlib import Path

p = Path("./test.py")
print(p.exists())
```

## 3.4 `is_absolute()` 判断是否是绝对路径

```Python
from pathlib import Path

p = Path(__file__)
print(p)
print(p.is_absolute())
```

# 四. 拼接目录

## 4.1 os 拼接目录

```Python
import os

os.path.join(os.path.dirname(os.getcwd()), "test", "test.txt")
```

## 4.2 pathlib 拼接目录

```Python
from pathlib import Path

# 当前文件路径
p = Path('./')
print(p.absolute())  # /Users/pupper/Documents/PythonObject/python_basi/demo4
print(p.joinpath('data.json'))  # data.json
print(p.joinpath('data.json').absolute())   # /Users/pupper/Documents/PythonObject/python_basi/demo4/data.json

# 拼接多层
print(p.joinpath('files', 'data.json'))   # files/data.json
print(p.joinpath('files', 'data.json').absolute())  # /Users/pupper/Documents/PythonObject/python_basi/demo4/files/data.json
```

# 五. `iterdir()` 遍历文件目录

![](https://img.pupper.cn/img/1704879256.png)

- `.iterdir()` 遍历某个目录下的所有路径(文件和子目录)

```Python
from pathlib import Path

p = Path.cwd()
for i in p.iterdir():
    print(i.absolute())

# 运行结果
/Users/pupper/Documents/PythonObject/python_basi/demo4/test4.py
/Users/pupper/Documents/PythonObject/python_basi/demo4/test1.py
/Users/pupper/Documents/PythonObject/python_basi/demo4/__init__.py
/Users/pupper/Documents/PythonObject/python_basi/demo4/test2.py
/Users/pupper/Documents/PythonObject/python_basi/demo4/interface_log_2024-01-10_13-55-52_357941.log
/Users/pupper/Documents/PythonObject/python_basi/demo4/test3.py
```

- 如果只需获取文件夹, 可以加个判断 `.is_dir()`

```Python
from pathlib import Path

p = Path.cwd()
print([i for i in p.iterdir() if i.is_dir()])
```

# 六. glob() 和 rglob() 匹配 (正则表达式)

## 6.1 glob 只匹配当前目录

```Python
from pathlib import Path

p = Path('files')
# glob 只会遍历查找当前目录
print(p.glob('*.txt'))  # <generator object Path.glob at 0x000001A44565A518>
print([i for i in p.glob('*.txt')])  # [WindowsPath('files/username.txt')]
print([i for i in p.glob('*.yml')])  # []
```

## 6.2 rglob 递归所有子目录

```Python
from pathlib import Path

p = Path('files')
# glob 只会遍历查找当前目录
print(p.rglob('*.txt'))  # <generator object Path.glob at 0x000001A44565A518>
print([i for i in p.rglob('*.txt')])  # [WindowsPath('files/username.txt')]
print([i for i in p.rglob('*.yml')])  # [WindowsPath('files/yaml/aa.yml'), WindowsPath('files/yaml/bb.yml')]
```

# 七. 创建文件操作

## 7.1 touch() 创建文件

```Python
from pathlib import Path

p = Path('xx.json')
p.touch()   # 创建一个xx.json
```

## 7.2 mkdir() 创建目录

### 创建一个目录

```Python
from pathlib import Path

p = Path('yoyo')
# mkdir 创建yoyo目录
p.mkdir()
```

### `mkdir(parents=True)` 递归创建多层目录

```Python
from pathlib import Path

p = Path('yoyo/json')
# mkdir 创建yoyo/json目录
p.mkdir(parents=True)
```

# 八. 删除文件操作

## 8.1 `rmdir()` 只能删除空目录

```Python
from pathlib import Path

p = Path('yoyo/json')
# mkdir 创建yoyo/json目录
p.rmdir()
```

## 8.2 `unlink()` 删除文件

```Python
from pathlib import Path

p = Path('files/username.txt')
p.unlink()
```

# 九. 修改文件

## 9.1 replace() 移动文件

```Python
from pathlib import Path

p = Path('yo.txt')
p.write_text("hello world")
print(p.read_text())  # hello world

p.replace('xx.json')
```

## 9.2 with_name() 重命名文件

```Python
from pathlib import Path

p = Path('hello.txt')
p.write_text("hello world")
print(p.read_text())  # hello world

# 重命名为一个新的文件对象
new_file = p.with_name('x.txt')
print(new_file)
p.replace(new_file)  # 移动到新的位置
```

# 十. 创建文件并重命名

## 10.1 os 创建文件夹并重命名

```Python
import os
import os.path

# 创建 peoject/test 目录
os.makedirs(os.path.join('project', 'test'), exist_ok=True)

# 将test.txt 重命名为 project/tests.txt
os.rename('test.txt', os.path.join('project', 'tests.txt'))
```

## 10.2 pathlib 模块的 Path 对象

```Python
from pathlib import Path

# 创建 project/test目录
Path('project/test').mkdir(parents=True, exist_ok=True)

# 将test.txt 重命名为 project/tests.txt
Path('test.txt').rename('project/test.txt')
```

# 十一. pathlib 的常用基本方法

| 操作           |   `os and os.path`    |             `pathlib`             |
| :------------- | :-------------------: | :-------------------------------: |
| 绝对路径       |   `os.path.abspath`   |          `Path.resolve`           |
| 修改权限       |      `os.chmod`       |           `Path.chmod`            |
| 创建目录       |      `os.mkdir`       |           `Path.mkdir`            |
| 重命名         |      `os.rename`      |           `Path.rename`           |
| 移动           |     `os.replace`      |          `Path.replace`           |
| 删除目录       |      `os.rmdir`       |           `Path.rmdir`            |
| 删除文件       | `os.remove,os.unlink` |           `Path.unlink`           |
| 工作目录       |      `os.getcwd`      |            `Path.cwd`             |
| 是否存在       |   `os.path.exists`    |           `Path.exists`           |
| 用户目录       | `os.path.expanduser`  |  `Path.expanduser and Path.home`  |
| 是否为目录     |    `os.path.isdir`    |           `Path.is_dir`           |
| 是否为文件     |   `os.path.isfile`    |          `Path.is_file`           |
| 是否为连接     |   `os.path.islink`    |         `Path.is_symlink`         |
| 文件属性       |       `os.stat`       | `Path.stat,Path.owner,Path.group` |
| 是否为绝对路径 |    `os.path.isabs`    |      `PurePath.is_absolute`       |
| 路径拼接       |    `os.path.join`     |        `PurePath.joinpath`        |
| 文件名         |  `os.path.basename`   |          `PurePath.name`          |
| 上级目录       |   `os.path.dirname`   |         `PurePath.parent`         |
| 同名文件       |  `os.path.samefile`   |          `Path.samefile`          |
| 后缀           |  `os.path.splitext`   |         `PurePath.suffix`         |
