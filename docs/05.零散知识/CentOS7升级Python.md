---
title: CentOS 7 升级 Python 到 3.9.0
categories:
  - 零散知识
tags:
  - CentOS
abbrlink: 9851bd15
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-44.webp
ai:
  - centos 7 自带的 python是2.7版本，我们想要升级到高版本。
date: '2023-07-18 23:02:55'
main_color: '#60352e'
---

centos 7 自带的 python是2.7版本，我们想要升级到高版本。
# 安装文件准备
## 下载
在官方主站找到合适的版本，并下载 https://www.python.org/ftp/python/
先下载最新得python安装文件，比如以3.9.1为例。如果通过centos得wget命令太慢，可以下载到本地再通过rz命令上传到服务器。

比如我这里下载的是 `3.9.0` 版本
```bash
https://www.python.org/ftp/python/3.9.0/Python-3.9.0.tgz
```

## 解压

```bash
tar -xzvf Python-3.9.0.tgz
```

进入解压缩后的文件夹

```bash
cd Python-3.9.0
```
## 创建文件夹
在 /usr/local 建一个文件夹 python3（ 作为python的安装路径，以免覆盖老的版本）

```bash
mkdir /usr/local/python3 
```

# 编译
## 生成配置文件
在 `Python-3.9.0` 文件夹下 生成安装配置文件

```bash
./configure --prefix=/usr/local/python3
```

## 编译及安装

```bash
make && make install 
```

# 修改系统路径和指向。

## 修改系统路径
首先把centos旧的python版本移走：

```bash
mv /usr/bin/python /usr/bin/python_old
mv /usr/bin/pip /usr/bin/pip_old
```
或者不移走，选择备份：

```bash
cp /usr/bin/python /usr/bin/python.bak
cp /usr/bin/pip /usr/bin/pip.bak
```

## 修改指向（软链接）：

```bash
ln -s /usr/local/python3/bin/python3.9 /usr/bin/python
ln -s /usr/local/python3/bin/pip3.9 /usr/bin/pip
```

centos的python升级安装完成。

