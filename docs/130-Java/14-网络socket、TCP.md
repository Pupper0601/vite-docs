---
title: 十四、网络 socket、TCP
categories:
  - 学习笔记
tags:
  - Java基础
abbrlink: 664c2ad
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-122.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#7d354f'
---

## 一、 网络的相关概念

- 网络通信： 就是将数据通过网络从一台设备传输到另一台设备；
- 网络： 多台设备通过一定物理设备连接起来构成了网络；
  - 局域网、广域网（互联网）；

### 1. ip

:::tip

- 每台计算机在网络中的唯一身份标识；
- ipconfig 命令可以查看 ip 地址；
  - IPv4：点分十进制 xxx.xxx.xxx.xxx ， 如 192.168.199.198 - 每个十进制的范围 0 ~ 255；
    :::

### 2.域名、端口

- 域名： 解决 ip 难记的问题，通过 http 协议，映射到 ip 地址上
- 端口： 程序在单个设备中的唯一入口；
  - 范围： 0 ~ 65535 ， 其中 1~1024 已经被占用，不建议使用

### 3. 通讯协议

TCP/IP ： 中文译名为传输控制协议/因特网互联协议,又叫网络通讯协议
这个协议由网络层的 IP 协议和传输层的 TCP 协议组成的。

:::tip
TCP 协议：

1. 使用 TCP 协议前，需要先简历 TCP 连接，形成传输数据通道；
1. 传输前，采用“三次握手” 方式，是可靠的；
1. TCP 协议进行通信的两个应用进程： 客户端、服务端；
1. 在连接中可进行大量数据的传输；
1. 传输完毕，需释放已建立的连接，效率低；
   :::

:::tip
UDP 协议：

1. 将数据、源、目的封装成数据包，不需要建立连接；
1. 每个数据报的大小限制在 64K 内；
1. 因无需连接，所以不可靠；
1. 发送数据结束时，无需释放资源，速度快
   :::

### 4.netstat 指令

:::tip

- netstat -an ： 可以查看当前主机网络情况，包括端口监听情况和网络连接情况
- netstat -an | more ： 可以分页显示
- 需要在 dos 控制台下 执行
- Listenning 表示某个端口在监听
- 细节： 客户端 和 服务端建立 socket 连接后，客户端也是有一个随机的端口
  :::

## 二、InetAddress 对象

:::tip
通过 InetAddress 对象，可以获取 主机名、域名、IP
:::

```java
// InetAddress 应用
public class API_ {
    public static void main(String[] args) throws UnknownHostException {
        // 获取本机的 InetAddress 对象
        InetAddress localHost = InetAddress.getLocalHost();
        System.out.println(localHost);

        // 根据指定主机名,获取 InetAddress 对象
        InetAddress name = InetAddress.getByName("localhost");
        System.out.println(name);

        // 根据 域名 返回 InetAddress 对象
        InetAddress name1 = InetAddress.getByName("www.baidu.com");
        System.out.println("根据域名获取 = "+name1);

        // 根据 InetAddress 对象,获取主机地址
        String add = name1.getHostAddress();
        System.out.println("name1 的知己地址 = "+add);

        // 根据 InetAddress 对象, 获取主机名
        String hostName = name1.getHostName();
        System.out.println("name1 的域名 = "+hostName);
    }
}

// 运行结果
localhost/127.0.0.1
localhost/127.0.0.1
www.baidu.com/112.80.248.75
112.80.248.75
www.baidu.com
```

## 三、Socket（套接字）

:::tip
socket 介绍：

- 通信的两端都要有 Socket，是两台机器间通信的端点；
- 网络通信其实就是 Socket 间的通信；
- Socket 允许程序把网络连接当成一个流，数据在两个 socket 间通过 IO 传输；
- 一般主动发起通信的应用程序属于客户端，等待通信请求的为服务端；
  :::

:::danger

- 服务器监听端口：
  - ServerSocket serverSocket = new ServerSocket(9999);
- 服务器连接阻塞：
  - Socket socket = serverSocket.accept();
- 客户端连接服务器：
  - Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
