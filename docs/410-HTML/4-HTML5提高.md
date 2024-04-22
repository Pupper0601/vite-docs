---
title: HTML - 基础提高
categories:
  - 学习笔记
  - 前端基础
tags:
  - HTML
abbrlink: 6ef27ddb
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-88.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#6b5d54'
---

## 一、html5 标签

### 1. 语义标签

> `header` : 头部标签
>
> `<nav>` : 导航标签
>
> `<article>` : 内容标签
>
> `<section>` : 定义文档某个区域
>
> `<aside>` : 侧边栏标签
>
> `<footer>` : 尾部标签

注意：

- 这种语义化标准主要是针对 搜索引擎 的
- 这些标签可以多次使用
- 在 ie9 中，需要把这些标签转换为块级元素

### 2. 多媒体标签

> `<audio>` ：音频标签， 尽可能使用 mp3 格式的文件
>
> `<video>` ： 视频标签，尽可能使用 mp4 格式的文件

#### 1. 视频标签（video）

| 标签   | 描述                     |
| ------ | ------------------------ |
| video  | 定义一个视频             |
| source | 定义多种媒体资源         |
| track  | 定义在媒体播放器文本轨迹 |

```css
/* 解决兼容性问题 */
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  您的浏览器不支持Video标签。
</video>
```

常见属性：
| 属性 | 值 | 说明 |
|----------|----------------------------------|-------------------------------------------------|
| autoplay | autoplay | 视频就绪自动播放（google 需要添加 muted 来解决） |
| controls | controls | 向用户显示播放控件 |
| width | px | 播放器宽度 |
| height | px | 播放器高度 |
| loop | loop | 是否循环播放 |
| preload | auto（预加载）、none（不预加载） | 是否预加载（如果有 autoplay 可忽略） |
| src | url | 视频地址 |
| poster | imgurl | 加载等待图片 |
| muted | muted | 静音播放 |

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>HTML5新增视频标签</title>
    <style>
      video {
        width: 100%;
      }
    </style>
  </head>
  <body>
    <video
      src="media/mi.mp4"
      autoplay="autoplay"
      muted="muted"
      loop="loop"
      poster="media/mi9.jpg"
    ></video>
  </body>
</html>
```

#### 2. 音频标签（audio）

| 标签   | 描述               |
| ------ | ------------------ |
| audio  | 定义声音内容       |
| source | 规定类多种媒体资源 |

常见属性：
| 属性 | 值 | 描述 |
|----------|----------|----------------------|
| autoplay | autoplay | 音频在就绪后马上播放 |
| controls | controls | 显示控件 |
| loop | loop | 循环播放 |
| src | url | 音频地址 |

### 3. input 表单

新增 input 类型

| 属性值        | 说明             |
| ------------- | ---------------- |
| type="email"  | email 类型       |
| type="url"    | url 类型         |
| type="date"   | 日期类型         |
| type="time"   | 时间类型         |
| type="month"  | 月类型           |
| type="week"   | 周类型           |
| type="number" | 数字类型         |
| type="tel"    | 手机号码         |
| type="search" | 搜索框           |
| type="color"  | 生成颜色选择表单 |

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body>
    <!-- 我们验证的时候必须添加form表单域 -->
    <form action="">
      <ul>
        <li>
          邮箱:
          <input type="email" />
        </li>
        <li>
          网址:
          <input type="url" />
        </li>
        <li>
          日期:
          <input type="date" />
        </li>
        <li>
          时间:
          <input type="time" />
        </li>
        <li>
          数量:
          <input type="number" />
        </li>
        <li>
          手机号码:
          <input type="tel" />
        </li>
        <li>
          搜索:
          <input type="search" />
        </li>
        <li>
          颜色:
          <input type="color" />
        </li>
        <!-- 当我们点击提交按钮就可以验证表单了 -->
        <li><input type="submit" value="提交" /></li>
      </ul>
    </form>
  </body>
</html>
```

#### 表单属性

| 属性         | 值        | 说明                                     |
| ------------ | --------- | ---------------------------------------- |
| required     | required  | 必填                                     |
| placeholder  | 提示文本  | 提示信息                                 |
| autofocus    | autofocus | 自动聚焦，页面加载完成自动聚焦到指定表单 |
| autocomplete | off/on    | 历史输入提示，默认打开 on，关闭值为 off  |
| multiple     | multiple  | 多选文件提交                             |

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>HTML5新增表单属性</title>
    <style>
      input::placeholder {
        color: pink;
      }
    </style>
  </head>
  <body>
    <form action="">
      <input
        type="search"
        name="sear"
        id=""
        required="required"
        placeholder="pink老师"
        autofocus="autofocus"
        autocomplete="off"
      />
      <input type="file" name="" id="" multiple="multiple" />
      <input type="submit" value="提交" />
    </form>
  </body>
</html>
```

## 二、 ico 图标制作

将一下代码放到 hand 中

```HTML
<link rel="shortcut icon" href="favicon.ico" />
```

ico 图标制作网站 ： https://www.bitbug.net/

将制作好的图片放到 项目 根目录中， 文件名为 `favicon.ico`
