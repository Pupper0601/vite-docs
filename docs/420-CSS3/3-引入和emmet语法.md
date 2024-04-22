---
title: CSS - 引入和emmet 语法
categories:
  - 学习笔记
  - 前端基础
tags:
  - CSS
abbrlink: ff38151d
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-165.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#a8afb0'
---

## 一、CSS 引入方式

| 样式表     | 优点               | 缺点         | 使用方法           | 控制范围 |
| ---------- | ------------------ | ------------ | ------------------ | -------- |
| 外部样式表 | 结构与样式完全分离 | 需要引入     | 头部 link 标签引入 | 多个页面 |
| 内部样式表 | 结构与样式部分分离 | 没有彻底分离 | 头部 style 标签中  | 一个页面 |
| 行内样式表 | 书写方便，权重高   | 结构样式混乱 | 标签中             | 一个标签 |

## 1. 内部样式表

> 内部样式表： 将样式写在 HTML 页面 hand 标签的 style 标签中

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style type="text/css">
      div {
        text-indent: 32px;
      }
    </style>
  </head>
  <body>
    <div>三生三世十里桃花，一心一意百行代码</div>
  </body>
</html>
```

**注意：**

1.  `<style>` 标签理论上可以放在 HTML 标签的任何地方，但是一般都放在 hand 标签中
2.  代码结果清晰，但是并没有实现结构与样式完全分离

### 2. 行内样式表

> 行内样式表 ： 在元素标签内部的 `style` 属性中 设定 css 样式。

```html
<div style="color: red;">三生三世十里桃花，一心一意百行代码</div>
```

### 3. 外部样式表

> 外部样式表 ： 把 样式单独写在 css 文件中，然后在 HTML 页面引入该文件

格式：

```html
<link rel="stylesheet" href="css文件路径" />
```

| 属性 | 作用                                                                            |
| ---- | ------------------------------------------------------------------------------- |
| rel  | 定义当前文档与链接文档之间的关系，`stylesheet` 表示被链接的文档是一个样式表文件 |
| href | 定义所链接外部样式表文件的 url，可以是相对路径，也可以是绝对路径                |

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div>三生三世十里桃花，一心一意百行代码</div>
  </body>
</html>
```

## 二、emmet 语法

### 1. 快速生成 HTML 结构语法

- 生成标签

  - 输入标签名，按 tab 键即可。如：输入 div ，按 tab 键，就可以生成 `<div></div>`

    ```html
    p tab键

    <p></p>
    ```

- 生成多个相同的标签 `*`

  - 输入标签名`*`生成的数量，按 tab 键即可，如：`div*3`，就可以快速生成 3 个 div

    ```html
    div*3 tab键

    <div></div>
    <div></div>
    <div></div>
    ```

- 生成 父子标签 `>`

  - 输入 父标签 `>` 子标签 ，按 tab 键即可，如： `ul>li*3`，就可以生成一个 ul 标签 和 三个 li 标签

    ```html
    ul>li*3 tab键

    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    ```

- 生成 兄弟标签 `+`

  - 输入 父标签 `+` 子标签 ，按 tab 键即可，如：`div+div`，就可以生成两个同级的 div 标签

    ```html
    div+div tab键

    <div></div>
    <div></div>
    ```

- 生成带 类名 或 id 名的标签 `.` 或 `#`

  - 输入 `.类名` 或 `#id名` ，按 tab 键即可，如： `.demo` 或者 `#two`

    ```html
    .demo tab键

    <div class="demo"></div>
    ```

- 生成有顺序的标签 `$`

  - 输入 `.类名$*生成个数`，按 tab 键即可，如： `.demo$*3`，就生成 3 个类名从 demo1 到 demo5 的 div

    ```html
    .demo$*3 tab键

    <div class="demo1"></div>
    <div class="demo2"></div>
    <div class="demo3"></div>
    ```

- 生成标签自带内容 `{}`

  - 输入 `div{输入的内容}`，按 tab 键即可，如：`div{我不是药神}*3`

    ```html
    div{我不是药神}*3 tab键

    <div>我不是药神</div>
    <div>我不是药神</div>
    <div>我不是药神</div>
    ```

### 2. 快速生成 css 样式语法

> css 基本采用简写的形式即可

```css
w200 tab键 div {
  width: 200px;
}
```

```css
tac tab键 div {
  text-align: center;
}
```
