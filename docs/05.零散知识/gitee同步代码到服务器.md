---
title: 将 gitee 镜像库使用 webhook 同步到 服务器
categories:
  - 学习笔记
tags:
  - Webhook
  - Git
toc_style_simple: true
date: '2024-03-07 15:12:40'
cover: https://top-img.pupper.cn/top-img/top-img-261.webp
main_color: '#7bcdce'
abbrlink: 63dde67f
update: '2024-03-07 15:26:35'
---

# 关联教程
{% link github 自动同步到 gitee 镜像库 , 通过`Github Actions` 实现代码自动Build，同步到Gitee , https://pupper.cn/posts/e6c82bb0.html %}

# 一、服务器秘钥

## 1. 创建秘钥

在终端输入以下代码 (*邮箱换为自己的*),不要犹豫,一路 {% kbd Enter %} 即可, 出现下图即表示成功

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
![](https://img.pupper.cn/img/1709793487.png)

## 3. 查看公钥

在终端输入以下代码查看公钥
```bash
cat ~/.ssh/id_rsa.pub
```
公钥大概长这样 :angry:
![](https://img.pupper.cn/img/1709793590.png)

# 二、给 gitee 镜像库添加公钥

![](https://img.pupper.cn/img/1709793726.png)

# 三、服务器宝塔面板操作



在宝塔面板 --> 软件商店 --> 搜索 webhook 安装 --> 点击设置 --> 添加脚本

{% folding blue, webhook 脚本 %}
脚本中需要修改的内容:
- `Pupper0601.github.io` 替换为自己的 `gitee 仓库名称`, 同时也是自己的 `网站目录名称`
- `gitPath` 修改为自己的 git 项目路径
- `gitHttp` 修改为自己的 gitee 仓库地址({% span red, 注意: 不要使用 http 地址 %})
- `main` 为分支名称, 注意 github 同步到 gitee 的仓库, 分支名称为 github 上的分支名称
```bash 
#!/bin/bash
echo ""
#输出当前时间
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "-------开始-------"
#判断宝塔WebHook参数是否存在
if [ ! -n "Pupper0601.github.io" ];
then
          echo "param参数错误"
          echo "End"
          exit
fi
#git项目路径
gitPath="/www/wwwroot/HexoNote/Pupper0601.github.io"
#git 网址
gitHttp="git@gitee.com:pupper/Pupper0601.github.io.git"

echo "路径：$gitPath"

#判断项目路径是否存在
if [ -d "$gitPath" ]; then
        cd $gitPath
        #判断是否存在git目录
        if [ ! -d ".git" ]; then
                echo "在该目录下克隆 git"
                git clone $gitHttp gittemp
                mv gittemp/.git .
                rm -rf gittemp
        fi
        #拉取最新的项目文件
      #拉取最新的项目文件
        git reset --hard origin/main
        #git clean -f
        git pull origin main
        echo "拉取完成"
        #执行npm
        #执行编译
        #npm run build
        #设置目录权限
        chown -R www:www $gitPath
        echo "-------结束--------"
        exit
else
        echo "该项目路径不存在"
        echo "End"
        exit
fi
```
{% endfolding %}

![](https://img.pupper.cn/img/1709793938.png)

# 四、gitee 添加 webhook 

在 镜像仓库中设置 webhook 钩子, url 中填写 https://4*.*.*.135:8989/hook?access_key=ygxPcOW...2HIFZlT6Ld,
事件中选择 Push 即可

{% gallery %}
![](https://img.pupper.cn/img/1709794555.png)
![](https://img.pupper.cn/img/1709795197.png)
{% endgallery %}

# 五、大功告成, 现在可以 push 代码测试了
