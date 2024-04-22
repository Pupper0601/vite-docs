---
title: 11、接口测试 - Jenkins 技术
categories:
  - 学习笔记
  - 软件测试
tags:
  - 接口测试
abbrlink: 8c881bdc
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-90.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#352719'
---

### 1. jenkins 是什么

Jenkins 是一个开源的、提供友好操作界面的持续集成(CI)工具，主要用于持续、自动的构建/测试软件项目、监控外部任务的运行（这个比较抽象，暂且写上，不做解释）。

Jenkins 用 Java 语言编写，可在 Tomcat 等流行的 servlet 容器中运行，也可独立运行。

通常与版本管理工具(SCM)、构建工具结合使用。常用的版本控制工具有 SVN、GIT，构建工具有 Maven、Ant、Gradle。

### 2. CI --- 持续集成

`CI`(Continuous integration，中文意思是`持续集成`)是一种软件开发时间。

持续集成强调开发人员提交了新代码之后，立刻进行构建、（单元）测试。

根据测试结果，我们可以确定新代码和原有代码能否正确地集成在一起。

### 3. CD --- 持续交付

`CD`(Continuous Delivery， 中文意思`持续交付`)是在持续集成的基础上，将集成后的代码部署到更贴近真实运行环境(类生产环境)中。

比如，我们完成单元测试后，可以把代码部署到连接数据库的 Staging 环境中更多的测试。

如果代码没有问题，可以继续手动部署到生产环境。

## 二、 Jenkins 环境搭建

### 1. 查看本地镜像

```shell
docker images
```

### 2. 下载镜像

#### 1. 下载官方最新镜像

1.  搜索镜像

    ```shell
    docker search jenkins
    ```

2.  下载镜像

    ```shell
    docker pull jenkins
    ```

#### 2. 下载指定镜像（阿里云 - 公共仓库）

```shell
docker pull registry.cn-hangzhou.aliyuncs.com/sqqdcl/jenkins
```

查看下载的镜像

```shell
docker images
```

### 3. 创建容器

#### 1. 创建 宿主机 挂载目录

```shell
mkdir -p /var/jenkins_home
```

#### 2. 设置 挂载目录 权限

```shell
chmod 777 /var/jenkins_home
```

#### 3. 创建与启动守护式容器 --- 注意容器中的端口使用 8080

```shell
docker run -id --name=sqjenkins -p 8080:8080 -v /var/jenkins_home:/var/jenkins_home registry.cnhangzhou.aliyuncs.com/sqqdcl/jenkins
```

#### 4. 查看容器

```shell
docker ps -a
```

## 三、jenkins 设置

### 1. 访问 jenkins

#### 1. 获取 宿主机 IP

```shell
ipconfig
```

#### 2. 访问 jenkins

```shell
http://宿主机ip：8080
```

#### 3. 获取 管理员密码

```shell
docker logs jenkins
```

```shell
cat /var/jenkins_node/secrets/initialAdminPassword
```

### 2. 安装插件

#### 1. 首次进入

1.  选择 安装推荐的插件

2.  设置 第一个管理员

    用户名密码：admin

    电子邮件：pupper.cheng@gmail.com

#### 2. 安装插件 --- gitlab，gitlab hook, allure

##### 1. 修改下载源

```shell
http://mirror.xmission.com/jenkins/updates/update-center.json
```

##### 2. 搜索 gitlab ，allure 直接安装

#### 3. 重启 jenkins

```shell
docker restart 容器id
```

### 3. jenkins 全局设置

#### 1. 设置 JDK

别名：`JAVA_HOME`

JAVA_HOME：`/usr/local/openjdk-8`

不要勾选 `自动安装`

#### 2. git 设置

Name： `git`

Path to Git executable ： `/usr/bin/git`

#### 3. allure 设置

别名： `allure`

安装目录： `/opt/allure-2.13.5  `

### 4. jenkins 邮件功能 设置

#### 1. 发送者 邮箱 设置

网易邮箱：`pupper_cheng@163.com`

授权码：`DYTDGFPLGXUBYZKA`

#### 2. 接受者邮箱设置

## 四、 自动化环境验证

### 1. python 环境验证

#### 1. 进入容器：

```shell
docker exec -it jenkins /bin/bash
```

#### 2. 验证 python：

```shell
python3
```

#### 3. 验证依赖库

```shell
pip3 list
```

### 2. pytest 环境验证

#### 1. 以 管理员 进入 容器

