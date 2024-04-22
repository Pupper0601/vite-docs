---
title: Linux 基础 - Docker 技术
categories:
  - 学习笔记
tags:
  - Linux基础
abbrlink: 1996bcc0
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-247.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#6e6e90'
---

::: tip
`镜像`：相当于 python 里面类的概念，是静态的，不能直接使用  
`容器`：是通过镜像创建的，相当于实例的概念，是动态的，可以访问的  
`仓库`：存放镜像的地方
`docker宿主机`：你的 docker 安装在哪一个机器，那个机器就是宿主机  
:::

## 一、 CentOS 下安装 Docker

### 1. 卸载老版本

```shell
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common docker-latest \
    docker-latest-logrotate \
    docker-logrotate docker-engine
```

### 2. 安装 Docker 插件

```shell
yum install -y yum-utils device-mapper-persistent-data lvm2
```

### 3. 添加 yum 国内源

```shell
# 阿里云镜像仓库
yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 官网源镜像仓库(不推荐)
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

### 4. 安装 Docker

```shell
yum install -y docker-ce docker-ce-cli containerd.io
```

### 5. 设置开机启动、开始运行

```shell
systemctl enable docker
systemctl start docker
```

### 6. 查看 docker 运行状态

```shell
systemctl status docker
```

### 7. 关闭防火墙

```shell
systemctl stop disable
```

## 二、创建容器

### 1. 设置镜像加速

#### 1. 在指定目录创建文件（如已存在请忽略此步）

```shell
touch /etc/docker/daemon.json

vi /etc/docker/daemon.json
```

#### 2. 修改文件内容

```json
{
  "registry-mirrors": ["https://elk58vq5.mirror.aliyuncs.com"]
}
```

### 2. 重启 Docker 服务

```shell
systemctl restart docker
```

### 3. 拉取 最新 镜像

```shell
docker pull tomcat
```

1.  拉取最新镜像 ： `docker pull tomcat`
2.  拉取指定镜像 ： `docker pull tomcat:7`
3.  删除镜像 ： `docker rmi 镜像id`

![](https://img.pupper.cn/img/20220725181600.png)

```shell
# 查看 拉取的 镜像
docker images
```

![](https://img.pupper.cn/img/20220725181625.png)

### 4. 创建并运行容器

> 创建容器语法格式:
> docker run -id --name=容器名称 -p 宿主机端口:容器端口 -v 宿主机目录:容器目录 镜像名称

```shell
docker run -id --name=myTomcat \
    -p 8080:8080 \
    -v /usr/local/tomcat/webapps:/usr/local/tomcat/webapps \
    tomcat
```

**docker run 后面的参数:**

- `-i` ：运行容器
- `-t` ： 容器启动后，进入命令行
- `-d` ： 守护进程 --- 后台运行
- `-p` ： 端口映射
  - `-p 宿主机端口:容器端口`
- `-v` ： 目录映射 --- 挂载
  - `-v 宿主机目录:容器目录`

### 5. 创建容器关联其他容器

```shell
docker run -id --name=tomcat2 -p 8080:8080 --link mysql --link redis --link rabbitmq
```

## 三、容器 图形化管理工具（ Portainer ）

### 1.官方网站

[docker hub portainer-ce 中文汉化版](https://hub.docker.com/r/6053537/portainer-ce)

### 2.选择喜欢的 portainer 风格镜像，下载

```shell
docker pull hub-mirror.c.163.com/6053537/portainer-ce
```

### 3.启动 dockerui 容器

```shell
docker run -d --restart=always --name="portainer" -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data 6053537/portainer-ce
```

### 4.访问

浏览器访问 http://你虚拟机的 ip:9000, 设置一个密码即可，点击创建用户 密码要 8 位以上

::: warning
如果无法访问,需要查看端口是否开放(云服务器需要去官网开放)
:::

## 四、其他操作命令

| 命令                                 | 说明                 |
| ------------------------------------ | -------------------- |
| `systemctl restart docker`           | 重启 docker          |
| `systemctl stop docker`              | 停止 docker          |
| `docker exec -it 容器名称 /bin/bash` | 进入容器             |
| ` exit`                              | 退出容器             |
| `docker images`                      | 查看本地镜像         |
| `docker ps`                          | 查看运行的容器       |
| `docker ps -a`                       | 查看所有容器         |
| `docker start 容器名/容器 id`        | 运行容器             |
| `docker stop 容器名/容器 id`         | 停止容器             |
| `docker stop $(docker ps -a -q}`     | 停止所有运行的容器   |
| `docker rm 容器名/容器 id`           | 删除没有运行的容器   |
| `docker rm -f 容器名/容器 id`        | 删除运行的运行容器   |
| `docker start 容器名/容器 id`        | 运行容器             |
| `docker rm $(docker ps -a -q}`       | 删除所有未运行的容器 |
| `docker cp 文件名 容器名:/`          | 向容器中拷贝文件     |
| `docker cp 容器名:/文件名 /root`     | 向宿主机拷贝文件     |
| `docker images`                      | 查看本地镜像         |
| `docker images`                      | 查看本地镜像         |
| `docker images`                      | 查看本地镜像         |

## 五、 查看日志 （ docker logs 命令）

`docker logs [options] 容器名称或ID` 获取容器日志

| 名字              | 默 认 值                                         | 描述                     |
| ----------------- | ------------------------------------------------ | ------------------------ |
| –details          | 显示提供给日志的额外细节                         |                          |
| –follow 或-f      | 按日志输出                                       |                          |
| –since            | 从某个时间开始显示，例如 2013- 01-02T13:23:37    |                          |
| –tail             | all                                              | 从日志末尾多少行开始显示 |
| – timestamps 或-t | 显示时间戳                                       |                          |
| –until            | 打印某个时间以前的日志，例如 2013-01-02T13:23:37 |                          |

```shell
# 通过docker logs命令可以查看容器的日志。

