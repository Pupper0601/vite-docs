---
title: 25. 生成 requirement.txt 文件
categories:
  - 学习笔记
tags:
  - Python基础
toc_style_simple: true
date: '2024-01-15 17:20:12'
update: '2024-01-15 17:20:58'
cover: 'https://top-img.pupper.cn/top-img/top-img-329.webp'
main_color: '#7f9ebe'
abbrlink: 254a9b44
---

# 一. 生成 requirement.txt

```Python
pip3 freeze > requirements.txt
```

如果出现 :exclamation:警告, 则可以使用以下代码

```Python
python.exe -m pip freeze > requirement.txt
```

# 二. 使用 requirement.txt 安装第三方库

```Python
pip3 install -r requirement.txt
```
