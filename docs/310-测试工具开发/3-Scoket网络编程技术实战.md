---
title: 测试工具开发 - scoket 网络编程技术(实战)
categories:
  - 学习笔记
  - 测试开发
tags:
  - 测试工具开发
abbrlink: 28f21611
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-217.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#846684'
---

## 一、端口扫描的原理

端口扫描原理 ： 尝试与目标主机建立连接，如果目标主机有回复则说明端口开放。

TCP 连接 ： 通过使用三次握手 与目标主机建立标准的 tcp 连接。这种方法更容易被发现，被目标主机记录。

实现简单，对操者权限没有严格要求

## 二、设计方案规划

1.  建立 TCP 连接
2.  查看连接返回
3.  判断连接返回值
4.  循环扫描剩余端口

## 三、代码实现功能

### **`socket（family，tupe）`**

- `family` ： 代表家族地址。可为 `AF_INET` 或者 `AF_UNIX`

  - `AF_INET` ： 包含 **Internet** 地址
  - `AF_UNIX` ： 用于同一台机器上的进程间的通信。

- `type` ： 代表 套接字 类型。 可为 `SOCK_STREAM` 或者 `SOCK_DGRAM`
  - `SOCK_STREAM` ： 流套接字， 也叫 **TCP 套接字**
  - `SOCK_DGRAM` ： 数据报套接字， 也叫 **UDP 套接字**
- 默认为 `family = AF_INET` `type = SOCK_STREAM`

### 客户端 套接字

- `s.connect（）` ： 主动初始化 TCP 服务器连接。
  - 一般 **address** 的格式 **元组（hostname，port）**，如果连接出错，返回 **socket.error 错误**
- `s.connect_ex（）` ： connect（） 函数的扩展版本，出错时返回出错码，而不是抛出异常。
