---
title: AppUI测试 - 手机及元素操作
categories:
  - 学习笔记
  - 软件测试
tags:
  - AppUI测试
abbrlink: e21f1b03
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-311.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#524f42'
---

# Appium 手机及元素操作

## 一、 按键模拟

返回桌面

```python
driver.keyevent(3) # 3 对应 home 键

time.sleep(3)
```

调节音量

```python
driver.keyevent(24)
time.sleep(3)
driver.keyevent(25)
time.sleep(3)
```

长按 home 键

```python
driver.long_press_keycode(3)
```

| 按键                | 说明         | 编号 |
| ------------------- | ------------ | ---- |
| KEYCODE_CALL        | 拨号键       | 5    |
| KEYCODE_ENDCALL     | 挂机键       | 6    |
| KEYCODE_HOME        | 按键 Home    | 3    |
| KEYCODE_MENU        | 菜单键       | 82   |
| KEYCODE_BACK        | 返回键       | 4    |
| KEYCODE_SEARCH      | 搜索键       | 84   |
| KEYCODE_CAMERA      | 拍照键       | 27   |
| KEYCODE_FOCUS       | 拍照对焦键   | 80   |
| KEYCODE_FOWER       | 电源键       | 26   |
| KEYCODE_NTIFICATION | 通知键       | 83   |
| KEYCODE_MUTE        | 话筒静音键   | 91   |
| KEYCODE_VOLUME_MUTE | 扬声器静音键 | 164  |
| KEYCODE_VOLUME_UP   | 音量增加键   | 24   |
| KEYCODE_VOLUME_DOWN | 音量减少键   | 25   |

## 二、 触摸操作

### 1. 根据坐标点击

`driver.tap([坐标]，持续点击时间)  ` ： 除了定位到元素的点击外，也可以通过 tab 实现坐标的点击

```python
driver.tap([(216,1776)],2)
```

主要用于处理 无法获取 到具体元素的模块， 如 弹窗广告

### 2. TouchAction(driver) --- 坐标点击

> TouchAction 对象包含（ tab）、 press（短按）、 move_to（滑动到某个坐标）等方法
>
> 坐标点击不会智能等待元素

使用 `TouchAction` 时，需要导入 ：

```python
from appium import webdriver
from appium.webdriver.common.touch_action import TouchAction

desired_caps = {
    "platformName": "Android",
    "plathformVersion": "10",
    "deviceName": "X4UOCQOF79AUZX79",
    "appPackage": "com.hpbr.bosszhipin",
    "appActivity": ".module.launcher.WelcomeActivity",
    "noReset": "True",
    "newCommandTimeout": 6000,
    "automationName": "UiAutomator2"
}

driver = webdriver.Remote("http://127.0.0.1:4723/wd/hub", desired_caps)
driver.implicitly_wait(10)
```

##### 按坐标点击, 持续时长 可实现长按 或者 短按

```python
driver.tap([(135, 26)], 1)
time.sleep(5)    # 坐标点击不会智能等待元素的
driver.tap([(165, 66)], 1)
```

##### 根据坐标点击，第二个参数是点击的持续时间

```python
driver.tap([(668, 117)], 1)
time.sleep(5)
```

##### 短按一个元素或坐标点

```python
# TouchAction(driver).press(ele).release().perform()

TouchAction(driver).press(x=668, y=117).release().perform()
time.sleep(3)
```

##### 长按一个元素或坐标点 (持续时间单位是毫秒）

```python
# TouchAction(driver).long_press(ele, duration=500).release().perform()

TouchAction(driver).long_press(x=654, y=117, duration=500).release().perform()
time.sleep(3)
```

##### 点击某个元素或坐标后，多次点击

```python
# TouchAction(driver).tap(ele, count=3).release().perform()

TouchAction(driver).tap(x=633, y=1439, count=3).perform()
```

##### 模拟手指等待，比如按下等待五秒之后再抬起, 单位是毫秒

```python
TouchAction(driver).press(ele).wait(5000).release().perform()
```

##### 移动，多点移动划线

```python
TouchAction(driver).press(x=132, y=354).move_to(x=132, y=354).move_to(x=626,y=787).release().perform()
```

### 3. MultiAction() --- 多点触控

