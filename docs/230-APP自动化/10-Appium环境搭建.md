---
title: AppUI测试 - 环境搭建
categories:
  - 学习笔记
  - 软件测试
tags:
  - AppUI测试
abbrlink: 6e5ef2c5
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-158.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#5e7e7e'
---

# Appium 环境搭建

## 一、 appium

### 1. appium 介绍

`appium` 是一个自动化测试开源工具，支持 iOS 平台和 Android 平台上的原生应用，web 应用和混合应用。

- **原生应用** ： 指那些用 iOS 或者 Android SDK 写的应用（ Application 简称 app）。
- **web 应用** ： 指使用移动浏览器访问的应用（ appium 支持 iOS 上的 Safari 和 Android 上的 Chrome）。
- **混合应用** ： 指原生代码封装网页视图——原生代码和 web 内容交互。

> appium 是一个跨平台的工具：它允许测试人员在不同的平台（ iOS，Android）使用同一套 API 来写自动化测试脚本，这样大大增加了 iOS 和 Android 测试套件间代码的复用性。

##### 客户端、服务器架构

- appium 的核心是一个 web 服务器
- 他接受来自客户端的连接，监听命令并在移动应用上执行，答复 http 响应来描述执行结果

##### session

- 自动化始终在一个会话中执行，客户端会给服务器发送请求
- 请求中包含一个被称作预期能力的 json 对象，这时候服务器会开启这个自动化会话
- 并返回一个用于后续发送命令的 id

##### 预期能力

- 是一些发送给 appium 服务的键值对组合，
- 他告诉服务器，我们想要启动什么类型的自动化会话
- 可以修改服务器在自动化过程中的行为。比如：将 platforName 设置为 Android

##### appium 服务器：

- 是一个 node.js 编写的

##### appium 客户端

- 我们写的代码

##### appium Desktop

- 他打包了 appium 服务器运行需要的所有东西，还可以查看应用程序的结构树--元素定位

### 2. appium 工作原理