docker logs -f --tail 10 a4dac74d48f7
```

```shell
# 查看指定时间后的日志，只显示最后100行：

docker logs -f -t --since="2018-02-08" --tail=100 CONTAINER_ID
```

```shell
# 查看某时间段日志

docker logs -t --since="2018-02-08T13:23:37" --until "2018-02-09T12:23:37" CONTAINER_ID
```

## 六、docker 旧版卸载

### 1. 卸载它们以及相关的依赖项

```shell
sudo yum remove docker \docker-client \docker-client-latest \docker-common \docker-latest \docker-latest-logrotate \docker-logrotate \docker-engine
```

### 2. 安装 Docker Engine-Community

在新主机上首次安装 Docker Engine-Community 之前，需要设置 Docker 仓库。

之后，您可以从仓库安装和更新 Docker。

#### 1. 设置仓库

安装所需的软件包。

```shell
sudo yum install -y yum-utils \device-mapper-persistent-data \lvm2
```

使用以下命令来设置稳定的仓库。阿里云

```shell
sudo yum-config-manager \--add-repo \ http://mirrors.aliyun.com/dockerce/linux/centos/docker-ce.repo
```

#### 2. 安装 Docker Engine-Community

```shell
sudo yum install docker-ce docker-ce-clicontainerd.io
```

一直输入 y 回车即可

### 3. 启动 docker

```shell
sudo systemctl start docker
```

## 七 p、 修改 容器的 映射端口及挂载目录

### 1. 停止容器

```shell
docker stop 容器id或名称
```

### 2. 停止 docker 服务

```shell
systemctl stop docker
```

### 3. 修改 hostconfig.json 文件

> `config,v2.json` 中如果也记录了端口，需要一并修改

文件目录：

```shell
cd /var/lib/docker/containers/容器id

vi hostconfig.json
```

![](https://img.pupper.cn/img/20220725181827.png)

#### 1. 修改 映射端口

没有端口映射时：`“PortBindings”:{}  `

增加一个端口映射：

> 前面的 “3306” 为 容器端口， 后面的 “3307” 为宿主机端口
>
> 如果修改现有端口映射，则可以直接修改

```json
“PortBindings”:{“3306/tcp”:[{“HostIp”:"",“HostPort”:“3307”}]}
```

#### 2. 修改 挂载目录

> 前面的地址为 宿主机挂载目录，后面的地址为 容器目录地址

```shell
"Binds":["/var/run/docker.sock:/var/run/docker.sock"
```

### 4. 启动 docker 服务

```shell
systemstl start docker
```

### 5. 启动 容器

```shell
docker start 容器id
```

### 6. 查看修改后的结果

```shell
docker ps -a
```

### 7. 查看修改后的挂载目录

```
docker inspect container_id | grep Mounts -A 20
```

## 九、 同步时间

### 1.查看宿主机时间

```shell
date
```

### 2. 安装 ntp

```shell
yum install ntp
```

### 3. 同步时间

```shell
docker cp /etc/localtime 容器id或名称:/etc/localtime
```

报错：

![](https://img.pupper.cn/img/20220725181909.png)

```shell
docker cp /usr/share/zoneinfo/Asia/Shanghai 容器ID或名称:/etc/localtime
```

### 4. 重启 容器

```shell
docker restart 容器id或名称
```

> **注意事项：**
>
> - 可能网络会断开，请重新 reboot 下 linux
> - 虚拟机的 ip 可能会改变
