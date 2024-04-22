---
title: 12、接口测试 - Git 技术
categories:
  - 学习笔记
  - 软件测试
tags:
  - 接口测试
abbrlink: f8f43845
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-15.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#458282'
---

## 一、 git 工作流程

1.  克隆远程仓库到本地 （`clone`）
2.  在本地仓库中 checkout 代码 --- 进行编程 或者拉取 远程仓库代码（`pull`）
3.  在提交到本地仓库前 --- 需要到暂存区
4.  提交到本地仓库 （`commit`）
5.  推送到远程仓库（`push`）

## 二、 gitlab 搭建

### 1. 创建 gitlab 挂载目录

```shell
mkdir /var/github
```

```shell
cd /var/github
```

```shell
mkdir config logs data
```

### 2. 拉取 gtilab 镜像

#### 1. 搜索镜像

```shell
docker search gitlab
```

#### 2. 拉取 镜像

```shell
docker pull gitlab/gitlab-ce
```

#### 3. 检查 拉取的镜像

```shell
docker images
```

### 3. 创建 gitlab 容器

```shell
docker run -id -p 443:443 -p 9001:80 -p 8022:22 --hostname 服务器IP --name=gitlab --restart always -v /var/gitlab/config:/etc/gitlab -v /var/gitlab/logs:/var/log/gitlab -v /var/gitlab/data:/var/opt/gitlab -v /etc/localtime:/etc/localtime:ro --privileged=true gitlab/gitlab-ce
```

### 4. gitlab 验证

网页打开：`服务器ip:9001`

> 默认用户名为：`root`
>
> 初始登录需要修改密码，8 位以上

### 5. 报 502 错误解决办法

#### 1. 进入容器 重启服务

```shell
docker exec -it 容器名或id /bin/bash

gitlab-ctl reconfigure
gitlab-ctl restart
```

#### 2. 端口占用 --- 修改端口

使用工具打开文件 `hostconfig.json`，修改 大括号内的 端口号（宿主机端口）

文件目录：`/var/lib/docker/containers/容器id`

```json
"PortBindings":{"22/tcp":[{"HostIp":"","HostPort":"8022"}],"443/tcp":[{"HostIp":"","HostPort":"443"}],"80/tcp":[{"HostIp":"","HostPort":"9002"}]}
```

#### 3. 内存占用过多

## 三、 git 客户端安装

### 1. 下载 客户端

[git 官网地址](https://git-scm.com/downloads) https://git-scm.com/downloads

**点击 downloads 中的 windows 下载**

### 2. 安装 git 客户端

无脑安装

### 3. git 可视化工具 --- GitKraken

[GitKraken 下载地址](https://www.gitkraken.com/) ： https://www.gitkraken.com/

[GitKraken 汉化地址](https://github.com/k-skye/gitkraken-chinese) ： https://github.com/k-skye/gitkraken-chinese

### 4. 本地仓库创建

1.  新建文件夹

2.  查看 git 版本

    1.  在文件夹上 右键 --- git bash Here

    ```shell
    git --version
    ```

3.  环境 配置（全局配置） --- 选配

    ```shell
    git config --global user.name "Pupper"
    git config --global user.name.email"gdmuye@qq.com"
    ```

4.  初始化本地仓库 --- 文件夹内 --- git bash here

    ```shell
    git init
    ```

5.  克隆远程仓库 --- 如果端口不是 80，则需要添加

    ```shell
    git clone 远程仓库的url 端口
    ```

## 四、git 分支操作

### 1. 查看分支

```shell
git brach -a    # 查看远程分支

git branch      # 查看本地分支
```

### 2. 新建分支 并 切换到 分支

```shell
git checkout -b  dev
```

### 3. 切换 分支目录

```shell
git checkout master
```

### 4. 合并分支 --- dev 分支 合并到 master 上

> **注意：一定要在 master 分支上合并**

```shell
git merge dev
```

### 5. 远程仓库没有分支时推送分支

```shell
git push origin dev
```

### 6. 删除远程分支

```shell
git push origin:dev
```

## 五、 pycharm 设置

### 1. 克隆 远程仓库

### 2. 新建分支

### 3. 切换分支
