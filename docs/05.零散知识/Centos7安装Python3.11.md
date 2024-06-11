---
title: Centos7 安装 Python3.11 教程
categories:
  - 零散知识
tags:
  - CentOS
toc_style_simple: true
date: '2024-03-25 17:51:06'
update: '2024-03-25 17:51:43'
cover: 'https://top-img.pupper.cn/top-img/top-img-29.webp'
main_color: '#bea48b'
abbrlink: 38da586
---

> CentOS 中默认安装的是 Python 2.7，如果您需要使用 Python 3.11，需要先安装 Python 3.11，并将其设置为默认 Python 版本。

以下是 CentOS 安装 Python 3.11 并替换默认 Python 的详细步骤

# 一.更新系统
在安装 Python 3.11 之前，建议先更新系统，以确保系统是最新版本，并且避免因为系统更新过程中的问题造成 Python 安装出错。

```bash
sudo yum -y update
```

# 二.安装编译工具和依赖库
Python 是一种编程语言，它的解析器需要通过编译才能运行。因此，在安装 Python 3.11 之前，需要安装编译工具和依赖库
```bash
sudo yum -y groupinstall "Development tools"

sudo yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel libffi-devel gcc-c++
```

# 三.下载 Python 3.11 源代码
下载 Python 3.11 的源代码。您可以在 Python 官方网站上找到最新版本的源代码
```bash
wget https://www.python.org/ftp/python/3.11.0/Python-3.11.0.tgz
```

# 四.解压并编译 Python 3.11

```bash
tar xvf Python-3.11.0.tgz
cd Python-3.11.0
sudo ./configure --enable-optimizations
sudo make altinstall
```

在编译过程中，可以使用 make -j n 命令加快编译速度（n 为 CPU 核心数）。
安装完成后，您可以使用以下命令来测试 Python 版本：

```bash
python3.11 --version
```

# 五.替换默认 Python
CentOS 中默认的 Python 版本是 2.7，如果您期望使用 Python 3.11 作为默认版本，则需要更改系统的配置。

```bash
sudo alternatives --install /usr/bin/python python /usr/local/bin/python3.11 2

sudo alternatives --config python
```

输入以上命令后，会有一个提示，选择数字2并回车，再选择数字1回车，即可将 Python3.11 替换默认 Python 版本。
执行下面的命令，查看默认 Python 版本是否已更改：

```bash
python --version
```
