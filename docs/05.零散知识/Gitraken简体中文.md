---
title: Gitkraken 简体中文
categories:
  - 零散知识
tags:
  - Gitkraken
cover: https://top-img.pupper.cn/top-img/top-img-170.webp
ai:
  - 使用 Python 做文件对比，完成的中文翻译。目前翻译度 90%，人工校验度 60%。
abbrlink: 26ce11d3
toc_style_simple: true
date: '2023-08-16 23:02:55'
main_color: '#373948'
---

# GitKraken 简体中文

[Gitkraken 简体中文, 中文翻译 - github](https://github.com/Pupper0601/GitKraken-zh)
[Gitkraken 最新破解方法, 目前测试 9.7.1 有效](https://pupper.cn/posts/ebfb7201.html)

> [个人主页：](https://pupper.cn) 欢迎👏各位大佬访问。
> 
> [中文翻译：](https://pupper.cn/posts/26ce11d3.html) 完成度 90%，人工校验率 60%。
> 
> [破解说明：](https://pupper.cn/posts/ebfb7201.html) 如果有能力请支持正版，[GitKraken 官方网站](https://www.gitkraken.com/) 

![image-20211108180142739](https://img.pupper.cn/img/iShot_2023-08-17_17.30.28.png)

## 使用方法

-   将 原文件 `strings.json` 改名为 `strings.en.json`
-   下载 `strings.json` 文件放入程序目录中
    -   Windows: `%LOCALAPPDATA%\gitkraken\app-8.1.0\resources\app.asar.unpacked\src`
    -   Mac: `/Applications/GitKraken.app/Contents/Resources/app.asar.unpacked/src/strings.json`
    -   Linux: `/usr/share/gitkraken/resources/app.asar.unpacked/src`
-   开启 GitKraken ，至 Preference -> UI Customization -> Language 切换语言
  
<img src="https://img.pupper.cn/img/iShot_2023-08-17_11.23.26.png" width="400" height="200">
<img src="https://img.pupper.cn/img/iShot_2023-08-17_17.30.52.png" width="400" height="200">

## 关于取消更新
Window 平台直接删除： `C:\Users\{用户名}\AppData\Local\gitkraken\Update.exe` 即可。

其他平台：将以下内容添加到你的 hosts 文件中
```sh
0.0.0.0 release.gitkraken.com
0.0.0.0 api.gitkraken.com
0.0.0.0 gloapi.gitkraken.com
```
hosts 文件路径：`C:\Windows\System32\drivers\etc`  或者  `/etc/hosts`

## 参考说明：
【1】[GitKraken 官方网站](https://www.gitkraken.com/) 

【2】[GitKraken 繁体翻译](https://github.com/rogeraabbccdd/GitKraken-zh-tw) 

【3】[Python 繁简转换](https://github.com/gumblex/zhconv) 

【4】[Python 翻译库 translators](https://github.com/UlionTse/translators#supported-translation-services)