> 通过 `MultiAction().add()`添加多个 `TouchAction` 操作，最后调用 `perform()`一起执行这些操作
>
> - MultiAction 是针对多点触控操作的，是 TouchAction 的一个补充模块
> - 多点触摸对象是触摸动作的集合。
> - 多点触控手势只有两种方法，即 添加 和 执行。
> - add 用于添加另一个触摸操作到多点触摸。
> - 当 perform 执行被调用时，添加到多点触摸的所有触摸动作都被执行，就像它们同时发生一样。
>   - appium 首先执行所有触摸动作的第一个事件，然后执行第二个，等等。

```python
action0 = TouchAction(driver).press(x=132, y=354).move_to(x=132, y=354).move_to(x=226, y=787)
action1 = TouchAction(driver).press(x=65, y=524).move_to(x=65, y=524).move_to(x=141, y=898)
```

## 三、 手机 api 操作

### 1. 手机信息获取

`adb devices` 多个设备，使用`adb -s devicename` 进行指定设备运行

```shell
adb  -s R58M86BEW0D shell getprop ro.build.version.release
```

#### 1. 获取系统版本：

```shell
adb shell getprop ro.build.version.release
```

#### 2. 获取系统 api 版本：

```shell
adb shell getprop ro.build.version.sdk
```

#### 3. 获取手机相关制造商信息：

```shell
adb shell getprop | grep "model\|version.sdk\|manufacturer\|hardware\|platform\|revision\|serialno\|product.name\|brand"
```

#### 4. 获取当前运行的软件包名

```shell
adb shell dumpsys window | findstr mCurrentFocus
```

#### 5. 获取手机系统信息（ CPU，厂商名称等）

```shell
adb shell "cat /system/build.prop | grep "product""
```

#### 6. 获取手机设备型号

```shell
adb -d shell getprop ro.product.model
```

#### 7. 获取手机厂商名称

```shell
adb -d shell getprop ro.product.brand
```

#### 8. 获取手机的序列号

有两种方式

```shell
adb get-serialno

adb shell getprop ro.serialno
```

#### 9. 获取手机的 IMEI

有三种方式，由于手机和系统的限制，不一定获取到

```shell
adb shell dumpsys iphonesubinfo

# 其中Device ID即为IMEI号
adb shell getprop gsm.baseband.imei

service call iphonesubinfo 1
```

此种方式，需要自己处理获取的信息得到

#### 10. 获取手机 mac 地址

```shell
adb shell cat /sys/class/net/wlan0/address
```

#### 11. 获取手机内存信息

```shell
adb shell cat /proc/meminfo
```

#### 12. 获取手机存储信息

```shell
adb shell df
```

获取手机内部存储信息：

- 魅族手机：
  - `adb shell df /mnt/shell/emulated`
- 其他：
  - `adb shell df /data`
- 获取 sdcard 存储信息：
  - `adb shell df /storage/sdcard`

#### 13. 获取手机分辨率

```shell
adb shell "dumpsys window | grep mUnrestrictedScreen"
```

#### 14. 获取手机物理密度

```shell
adb shell wm density
```

### 2. 手机操作

#### 1. 获取手机分辨率

```python
print(driver.get_window_size())
```

#### 2. 获取手机网络状态

> 返回数字 ：
> 1：飞行模式
> 2：只开 wifi
> 4：只开流量
> 6：网络全开

```python
print(driver.network_connection)
```

#### 3. 获取手机当前时间

```python
print(driver.device_time)
```

#### 4. 打开通知栏

```python
driver.open_notifications()
```

## 四、 Appium 应用场景

appium 可测试对象

1.  **原生**：所有控件都是一种开发技术，
    1.  笔记 Android 都是 java 开发的，IOS 都是 object-c 开发的
    2.  大家手机上的计算器，就是原生的 APP
2.  **混合 APP**：原生 app 无法满足内容快速变更的需求，所以需要结合能快速展现内容的 web 技术。
3.  两种技术结合在了一起，所以称之为混合。比如淘宝、美团，展示商品的部分就是 web 页面。
4.  这部分内容是包含在 webview 下面

5.  **web 应用**：手机网页

### 1. 手机 web 页面 自动化

#### 1. 通过 selenium 测试移动端 web 网页

> - 需要添加配置项，让浏览器识别到我是通过移动端来访问的
> - 其他方面跟 selenium 测试 PC 端浏览器网页没有区别

