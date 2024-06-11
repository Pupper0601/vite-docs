---
title: 使用 GitHub Acitons 实现 push 自动同步到 Gitee 仓库
categories:
  - 学习笔记
tags:
  - Hexo
  - Git
toc_style_simple: true
date: '2024-03-06 09:39:49'
cover: https://top-img.pupper.cn/top-img/top-img-32.webp
main_color: '#dfc0a1'
abbrlink: e6c82bb0
updated: '2024-03-07 15:26:23'
---

# 废话前言

{% folding blue, 无用的废话, 可看可不看 %}
- 我的个人博客是通过 Github 的 Pages 技术搭建的静态博客，使用 {% span red, Hexo %} 驱动。
- 由于 Github 在国内环境访问速度慢，并且不够稳定，所以通常对外介绍使用 Gitee 的镜像博客仓库，但是每次都需要在推送 Github 之后去 Gitee 上对应的仓库进行 {% span red, 手动同步 %}，就无端增加了很多重复的工作量.
- 经过多方搜索和实践，最终选定了 `Github Actions` 实现代码自动Build，同步到Gitee.
{% endfolding %}

# 关联教程
{% link github 自动同步到 gitee 镜像库 , 通过`Github Actions` 实现代码自动Build，同步到Gitee , https://pupper.cn/posts/63dde67f.html %}

# 一、本地公钥和私钥

## 1. 生成

在 **本地终端** 输入以下代码 (*邮箱换为自己的*),不要犹豫,一路 {% kbd Enter %} 即可, 出现下图即表示成功

```bash
ssh-keygen -t rsa -C "pupper.cheng@gmail.com"
```
![](https://img.pupper.cn/img/1709712535.png)

{% tip ban🔴 %}
如果已经有了 **私钥** **公钥**,可能不会有上图的效果.
{% endtip %}

## 2. 验证

在终端输入以下代码, 出现 `id_rsa`、`id_rsa.pub` 两个文件即表示生成成功.

- `id_rsa`: 私钥
- `id_rsa.pub`: 公钥

```bash
cd ~/.ssh && ls
```
![](https://img.pupper.cn/img/1709713090.png)

# 二、给 Gitee 和 GitHub 添加公钥

## 1. 查看公钥

在终端输入以下代码查看公钥
```bash
cat ~/.ssh/id_rsa.pub
```
公钥大概长这样 :angry:
![](https://img.pupper.cn/img/1709713291.png)

## 2. 给 Gitee 添加公钥

{% link Gitee , 添加公钥入口 , https://gitee.com/profile/sshkeys %}

{% tip info %}
点击个人头像 设置 --> SSH公钥 --> 标题(随便填) --> 公钥(上一步获取的公钥)
{% endtip %}

![](https://img.pupper.cn/img/1709713626.png)

## 3. 给 GitHub 添加公钥

<!-- {% link title,description,link %} -->
{% link Github , Github 添加公钥入口 , https://github.com/settings/ssh/new %}

{% tip info %}
- 点击个人头像 设置 --> SSH与GPG公钥 --> 新建SSH秘钥 --> 标题(随便填) --> 公钥(上一步获取的公钥)
- 点击个人头像 Settings --> SSH and GPG keys --> New SSH key --> 标题(随便填) --> 公钥(上一步获取的公钥)
{% endtip %}

{% gallery %}
![](https://img.pupper.cn/img/1709714350.png)
![](https://img.pupper.cn/img/1709714441.png)
![](https://img.pupper.cn/img/1709714527.png)
{% endgallery %}

{% tip warning faa-horizontal animated %}
什么,想知道我的 GitHub 为什么是中文🥺, 油猴:monkey_face: 了解以下🤪
{% endtip %}

{% link GitHub 中文版插件 , 油猴配合中文版脚本可以让你更好的浏览 Github , https://pupper.cn/posts/c247617f.html %}

## 4. 验证公钥是否添加成功

在终端输入以下代码, 返回下图内容即表示添加成功

```bash
ssh -T git@github.com
ssh -T git@gitee.com
```

![](https://img.pupper.cn/img/1709790135.png)

# 三、给 GitHub 源码仓库添加私钥

## 1. 获取私钥

在终端输入以下代码,可获取私钥, 大概长下图这样

```bash
 cat ~/.ssh/id_rsa
```

![](https://img.pupper.cn/img/1709790666.png)

## 2. 给源码仓库设置私钥

{% tip info %}
- 源码仓库 设置 --> 机密和变量 --> 操作 --> 标题(需要记住) --> 私钥(上一步获取的私钥)
- 源码仓库 Settings --> Secrets and variables --> Actions --> Name(需要记住) --> Secret(上一步获取的私钥)
{% endtip %}

{% gallery %}
![](https://img.pupper.cn/img/1709790880.png)
![](https://img.pupper.cn/img/1709791034.png)
{% endgallery %}

# 四、Gitee 创建镜像库

在 Gitee 创建一个镜像库, 当我们 在源码库 提交代码时, 先构建好 github.io 再同步到 gitee

![](https://img.pupper.cn/img/1709791934.png)

# 五、修改 workflows

在 `.github/workflows/autodeploy.yml` 添加以下代码, 按注释修改即可

```yaml
  async-gitee:
    # 需要 deploy 这个 job 执行完再执行当前脚本
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 替换为 源码仓库中设置的私钥名称, 即上面步骤中 让记住的名称
          SSH_PRIVATE_KEY: ${{ secrets.HEXO_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: git@github.com:Pupper0601/Pupper0601.github.io.git
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: git@gitee.com:pupper/Pupper0601.github.io.git
```
以下是我的配置文件, 仅供参考你

{% folding green, .github/workflows/autodeploy.yml %}
 
```yaml
name: 自动部署
# 当有改动推送到master分支时，启动Action
# 教程文档 https://zhsher.cn/posts/8779/#4-3-%E6%96%B9%E6%A1%88%E4%B8%89
on:
  push:
    branches:
      - main
      # 2020年10月后github新建仓库默认分支改为main，注意更改

jobs: # 工作流
  deploy: # 自定义名称
    runs-on: ubuntu-latest # 运行在虚拟机环境
    name: 编译 hexo 博客

    steps:
      - name: 1. 拉取主库代码
        uses: actions/checkout@v4

      - name: 2. 拉取主题代码
        uses: actions/checkout@v4
        with:
          repository: Pupper0601/hexo-theme-anzhiyu
          ref: my-theme
          path: themes/anzhiyu

      - name: 3. 安装 Node
        uses: actions/setup-node@v3
        with:
          node-version: "16.x"

      - name: 4. 安装 Hexo
        run: |
          export TZ='Asia/Shanghai'
          npm install hexo-cli -g

      - name: 5. 缓存 Hexo
        uses: actions/cache@v3
        id: cache
        with:
          path: node_modules
          key: ${{runner.OS}}-${{hashFiles('package-lock.json')}}

      - name: 6. 安装依赖
        if: steps.cache.outputs.cache-hit != 'true'
        run: |
          npm install gulp-cli -g #全局安装gulp
          npm install --save

      - name: 7. 生成静态文件
        run: |
          hexo clean
          hexo bangumi -u #bilibili番剧更新
          hexo generate
          hexo algolia
          gulp
      - name: 8. 部署到Github
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          token: {{secrets.HEXO_TOKEN}}
          repository-name: Pupper0601/Pupper0601.github.io
          branch: main
          folder: public
          clean-exclude: |
            public/.github
          commit-message: "${{ github.event.head_commit.message }} 由Github Actions更新"
  
  async-gitee:
    # 需要 deploy 这个 job 执行完再执行当前脚本
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY: ${{ secrets.HEXO_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: git@github.com:Pupper0601/Pupper0601.github.io.git
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: git@gitee.com:pupper/Pupper0601.github.io.git
```
{% endfolding %}

# 六、现在可以提交代码试试了(*^▽^*)

![](https://img.pupper.cn/img/1709792920.png)