- **输入流、输出流 结束标识符：**
  - **socket.shutdownInput();**
  - **socket.shutdownOutput()**;
- **字符流通信时需要手动刷新**
  - **bw.flush()**;
    :::

### 1. 字节流 socket 通信

```java
// 客户端代码
public class SocketClient1 {
    public static void main(String[] args) throws IOException {
        // 连接 服务器 的 9999 端口
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
        System.out.println("客户端 socket= "+socket);

        // 输出 通过 socket 向服务器传输数据
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write("hello,server".getBytes(StandardCharsets.UTF_8));
        socket.shutdownOutput();    // 输出结束标记

        // 输入 通过 socket 读取服务器传输的数据
        InputStream inputStream = socket.getInputStream();
        byte[] bytes = new byte[1024];
        int data = 0;
        while ((data = inputStream.read(bytes)) != -1){
            System.out.println(new String(bytes, 0, data));
        }
        socket.shutdownInput();

        // 关闭 输出流及 socket
        outputStream.close();
        inputStream.close();
        socket.close();
    }
}
```

```java
// 服务端代码
public class SocketServer1 {
    public static void main(String[] args) throws IOException {
        // 监听本机的 9999 端口,等待客户连接
        ServerSocket serverSocket = new ServerSocket(9999);

        // 如果有客户端连接,则返回一个 socket对象,否则就阻塞,等待连接
        Socket socket = serverSocket.accept();
        System.out.println("服务器 socket= "+socket);  // 连接成功后打印

        // 输入 通过 socket 读取客户端传入的数据
        InputStream inputStream = socket.getInputStream();
        byte[] bytes = new byte[1024];
        int data = 0;
        while ((data = inputStream.read(bytes)) != -1){
            System.out.println(new String(bytes,0,data));
        }
        socket.shutdownInput(); // 输入结束标记

        // 输出 通过 socket 给客户端传输数据
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write("hello,client".getBytes(StandardCharsets.UTF_8));
        socket.shutdownOutput();    // 输出结束标记

        // 关闭 流 和 socket
        inputStream.close();
        outputStream.close();
        socket.close();
        serverSocket.close();
    }
}
```

### 2. 字符流 socket 通信

```java
// 客户端
public class SocketClient2 {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
        System.out.println("服务器已连接");

        // 使用字符流
        OutputStream out = socket.getOutputStream();
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(out));
        bw.write("hello,server");
        // 如果使用字符流,需要手动刷新,否则不会写入通道
        bw.flush();
        socket.shutdownOutput();

        BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        String data;
        while ((data = br.readLine()) != null){
            System.out.println(data);
        }
        socket.shutdownInput();

        br.close();
        bw.close();
        socket.close();
    }
}
```

```java
// 服务端
public class SocketServer2 {
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(9999);
        System.out.println("服务器启动~");
        Socket socket = server.accept();
        System.out.println("客户端已连接");

        BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        String data;
        while ((data = br.readLine()) != null){
            System.out.println(data);
        }
        socket.shutdownInput();

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        bw.write("hello,client");
        // 如果使用字符流,需要手动刷新,否则不会写入通道
        bw.flush();
        socket.shutdownOutput();

        br.close();
        bw.close();
        socket.close();
        server.close();
    }
}
```

### 3.socket 文件传输

```java
// 客户端
public class Client1 {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket(InetAddress.getLocalHost(), 8888);

        String filePath = new File("").getAbsolutePath() + "/src/com/socket_/通友全球聊-电子版权证书.png";
        FileInputStream fis = new FileInputStream(filePath);
        OutputStream os = socket.getOutputStream();
        byte[] bytes = new byte[1024];
        int data;
        while ((data = fis.read(bytes))!= -1){
            os.write(bytes, 0, data);
        }
        socket.shutdownOutput();

        InputStream is = socket.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));

        String da;
        while ((da = br.readLine()) != null){
            System.out.print(da);
        }
```

