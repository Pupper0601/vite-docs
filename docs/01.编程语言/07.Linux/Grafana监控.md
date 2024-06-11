---
title: Linux 基础 - Grafana 监控
categories:
  - 学习笔记
tags:
  - Linux基础
abbrlink: 20861ea7
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-311.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#464041'
---

## 一、 安装 node-exporter

### 1.下载 node-exporter

```shell
docker pull prom/node-exporter
```

### 2.创建容器

```shell
docker run -id --name=exporter -p 9100:9100 prom/node-exporter
```

### 3.连接页面查看是否可以访问
```shell
http://ip 地址:9101/metrics
```

## 二、Prometheus安装及配置

### 1. 设置配置文件

```shell
mkdir /home/prometheus
cd /home/prometheus
vim prometheus.yml
```

::: danger
下边的地址为安装 node_exporter 的地址,如果监控其他服务器,需要将 localhost 改为其他服务器的 ip 地址, 端口号为 node_exporter 的映射端口号
:::

```yaml
global:
  scrape_interval: 60s
  evaluation_interval: 60s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ['localhost:9090']
        labels:
          instance: prometheus

  - job_name: linux
    static_configs:
      - targets: ['IP地址:9100']
        labels:
          instance: localhost
```

### 2.下载 Prometheus

```shell
docker pull prom/prometheus
```

### 3.创建容器
```shell
docker run -id --name=prometheus -p 9090:9090 -v /home/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

### 4.连接页面查看是否可以访问
```shell
http://ip 地址:9090
```

## 三、安装 Grafana

### 1.拉取镜像 

```shell
docker pull grafana/grafana
```

### 2.创建容器

```shell
docker run -id --name=myGrafana -p 3000:3000  grafana/grafana
```

### 3.连接页面查看是否可以访问

::: tip
初始的账号密码都为 `admin`
:::

```shell
http://ip 地址:3000
```
