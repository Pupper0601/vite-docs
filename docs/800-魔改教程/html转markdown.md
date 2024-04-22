---
title: Hexo-Butterfly 魔改 - Hexo插件 | html 转 markdown | 一秒转载
categories:
  - 转载
  - 魔改教程
tags:
  - hexo
  - 魔改
abbrlink: 64eff544
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-268.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#524940'
---

[Hexo 插件 | html 转 markdown | 一秒转载,枢衡の巢](https://www.crowhsu.top/posts/6e818316.html)

# Hexo 插件 | 直接复制 markdown | 一秒转载

一个 Hexo 插件，允许你直接从网页复制 markdown，主要为 butterfly 主题开发，但**基本的复制功能是通用的**。

## 安装

```sh
npm i hexo-butterfly-copymarkdown --save
```

## Config

在 Hexo 的\_config.yml 文件中添加配置。

比如：

```yml
copyMarkdown:
  enable: true
  pureMarkdown: false #使用true以禁用外挂转换 默认为 false
  keyboard: true #cv悬浮组件
  field: post # default: 每个页面 post: 仅文章页面（默认值）
  copyright: true # 是否添加版权信息 默认开启
  Reprint: true # 是否开启一键转载 默认开启
```

[项目地址](https://github.com/charles-hsuz/hexo-butterfly-copymarkdown)

## 效果

目前已适配除 mermaid 外全部外挂

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302111032837.gif)

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302111032501.gif)

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302111033577.gif)

本博客开启的是默认效果，也就是**会把外挂反编译回真实状态**

本来想拿洪哥和鱼佬的博客做个演示，但后来想想还是算了，顺便把本来写好的接口也撤了，现在这个插件“只能”用在自己的博客上被别人复制（可能意义不大，毕竟代码不难）
