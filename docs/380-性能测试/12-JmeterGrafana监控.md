---
title: 性能测试 - jmeter Grafana 监控
categories:
  - 学习笔记
  - 软件测试
tags:
  - 性能测试
  - jmeter
abbrlink: 51bf926a
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-103.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#6b5743'
---

## 一、数据收集 (Exporter)

> `exporter` 是 prometheus 一类数据采集组件的总称, 他负责从目标处收集数据, 并转换为 prometheus 支持的格式
> `node_exporter` 是一种比较主流的服务器性能指标采集工具, 默认端口为 9100
> `mysql_exporter` 用于收集 MySQL 数据库的各项指标, 默认端口为 9104

### 1. 下载 Exporter

[常用的 Exporter 下载](https://www.cnblogs.com/momoyan/p/11520755.html)

<mark>nohup</mark> 静默启动, <mark>2>&1</mark> 不显示 <mark>nohup</mark> 时的报错信息, & 允许后台运行

```sh
cd /usr/local/node_exporter
nohup ./node_exporter  >/dev/null 2>&1 &
```

## 二、保存数据 (Prometheus 普罗米修斯)

> `Prometheus`: 是一款开源的监控报警系统与时序数据库, 默认端口为 9090
> 对时间精度要求较高, 如果服务器时间与现实时间不同步, 可能无法收集到准确的数据.

时间校准命令:

```shell
ntpdate ntp.aliyun.com
```

如果提示没有 `没有 ntpdate 命令`, 则使用以下命令进行安装

```shell
yum install -y ntp
```

与 Exporter 或 sql 关联, 在 `/usr/local/prometheus/prometheus.yml` 中修改

```yaml
# node_exporter 关联
- job_name: 'agent'
  static_configs:
    - targets: ['localhost:9100']
```

::: warning
`localhost` 可以修改为实际需要关联的服务器
:::

## 三、展示数据 (Grafana)

> `Grafana` 是一个开源的, 可视化监控工具;
> 可以配合 `Prometheus` 与 `node_exporter` 配合监控服务器

[Grafana 模板下载](https://www.aliyundrive.com/s/s9TB8WonvR4)

### 1.登录 Grafana , 默认账号密码为 `admin`

![](https://img.pupper.cn/img/20220820165401.png)

![](https://img.pupper.cn/img/20220820165710.png)

### 2.关联 Prometheus

::: warning
URL 尽量写全路径, 防止关联失败
:::

### 3. 添加监控模板
