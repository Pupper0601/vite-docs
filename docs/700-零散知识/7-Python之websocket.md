---
title: Python 之 Websocket 基础操作
categories:
  - 零散知识
tags:
  - websocket
abbrlink: 4e07f8df
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-136.webp
date: '2023-05-07 22:54:36'
update: '2023-05-07 22:54:40'
main_color: '#da4933'
---

[Websocket , 基础学习笔记](https://blog.csdn.net/captain5339/article/details/128212124)

# 一. websocket 介绍

## 1.1 简介

::: tip
Websocket : 可以实现 客户端(client) 与 服务端(server) 之间的双向通信, 弥补了 http 无法保持长连接的不足.
Websocket 协议本身有 `心跳机制、连接检测机制`，服务端无须关心客户端状态，一旦有异常，会自动断开连接
:::

使用场景:

- html 页面实时更新、 网页游戏、聊天、证券交易等
- 实时通信类场景, 如位置服务、物联网、多方协作软件、在线教育等

## 1.2 原理

> 基于 TCP, 一次握手就能建立连接, 支持双向通信, 可保持长连接.
>
> _响应码为 `101`, 表示切换为 `websocket 协议`_

![](https://img.pupper.cn/img/202305081549136.jpg)

WebSocket 握手请求消息实例:

```sh
GET /chat HTTP/1.1
Host: normal-website.com
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: wDqumtseNBJdhkihL6PW7w==
Connection: keep-alive, Upgrade
Cookie: session=KOsEJNuflw4Rd9BDNrVmvwBF9rEijeE2
Upgrade: websocket
```

如果 Server 接收连接, 返回响应

```sh
HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: 0FFP+2nmNIf/h+4BP36k9uzrYGk=
```

# 二. 搭建 WebSocket 服务

## 2.1 安装 websockets 包

```sh
pip install websockets
```

## 2.2 编写 server 端代码

websockets 模块 server 端的主要方法:

- `recv()` : 收消息
- `send()` : 发送消息
- `serve()` : 创建 server 对象

实现步骤:

1. 编写 websocket 异步任务处理函数 handler
2. 创建 1 个 websocket server 对象
3. 异步运行 server 对象

::: warning
websocket 地址格式：

- **ws://主机地址:端口号**
- **wss://主机地址:端口号**， wss 表示此连接为 https 连接。
  :::

```Python
import asyncio
import websockets
from datetime import datetime

async def handler(websocket):
    # data = await websocket.recv()
    # reply = f"Data received as \"{data}\".  time: {datetime.now()}"
    # print(reply)
    # await websocket.send(reply)
    # print("Send reply")

    async for message in websocket:
        reply = f"Data received as \"{message}\".  time: {datetime.now()}"
        print(reply)
        await websocket.send(reply)


async def main():
    async with websockets.serve(handler, "localhost", 9999):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
```

在终端使用 `python -m websockets ws://localhost:9999` 代码连接服务端, 即可于服务端建立连接.

![](https://img.pupper.cn/img/202305081725648.gif)

## 2.3 websocket 客户端实现代码

websockets 客户端提供的主要方法:

- `connect()` : 建立与服务器的连接
- `send()` : 发送消息
- `recv()` : 接收消息
- `close()` : 显式的关闭连接

```Python
import asyncio
import websockets
import time

async def ws_client(url):
    for i in range(1, 40):
        async with websockets.connect(url) as websocket:
            await websocket.send(f"[{i}] - 客户端 → 服务端.")

            # 接收服务端返回的消息
            response = await websocket.recv()
        print(response)
        time.sleep(1)

asyncio.run(ws_client('ws://localhost:9999'))
```
