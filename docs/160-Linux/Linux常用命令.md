---
title: Linux 基础 - linux 常用命令
categories:
  - 学习笔记
tags:
  - Linux基础
abbrlink: 3ea50011
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-75.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#958e82'
---

![](https://img.pupper.cn/img/202304141041977.png)

# Linux 常用命令

## 一、 基本命令

### 1. 关机

- 立刻关机
  - `shutdown -h now`
- 5 分钟后关机
  - `shutdown -h 5`
- 立刻关机
  - `poweroff`

### 2. 重启

- 立刻重启
  - `shutdown -r now`
- 5 分钟后重启
  - `shutdown -r 5`
- 立刻重启
  - `reroot`

### 3. 帮助命令

- --help 命令
  - `shutdown --help`
  - `ifconfig --help` ： 查看网卡信息
- man 命令
  - `man shutdown` ： 打开命令说明书之后，使用按键 `q` 退出

## 二、 目录操作命令

### 1. 目录切换 cd

- `cd /` ： 切换到根目录
- `cd /usr` ： 切换到根目录下的 usr 目录
- `cd ../` ： 切换到上一级目录 或者 cd ..
- `cd ~` ：切换到 home 目录
- `cd - ` ： 切换到上次访问的目录

### 2. 目录查看 ls[-al]

- `ls` ： 查看当前目录下的所有目录和文件
- `ls -a` ： 查看当前目录下的所有目录和文件（包括隐藏的文件）
- `ls -l 或 ll` ：列表查看当前目录下的所有目录和文件（列表查看，显示更多信息）
- `ls /dir` ： 查看指定目录下的所有目录和文件 如：ls /usr

### 3. 目录操作 【 增、删、改、查】

#### 1. 创建目录 【增】 mkdir

> 命令 ： `mkdir 目录`

```shell
# 在当前目录下创建一个名为 aaa 的目录
mkdir aaa

# 在指定目录下创建一个 名为 aaa 的目录
mkdir /usr/aaa
```

#### 2. 删除目录或文件 【删】 rm

> 命令：`rm [-rf]` 目录

- 删除文件：

  - `rm 文件` 删除当前目录下的文件
  - `rm -f 文件` 删除当前目录的的文件（不询问）

- 删除目录：

  - `rm -r aaa` 递归删除当前目录下的 aaa 目录
  - `rm -rf aaa` 递归删除当前目录下的 aaa 目录（不询问）

- 全部删除：
  - `rm -rf *` 将当前目录下的所有目录和文件全部删除
  - `rm -rf /*` 【自杀命令！慎用！慎用！慎用！】将根目录下的所有文件全部删除

> 注意：rm 不仅可以删除目录，也可以删除其他文件或压缩包，为了方便大家的记忆，无论删除任何目录或文件，都直接使用 rm -rf 目录/文件/压缩包

#### 3. 目录修改 【改】 mv 和 cp

1.  重命名目录

    1.  ​ 命令：`mv 当前目录  新目录`

        ```shell
        # 将目录aaa改为bbb
        mv aaa bbb
        ```

    2.  ​ 注意：mv 的语法不仅可以对目录进行重命名而且也可以对各种文件，压缩包等进行 重命名的操作

2.  剪切目录

    1.  ​ 命令：`mv 目录名称 目录的新位置`

        ```shell
        # 将/usr/tmp目录下的aaa目录剪切到 /usr目录下面
        mv /usr/tmp/aaa /usr
        ```

    2.  ​ 注意：mv 语法不仅可以对目录进行剪切操作，对文件和压缩包等都可执行剪切操作

3.  拷贝目录

    1.  ​ 命令：`cp -r 目录名称 目录拷贝的目标位置   -r代表递归`

        ```shell
        # 将/usr/tmp目录下的aaa目录复制到 /usr目录下面
        cp /usr/tmp/aaa  /usr
        ```

    2.  ​ 注意：`cp`命令不仅可以拷贝目录还可以拷贝文件，压缩包等，拷贝文件和压缩包时不 用写-r 递归

#### 4. 搜索目录 【查】 find

> 命令：find 目录 参数 文件名称

```shell
# 查找/usr/tmp目录下的所有以a开头的目录或文件
find /usr/tmp -name 'a*'
```

## 三、文件操作命令

### 1. 文件操作 【增、删、改、查】

#### 1. 新建文件 【增】 touch

> 命令： touch 文件名

```shell
# 在当前目录中创建一个名为 aaa.txt 的文件
touch aaa.txt
```

#### 2. 删除文件 【删】 rm

> 命令： `rm -rf 文件名`

#### 3. 修改文件 【改】 vi 或 vim

> 【vi 编辑器的 3 种模式】
>
> 命令模式（command mode）、插入模式（Insert mode）和底行模式（last line mode）

1.  命令行模式（command mode）

    1.  控制屏幕光标的移动，字或行的删除，查找，移动复制某区段及进入 Insert mode 下，或者到 last line mode。
    2.  命令行模式下的常用命令：
        - 控制光标移动：`↑，↓，j`
        - 删除当前行：`dd`
        - 查找：`/字符`
        - 进入编辑模式：`i o a`
        - 进入底行模式：`:`

2.  编辑模式（Insert mode）
3.  只有在 Insert mode 下，才可以做文字输入，按「ESC」键可回到命令行模式。
4.  编辑模式下常用命令：

    1.  ESC 退出编辑模式到命令行模式；

5.  底行模式（last line mode）
    1.  将文件保存或退出 vi，也可以设置编辑环境，如寻找字符串、列出行号……等。
    2.  底行模式下常用命令：
        - 退出编辑： `:q`
        - 强制退出： `:q!`
        - 保存并退出： `:wq`

##### 1. 打开文件

> 命令：`vi 文件名`

```shell
# 打开当前目录下的aa.txt文件
vi aa.txt 或者 vim aa.txt
```

注意：使用 vi 编辑器打开文件后，并不能编辑，因为此时处于命令模式，点击键盘 i/a/o 进入编辑模式。

##### 2. 编辑文件

> 使用 vi 编辑器打开文件后点击按键：`i` ，`a`或者`o`即可进入编辑模式。

- `i`: 在光标所在字符前开始插入
- `a`: 在光标所在字符后开始插入
- `o`: 在光标所在行的下面另起一新行插入

##### 3. 保存 错 取消 编辑

- 保存文件：
  1.  `ESC` 进入命令行模式
  2.  `:` 进入底行模式
  3.  `wq` 保存并退出编辑
- 取消编辑：
  1.  `ESC` 进入命令行模式
  2.  `:` 进入底行模式
  3.  `q!` 撤销本次修改并退出编辑

#### 4. 文件查看 【查】

> 文件的查看命令：`cat、more、less、tail`

- `cat` ： 查看最最后一屏

  ```shell
  # 使用cat查看/etc/sudo.conf文件，只能显示最后一屏内容

  cat sudo.conf
  ```

- `more`：百分比显示

  ```shell
  # 使用more查看/etc/sudo.conf文件，可以显示百分比
  # 回车可以向下一行，空格可以向下一页，q可以退出查看

  more sudo.conf
  ```

- `less`：翻页查看

  ```shell
  # 使用less查看/etc/sudo.conf文件，可以使用键盘上的PgUp和PgDn向上    和向下翻页，q结束查看

  less sudo.conf
  ```

- `tail`：指定行数或者动态查看

  ```shell
  # 使用tail -10 查看/etc/sudo.conf文件的后10行，Ctrl+C结束

  tail -10 sudo.conf
  ```

### 2. 权限修改

> `rwx`：`r`代表可读，`w`代表可写，`x`代表该文件是一个可执行文件，
>
> 如果`rwx`任意位置变为`-`则代表不可读或不可写或不可执行文件。

`-`： 代表是文件，`d`： 代表是文件夹

第一段（3 位）：代表拥有者的权限

第二段（3 位）：代表拥有者所在的组，组员的权限

第三段（最后 3 位）：代表的是其他用户的权限

```shell
chmod 777 aaa.txt
```

## 四、 压缩文件操作

> Linux 中的打包文件一般是以`.tar`结尾的，压缩的命令一般是以`.gz`结尾的。
> 而一般情况下打包和压缩是一起进行的，打包并压缩后的文件的后缀名一般`.tar.gz`

### 1. 打包 和 压缩

命令：`tar -zcvf 打包压缩后的文件名 要打包的文件`

- `z` ： 调用 gzip 压缩命令进行压缩
- `c` ： 打包文件
- `v` ：显示运行过程
- `f` ：指定文件名

```shell
# 打包并压缩/usr/tmp 下的所有文件 压缩后的压缩包指定名称为xxx.tar

tar -zcvf ab.tar aa.txt bb.txt
# 或：
tar -zcvf ab.tar  *
```

### 2. 解压

命令：`tar [-zxvf] 压缩文件`

- `x` ： 代表解压

```shell
# 将/usr/tmp 下的ab.tar解压到当前目录下

tar -zxvf ab.tar
或
tar -zxvf ab.tar -C /usr
# -C ： 表示指定解压位置
```

## 五、查找命令

### 1. grep

`geep` ：一种强大的 **文本搜索工具**

```shell
# 查找指定ssh服务进程
ps -ef | grep sshd

# 查找指定服务进程，排除gerp身
ps -ef | grep sshd | grep -v grep

# 查找指定进程个数
ps -ef | grep sshd -c
```

### 2. find

`find`命令在 目录结构 中搜索 文件，并对搜索结果执行指定的操作。

`find` 默认搜索当前目录及其子目录，并且不过滤任何结果（也就是返回所有文件）

```shell
# 在当前目录查找以.log结尾的文件，并显示详细信息。
find . -name "*.log" -ls

# 查找/root/目录下权限为600的文件
find /root/ -perm 600

# 查找当目录，以.log结尾的普通文件
find . -type f -name "*.log"

# 查找当前所有目录并排序
find . -type d | sort

#   查找当前目录大于100M的文件
find . -size +100M
```

### 3. locate

`locate` ： 快速搜索某个路径，为了防止报错，使用前需要先使用 `updatedb` 命令 更新数据库

**yum -y install mlocate 如果是精简版 CentOS 系统需要安装 locate 命令**

```shell
updatedb

# 搜索etc目录下所有以sh开头的文件
locate /etc/sh

#  查找和pwd相关的所有文件
locate pwd
```

### 4. whereis

`whereis`命令是定位可执行文件、源代码文件、帮助文件在文件系统中的位置

```shell
# 将和ls文件相关的文件都查找出来
whereis ls
```

### 5. which

`which`命令的作用是在 PATH 变量指定的路径中，搜索某个系统命令的位置，并且返回第一个搜索结果。

```shell
# 查找pwd命令所在路径
which pwd

# 查找path中java的路径
which java
```

## 六、 su、 sudo

### 1. su

`su`用于用户之间的切换。但是切换前的用户依然保持登录状态。

如果是 root 向普通或虚拟用户切换不需要密码，反之普通用户切换到其它任何用户都需要密码验证

```shell
# 切换到test用户，但是路径还是/root目录
su test:

# 切换到test用户，路径变成了/home/test
su - test :

# 切换到root用户，但是路径还是原来的路径
su :

# 切换到root用户，并且路径是/root
su - :
```

su 不足：如果某个用户需要使用 root 权限、则必须要把 root 密码告诉此用户。

退出返回之前的用户：`exit`

### 2. sudo

`sudo`是为所有想使用 root 权限的普通用户设计的。

可以让普通用户具有临时使用 root 权限的权利。只需输入自己账户的密码即可

**进入 sudo 配置文件命令**

```shell
vi /etc/sudoer或者visudo
```

```shell
# 允许 hadoop 用户以 root身份执行各种应用命令，需要输入hadoop用户的密码。
hadoop  ALL=(ALL)   ALL


# 只允许 hadoop 用户以root身份执行ls 、cat命令，并且执行时候免输入密码。
hadoop  ALL=NOPASSWD:  /bin/ls, /bin/cat
```

## 七、 系统服务

```shell
# 查看iptables服务的状态
service iptables status

# 开启iptables服务
service iptables start

# 停止iptables服务
service iptables stop

# 重启iptables服务
service iptables restart

# 关闭iptables服务的开机自启动
chkconfig iptables off

# 开启iptables服务的开机自启动
chkconfig iptables on
```

## 八、 其他命令

### 1. 查看当前目录 pwd

查看当前目录：`pwd`

### 2. 查看进程：ps -ef

命令：`ps -ef` 查看所有正在运行的进程

### 3. 结束进程：kill

命令：`kill pid` 或者 `kill -9 pid`(强制杀死进程)

pid:进程号

### 4. 网络通信命令：

#### 1. ifconfig：查看网卡信息

命令：`ifconfig 或 ifconfig | more`

#### 2. ping：查看与某台机器的连接情况

命令：`ping ip`

#### 3. netstat -an：查看当前系统端口

命令：`netstat -an`

#### 4. 搜索指定端口

命令：`netstat -an | grep 8080`

### 5. 配置网络

命令：`setup`

### 6. 重启网络

命令：`service network restart`

### 7. 切换用户

命令：`su - 用户名`

### 8. 关闭防火墙

命令：`chkconfig iptables off`

或者：

```shell
 iptables -L;
 iptables -F;
 service iptables stop
```

### 9. 修改文件权限

命令：`chmod 777`

### 10. 清屏

命令：`ctrl + l`

### 11. vi 模式下快捷键

`esc`后:

保存并退出快捷键：`shift+z+z`

光标跳到最后一行快捷键：`shift+g`

删除一行：`dd`

复制一行内容：`y+y`

粘贴复制的内容：`p`
