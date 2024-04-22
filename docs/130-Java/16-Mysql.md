---
title: 十六、Mysql
categories:
  - 学习笔记
tags:
  - Java基础
abbrlink: f49bda31
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-255.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#5e3a3b'
---

## 一、安装

### 1.下载安装包 —— [MySQL 下载地址](https://www.mysql.com/downloads/)

![](https://img.pupper.cn/img/1655103907534-d3ceb445-4ad0-46f8-b63e-8c4d295c8bd6.png)

![](https://img.pupper.cn/img/1655103908270-6e6472e1-1ca9-45a8-b3a1-bcba2c391284.png)

![](https://img.pupper.cn/img/1655103907511-36cb4b95-dc4c-4cd0-8887-5a2ee03428b7.png)

### 2.安装 mysql（注意保存临时密码）

双击 mysql-5.7.29-macos10.14-x86_64.dmg 文件，进行安装
![](https://img.pupper.cn/img/1655103907357-88559b7e-e2a4-43da-a654-c593a50f8f9f.png)

![](https://img.pupper.cn/img/1655103911598-4f1f7423-ace2-456f-adff-d65ee9eac833.png)

![](https://img.pupper.cn/img/1655103913068-f8744e06-3a9c-40ef-9bd8-7fa0350cd3f9.png)

![](https://img.pupper.cn/img/1655103913166-93d7a437-d7f6-4bfe-96db-d854eb0beb94.png)

---

:::danger
下截图中有 MySQL 的 **临时密码（ \_Th5u1bh+t(( ）** ，必须注意
下截图中有 MySQL 的 **临时密码（ \_Th5u1bh+t(( ）** ，必须注意
下截图中有 MySQL 的 **临时密码（ \_Th5u1bh+t(( ）** ，必须注意
:::

![](https://img.pupper.cn/img/1655106759696-f03fe7e0-4d45-45d3-bb6a-f0d0fbcecb3d.png)

---

![](https://img.pupper.cn/img/1655103913153-67bc4453-1f00-4dcd-9bba-50fcd1b88e74.png)
![](https://img.pupper.cn/img/1655103913193-fc1922ab-bdcb-4a1f-9608-64755ec66af3.png)

### 3. 启动 MySQL

![](https://img.pupper.cn/img/1655103915570-8dd8efce-2d6f-459f-8d60-cc7a3d184a67.png)
![](https://img.pupper.cn/img/1655103915857-978f676b-9c06-4f8b-b2ab-3f532f2b70d5.png)

### 4. 修改账户密码

```shell
# 启动完成后，打开终端，输入如下内容，然后按回车键

alias mysql=/usr/local/mysql/bin/mysql
alias mysqladmin=/usr/local/mysql/bin/mysqladmin
```

:::tip
这两条命令是为了方便直接打开 iTerm 就可以运行 mysql 命令，而不是必须进入 mysql 安装目录才能运行。
:::

![](https://img.pupper.cn/img/1655105189149-7149dd6c-01e6-4dda-a3ef-4ce4c2209eea.png)

```shell
# 修改 root 的密码为 12345678

mysqladmin -u root -p password 12345678
```

### 5.进入终端

```java
// 用户名为：root      密码为：12345678

mysql -h 主机名 -P 端口 -u 用户名 -p密码

mysql -u root -p12345678
```

:::tip
使用 quit 退出 MySQL
net stop mysql 服务器名 停止服务
net start mysql 服务器名 启动服务
:::

## 二、数据库操作

### 1. 数据库操作

#### 1. 创建数据库

```sql
-- 创建数据库语法

CREATE DATABASE [IF NOT EXISTS] 数据库名 CHARACTER SET 字符集 COLLATE 校对规则;
```

:::note

- CHARACTER SET : 指定数据库采用的字符集，默认为 utf8;
- COLLATE : 指定数据库字符集的校对规则
  - 默认为 utf8_general_ci （不区分大小写）；
  - utf8_bin （区分大小写）；
    :::

#### 2. 查看及删除数据库

```sql
-- 查看、删除数据库

-- 显示数据库语句：
SHOW DATABASHES

-- 显示数据库创建语句：
SHOW CREATE DATABASE db_name

-- 删除数据库语句：
DROP DATABASE [IF EXISTS] db_name
```

```sql
-- 案例

-- 创建数据库
CREATE DATABASE db_01 CHARACTER SET utf8 COLLATE utf8_bin;

-- 查看所有的数据库
SHOW DATABASES;

-- 查看数据库；
show database db_01;

-- 删除数据库
drop database db_01;
```

#### 3.备份及恢复数据库

```shell
# 备份数据库 - dos 中执行

mysqldump -u 用户名 -p -B 数据库 1 数据库 2 数据库 3 > 文件名.sql

-- 备份某几个表
mysqldump -u 用户名 -p 数据库 表 1 表 2 表 n > 文件名.sql
```

```sql
-- 恢复数据库 - sql 中执行

Source 文件名.sql
```

### 2. 表

#### 1. 创建表

```sql
-- 表创建语法

create table 表名(
  字段1  类型,字段2  类型。。。
)character set 字符集 collate 校对规则 engine 引擎
```

:::tip
character set：如不指定，则默认使用数据库字符集；
collate： 如不指定，则默认使用数据库校对规则；
engine： 引擎
:::

#### 2. MySQL 的数据类型

:::tip
在创建字段类型时,如果没有添加 unsinged 关键字,则表示该类型是有符号的;
:::

![](https://img.pupper.cn/img/1655188958652-67fbde81-8dd1-4b32-a6ab-e40c07129820.jpeg)

```sql
-- unsinged  的使用

-- 创建字段 使用 unsigend 表示不带符号,大小从 0 开始
create table usr (id tinyint UNSIGNED);

-- 添加数据
insert into usr values(2);

-- 查询数据
select * from usr where id = 1;
```

:::note
小数类型:

- float / double [unsigend]
  - float : 单精度
  - double : 双精度
- decimal [M,D] [unsigend] : 可以支持更加精确的小数位
  - M : 小数位数(精度)的总数;
    - M 最大 65;
    - 如果 M 被省略, 则默认为 10;
  - D : 小数点后面的位数; - 如果 D 是 0, 则值没有小数点; - D 最大为 30; - 如果 D 被省略, 则默认为 0
    :::

```sql
-- 小数 使用 案例

create table b1 (num1 float, num2 double, num3 decimal(30,20) );

insert into b1 values(88.12313123, 99.23423424234234,12312.12312313123);

select * from b1;
```

:::tip
字符串类型:

- char(4) : 这个 4 表示字符数 (最大 255), 不是字节数,不管是中文还是字母都是放 4 个, 按字符计算;
  - 固定长度, 不论存放几个字符, 都会分配 4 个字符的空间;
  - 主要用于存放固定长度的内容, 如 手机号, 身份证等;
- varchar(4) : 这个 4 表示字符数,不管是字母还是中文都一定义好的表编码来存储;
  - 可变长度, 当实际数据不足 4 个字符时,按实际长度分配空间;
  - varchar 本身需要 1~3 个字节的空间来存放字符长度, 因此 varchar 最大存放空间为 65532 个字节;
    :::

```java
// 日期类型, 时间戳

create table 表名 (字段名 timestamp
    NOT NULL DEFAULT CURRENT_TIMESTAMP
    NO UPDATE CURRENT_TIMESTAMP
);
```

:::tip
NOT NULL DEFAULT CURRENT_TIMESTAMP NO UPDATE CURRENT_TIMESTAMP :
表示不为空, 并且以当前服务器时间进行更新;
:::

#### 3. 修改表

```sql
-- 语法

-- 查看表
desc 表名;

-- 删除表
drop table 表名;

-- 修改表名
rename table 表名 to 新表名;

-- 修改字符集
alter table 表名 character set 字符集;

-- 添加字段
alter table 表名 add 字段名 字段类型 ;

-- 修改字段
alter table 表名 modify 字段名 字段类型;

-- 删除字段
alter table 表名 drop 字段名;
```

### 案例

```sql
-- 表 及 字段的增删改

-- 创建表
create table emp (
  `id` int,
  `name` VARCHAR(32),
  `sex` CHAR,
  `brithday` date,
  `entry_date` datetime,
  `job` varchar(32),
  `salary` double,
  `resume` text
) CHARSET utf8 collate utf8_bin engine innodb;

-- 添加数据
insert into emp values(1,'小旋风','男','2022-1-1','2022-3-3 5:20:32','巡山',1000,'大王叫我来巡山');

-- 添加字段
-- not null default '' : 不能为空, 默认值为 '' 空字符串
-- after resume : 添加在 resume 字段后面
alter table emp add image varchar(3000) not null default '' after resume;

-- 修改字段, 并且不能为空
alter table emp modify job varchar(60) not null default '';

-- 删除字段
alter table emp drop sex;

-- 修改表名
rename table emp to employee;

-- 修改表的字符集
alter table employee character set utf8;

-- 修改字段名
alter table employee change `name` user_name varchar(32) not null default '';

select * from employee;
```

## 三.数据的 增, 删, 改

### 1. 增

```sql
-- 语法

inset into 表名 values (字段值,字段值...)

inset into 表名(字段,字段...) values (字段值,字段值...)
```

:::warning
注意事项:

- 数据类型需要一致;
- 数据长度需要在规定范围;
- 字符 和 日期类型 数据需要放在 单引号 中;
- values 中的值需要与表名后的字段名顺序一致;
  - 如果表名后没有字段名, 则需要与表中的字段名顺序一致;
- 如果字段运行为空, 则可以插入 null;
- inset into 表名 values (), () : 可以一次插入多条数据;
- 如果某个字段不给值, 则会使用默认值;
  - 如果没有默认值, 则会报错;
    :::

```sql
-- 添加数据

create table `phone`(`id` int, `name` varchar(10), `price` double);

insert into phone values(1,'华为',3000);

insert into phone(`id`,`name`,`price`) values(2,'苹果',5000),(3,'小米',3000);

-- 字段可以为空时,实际值可以不写
insert into phone values();
```

### 2.改

```sql
-- 语法

update 表名 set 字段=值,字段=值;

update 表名 set 字段=值 where 查询条件;
```

:::tip

- 如果 update 语句后 没有 where 语句, 则默认为 修改所有数据 ;
  :::

```sql
-- 修改数据

update emp set salary = 5000;

update emp set salary = 2000 where user_name = '张三';
```

### 3.删

```sql
-- 语法

delete from 表名 where 查询条件;
```

:::tip

- 如果 delete 语句后 没有 where 语句, 则默认为 删除所有数据 ;
  :::

```sql
-- 删除数据

delete from emp where user_name = '李四';
```

### 4.表复制 (蠕虫复制)

:::danger
表复制(蠕虫复制) : 主要用于获得大量的测试数据, 谨慎使用

- 数据都是重复的
  :::

```sql
-- 案例

-- 将 emp 查询的数据 逐条添加到 test01 表中
insert into test01 (id, `name`, sal, job, deptno) select empno, ename, sal, job, deptno from emp;

-- 表数据的自我复制 (每次运行都会 将自己的每一条数据都复制一次)
insert into test01 select * from test01;
```

### 5. 去除表中 重复的数据

:::tip
create table new_table like old_table : 复制表结构
:::

```sql
-- 去除表中重复的数据

-- 复制 表 结构 创建临时表
create table table_tmp like test01;

-- 将原表中的数据去重 写入 临时表
insert into table_tmp select distinct * from test01;

-- 清除 原表中的数据
delete from test01;

-- 将 临时表中的数据 写入 原表中
insert into test01 select * from table_tmp;

-- 删除 临时表
drop table table_tmp;

select * from test01;
```

## 四.数据库 查询 - 基础

```sql
-- 基本语法

select [distinct]*| 列名 from 表名 where 查询条件;

-- 字段取别名
select 字段名 as 别名 from 表名;
```

:::note

- select : 指定查询哪些列的数据;
- distinct : 可选参数, 指显示结果时, 去除重复的数据;
  :::

```sql
-- 去重 求和 - 案例

create table student (`id` int, `name` varchar(20), `chinese` float, `english` float, `math` float);

insert into student values(1,'韩信',89,78,90),(2,'张飞',67,98,56),(3,'宋江',87,78,77),(4,'关羽',88,98,90),(5,'赵云',82,84,67),(6,'欧阳锋',55,85,45),(7,'黄蓉',75,65,30);

-- 对结果去重
select distinct english from student;

-- 对所有成绩求和
select `name`,(chinese + english + math) as sum from student;
```

### 1. where 子句中的运算符

| 比较运算符 | < <= > >= !=       |                                   |
| ---------- | ------------------ | --------------------------------- |
|            | between ... and... | 显示在某一区间的值, 闭区间        |
|            | in(set)            | 显示在 in 列表中的值,如 in(10,20) |
|            | like 或 not like   | 模糊查询                          |
|            | is null            | 判断是否为空                      |
| 逻辑运算符 | and                | 多个条件同时成立                  |
|            | or                 | 多个条件任一成立                  |
|            | not                | 不成立                            |

```sql
-- 案例

-- 查询赵云的成绩
select * from student where `name`='赵云';

-- 查询 英语成绩大于 90 分的
select * from student where `english` > 90;

-- 查询 数学大于 60 分并且 ID 大于 4
select * from student where `math` > 60 and `id` > 4;

-- 查询 总分大于 200 分, 并且数学成绩小于语文成绩,
-- 赵% : 表示以赵开头的人
select * from student where (`chinese` + `english` + `math`) > 200 and `math` < `chinese` and `name` like '赵%';

-- 查询 查询英语成绩大于语文成绩的
select * from student where `english` > `chinese`;

-- 查询 英语分数在 89 ~ 90 之间的
select * from student where `english` between 80 and 90;

-- 查询 数学分数在 89, 90, 91 的
select * from student where `math` in (89, 90, 91);

-- 查询 所有姓李的
select * from student where `name` like '关%';

-- 查询 数学比语文少 30 分的
select * from student where (`Chinese` - `math`) > 30;

select * from student;

```

### 2. 排序 - order...by...

> order by : 指定排序的字段, 字段既可以是表中的, 也可以是 select 语句后指定的

```sql
-- 语法

select 列名 from 表名 where 查询条件 order by 排序条件;
```

:::tip
注意事项:

- 默认排序为 升序 asc ,
  - desc 为降序
- order by 子句一般位于 select 语句的结尾;
  :::

```sql
-- 案例

insert into student values(8, '韩非子', 45,65,99);

-- 对数学成绩排序 升序
select * from student order by `math`;

-- 按总分 从高到底输出
select `name`, (`chinese` + `english` + `math`) as total_score from student
    order by total_score desc;
```

### 3.统计函数

数据库 - 数据
[雇员系统表.txt](https://wwi.lanzoup.com/iJj3T09dte6h)

#### 1. 统计函数 - count

```sql
-- 语法

select count(*) from 表名 where 查询条件;
```

:::tip

- count(\*) : 返回满足条件的记录的行数;
- count(字段) : 返回满足条件的列的数量, 但是会排除值为 null 的行
  :::

```sql
-- 案例

-- 统计 一共有多少个学生
select count(id) from student;

-- 统计 数学成绩大于 90 的
select count(`id`) as num from student where `math` > 90;

-- 统计 总分大于 250 的
select count(`id`) as num from student where (`chinese` + `english` + `math`) > 250;
```

#### 2. 求和函数 - sum

```sql
-- 语法

select sum(字段) from 表名 where 查询条件;
```

:::tip

- sum 仅对数值起作用, 否则会报错;
- 多列就和时, 需要用 逗号 隔开
  :::

```sql
-- 案例

-- 统计 数学总成绩
select sum(`math`) from student;

-- 统计 各科成绩
select sum(`chinese`), sum(`english`),sum(`math`) from student;

-- 统计 所有成绩的总和
select sum(`chinese` + `english` + `math`) from student;

-- 统计 语文的平均分
select sum(`chinese`) / count(`id`) from student;
```

#### 3. 求平均值 - avg

```sql
-- 语法

select avg(列名) from 表名 where 查询条件;
```

```sql
-- 案例

-- 求数学成绩的平均值
select avg(`math`) from student;

-- 求班级总分的平均值
select avg(`chinese` + `english` + `math`) from student;
```

#### 4. 求最大, 最小值 - Max , Min

```sql
-- 语法

select max(列名) from 表名 where 查询条件;
```

```sql
-- 案例

-- 求数学成绩的最高分
select max(`math`) from student;

-- 求班级的最低分
select min(`chinese` + `english` + `math`) from student;
```

#### 5. 分组 - group by

```sql
-- 语法

select 字段 from 表名 where 查询条件 group by 分组条件;

select 字段 from 表名 where 查询条件 group by 分组条件 having 过滤条件;
```

:::tip

- group by : 用于对查询的结果分组统计;
- having 子句用于限制分组显示结果;
  :::

```sql
-- 案例

-- dept 部门表 (部门编号 deptno, 名称 dname, 所在城市 loc)
-- emp 员工表 (编号 empon, 名字 ename, 工作 job, 上级编号 mgr, 入职时间 hiredate, 薪水 sal, 红利 comn, 部门编号 deptno)
-- 工资级别表 (级别 grade, 最低工资 losal, 最高工资 hisal)

-- 查询 每个部门的平均工资 和 最高工资
select avg(sal), max(sal), deptno from emp group by deptno;

-- 查询 每个部门的 每个岗位 的平均工资 和 最低工资
select deptno, job, avg(sal), min(sal) from emp group by deptno, job;

-- 查询 平均工资 低于 2000 的部门号和平均工资
select deptno, avg(sal) as avg_sal from emp group by deptno having avg_sal < 2000;
```

### 4.字符串函数

:::note
dual: 亚元表, 系统表, 可以作为测试表来使用
:::
| 命令 | 说明 |
|----------------------------------------|------------------------------------------------------------|
| charset(str) | 返回字符串 的字符集 |
| concat(str1, str2...) | 拼接 字符串 |
| instr(str, substr) | 返回 substr 在 str 中出现的位置,没有返回 0 |
| lcase(str) | 转换成小写 |
| left(str, length) | 从 str 中的左边起, 取 length 个字符 |
| length(str) | str 长度 [按照字节] |
| ltrim(str), rtrim(str) | 去除前端空格 或 后端空格 |
| replace(str, search_str, replacce_str) | 在 str 中用 replace_str 替换 search_str |
| strcmp(str1, str2) | 逐字比较两个字符串大小,str1 大,返回 1,小则返回-1,相等返回 0 |
| substring(str, position) | 从 str 的 position 开始 [从 1 开始计算 ], 取 length 个字符 |
| trim | 去除 前后空格 |
| ucase(str) | 转换成大写 |

```sql
-- 案例

-- dept 部门表 (部门编号 deptno, 名称 dname, 所在城市 loc)
-- emp 员工表 (编号 empon, 名字 ename, 工作 job, 上级编号 mgr, 入职时间 hiredate, 薪水 sal, 红利 comn, 部门编号 deptno)
-- 工资级别表 (级别 grade, 最低工资 losal, 最高工资 hisal)

-- charset(str)	返回字符串 的字符集
select charset(ename) from emp;		-- utf8

-- concat(str1, str2...)	拼接 字符串
select concat(ename,'_',job) from emp; -- SMITH_CLERK

-- instr(str, substr)	返回 substr 在 str 中出现的位置,没有返回 0
-- dual: 亚元表, 系统表, 可以作为测试表来使用
select instr(`name`, '阳') from student where `name`='欧阳锋';

-- ucase(str)	转换成大写
select ucase(`ename`) from emp;

-- lcase(str)	转换成小写
select lcase(`ename`) from emp;

-- left(str, length)	从 str 中的左边起, 取 length 个字符
select ename, left(`ename`, 4) from emp;
-- 从右边取
select ename, right(`ename`, 4) from emp;

-- length(str)	str 长度 [按照字节]
select job,length(`job`) from emp;

-- replace(str, search_str, replacce_str)	在 str 中用 replace_str 替换 search_str
select job,replace(job, 'MANAGER', '经理') from emp;

-- strcmp(str, str)	逐字比较两个字符串大小
select strcmp('pupper','oupper') from dual;

-- substring(str, position)	从 str 的 position 开始 [从 1 开始计算 ], 取 length 个字符
select substring('pupper',2) from dual;		-- upper

-- ltrim(str),  rtrim(str)	去除前端空格 或 后端空格
-- trim	去除 前后空格
select ltrim('      pupper      ') from dual;
select rtrim('      pupper      ') from dual;
select trim('      pupper      ') from dual;

-- 以首字母小写的方式显示所有员工的姓名
select concat(lcase(left(`ename`,1)),substring(`ename`,2)) from emp;
```

### 5. 数学函数

| 命令                          | 说明                                                                 |
| ----------------------------- | -------------------------------------------------------------------- |
| abs(num)                      | 绝对值                                                               |
| bin(decimal_number)           | 十进制 转 二进制                                                     |
| ceiling(num)                  | 向上取整 , 得到比 num 大的最小整数                                   |
| conv(num, from_base, to_base) | 进制转换, 从 from_base 进制 转为 to_base 进制                        |
| floor(num)                    | 向下取整, 得到比 num 小的最大整数                                    |
| format(num, decimal_places)   | 保留小数位数, 四舍五入                                               |
| hex(decimalNumber)            | 转 16 进制                                                           |
| least(number1,number2)        | 求最小值                                                             |
| mod(numerator, denominator)   | 求余数                                                               |
| rand([seed])                  | 随机数, 其范围为 0 ≤ v ≤1.0, 如果使用 seed, 则 seed 不变, 随机数不变 |

```sql
-- 案例

-- abs(num)	绝对值
select abs(-10) from dual;

-- bin(decimal_number)	十进制 转 二进制
select bin(10) from dual;

-- ceiling(num)	向上取整 , 得到比 num 大的最小整数
select ceiling(10.01) from dual;

-- conv(num, from_base, to_base)	进制转换
-- 8 为 10 进制, 转为 2 进制
select conv(8, 10 ,2) from dual;

-- floor(num)	向下取整, 得到比 num 小的最大整数
select floor(1.1) from dual;

-- format(num, decimal_places)	保留小数位数, 四舍五入
select format(3.1415926634, 3) from dual;

-- hex(decimalNumber)	转 16 进制
select hex('a') from dual;

-- least(number1,number2)	求最小值
select least(1341123,213443242) from dual;

-- mod(numerator, denominator)	求余数
select mod(3,2) from dual;

-- rand([seed])	随机数, 其范围为 0 ≤ v ≤1.0
select rand() from dual;
-- 如果 seed 填写了, 在 seed 不变时,产生的 随机数不变
select rand(2) from dual;
```

### 6. 时间日期函数

| 命令                                    | 说明                              |
| --------------------------------------- | --------------------------------- |
| current_date()                          | 获取当前日期                      |
| current_time()                          | 获取当前时间                      |
| current_timestamp()                     | 获取当前时间( 日期 + 时间)        |
| date(datetime)                          | 返回 datetime 的日期部分          |
| date_add(date, interval d_value d_type) | 在 date 中加上日期 或 时间        |
| date_sub(date, interval d_value d_type) | 在 date 中减去日期 或 时间        |
| datediff(date1, date2)                  | 两个日期差(天数), date1 - date2   |
| timediff(date1, date2)                  | 两个时间差(时分秒), date1 - date2 |
| now()                                   | 当前时间                          |
| year&#124;month&#124;date(datetime)     | 获取具体的年, 月, 日              |
| from_unixtime()                         | 将 时间戳 转换为 指定格式的 日期  |
| unix_timestamp()                        | 返回 1970-1-1 到现在的 秒数       |

:::tip

- date_add() 中的 interval 后面可以是 year, minute, second, day 等
  :::

```sql
-- 案例

create table mes(id int, content varchar(30), send_time datetime);
insert into mes values(1,'北京新闻', current_timestamp()),(2,'上海新闻',now()),(3,'广州新闻',now());

-- current_date()	当前日期
select current_date() from dual;

-- current_time()	当前时间
select current_time() from dual;

-- current_timestamp()	当前时间戳
select current_timestamp() from dual;

-- date(datetime)	返回 datetime 的日期部分
select date(`hiredate`) from emp;

-- 显示发布日期,不显示时间
select id, content, date(`send_time`) from mes;

-- 查询在 10 分钟内发布的新闻
select * from mes where date_add(`send_time`, interval 10 minute) >= now();
select * from mes where send_time >= date_sub(now(), interval 10 minute);

-- 计算 2011-11-11 和 1990-1-1 相差的天数
select datediff('2011-11-11','1990-01-01') from dual;

-- 计算活了多少点
select datediff(now(), '1989-11-22') from dual;

-- 计算 活到 80 岁还剩多少天
select datediff(date_add('1989-11-22', interval 80 year), now()) from dual;


-- timediff(date1, date2)	两个时间差(时分秒)
select timediff(now(), '2022-06-15 09:17:18') from dual;

-- year|month|date(datetime)
select year(now()) from dual;

-- unix_timestamp() 返回 1970-1-1 到现在的 秒数
select unix_timestamp() from dual;

-- from_unixtime() 将 时间戳 转换为 指定格式的 日期
select from_unixtime(1655285874) from dual;
select from_unixtime(1655285874, '%Y-%m-%d') from dual;
select from_unixtime(1655285874, '%Y-%m-%d %H:%i:%s') from dual;
```

### 7. 加密和系统函数

| 命令          | 说明                     |
| ------------- | ------------------------ |
| user()        | 查询用户                 |
| database()    | 数据库名称               |
| md5(str)      | 为字符串加密 MD5 32 位   |
| password(str) | MySQL 默认的密码加密方式 |

```sql
-- user()	查询用户
select user();

-- dtabase()	数据库名称
select database();

-- md5(str)	为字符串加密 MD5 32 位
select md5('pupper');
-- b24fb9e5effed88af6c2590b9a7ab9a4

-- password(str)	用于对 MySQL 数据库的用户密码加密
select password('pupper');
-- *6EF8B45E1D589DB302041535A61774C1294D54D7
```

### 8. 流程控制函数

| 命令                                                                    | 说明                                                                               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| if(expr1,expr2,expr3)                                                   | 如果 expr1 为 true, 则返回 expr2, 否则返回 expr3                                   |
| ifnull(expr1,expr2)                                                     | 如果 expr1 不为 null, 则返回 expr1 , 否则返回 expr2                                |
| select case when expr1 then expr2 when expr3 then expr4 else expr5 end; | 如果 expr1 为 true, 则返回 expr2, 如果 expr3 为 true, 则返回 expr4, 否则返回 expr5 |

```sql
-- if(expr1,expr2,expr3)	如果 expr1 为 true, 则返回 expr2, 否则返回 expr3
select if(true, '北京', '杭州');		-- 北京

-- ifnull(expr1,expr2)	 如果 expr1 不为 null, 则返回 expr1 , 否则返回 expr2
select ifnull(null, '杭州');			-- 杭州

-- select case when expr1 then expr2 when expr3 then expr4 else expr5 end;
-- 如果 expr1 为 true, 则返回 expr2, 如果 expr3 为 true, 则返回 expr4, 否则返回 expr5
select case when 1 = 3 then '条件 1 成立' when 2=3 then '条件二成立' else '都不成立' end;		-- 都不成立

-- 如果 comm 为null, 则显示 0.0
-- 判断是否为 null, 要使用 is null, 不为空 is not null
select ename,if(comm is null, 0.0, comm) from emp;
select ename,ifnull(comm, 0.0) from emp;

-- 如果 emp 表的 job 是 clerk 则显示为 职员, 如果是 manager 则显示为 经理, 如果是 salesman 则显示 销售, 其他正常显示
select ename,
  case when job = 'CLERK' then '职员'
        when job = 'MANAGER' then '经理'
        when job = 'SALESMAN' then '销售' else job end as job
from emp;
```

### 9.分页查询

:::note
语法:
select ... limit start, rows;
公式:
**limit 每页显示的记录数 \* (第几页-1), 每页显示的记录数**

表示从 start + 1 行开始取, 取出 rows 行, start 从 0 开始计算
:::

```sql
-- 按照 员工 ID 升序取出, 每页显示 3 条数据
-- limit 每页显示的记录数 * (第几页-1), 每页显示的记录数
select * from emp order by empno limit 0,3 ;
select * from emp order by empno limit 3,3 ;
select * from emp order by empno limit 6,3 ;

-- 显示每种岗位的员工总数和平均工资
select job,count(empno), avg(sal) from emp group by job;

-- 显示员工总数 和 获得补助的员工数
select count(*), count(comm) from emp;

-- 显示管理者的人数
select count(distinct mgr) from emp;

-- 显示员工工资的最大差额
select (max(sal)- min(sal)) from emp;
```

## 五.数据库 查询 - 进阶

### 1. 单表查询

:::tip
如果 select 语句中同时包含 group by, having, limit, order by , 那么他们的顺序为 group by, having, order by, limit;
:::

```sql
select column1, column2, column3 ... from table
        group by column
        having condition
        order by column
        limit start, rows;
```

```sql
-- 统计 各个部门平均工资且大于 1000 且从高到低排序 且显示 2 行
select deptno,avg(sal) as avg_sal from emp
	group by deptno
	having avg_sal > 1000
	order by avg_sal desc
  limit 0, 2;
```

:::tip
like 操作符:

- % : 表示 0 ~ 多个字符
- \_ : 表示单个字符

desc 表名 : 用于查询表结构
:::

```sql
-- dept 部门表 (部门编号 deptno, 名称 dname, 所在城市 loc)
-- emp 员工表 (编号 empon, 名字 ename, 工作 job, 上级编号 mgr, 入职时间 hiredate, 薪水 sal, 红利 comm, 部门编号 deptno)
-- 工资级别表 (级别 grade, 最低工资 losal, 最高工资 hisal)

-- 查询 1992-1-1 之后入职的员工
select * from emp where hiredate > '1992-1-1';

-- 查询 姓名首字母为 S 的员工
select ename, sal from emp where ename like 'S%';

-- 查询 姓名 第三个字母为 O 的员工
select ename, sal from emp where ename like '__O%';

-- 查询 表结构
desc emp;

-- 按照工资从低到高显示员工信息
select * from emp order by sal;

-- 按照 部门编号的升序 工资的降序 显示员工工资
select * from emp order by deptno asc, sal desc;
```

### 2. 多表查询

:::tip
笛卡尔集 : 多表查询时, 表 1 中的每一条内容都会和表 2 中的每一条内容组合, 从而形成笛卡尔集;
为了防止出现 笛卡尔集, 查询 条件不能少于 **表的个数 -1**;
:::

```sql
-- dept 部门表 (部门编号 deptno, 名称 dname, 所在城市 loc)
-- emp 员工表 (编号 empon, 名字 ename, 工作 job, 上级编号 mgr, 入职时间 hiredate, 薪水 sal, 红利 comm, 部门编号 deptno)
-- salgrade 工资级别表 (级别 grade, 最低工资 losal, 最高工资 hisal)

-- 查询 员工的名字,工资,部门名称,并按部门编号降序排列
select  ename, sal, dname, dept.deptno from dept, emp where dept.deptno = emp.deptno order by dept.deptno desc;

-- 查询 部门号为 10 的 员工名字,工资,部门名称
select  dept.deptno, dname, ename, sal from dept, emp where dept.deptno = emp.deptno and dept.deptno = 10;

-- 查询各个员工的名字, 工资, 及工资级别
select ename, sal, grade from emp, salgrade where losal <= sal and hisal >= sal;
select ename, sal, grade from emp, salgrade where sal between losal and hisal;
```

### 3.自连接

:::tip
注意事项:

- 把同一张表当做两张表来使用;
- 需要给 表 取别名,
  - 表 别名 : 表取别名时, as 可以忽略不写
- 字段前必须加 表 的别名, 用于区分, 否则报错;
  :::

```sql
-- 显示员工名字和 上级的名字
select worker.ename, boss.ename from emp worker, emp boss where worker.mgr = boss.empno;
```

### 4.子查询

:::tip

- 子查询中, 返回单行数据时,一般用 = 判断条件;
  - 返回 多行数据时, 使用 in 作为判断条件, 也就是满足 in 中的任意条件即可;
- 子查询中, 也可以将一个查询结果当做临时表来用;
  :::

```sql
-- 案例 - 雇员数据库

-- dept 部门表 (部门编号 deptno, 名称 dname, 所在城市 loc)
-- emp 员工表 (编号 empon, 名字 ename, 工作 job, 上级编号 mgr, 入职时间 hiredate, 薪水 sal, 红利 comm, 部门编号 deptno)
-- salgrade 工资级别表 (级别 grade, 最低工资 losal, 最高工资 hisal)

-- 返回单行 子查询
-- 查询 SMITH 同一部门的其他员工
select * from emp where deptno = (select deptno from emp where ename = 'SMITH');

-- 返回多行 子查询
--  查询 和部门10 工作相同的员工信息,但是不包含 10 号部门的员工
select * from emp where job in (select distinct job from emp where deptno = 10) and deptno != 10;
```

#### all 和 any

:::note
all : 表示所有的
any : 表示每一个
:::

```sql
-- dept 部门表 (部门编号 deptno, 名称 dname, 所在城市 loc)
-- emp 员工表 (编号 empon, 名字 ename, 工作 job, 上级编号 mgr, 入职时间 hiredate, 薪水 sal, 红利 comm, 部门编号 deptno)
-- salgrade 工资级别表 (级别 grade, 最低工资 losal, 最高工资 hisal)

-- 查询 工资比 30 号部门所有员工工资高的员工信息
select * from emp where sal > all(select distinct sal from emp where deptno = 30);
select * from emp where sal > all(select max(sal) from emp where deptno = 30);

-- 查询 工资比 30 号部门其中一个员工工资高的员工信息
select * from emp where sal > any(select distinct sal from emp where deptno = 30);
select * from emp where sal > any(select min(sal) from emp where deptno = 30);
```

### 5.多列子查询

:::note
语法:
(字段 1, 字段 2...) = (select 字段 1, 字段 2 ... from...)
:::

```sql
-- 查询 与 ALLEN 部门和岗位完全相同的所有员工,不含其本人
select * from emp where (deptno, job) = (select deptno, job from emp where ename = 'ALLEN') and ename != 'ALLEN';

-- 查询 每个部门工资高于部门平均工资的个人资料
select empno, ename, job, mgr
	from emp, (select deptno, avg(sal) as avg_sal from emp group by deptno) temps
	where emp.deptno = temps.deptno and sal > avg_sal;

-- 查询 每个部门工资最高的员工资料
select empno, ename, job, mgr
	from emp, (select deptno, max(sal) as max_sal from emp group by deptno) temps
	where emp.deptno = temps.deptno and sal = max_sal;

 -- 查询每个部门的 名称, 编号, 地址 和人员数量
select dept.deptno, dname, loc, com
		from dept,(select deptno,count(empno) as com from emp group by deptno) num
		where dept.deptno = num.deptno;
```

### 6. 合并查询

:::note
union all : 该操作符用于获得两个查询结果的 并集, 该操作符 不会去重;
union : 该操作符可以 去重;
:::

```sql
select ename, sal, job from emp where sal > 2500 union all
	select ename, sal, job from emp where job = 'MANAGER';
```

### 7. 外连接

:::warning
外连接:

- 左外连接 : 以左边的表为基准, 全部显示, 右边的表只显示与之匹配的部分;
  - 语法:** select ... from 表 1 left join 表 2 on 关联条件**
  - 表 1 为主表, 表 2 为辅表
- 右外连接 : 以右边的表为基准, 全部显示, 左边的表只显示与之匹配的部分;
  - 语法:** select ... from 表 1 right join 表 2 on 关联条件**
  - 表 2 为主表, 表 1 为辅表
    :::

```sql
create table stu (id int, `name` varchar(32));
insert into stu values(1,'jack'),(2,'tom'),(3,'kity'),(4,'nono');
select * from stu;

create table exam (id int, grade int);
insert into exam values(1, 56),(2,76),(11,8);
select * from exam;

-- 左外连接
select `name`, stu.id, grade from stu left join exam on stu.id = exam.id;

-- 右外连接
select `name`, stu.id, grade from stu right join exam on stu.id = exam.id;

-- 列出所有部门及其员工,包括没有员工的部门
select dname,ename, job from dept left join emp on dept.deptno = emp.deptno order by dname ;
```

### 8. 主键

:::tip

- 主键 : **不可重复**, 唯一标识, 用于标示 表中的 行数据
  - 一张表只能有一主键, 但是可以使用复合主键;
  - 主键不能为 null
  - 一般使用 id, 手机号, 邮箱 作为主键
    :::

:::note
语法:
**字段名 字段类型 primary key**; -- 创建表时使用
**primary key (列名)**; -- 创建表后使用
:::

```sql
-- 创建表时指定 主键
create table test02 (id int primary key, `name` varchar(32));

-- 创建表之后 指定主键
create table test03 (id int, `name` varchar(32), primary key (id));

-- 复合主键
create table test04 (id int, `name` varchar(32), primary key (id, `name`));
```

### 9. 非空(not null) 及 唯一(unique)

:::note

- not null : 非空, 即 插入数据时, 必须为字段提供数据;
- unique : 唯一, 表示该字段中的数据不能重复;
  - 如果没有指定 not null , 则 unique 字段 可以有多个 null
  - 一张表可以有多个 unique 字段
    :::

```sql
-- 非空
字段名 字段类型 not null

-- 唯一
字段名 字段类型 unique
```

```sql
-- 创建表时指定 字段数据唯一并且非空
create table test06 (id int unique not null, `name` varchar(32), `add` varchar(32));
```

### 10. 外键

:::note
外键 : 用于定义主表 和 从表 之间的关系
:::

:::tip
注意事项:

- 外键指向的表的字段, 要求是 primary key 或者是 unique;
- 表的类型 是 innodb, 否则不支持外键;
- 外键字段的类型要和主键字段的类型一致;
- 外键字段的值, 必须在主键中出现过, 或者为 null;
- 一旦建立了主外键关系,数据不能随意删除;
  :::

```sql
foreign key (从表字段名) references 主表名(主键名 或 unique 字段名)
```

```sql
-- 创建主表
create table my_class(
	id int primary key,
	`name` varchar(32) not null default '');

-- 创建从表
create table my_stu(
	id int primary key,
	`name` varchar(32) not null default '',
	class_id int,
	-- 创建外键
	foreign key (class_id) references my_class (id));


insert into my_class values(100, 'java'),(200,'web');
insert into my_stu values (1, 'jack', 100),(2, 'tom', 200),(3, 'money', 200),(4, 'tank', 100);

select * from my_class;
select * from my_stu;
```

### 11. 自增长

```sql
字段名 整型 primary key auto_increment
```

```sql
-- 自增长 字段赋值 null 时, 默认从 1 开始自增长
insert into xxx (字段1, 字段2...) values (null, 值2...);
insert into xxx (字段2...) values (值1, 值2...);
insert into xxx values (null, 值2...);
```

:::tip
注意事项:

- 自增长 一般与主键配合使用;
- 自增长单独使用时, 需要配合 unique;
- 自增长 修饰的字段 一般为整型;
- 自增长一般从 1 开始, 也可以通过命令修改
  - alter table 表名 auto_increment = 新的开始值;
    :::

```sql
-- 自增长 - 案例

-- 创建 表
create table test05 (
	id int primary key auto_increment,
	email varchar(32) not null default '',
	`name` varchar(32) not null default '');

insert into test05(id, email, `name`) values (null, '123@gmail.com', 'jack');
insert into test05(email, `name`) values ('asdf@qq.com', 'tom');
insert into test05 values (null, '43241233@qq.com', 'join');
```

### 12. 索引

[创建海量表.txt](https://wwi.lanzoup.com/iOkTm09dvc0b)

```sql
create index empno_index on emp (empno)
-- empno_index : 表示索引名称
-- on emp(empno) : 表示在 emp 表的 empno 字段 创建索引
```

:::tip

- 主键索引 : 主键在创建时, 自动成为主索引 (类型 primary key)
  - create table t1(id int primary key, name varchar(32));
  - id 既是主键, 也是索引, 称为 主索引;
- 唯一索引 : 使用了 unique 的字段, 自动成为 唯一索引;
  - create table t1(id int unique, name varchar(32));
  - id 既是唯一的, 也是索引, 称为 unique 索引
- 普通索引 : 在一个字段中, 专门指定其为索引;
  - create index ename_index on emp(ename);
- 全文索引 : mysql 自带的, 一般不会使用
  :::

:::note

- 创建索引可以大大减少查询时间;
- 查询速度的提升只对创建了索引的字段有效, 对表中的其他字段无效;
- 索引会占用一定的存储空间;
- 在数据添加, 修改, 删除时, 索引对齐效率有影响;

---

- 较频繁作为查询条件的字段 应该创建索引;
- 唯一性太差的字段 不适合单独创建索引;
- 更新较为频繁的字段不适合创建索引;
- 不会出现在 where 子句中的字段 不该创建索引;
  :::

```sql
-- 添加索引前 2.246s 添加索引后 0.007s
create index ename_index on emp(ename);
select * from emp where ename = 'sToObQ';
```

```sql
-- 索引的 增, 删, 改, 查

-- 创建测试表
create table test06 (id int, tname varchar(32));

-- 查看 表索引
show indexes from test06;
show index from test06;
show keys from test06;
________________________________________________________________________________

-- 添加主键索引 (创建表时没有 添加主键 时可以使用)
-- 如果创建表时指定了主键, 则主键自动成为主键索引
alter table test06 add primary key (tname);

-- 添加 唯一索引
create unique index id_index on test06(id);

-- 添加普通索引
create index tname_index on test06(tname);

-- 添加普通索引
alter table test06 add index tname_index(tname);
________________________________________________________________________________

-- 删除索引
drop index id_index on test06;
drop index tname_index on test06;

-- 删除 主键索引
alter table test06 drop primary key;

-- 索引的修改 : 先删除, 再重新添加;
```

## 案例 - 数据库创建

```sql
-- 数据库创建

-- 要求 客户名不为空, 邮箱不重复, 单价 在 1.0 ~ 9999.99 之间

-- 创建数据库
create database shop_db character set utf8 collate utf8_bin;

-- 创建 商品表 goods, 商品号 goods_id, 商品名 goods_name, 单价 unitprice, 商品类别 category, 供应商 provider
create table goods(
	goods_id int primary key,
	goods_name varchar(64) not null default '',
	unitprice decimal(10,2) not null default 0
		check(unitprice >= 1.0 and unitprice <10000),
	category int not null default 0,
	provider varchar(64) not null default '');

-- 创建 客户表 customer, 客户id crstomer_id, 姓名 name, 地址 address, 邮箱 email, 性别 sex, 身份证 card_id
create table customer(
	customer_id int primary key,
	`name` varchar(64) not null default '',
	address varchar(64)not null default '',
	email varchar(64) unique not null default '',
	sex enum('男','女') not null, 	-- 枚举类型
	card_id varchar(32) unique);

-- 创建 订单表 purchase, 订单号 order_id, 客户号 customer_id, 商品号 goods_id, 购买数量 nums
create table purchase(
	order_id int unsigned primary key,
	customer_id int not null default 0,
	goods_id int not null default 0,
	nums int not null default 0,
	foreign key (customer_id) references customer(customer_id),
	foreign key (goods_id) references goods(goods_id));
```

## 五.MySQL 事务

> 事务用于保证数据的一致性, 它由 一组相关的 dml 语言组成, 该组的 dml 语言幺妹全部成功, 要么全部失败,

:::note
事务和锁:
当执行事务操作时 ( dml 语言 ), mysql 会在表上加锁, 防止其他用户改表的数据;
主要针对的是 MySQL 的增, 删, 改
:::

:::tip
MySQL 数据库 控制台事务的几个重要操作:

- start transaction : 开始一个事务;
  - set autocommit = off : 也可以开启一个事务
- savepoint : 保存点名, 设置保存点;
  - 用于取消部分事务, 当事务结束时, 自动删除该事务所定义的所有保存点;
- rollback to : 保存点名, 回退事务;
- rollback : 回退全部事务;
- commit : 提交事务, 所有的操作生效, 不能回退
  - 执行 commit 语句后, 会提交数据, 不能在回退, 结束事务, 删除保存点, 释放锁;
    :::

:::warning
细节:

- 如果不开始事务, 默认情况下, dml 操作是自动提交的, 不能回滚;
- 如果开启一个事务, 没有设置保存点, 则默认回退到 事务开始的状态;
- 一个事务中 可以创建多个 保存点, 事务在没有提交前, 可以回退到任何保存点;
- innodb 存储引擎可以使用 事务, myisam 引擎不能使用事务;
  :::

```sql
create table test06 (id int, `name` varchar(32));

-- 开启事务
start transaction;
insert into test06 values(100, 'tom');

-- 添加保存点
savepoint a;
insert into test06 values(200, 'jack');

-- 添加保存点
savepoint b;

select * from test06;

-- 回退到 a 保存点
rollback to a;

-- 回退全部
rollback;

-- 提交事务
commit;
```

### 事务的隔离基本

> 多个连接开启各自事务操作数据时,数据库系统要负责隔离操作, 以保证各个连接在获取数据时的准确性;

:::tip

- 脏读 : 当一个事务读取另一个事务尚未提交的修改时, 产生脏读;
- 不可重复读 : 同一查询在同一事务中多次进行, 由于其他提交事务所做的修改或删除, 每次返回不同的结果集, 此时发生不可重复读;
- 幻读 : 同一查询在同一事务中多次进行, 由于其他提交事务所做的插入操作, 每次返回不同的结果集;
  :::

隔离级别:

| MySQL 隔离级别                  | 脏读 | 不可重复读 | 幻读 | 加锁读 |
| ------------------------------- | ---- | ---------- | ---- | ------ |
| 读未提交 (Read uncommitted)     | √    | √          | √    | 不加锁 |
| 读已提交 (Read committed)       | ×    | √          | √    | 不加锁 |
| 可重复读 (Repeatable read) 默认 | ×    | ×          | ×    | 不加锁 |
| 可串行化 (Serializable)         | ×    | ×          | ×    | 加锁   |

:::warning
MySQL 默认的事务级别为 repeatable read ( 可重复读), 一般情况下, 没有特殊要求, 没必要修改;
:::

```sql
-- 查询当前会话隔离级别
select @@tx_isolation;

-- 查看系统当前隔离级别
select @@global.tx_isolation;

-- 设置当前会话隔离级别
set session transaction isolation level xxx;

-- 设置系统当前隔离级别
set session transaction isolation level xxx;
```

:::note
事务的 acid 特性:

- 原子性 (Atomicity) : 原子性是指事务是一个不可分割的工作单位, 事务中的操作要么都发生,要么都不发生;
- 一致性 (Consistency) : 事务必须使数据库中一个一致性状态变换到另一个一致性状态;
- 隔离性 (lsolation) : 多个用户并发访问数据库时, 数据库为每个用户开启的事务,不能被其他事务的操作数据所干扰,多个并发事务之间要相互隔离;
- 持久性 (Duralility) : 一个事务一旦被提交,他对数据库中数据的改变时永久性的, 即使数据库发生故障,也不应该对其有影响;
  :::

## 六.表类型和存储引擎

:::tip

- MySQL 的表类型用 存储引擎 (Storage Engines) 决定;
  - 主要包括: MyISAM, innoDB, Memory 等;
- MySQL 数据表主要支持六中类型:
  - CSV, Memory, ARCHIVE, MRG MYSIAM, MYISAM, lnnoBDB;
- 六中类型又分为两类:
  - 事务安全型 : 如 lnnoDB;
  - 非事务安全型 : 如: mysiam, menory;
    :::

:::note
细节说明:

- MyISAM : 不支持事务, 也不支持外键, 但访问速度快, 对事务完整性没有要求;
- InnoDB : 提供了具有提交, 回滚, 崩溃恢复能力的安全事务;
  - 和 myisam 相比, 处理效率差一些并占用更多的磁盘空间以保留数据和索引;
- MEMORY : 使用从头打内存中的内容来创建表, 每个 memory 表只实际对应一个磁盘文件;
  - 访问非常快, 它的数据放在内存中, 并且默认使用 hash 索引;
  - 一旦服务关闭, 数据会全部丢失, 表结构还在;
    :::

## 七.视图

> 视图 : 根据基表, 创建的一个虚拟表, 他实际没有数据, 只有结构文件;

:::note

- 视图是根据基表(可以是多个基表)来创建的;
- 视图是虚拟表;
- 通过视图可以修改基表的数据;
- 基表的改变, 也会影响到视图的数据;
  :::

```sql
-- 创建视图
create view 视图名 as select 列名 from 表名 ...

-- 修改(更新)视图
alter view 视图名 as select 语句

-- 查看创建视图的指令
show create view 视图名;

-- 删除视图
drop view 视图名 1, 视图名 2;
```

:::tip
作用:

- 安全 : 某些字段数据不允许用户直接查看时, 可以创建视图表;
- 性能 : 多个关联表查询繁琐时,可以使用视图表;
- 灵活 : 旧表不能使用又无法废弃时,可以使用视图表, 已达到升级的目的;
  :::

```sql
-- dept 部门表 (部门编号 deptno, 名称 dname, 所在城市 loc)
-- emp 员工表 (编号 empon, 名字 ename, 工作 job, 上级编号 mgr, 入职时间 hiredate, 薪水 sal, 红利 comm, 部门编号 deptno)
-- salgrade 工资级别表 (级别 grade, 最低工资 losal, 最高工资 hisal)

-- 创建视图表, 可以显示 员工编号,名称,部门名称,薪水等级等 (三表联合查询)
create view emp_view02 as
	select empno, ename, dname, grade from dept, emp,salgrade
	where emp.deptno = dept.deptno and (sal between losal and  hisal);
```

## 八.MySQL 用户管理

:::note
MySQL 数据库中的 user 表中存储了数据库的所有用户信息;

- host 字段 存储了可以访问数据库的 ip 地址;
- user 字段 存储了用户名;
- authentication_string 字段存储了 经过 password() 方法加密后的 用户密码;
  :::

```sql
-- 创建用户
create user '用户名'@'允许登录的位置'	identified by '密码'

-- 删除用户
drop user '用户名'@'允许登录的位置';

-- 修改自己的密码
set password = password('新密码');

-- 修改别人的密码
set password for '用户名'@'允许登录的位置' = password('密码');
```

:::tip
细节:

- 在创建用户时, 如果不指定 host, 则为 %, % 表示所有 ip 都可以连接数据库;
- create user 'xxx'@'192.186.1.%' : 表示 xxx 用户在 192.168.1.\* 的 ip 都可以登录 mysql
- 在删除用户时, 如果 host 不是 %, 则需要明确指定 '用户'@'host 值';
  :::

### 用户权限

```sql
-- 授予权限
grant 权限列表 on 库.对象名 to '用户名'@'登录位置' [identified by '密码']

-- 回收权限
revoke 权限列表 on 库.对象名 from '用户名'@'登录位置';

-- 权限生效指令 (如果权限没有生效,可使用下面的指令)
flush privileges;
```

:::note
说明 :

- 权限列表, 多个权限用逗号分开
  - grant select on ...
  - grant select, delete, create, on ...
  - grant all [privileges] on ... // 表示赋予该用户在该对象上的所有权限
- _._ : 表示本系统中的所有数据库的所有对象;
- 库.\* : 表示某个数据库中的所有对象;
- inentified by : 可以省略不写;
  - 写出来, 如果该用户存在, 则修改该用户密码; 如果不存在, 则创建该用户
    :::

```sql
-- 添加用户
create user 'myroot'@'127.0.0.1' identified by '123456';

-- 添加权限
-- grant 权限列表 on 库.对象名 to '用户名'@'登录位置' [identified by '密码']
grant select, insert on tmp.* to 'myroot'@'127.0.0.1';

-- 回收权限
-- revoke 权限列表 on 库.对象名 from '用户名'@'登录位置';
revoke insert on tmp.* to 'myroot'@'127.0.0.1';
```

![](https://img.pupper.cn/img/1655720449509-77037d08-2543-42b7-97f3-33ed8c7cc5b8.png)

## 案例

```sql
-- dept 部门表 (部门编号 deptno, 名称 dname, 所在城市 loc)
-- emp 员工表 (编号 empno, 名字 ename, 工作 job, 上级编号 mgr, 入职时间 hiredate, 薪水 sal, 红利 comm, 部门编号 deptno)
-- salgrade 工资级别表 (级别 grade, 最低工资 losal, 最高工资 hisal)

-- 3 显示所有部门名称
select dname from dept;
-- 显示所有员工年的收入 13 月
select ename, (sal+ifnull(comm,0))*13 as '年收入' from emp;

-- 4 工资超过 2850 的员工
select ename, sal from emp where sal > 2850;
-- 工资在 2850 ~ 1500 之间的员工
select ename, sal from emp where sal > 2850 or sal < 1500;
-- 编号为 7566 的员工
select ename, deptno from emp where empno = 7566;
-- 10 和 30 号部门, 工资超 1500 的员工
select ename, sal from emp where sal > 1500 and deptno in (10, 30);
-- 无上级的员工
select ename, job from emp where mgr is null;

-- 5 在 1991-2-1 和 1991-5-1 之间入职的员工
select ename, job, hiredate from emp where hiredate between '1991-2-1' and '1991-5-1' order by hiredate;
-- 有补助的员工
select ename, sal, comm from emp where comm is not null order by sal;

-- 6 部门 30 的员工
select * from emp where deptno = 30;
-- 所有 工作为 CLERK 的员工
select ename, empno, deptno from emp where job = 'CLERK';
-- 佣金高于薪金的员工
select * from emp where comm > sal;
-- 佣金高于薪金 60%
select * from emp where comm > (sal * 0.6);
-- 部门 10 的 MANAGER 和 部门 20 的 CLERK
select * from emp where (deptno = 10 and job = 'MANAGER') or (deptno = 20 and job = 'CLERK');
-- 部门 10 的 MANAGER 和 部门 20 的 CLERK 和 既不是 MANAGER 也不是 CLERK 且 工资大于 2000
select * from emp
	where (deptno = 10 and job = 'MANAGER')
	or (deptno = 20 and job = 'CLERK')
	or (job not in('MANAGER', 'CLERK') AND sal >= 2000);
-- 收取佣金的不同工作
select distinct job from emp where comm is not null;
-- 不收取佣金或佣金少于 100
select * from emp where comm is null or comm < 100;
-- 每月倒数第三天入职的员工
select * from emp where hiredate = (date_sub(last_day(hiredate),interval 2 day));
select * from emp where hiredate = last_day(hiredate) - 2;
-- 早去 12 年前入职的员工
select * from emp where date_add(hiredate, interval 12 year) < now();
-- 首字母小写
select concat(lcase(left(`ename`,1)),substring(`ename`,2)) from emp;
-- 名字前 5 个字母
select left(ename, 5) from emp;
-- 名字不包含 R 的员工名字
select ename from emp where ename not like '%R%';
-- 员工名字前三个字符
select substring(ename,1,3) from emp;
-- 替换名字 a 替换 A
select replace(ename, 'A', 'a') from emp;
-- 入职满 10 年的员工
select ename, hiredate from emp where date_add(hiredate, interval 10 year) <= now();
-- 按名字排序
select * from emp order by ename;
-- 按入职年限排序
select * from emp order by hiredate;
-- 先按工作排序,再按工资排序
select * from emp order by job desc,sal;
-- 员工姓名,入职年份,月份, 先按月排序,再按年排序
select ename, year(hiredate), month(hiredate) from emp order by month(hiredate),year(hiredate);
-- 日薪
select floor(sal/30) as '日薪' from emp;
-- 2 月入职
select * from emp where month(hiredate) = 2;
-- 入职天数
select datediff(now(), hiredate) as '入职天数' from emp;
-- 员工名字包含 A
select ename from emp where ename like '%A%';
-- 日期方式显示入职时间
select from_days(datediff(now(), hiredate)) as '服务天数' from emp;

-- 7 至少有一个员工的部门
select dname from dept where deptno in (select deptno from emp group by deptno);
-- 薪资比 SMITH 多的员工
select * from emp where sal > (select sal from emp where ename = 'SMITH');
-- 雇佣时间比上级晚的员工
select emp.ename, emp.hiredate from emp, emp tmps where emp.mgr = tmps.empno and emp.hiredate > tmps.hiredate;
-- 部门名称和员工信息,包括没有员工的部门
select dname, emp.deptno, ename, hiredate from dept left join emp on dept.deptno = emp.deptno order by dname;
-- 所有 工作为 CLERK 的员工姓名和 部门名称
select ename, dname, job from dept, emp where dept.deptno = emp.deptno and job = 'CLERK' order by dname;
-- 最低薪资大于 1500 的工作
select  job, min(sal) min_sal from emp group by job having min_sal > 1500;
-- 在部门 sales 工作的员工
select * from emp where deptno = (select deptno from dept where dname = 'sales');
-- 薪水高于平均工资的员工
select * from emp where sal > (select avg(sal) from emp);
-- 与 SCOTT 工作相同的员工
select * from emp where job = (select job from emp where ename = 'SCOTT') and ename <> 'SCOTT';
-- 薪水高于 30 号部门所有员工
select * from emp where sal > (select max(sal) from emp where deptno = 30) and deptno != 30;
-- 每个部门的员工人数, 平均工资, 平均服务年限
select count(empno) as '人数', avg(sal), format(avg(datediff(now(), hiredate)/365),2) from emp group by deptno;
-- 所有员工的姓名,部门,工资
select ename, dname, sal from dept, emp where dept.deptno = emp.deptno;
-- 所有部门的详细信息及部门人数
select dname, count(dname) from dept, emp where dept.deptno = emp.deptno group by dname;
-- 各个工种的最低工资
select job, min(sal) from emp group by job;
--  MANAGER 的最低薪水
select min(sal) from emp where job = 'MANAGER';
-- 计算年薪,升序排列
select ename, (sal + ifnull(comm, 0))*12 as year_sal from emp order by year_sal;
```