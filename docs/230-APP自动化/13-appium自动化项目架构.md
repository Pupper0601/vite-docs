---
title: AppUI测试 - 自动化项目架构
categories:
  - 学习笔记
  - 软件测试
tags:
  - AppUI测试
abbrlink: fdfa5042
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-213.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#3e1e5b'
---

# appium 自动化项目架构

## 一、 项目结构

> 整体的编写逻辑:
>
> ​ 1、先设计功能测试用例
>
> ​ 2、然后分析这个用例,用到了那些页面,哪些元素,封装在 pages
>
> ​ 3、将功能测试用例翻译成代码

![image-20210818163640039](https://img.pupper.cn/img/20210818163640.png)

#### 四包文件 ：

- `libs` ： 用于存放 基本的 代码；
- `configs` ： 用于存放 配置文件；
- `test_case` ： 用于存放 测试用例；
- `tools` ： 用于存放 封装的 工具

#### 四文件夹：

- `docs` ： 主要用于存放 和项目相关的文件；
- `logo` ： 主要用于存放 项目执行的日志；
- `report` ： 用于存放报告的 原始数据；
- `data` ： 用于存放 测试数据；

> 当 APP 自动化有多条测试用例的时候，我们很难保证上一条 case 的结束页面，恰好是下一个 case 的开始页面
> 所以，设计 app 自动化用例的时候，保证每一条 case，都从首页开始，那么，也就要求我们，每一条 case 的开始，都要从 **首页** 写起，每一条 case 的结束，都要想办法回到 **首页**

## 二、 项目内容

### 1. configs

项目配置 --- `settings.py`

```python
desire_caps = {
    "platformName": "Android",
    "platformVersion": "10",
    "deviceName": "X4UOCQOF79AUZX79",
    "appPackage": "com.hpbr.bosszhipin",
    "appActivity": "com.hpbr.bosszhipin.module.launcher.WelcomeActivity",
    "noReset": "True",
    "newCommandTimeout": 6000,
    "automationName": "UiAutomator2"
}
```

驱动 --- `myDriver.py`

```python
from appium import webdriver
from settings import desire_caps


class MyDriver:
    _driver = None

    @classmethod
    def get_driver(cls):
        if cls._driver is None:
            cls._driver = webdriver.Remote("http://127.0.0.1:4723/wd/hub", desire_caps)
            cls._driver.implicitly_wait(10)

        return cls._driver
```

### 2. libs

操作 --- `basePage.py`

```python
from utils.myDriver import MyDriver


class BasePage:

    def __init__(self):
        self.driver = MyDriver.get_driver()

    def swipe_up(self, t=1000, n=1):
        """向上滑动半个屏幕"""
        # 获取手机尺寸
        l = self.driver.get_window_size()
        # 获取最大横坐标的一半
        x1 = l["width"] * 0.5
        # 获取四分之一位置和四分之三位置的纵坐标
        y1 = l["height"] * 0.25
        y2 = l["height"] * 0.75
        for i in range(n):
            self.driver.swipe(x1, y2, x1, y1, t)

    def swipe_down(self, t=1000, n=1):
        """向下滑动半个屏幕"""
        # 获取手机尺寸
        l = self.driver.get_window_size()
        # 获取最大横坐标的一半
        x1 = l["width"] * 0.5
        # 获取四分之一位置和四分之三位置的纵坐标
        y1 = l["height"] * 0.25
        y2 = l["height"] * 0.75
        for i in range(n):
            self.driver.swipe(x1, y1, x1, y2, t)
```

### 3. test_case

```python
from utils.myDriver import MyDriver


driver = MyDriver.get_driver()

def test_update_pwd():
    # 进入我的标签页
    # 点击右上角设置
    # 在 web 当中，页面是随便跳的
    # 但是，在 app 当中，页面跳转是需要权限的，如果逻辑不通，跳转就会失败
    # 解决方法有两种：1、在每一条case最后，逐层返回  2、找开发改代码，开权限
    driver.start_activity("com.hpbr.bosszhipin", "com.hpbr.bosszhipin.module.launcher.WelcomeActivity")
```