```java
// 服务端
public class Server1 {
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(8888);
        Socket socket = server.accept();

        String filePath = new File("").getAbsolutePath() + "/src/1.png";
        FileOutputStream fos = new FileOutputStream(filePath);

        InputStream is = socket.getInputStream();
        byte[] bytes = new byte[1024];
        int data;
        while ((data = is.read(bytes)) != -1){
            fos.write(bytes,0,data);
        }
        socket.shutdownInput();

        OutputStream os = socket.getOutputStream();
        os.write("收到图片".getBytes(StandardCharsets.UTF_8));

        is.close();
        os.close();
        socket.close();
        server.close();
    }
}
```

```java
// 工具类 --- 未使用
public class StreamUtils {
    public static byte[] streamToByteArray(InputStream is) throws  Exception{
        ByteArrayOutputStream bos = new ByteArrayOutputStream();//创建输出流对象
        byte []b = new byte[1024]; //字节数组——读取输入流
        int len;
        while ((len = is.read(b))!= -1){
            bos.write(b,0,len); //把读取到的数据写入到字节数组流
        }
        byte[] array = bos.toByteArray(); //将bos转为字节数组
        bos.close();
        return array;
    }

    public  static  String streamToString(InputStream is) throws Exception{
        //将输入流数据转换为String
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuffer buffer = new StringBuffer();
        String line = null;
        while ((line = reader.readLine())!=null){
            buffer.append(line + "\r\n");
        }
        return buffer.toString();
    }
}
```

## 四、UDP 协议

:::note
UDP 说明：

1. 没有明确的服务端 和 客户端 之分，演变成数据的发送端和接收端；
1. 发送和接收数据都是通过 DatagramSocket 对象 完成；
1. 发送 和 接收 数据时，需要对 DatagramPacket 对象 进行拆装包；
   1. UDP 协议的数据包最大为 64K；
1. DatagramSocket 可以指定在某个端口接收数据；
   :::

![](https://img.pupper.cn/img/1654771608546-f208d85c-4e5e-4e24-aac3-331a3a0e1146.png)

```java
// 设备 1
public class UDPReceiver1 {
    public static void main(String[] args) throws IOException {
        // 创建 DatagramSocket 对象,监听 9999 端口, 准备接收数据
        DatagramSocket socket= new DatagramSocket(9999);

        // 构建 DatagramPacket 对象,准备接收数据
        byte[] bytes = new byte[1024];
        DatagramPacket packet = new DatagramPacket(bytes, bytes.length);

        // 接收 数据,如果没有数据传输,则阻塞等待
        socket.receive(packet);

        // 对接收的数据拆包,显示
        int length = packet.getLength();    // 接收数据的实际长度
        byte[] data = packet.getData();     // 接收数据的 byte 数据
        String s = new String(data, 0, length);
        System.out.println(s);

        // 装包,发送数据
        byte[] bytes1 = "ok,莫得问题".getBytes(StandardCharsets.UTF_8);
        DatagramPacket packet1 = new DatagramPacket(bytes1, bytes1.length, InetAddress.getLocalHost(), 8888);
        socket.send(packet1);

        socket.close();
    }
}
```

```java
// 设备 2
public class UDPReceiver2 {
    public static void main(String[] args) throws IOException {
        // 创建 DatagramSocket 对象,监听 8888 端口, 准备接收数据
        DatagramSocket socket= new DatagramSocket(8888);

        // 构建 DatagramPacket 对象,准备接收数据
        byte[] bytes = "hello, 晚上一起吃火锅啊".getBytes(StandardCharsets.UTF_8);
        DatagramPacket packet = new DatagramPacket(bytes, bytes.length, InetAddress.getLocalHost(),9999);

        // 接收 数据,如果没有数据传输,则阻塞等待
        socket.send(packet);

        // 构建 DatagramPacket 对象,准备接收数据
        byte[] bytes1 = new byte[1024];
        DatagramPacket packet1 = new DatagramPacket(bytes1, bytes1.length);
        // 接收数据
        socket.receive(packet1);

        // 拆包,显示数据
        int length = packet1.getLength();
        byte[] data = packet1.getData();
        System.out.println(new String(data, 0,length));

        socket.close();
    }
}
```