![](https://img.pupper.cn/img/20210819144424.png)

Appium 支持 Android 及 iOS 平台的 App 测试，两者的运行原理大体相同。

#### 1. Android 平台

- 由 Client 发起请求，经过中间服务套件，驱动 App 执行相关的操作。
  - Client 是测试人员开发的 WebDriver 测试脚本，也就是你我写的代码。
- 中间服务套件则是 Appium 解析服务，
  - Appium 在服务端启用 4723 端口，通过该端口实现 Client 与 Appium Server 通信。
  - Appium Server 把请求转发给中间件 Bootstrap.jar
  - Bootstrap.jar 安装在手机上，监听 4724 端口并接收 Appium 命令，
  - 通过调用 UIAutomator 命令来实现测试过程。
- Bootstrap 将执行的结果返回给 Appium Server。
  - Appium Server 再将结果返回给 Client。

#### 2. ios 平台

- 由 Client 发起请求，经过中间服务套件，驱动 App 执行相关的操作
  - Client 是测试人员开发的 Webdriver 测试脚本。
- 中间服务套件则是 Appium 解析服务
  - Appium 在服务端启用 4723 端口，通过该端口实现 Client 与 Appium Server 通信。
  - Appium Server 调用 instruments.js 启动一个 Socket Server，同时分出一个⼦进程运⾏ instruments.app
  - 将 bootstrap.js（一个 UIAutomation 脚本）注入到设备从而与外界进行交互。
- Bootstrap.js 将执行的结果返回给 Appium Server
  - Appium Server 再将结果返回给 Client。

> Android 与 iOS 区别在于 Appium 将请求转发到 `bootstrap.js` 或者 `bootstrap.jar.`
>
> 然后由 bootstrap 驱动 UIAutomation 或 UIAutomator 去设备上完成具体的动作。

## 二、 Appium 环境搭建

### 1. 安装 Node.js

Appium 服务端运行时依赖 node.js 环境，因此需要优先安装 node 环境。

[Node.js 下载地址](https://nodejs.org/zh-cn/) ： https://nodejs.org/zh-cn/

![image-20210819152603141](https://img.pupper.cn/img/20210819152603.png)

**_安装路径不要有中文_**

安装好后，使用 `node -v` 检查

![image-20210819152855857](https://img.pupper.cn/img/20210819152856.png)

### 2. 安装 JDK 及 配置环境变量

#### 1. 安装 JDK

[JDK 官网下载](https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html) : https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html

[JDK 下载 --- 清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/8/) : https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/8/

![image-20210819155400901](https://img.pupper.cn/img/20210819155401.png)

**默认地址安装 --- 安装路径不要有中文**

安装完成后使用 `java` 和 `javac` 进行验证

![image-20210819155559175](https://img.pupper.cn/img/20210819155559.png)

![image-20210819155626411](https://img.pupper.cn/img/20210819155626.png)

#### 2. 配置环境变量

```shell
JAVA_HOME

C:\Program Files\Java\jdk1.8.0_191
```

![image-20210819160950557](https://img.pupper.cn/img/20210819160950.png)

```
CLASSPATH

C:\Program Files\Java\jdk1.8.0_191\lib\tools.jar
```

![image-20210819161255901](https://img.pupper.cn/img/20210819161256.png)

在 path 中配置 `jdk` 和 `jre`

```shell
C:\Program Files\Java\jdk1.8.0_191\bin

C:\Program Files\Java\jdk1.8.0_191\jre\bin
```

![image-20210819162051736](https://img.pupper.cn/img/20210819162051.png)

#### 3. mac 环境配置

打开终端，打开 profile 文件（需要输入密码）

```shell
sudo vim /etc/profile
```

![image-20210819172910926](https://img.pupper.cn/img/20210819172911.png)

在文件末尾添加在文件末尾添加 JAVA_HOME 路径（切换英文输入法，键入“i”，进入插入模式）：

```shell
JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk9.0.1.jdk/Contents/Home/"
CLASS_PATH="$JAVA_HOME/lib"
PATH=".:$PATH:$JAVA_HOME/bin"
```

::: warning
`E45: 'readonly' option is set (add ! to override)`

如果无法保存, 可使用 `qw!` 强制保存
:::

里面 jdk-9.0.1.jdk，是一个文件夹，根据你安装的 JDK 版本，具体查看方式：打开 Finder，快捷键 “Command +shift + G”，输入/Library/Java/JavaVirtualMachines/，单击回车，就可以看到。

### 3. 安装 SDK 及 配置环境变量

#### 1. 安装 SDK

[SDK 下载地址](https://www.androiddevtools.cn/) : https://www.androiddevtools.cn/

![image-20210819164752259](https://img.pupper.cn/img/20210819164752.png)

安装路径不能有中文

![image-20210819165713929](https://img.pupper.cn/img/20210819165714.png)

#### 2. 配置环境变量

```shell
ANDROID_HOME

C:\Program Files(x86)\Android\andorid-sdk
```

![image-20210819170031335](https://img.pupper.cn/img/20210819170031.png)

在 `path` 中配置

```shell
%ANDROID_HOME%\tools
%ANDROID_HOME%\platform-tools
```

![image-20210819170427547](https://img.pupper.cn/img/20210819170427.png)

安装后，使用 `adb version` 进行验证

![image-20210819170938640](https://img.pupper.cn/img/20210819170938.png)

#### 3. MAC 环境变量配置

在终端中输入 vim .bash_profile，打开配置文件后，在文件末尾添加以下 2 行

问号部分要改成你自己电脑的家目录名称

```shell
PATH=$PATH:/Users/???/Library/Android/sdk/tools
PATH=$PATH:/Users/???/Library/Android/sdk/platform-tools
```

保存后，在终端执行 source .bash_profile

使用 `adb version` 检查环境

### 4. 安装 appium 图形应用

[appium 下载地址](https://github.com/appium/appium-desktop/releases) : http://appium.io/

![image-20210819172036291](https://img.pupper.cn/img/20210819172036.png)

### 5. 安装 Appium-Python-Client 库

```shell
pip install Appium-Python-Client
```