```shell
docker exec -uroot -it jenkins /bin/bash
```

#### 2. 加 pytest 软连接

软连接是 linux 中一个常用命令，它的功能是为某一个文件在另外一个位置建立一个同不的链接。

具体用法是：`ln -s 源文件 目标文件`。

```shell
ln -s /opt/python3/bin/pytest /usr/bin/pytest
```

## 五、 jenkins 实现自动化

### 1. 将项目文件放到挂载目录

挂载目录为：`/var/jenkins_home`

### 2. 创建工程

#### 1. 新建任务

#### 2. 选择自由分格

### 3. 配置工程

#### 1. 配置 构建后 发送邮件

![](https://img.pupper.cn/img/20220725180044.png)

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${ENV, var="JOB_NAME"}-第${BUILD_NUMBER}次构建日志</title>
</head>

<body leftmargin="8" marginwidth="0" topmargin="8" marginheight="4"
    offset="0">
    <table width="95%" cellpadding="0" cellspacing="0"  style="font-size: 11pt; font-family: Tahoma, Arial, Helvetica, sans-serif">
        <tr>
            本邮件由系统自动发出，无需回复！<br/>
            各位同事，大家好，以下为${PROJECT_NAME }项目构建信息</br>
            <td><font color="#CC0000">构建结果 - ${BUILD_STATUS}</font></td>
        </tr>
        <tr>
            <td><br />
            <b><font color="#0B610B">构建信息</font></b>
            <hr size="2" width="100%" align="center" /></td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>项目名称 ： ${PROJECT_NAME}</li>
                    <li>构建编号 ： 第${BUILD_NUMBER}次构建</li>
                    <li>触发原因： ${CAUSE}</li>
                    <li>构建状态： ${BUILD_STATUS}</li>
                    <li>构建日志： <a href="${BUILD_URL}console">${BUILD_URL}console</a></li>
                    <li>构建  Url ： <a href="${BUILD_URL}">${BUILD_URL}</a></li>
                    <li>工作目录 ： <a href="${PROJECT_URL}ws">${PROJECT_URL}ws</a></li>
                    <li>项目  Url ： <a href="${PROJECT_URL}">${PROJECT_URL}</a></li>
                     <li>测试报告： <a href="${PROJECT_URL}allure">${PROJECT_URL}allure</a></li>
                </ul>

<h4><font color="#0B610B">失败用例</font></h4>
<hr size="2" width="100%" />
$FAILED_TESTS<br/>

<h4><font color="#0B610B">最近提交(#$SVN_REVISION)</font></h4>
<hr size="2" width="100%" />
<ul>
${CHANGES_SINCE_LAST_SUCCESS, reverse=true, format="%c", changesFormat="<li>%d [%a] %m</li>"}
</ul>
详细提交: <a href="${PROJECT_URL}changes">${PROJECT_URL}changes</a><br/>

            </td>
        </tr>
    </table>
</body>
```

![](https://img.pupper.cn/img/20220725180126.png)

#### 2. 配置 allure 报告

![](https://img.pupper.cn/img/20220725180159.png)

![](https://img.pupper.cn/img/20220725180229.png)

#### 3. 配置 构建命令

![](https://img.pupper.cn/img/20220725180254.png)

```shell
#!/bin/bash
rm -rf allure-results
cd /var/jenkins_home/Delivery_System/test_case
pytest -sq --alluredir=${WORKSPACE}/allure-results
exit 0
```

![](https://img.pupper.cn/img/20220725180344.png)

#### 4. 构建测试

![](https://img.pupper.cn/img/20220725180410.png)

## 六、 jenkins 关联 git

### 1. 确认安装了 gitlab、 allure

![](https://img.pupper.cn/img/20220725180510.png)

![](https://img.pupper.cn/img/20220725180532.png)

### 2. 全局工具配置 --- git

![](https://img.pupper.cn/img/20220725180605.png)

### 3. 任务配置

#### 1.选择 git

![](https://img.pupper.cn/img/20220725180637.png)

### 2. 输入远程仓库的 用户名、密码

![](https://img.pupper.cn/img/20220725180700.png)

![](https://img.pupper.cn/img/20220725180733.png)

### 4. 构建触发器

![](https://img.pupper.cn/img/20220725180802.png)

![](https://img.pupper.cn/img/20220725180825.png)

### 5. 远程仓库配置 hooks

![](https://img.pupper.cn/img/20220725180853.png)

### 6. 测试配置

![](https://img.pupper.cn/img/20220725180918.png)
