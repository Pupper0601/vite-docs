---
title: AppUI测试 - 元素定位操作
categories:
  - 学习笔记
  - 软件测试
tags:
  - AppUI测试
abbrlink: e7459492
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-16.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#83a2c0'
---

# 元素定位操作

## 一、 Appium 脚本架构

进行 Appium 自动化测试之前，需启动 Appium 及被测对象，启动了 Appium 客户端后，利用编程工具执行脚本时， Appium 才能将脚本与被测设备建立联接，从而实现自动化测试。

如果不启动客户端，则不能使用 WebDriver。

脚本中需首先导入 WebDriver，然后配置 Server，告诉 Appium 测试环境。

使用 `Desired_caps` 函数进行设备联接信息。设备连接参数主要有以下常用参数

- `desired_caps={}`：设备参数信息，声明为一个字典
- `desired_caps['platformName']`：应用平台的类型，通常为 Android 或 IOS
- `desired_caps['platformVersion']`：被测设备系统版本
- `desired_caps['deviceName']`：设备名称，通过 adb devices 查看
- `desired_caps['appPackage']`： Android 应用程序包的包名
- `desired_caps['appActivity']`： Android 应用包中需启动的 Activity 名称，通常需要最先声明。
  - `Activity` 可通过源代码直接看到，如果没有源代码，则可以反向编译或者通过打印的方式检测
- `desired_caps['unicodeKeyboard']`：设置键盘输入法类型为 unicode，默认值为 False
- `desired_caps['resetKeyboard']`： Unicode 测试结束后，重置输入法到原有状态。默认值为 False
- `driver=webdriver.Remote('http://127.0.0.1:4723/wd/hub',desired_caps)` 设置监听的端口信息。

实例：

```python
from appium import webdriver

# 下述内容，描述了appium与设备的通信信息，如果关联信息不正确，则无法实施测试
desired_caps = {
    "platformName": "Android",  # 指定应用平台的类型 Android 或 IOS
    "platformVersion": "10",  	# 被测设备的版本号
    "deviceName": "dsada",  	# 设备名称 adb devices
    "AppPackage": "dsad",  		# 应用程序包名
    "appActivity": "dsa",  		# 应用程序中需启动的Activity类名
    "unicodeKeyboard": "Ture",  # 设置输入法类型，这个值默认为 False
    "resetKeyboard": "Ture",  	# 测试结束后，重置输入法到原有状态，这个值默认为 False
    # 但是 resetKeyboard 参数，经常不起作用，这就导致，我们在执行代码后，经常要去设置里，手动把输入法类型改回去
    "noReset": "True",  # 自动化不会重置app
    "newCommandTimeout": 6000,  # 设置 session 超时时间，单位是秒，默认60秒
    "automationName": "UiAutomator2"    # 指定驱动版本（优先选用 UI2，如果UI2不行，再换用UI1
}

# 这一步，会打开配置字典中指定的APP
driver = webdriver.Remote("http://127.0.0.1:4723/wd/hub", desired_caps)
```

## 二、 UIAutomatorviewer 查找元素

利用 Appium 实现 App 自动化测试时，与 Selenium 测试 Web 系统一样，同样需要定位 UI 中的元素，在 Android-Sdk 中提供了 UIAutomatorviewer 工具用来查看 UI 中的元素。

appium 的元素定位语法，比 selenium 要难看

##### 1. 首先，将手机连接到电脑

1.  手机如果弹出连接选择，不要选仅充电，选传文件
2.  电脑上使用 adb devices 可以搜索到手机设备

##### 2. 打开 appium 桌面应用