```python
from selenium import webdriver

# 以开发者模式打开
op = webdriver.ChromeOptions()
op.add_experimental_option("mobileEmulation", {"deviceName": "iPhone X"})

driver = webdriver.Chrome(options=op)
driver.get("http://120.55.190.222:38080/#/pages/index/user")
```

#### 2. 通过 appium 测试移动端 web 网页

> - 配置信息需要添加：
>   - `'browserName': 'Chrome'`
>   - `"chromedriverExecutableDir":浏览器驱动路径`。
>     - 这个驱动装在电脑上，要求与手机浏览器版本一致
> - 配置信息移除 app 相关信息

```python
from appium import webdriver

caps = {
    "platformName": "Android",
    "platformVersion": "10",
    "deviceName": "X4UOCQOF79AUZX79",
    "browserName": "Chrome",
    # 要在电脑上装一个与手机里边的浏览器相对应的版本驱动
    # 要注意，会和电脑上浏览器的版本驱动重名，所以需要重命名
    # 驱动配置的方法，和selenium是一样的
    "chromedriverExecutable": "D:\\tool\selenium\python\chromedriver_81.exe",
    "noReset": "True",
    "newCommandTimeout": 6000,
    "automationName": "UIAutomator2"
}

driver = webdriver.Remote("http://127.0.0.1:4723/wd/hub", caps)
driver.get("http://120.55.190.222:38080/#/")
driver.implicitly_wait(5)

# 直接使用selenium的定位就可以，此处允许使用css定位
driver.find_element_by_css_selector(".uni-input-input").click()
driver.find_element_by_css_selector(".uni-input-input").send_keys("123456")
```

### 2. 混合 APP 自动化

```python
from appium import webdriver
import time

caps = {
    "platformName": "Android",
    "platformVersion": "10",
    "deviceName": "X4UOCQOF79AUZX79",
    "appPackage": "com.example.haiwen.myhybirdapp",
    "appActivity": ".MainActivity",
    "noReset": "True",
    "newCommandTimeout": 6000,
    "automationName": "UiAutomator2",
    "chromedriverExecutable": "D:\\tool\selenium\python\chromedriver_88.exe"
}

# 启动混合应用
driver = webdriver.Remote("http://127.0.0.1:4723/wd/hub", caps)
driver.implicitly_wait(10)

# 控制原生的控件
driver.find_element_by_id("com.example.haiwen.myhybirdapp:id/editText").send_keys("http://120.55.190.222:38080/#/")
driver.find_element_by_id("com.example.haiwen.myhybirdapp:id/button").click()

# # 查看当前手机app上的contexts
# print(driver.contexts)

# 切换进去
driver.switch_to.context("WEBVIEW_com.example.haiwen.myhybirdapp")

# 当我们在操作 webview 部分的时候，是可以使用一切selenium定位语法的
driver.find_element_by_css_selector(".uni-input-input").click()
time.sleep(1)
driver.find_element_by_css_selector(".uni-input-input").send_keys("123456")
```

## 五、 appium 报错

#### 1. 由于目标计算机积极拒绝，无法连接

​ 原因：appium 服务未启动
​ 解决：启动 appium 服务后，等待【welcome to appium xxx】提示语出现

#### 2. 会话冲突：failed to start an appium session requested a new session but one was in progress

​ 原因：之前的会话没关闭
​ 解决：重启 appium 服务，或重启手机

#### 3. 未安装 java 环境

​ 安装 jdk，如果已安装，检查环境变量

#### 4. adb 检测不到设备

1.  电脑是否安装手机驱动（win10 不需要），电脑下载手机助手，等手机助手装好驱动，卸载掉手机助手
2.  打开手机设置，进入开发者选项，打开 usb 调试功能
3.  重新拔插数据线，若手机提示仅充电，选传文件，若提示是否允许这台设备调试，选择永远允许
4.  换数据线，淘宝充电线，可能无法使用，尽量用原装数据线

#### 5. 程序无法自动打开 appium settings

​ 自己手动打开 appiumsettings

#### 6. java.long Permission denial:writing to settings

​ 小米：开启 USB 调试(安全设置) 插入 SIM 卡

​ OPPO：开发者选项 禁止权限监控--开启状态

#### 7. appium could not sign with default certificate

​ 右键 appium 图标以管理员方式运行
