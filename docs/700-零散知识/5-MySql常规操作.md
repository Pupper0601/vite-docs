---
title: Mysql 常用操作
categories:
  - 学习笔记
tags:
  - Mysql
abbrlink: 11573eba
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-267.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#4c3b33'
---

```sql
select distinct 字段 1，字段 2 from 表 1 inner join 表 2 on 连接条件 where 查询条件 group by 分组条件 having 查询条件 order by 排序 limit 指定返回；
```

## 一. 增 `insert into`

```sql
insert into 表名 values (值 1, 值 2, 值 3...);
insert into 表名(字段 1, 字段 2, 字段 3...) values (值 1, 值 2, 值 3...);
insert into 表名 values (值 1, 值 2, 值 3...),(值 1, 值 2, 值 3...),...;
```

## 三. 改 `update ... set`

```sql
update 表名 set 字段='值' where 查询条件;
```

## 四. 查

```sql
select * form 表名 where 查询条件;
```

### 4.1 去重 `distinct`

```sql
select distinct 字段 from 表名 where 查询条件;
```

### 4.2 返回指定数量 `limit`

```sql
select * form 表名 limit 起始位置, 返回数量;
```

### 4.3 模糊查询 `like`、`rlike`

`_`: 表示一个字符

`%`: 表示一个或多个字符

```sql
select * from 表名 where name = '_小%';		// 表示返回名字第二个字为小的数据
```

### 4.4 排序 `order by`

`asc`: 从小到大, 默认排序

`dasc`: 从大到小

```sql
select * from students order by age asc,height desc;  // age 为正序, height 为倒序
```

### 4.5 分组 `group by`

```sql
select * from students group by age;		// 以 age 分组
```

### 4.6 分组后筛选 `group by ... heaving`

```sql
select * from students group by age heaving age > 30;
```

### 4.7 连接

#### 4.7.1 连接 `inner join ... on` 返回两张表的交集部分

```sql
select * from A inner join B on A.a_id = B.b_id;
```

#### 4.7.2 左连接 `left join ... on` 返回左表及交集部分

```sql
select * from A left join B on A.a_id = B.b_id;
```

#### 4.7.3 右连接 `right join ... on` 返回右表及交集部分

```sql
select * from A right join B on A.a_id = B.b_id;
```

### 4.8 范围查询

#### 4.8.1 包含在内 `in`

```sql
select name，age from test where age in (30， 40)；
```

#### 4.8.2 不包含在内 `not in`

```sql
select name，age from test where age not in (30， 40)；
```

#### 4.8.3 在一个连续范围 `between ... and`

```sql
select name,age from students where age between 18 and 34;
```

#### 4.8.4 不在一个连续范围 `not between ... and`

```sql
select name,age from students where age not between 18 and 34;
```

### 4.9 判空

#### 4.9.1 判空 `is null`

```sql
select * from student where height is null/Null/NULL;
```

#### 4.9.2 非判空 `is not null`

```sql
select * from student where height is not null/Null/NULL;
```

### 4.10 多条件查询

#### 4.10.1 `and`

```sql
select * from 表名 where 条件1 and 条件2;
```

#### 4.10.2 `or`

```sql
select * from 表名 where 条件1 or 条件2;
```

## 五. 聚合函数

```sql
select 聚合函数(字段列表) from 表名;
```

| 函数  |   功能   | 示例                                           |
| :---: | :------: | :--------------------------------------------- |
| count | 统计数量 | select count(idcard) from emp; // 统计员工数量 |
|  max  |  最大值  | select max(age) from emp; // 统计最大年龄      |
|  min  |  最小值  | select min(age) from emp; // 统计最小年龄      |
|  avg  |  平均值  | select avg(age) from emp; // 统计平均年龄      |
|  sum  |   求和   | select sum(age) from emp; // 统计年龄之和      |

![](https://img.pupper.cn/img/202304171050864.png)