![image-20210820162037923](https://img.pupper.cn/img/20210820162038.png)

1.  编辑配置

    ![image-20210820162423391](https://img.pupper.cn/img/20210820162423.png)

2.  启动服务器

    ![image-20210823104726522](https://img.pupper.cn/img/20210823104726.png)

3.  启动检测器

    ![image-20210823104831728](https://img.pupper.cn/img/20210823104831.png)

4.  将设备连接信息填入右下角的 JSON 串里

    ![](https://img.pupper.cn/img/20210823105256.png)

5.  启动回话后，加载完成后，就进入了元素定位页面

    ![image-20210823105635168](https://img.pupper.cn/img/20210823105635.png)

## 三、 元素定位

### 1. 普通定位方法

#### 1.通过 id 定位（取 resource-id 的值）：

```python
driver.find_element_by_id("com.taobao.idlefish:id/tx_id")
```

#### 2.通过 class_name 定位（取 class 的内容）

```python
driver.find_element_by_class_name("android.widget.RelativeLayout")
```

#### 3. 通过 AccessibilityId 定位（取 content-desc 内容）

```python
driver.find_element_by_accessibility_id("gfdgfdg")
```

#### 4. 通过 xpath 定位（取 xpath 得内容）

和我们学到的 selenium 里的 xpath 语法一样，只不过用 class 名取代 tag 名

属性方面，相对于 web ui，这里只有 class 属性和文本

##### 4.1 通过 xpath 定位, 文本定位

```python
driver.find_element_by_xpath("//*[@text='搜索']").click()
```

##### 4.2 `contains` 文本模糊定位

```python
# 文本模糊定位
driver.find_element_by_xpath("//*[contains(@text, '索')]")

# 结合 class 的 文本模糊定位
dirver.find_element_by_xpath("//android.widget.Button[contains(@text, '索')]")
```

##### 4.3 下标

```python
driver.find_element_by_xpath("//android.widget.ScrollView/*[7]").click()
```

##### 4.4 组合定位 --- 同时使用 class 和 文本

```python
driver.find_element_by_xpath("//*[@class='android.widget.Button' and @text='同意并继续']"）
```

##### 4.5 组合定位 --- 同时使用 class 和 模糊文本

```python
"[@class='android.view.View' and contains(@text, '显瘦牛仔裤')]"
```

> `driver.find_element_by_XXX` # 符合条件的第一个元素，找不到抛出异常
>
> `driver.find_elements_by_XXX` # 符合条件的所有元素的列表，找不到返回空列表

### 2. 通过 Android UIAutomator 定位

##### 根据文本定位

```python
driver.find_element_by_android_uiautomator('new UiSelector().text("搜索你想要的")')
```

##### 根据文本模糊定位

```python
driver.find_element_by_android_uiautomator('new UiSelector().textContains("搜索你")')
```

##### 以 text 什么开始

```python
driver.find_element_by_android_uiautomator('new UiSelector().textStartsWith("搜索你")')
```

##### 正则文本匹配

```python
driver.find_element_by_android_uiautomator('new UiSelector().textMatches("^搜索.*")')
```

##### resourceID 定位

```python
driver.find_element_by_android_uiautomator('new UiSelector().resourceId("cn.com.open.mooc:id/et_phone_edit")')
```

##### 也是 id 匹配，但是支持正则

```python
driver.find_element_by_android_uiautomator('new UiSelector().resourceIdMatches(".+et_phone_edit")')
```

##### class name 定位

```python
driver.find_element_by_android_uiautomator('new UiSelector().className("android.widget.EditText")')
```

##### 支正则的 class name 定位

```python
driver.find_element_by_android_uiautomator('new UiSelector().classNameMatches (".*EditText")')
```

##### 可以将多个条件，以链条的方式组合在一起定位

```python
driver.find_element_by_android_uiautomator('new UiSelector().resourceId("com.xueqiu.android:id/tab_name").text("我的")')
```

##### 支持父子关系定位

```python
driver.find_element_by_android_uiautomator('newUiSelector().resourceId("com.xueqiu.android:id/title_container").childSelector(text("股票"))')
```

## 四、 元素等待

### 1. 隐式等待

```python
driver.implicitly_wait(10)
```

### 2. 显式等待

```python
WebDriverWait(driver=driver, timeout=10, poll_frequency=1).until(
    EC.visibility_of_element_located(
        (By.XPATH, "?????")
    )
)
```

## 五、 元素操作

输入中文

```python
desire_caps['unicodeKeyboard'] = True
desire_caps['resetKeyboard'] = True
```

##### 1.click() --- 点击操作

```python
driver.find_element_by_id("com.wuba.zhuanzhuan:id/ae8").click()
```

##### 2.clear() --- 清空输入框内容

```python
driver.find_element_by_id("com.wuba.zhuanzhuan:id/ij").clear()
```

##### 3.send_keys(xx) --- 输入框内输入内容

```python
driver.find_element_by_id("com.wuba.zhuanzhuan:id/ij").send_keys("test content")
```

##### 4.text --- 获得元素的 text 内容

```python
print(driver.find_element_by_xpath(" //android.widget.LinearLayout[1]//xxx").text)
```

##### 5.get_attribute --- 获得元素的属性值

```python
element.get_attribute(value) #value 为元素的属性名
```

##### 6.获取元素位置和大小

```python
element.location  # 获得元素位置
element.size      # 获得元素大小
```

##### 7、滑动和拖拽事件

![image-20210823144636064](https://img.pupper.cn/img/20210823144636-20220324154816703.png)

持续时间越长，惯性越小

参数分别为开始的 x 轴、 y 轴，结束的 x 轴、 y 轴，以及持续时间-单位毫秒

```python
driver.swipe(start_x,start_y,end_x,end_y,duration=None)
```

> 从手工操作的角度来说，
>
> 从上往下滑动的时候，通常会按下（ X1， Y1）坐标，然后往下滑动，一直滑到（ X2， Y2）这个坐标。
>
> 从下往上滑动的时候，会按（ X2，Y2）这个坐标，往上滑动到（ X1， Y1）这个坐标。
>
> 从左往右进行滑动和从右往左进行滑动的思路都是一样的。

##### 1. 屏幕滑动

```python
# 获取设备的宽度
x=driver.get_window_size()['width']

# 获取设备的长度
y=driver.get_window_size()['height']
```

上边的方法可以通过 python 代码获得手机的长宽，然后计算比例

简单的无目的滑动，可以封装成函数 ：

```python
# t 代表滑动持续时间，n代表滑动次数

def swipeUp(driver, t=500, n=1):
    """向上滑动屏幕，每次滑动半个屏幕"""
    l = driver.get_window_size()
    x1 = l["width"] * 0.5
    y1 = l["height"] * 0.75
    y2 = l["height"] * 0.25
    for i in range(n):
        driver.swipe(x1, y1, x1, y2, t)

def swipeDown(driver, t=500, n=1):
    '''向下滑动屏幕'''
    l = driver.get_window_size()
    x1 = l['width'] * 0.5
    y1 = l['height'] * 0.25
    y2 = l['height'] * 0.75
    for i in range(n):
        driver.swipe(x1, y1, x1, y2,t)

def swipLeft(driver, t=500, n=1):
    '''向左滑动屏幕'''
    l = driver.get_window_size()
    x1 = l['width'] * 0.75
    y1 = l['height'] * 0.5
    x2 = l['width'] * 0.25
    for i in range(n):
        driver.swipe(x1, y1, x2, y1, t)

def swipRight(driver, t=500, n=1):
    '''向右滑动屏幕'''
    l = driver.get_window_size()
    x1 = l['width'] * 0.25
    y1 = l['height'] * 0.5
    x2 = l['width'] * 0.75
    for i in range(n):
        driver.swipe(x1, y1, x2, y1, t)
```

##### 2. 元素滑动

可以按元素滑动, 下面函数，会从 ele1 滑动到 ele2，_没有惯性_

```python
driver.drag_and_drop(ele1, ele2)
```

从一个元素，滑到另一个元素，_有惯性_

```python
driver.scroll(ele1, ele2)
```
