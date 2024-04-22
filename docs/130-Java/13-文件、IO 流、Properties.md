---
title: 十三、文件、IO 流、Properties
categories:
  - 学习笔记
tags:
  - Java基础
abbrlink: 93c79393
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-46.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#a98e57'
---

## 一、文件

:::tip
文件流：

- 输入流： 是指 数据从 文件 到 内存 的路径；
- 输出流： 是指 数据从 内存 到 文件 的路径；
  :::

### 1. 创建文件

| 命令                                  | 说明                        |
| ------------------------------------- | --------------------------- |
| new File(String pathname)             | 根据路径构建 一个 File 对象 |
| new File(File parent, String child)   | 根据父目录文件 + 子路径构建 |
| new File(String parent, String child) | 根据父目录 + 子路径构建     |
| createNewFile                         | 创建新文件                  |

```java
// 文件创建 - 案例
public class File01 {
    public static void main(String[] args) {

    }

    @Test
    public void createFile01() throws IOException {
        // 获取 当前文件路径
        String filePath = getClass().getResource("").getPath();
        System.out.println(filePath);

        File file1 = new File(filePath + "test1.txt");
        file1.createNewFile();
    }

    @Test
    public void createFile02() throws IOException {
        // 获取 当前文件路径
        String filePath = getClass().getResource("").getPath();
        System.out.println(filePath);

        String fileName = "test2.txt";
        File file1 = new File(filePath,fileName);
        file1.createNewFile();
    }

    @Test
    public void createFile03() throws IOException {
        // 获取 当前文件路径
        String filePath = getClass().getResource("").getPath();
        System.out.println(filePath);

        String fileName = "test2.txt";
        File file1 = new File(filePath,fileName);
        file1.createNewFile();
    }
}
```

文件常用方法：
| getName | 获取文件名称 |
|-----------------|----------------------|
| getAbsolutePath | 获取文件绝对路径 |
| getParent | 获取文件父目录 |
| length | 获取文件大小（字节） |
| exists | 判断文件是否存在 |
| isFile | 判断是否为文件 |
| isDirectory | 判断是否为目录 |

### 2. 目录操作 和 文件删除

| 命令   | 说明             |
| ------ | ---------------- |
| mkdir  | 创建一级目录     |
| mkdirs | 创建多级目录     |
| delete | 删除空目录或文件 |

:::danger
Java 中，将目录看做是一个特殊的文件，因此，文件中的方法在目录中也实用。
:::

```java
// 目录创建及删除 - 案例
public class Dir01 {
    public static void main(String[] args) {

    }

    @Test
    public void m1() throws IOException {
        String filePath = getClass().getResource("").getFile();
        File file = new File(filePath + "test2.txt");
        // 创建文件
        file.createNewFile();
        System.out.println("创建文件成功");

        // 删除文件
        if (file.exists()){
            file.delete();
            System.out.println("删除成功");
        }
    }

    @Test
    public void m2() throws IOException {
        String filePath = getClass().getResource("").getFile();
        File file = new File(filePath + "test2");

        // 判断目录是否存在,存在就删除,不存在就创建
        if (!(file.exists())){
            file.mkdir();
            System.out.println("创建目录");
        }else {
            file.delete();
            System.out.println("删除目录");
        }
    }

    @Test
    public void m3() throws IOException {
        String filePath = getClass().getResource("").getFile();
        System.out.println(filePath);
        File file = new File(filePath + "test1\\test2\\test3");

        // 判断目录是否存在,存在就删除,不存在就创建
        if (!(file.exists())){
            file.mkdirs();
            System.out.println("创建目录");
        }else {
            file.delete();
            System.out.println("删除目录");
        }
    }
}
```

## 二、IO 流

:::tip
IO （Input 和 Output 的缩写）流： 用于处理数据传输，如读、写文件，网络通信等；

- Java 程序中，对于数据的输入和输出操作以“流（stream）”的方式进行；
  :::

:::info
流的分类：

- 按操作数据的单位不同分为： 字节流（8 bit，二进制文件），字符流（文本文件）；
- 按数据的流向不同分为： 输入流、输出流；
- 按流的角色不用分为： 节点流、处理流或包装流
  :::

#### 节点流

| 分类       | 字节输入流               | 字节输出流                | 字符输入流          | 字符输出流          |
| ---------- | ------------------------ | ------------------------- | ------------------- | ------------------- |
| 抽象基类   | _InputStream_            | _OutputStream_            | _Reader_            | _Writer_            |
| 访问文件   | **FileInputStream**      | **FileOutputStream**      | **FileReader**      | **FileWriter**      |
| 访问数组   | **ByteArrayInputStream** | **ByteArrayOutputStream** | **CharArrayReader** | **CharArrayWriter** |
| 访问管道   | **PipedInputStream**     | **PipedOutputStream**     | **PipedReader**     | **PipedWriter**     |
| 访问字符串 |                          |                           | **StringReader**    | **StringWriter**    |

#### 处理流

| 分类       | 字节输入流          | 字节输出流           | 字符输入流        | 字符输出流         |
| ---------- | ------------------- | -------------------- | ----------------- | ------------------ |
| 缓冲流     | BufferedInputStream | BufferedOutputStream | BufferedReader    | BufferedWriter     |
| 转换流     |                     |                      | InputStreamReader | OutputStreamWriter |
| 对象流     | ObjectInputStream   | ObjectOutputStream   |                   |                    |
| 抽象基类   | _FilterInputStream_ | _FilterOutputStream_ | _FilterReader_    | _FilterWriter_     |
| 打印流     |                     | PrintStream          |                   | PrintWriter        |
| 推回输入流 | PushbackInputStream |                      | PushbackReader    |                    |
| 特殊刘     | DataInputStream     | DataOutputStream     |                   |                    |

- **斜体 + 下划线为 抽象类，无法创建实例， 红色表示节点流，必须直接与制定的物理节点关联；**

### 1. 字节流

:::note

- 读取 或 写入 文件时，返回 -1 ，表示已经读取完毕；
  :::

#### 1. 输入流

```java
// 字节流 输入（读取文件）
public class InputStream01 {
    public static void main(String[] args) {

    }

    /**
     * 1. 单个字节读取
     * 2. 使用字节流读取文件中的中文内容,会造成乱码
     */
    @Test
    public void fileInputStream1() throws IOException {
        String filePath = Objects.requireNonNull(getClass().getResource("")).getPath();
        System.out.println(filePath);

        FileInputStream fileInputStream = new FileInputStream(filePath + "hello.txt");

        int data = 0;
        // 返回 -1,表示读取完毕
        while ((data = fileInputStream.read()) != -1){
            System.out.println((char) data);
        }
        // 读取完成后需要关闭文件流, 释放资源
        fileInputStream.close();
    }

    /**
     * 根据字符数组读取
     */
    @Test
    public void fileInputStream2() throws IOException {
        String filePath = Objects.requireNonNull(getClass().getResource("")).getPath();
        System.out.println(filePath);

        FileInputStream fileInputStream = new FileInputStream(filePath + "hello.txt");

        int readLen;
        // 一次读取 8 个字节
        byte[] buf = new byte[8];
        // 返回 -1,表示读取完毕
        while ((readLen = fileInputStream.read(buf)) != -1){
            String s = new String(buf, 0, readLen);
            System.out.println(s);
        }
        // 读取完成后需要关闭文件流, 释放资源
        fileInputStream.close();
    }
}
```

#### 2. 输出流

:::note

- new FileOutputStream(filePath) : 这种创建方式会 **覆盖 **之前的内容；
- new FileOutputStream(filePath, true) : 这种创建方式不会覆盖之前的内容，会 **追加 **在最后方；
- str.getBytes : 字符串 ---> 字节数组
- 字节数组部分写入, 从 off 开始, 向右偏移 len 个字符,
  - 如果偏移量过多，会报下标越界错误
    :::

```java
// 字节流 输出（写入文件）
public class OutputStream01 {
    public static void main(String[] args) {

    }

    /**
     * 写入文件
     */
    @Test
    public void fileOutput() throws IOException {
        // 获取文件路径
        String filePath = Objects.requireNonNull(getClass().getResource("")).getPath();
        String fileName = "test1.txt";
        File file = new File(filePath + fileName);

        // 判断文件是否存在
        if (!(file.exists())){
            if(file.createNewFile()) {
                System.out.println("创建文件成功");
            }else {
                System.out.println("创建失败");
            }
        }

        OutputStream outputStream = new FileOutputStream(filePath + fileName);
        String s = "hello, Jack chen";

        // 单个字节写入文件
        char[] n = s.toCharArray();
        for (char c : n) {
            outputStream.write(c);
        }

        // 字节数组写入, str.getBytes 字符串 转 字节数组
        outputStream.write(s.getBytes());

        // 字节数组部分写入, 从 off 开始, 向右偏移 len 个字符
        outputStream.write(s.getBytes(), 4, s.length()-5);

        // 退出文件,释放资源
        outputStream.close();
    }
}
```

```java
// 文件 拷贝 - 案例
public class FileCopy1 {
    public static void main(String[] args) throws IOException, InterruptedException {
        // 获取当前项目路径
        File af = new File("").getAbsoluteFile();
        // 拼接文件 和 文件夹 路径
        String folderPath = af + "/src/com/file_/demo";
        String filePath1 = af + "/src/com/file_/1.jpg";
        String filePath2 = af + "/src/com/file_/demo/demo.jpg";

        // 创建文件 和 文件夹对象
        File folder = new File(folderPath);
        File file = new File(filePath2);

        // 创建文件夹
        if (folder.exists()){
            System.out.println("文件夹已存在"+ folder);
        }else {
            if (folder.mkdir()){
                System.out.println("创建文件夹成功");
            }
        }

        // 新建图片文件
        file.createNewFile();

        byte[] b = new byte[1024];
        int data;
        // 创建输入流 和 输出流
        FileInputStream fileInputStream = new FileInputStream(filePath1);
        FileOutputStream fileOutputStream = new FileOutputStream(file, true);
        while ((data = fileInputStream.read(b)) != -1){
            fileOutputStream.write(b, 0, data);
        }

        // 关闭输入流和输出流
        fileInputStream.close();
        fileOutputStream.close();
    }
}
```

### 2. 字符流

#### 1. 输入流

:::note
FileReader 相关方法：

- new FileReader(File/String)
- read ： 每次读取单个字符，返回该字符，读完文件返回 -1；
- read（char[]）： 批量读取多个字符到数组，返回读取到的字符数，读完文件返回 -1；

————————————————————————————————————————————————

- new String(char[])： 将 char[] 转换成 String；
- new String(char[], off, len) ：将 char[] 的指定部分转换成 String；
  :::

```java
// 字符流 输入（读取文件）
public class FileReader1 {
    public static void main(String[] args) {

    }

    public void read1() throws IOException {
        // 获取文件路径
        String absolutePath = new File("").getAbsolutePath();
        System.out.println(absolutePath);

        // 创建文件对象
        FileReader fileReader = new FileReader(absolutePath + "/src/com/io_/hello.txt");
        int data;

        // 读取文件
        while ((data = fileReader.read()) != -1) {
            System.out.print((char) data);
        }

        // 关闭文件
        fileReader.close();
    }

    @Test
    public void read2() throws IOException {
        // 获取文件路径
        String absolutePath = new File("").getAbsolutePath();
        System.out.println(absolutePath);

        // 创建文件对象
        FileReader fileReader = new FileReader(absolutePath + "/src/com/io_/hello.txt");
        int data = 0;
        char[] c = new char[1024];

        // 读取文件
        while ((data = fileReader.read(c)) != -1) {
            System.out.print(new String(c, 0, data));
        }

        // 关闭文件
        fileReader.close();
    }
}
```

#### 2.输出流

:::note
FileWriter 相关方法：

- new FileWriter(File/String) : 覆盖模式
- new FileWriter(File/String, true)：追加模式
- write(int)：写入单个字符
- write(char[])：写入指定数组
- write(char[],off, len)：写入指定数组的指定部分
- write(string)： 写入整个字符串
- write(String,off,len)：写入字符串的指定部分

————————————————————————————————————————————————

- toCharArray：将 String 转为 char[]
- FileWriter 使用后，必须要关闭（close）或 刷新（flush），否则写入不到指定文件
  :::

```java
public class FileWriter1 {
    public static void main(String[] args) {

    }

    /**
     * 从一个文件中读取,写入另一个文件
     */
    @Test
    public void writer1() throws IOException {
        // 获取文件路径
        String absolutePath = new File("").getAbsolutePath();
        System.out.println(absolutePath);

        // 创建文件对象
        File demo1 = new File(absolutePath + "/src/com/io_/demo1.txt");
        if (!(demo1.exists())){
            if (demo1.createNewFile()){
                System.out.println("文件创建成功");
            }
        }

        FileReader fileReader = new FileReader(absolutePath + "/src/com/io_/hello.txt");
        FileWriter w1 = new FileWriter(absolutePath + "/src/com/io_/demo1.txt", true);
        int data = 0;
        char[] c = new char[1024];

        // 读取文件
        while ((data = fileReader.read(c)) != -1) {
            w1.write(new String(c, 0, data));
        }

        // 关闭文件
        fileReader.close();
        w1.close();
    }
}
```

### 3. 处理流

:::tip

- 节点流： 从一个特定的数据源读写数据；
- 处理流（也叫包装流）： “连接” 在已经存在的流之上，为程序提供更为强大的读写能力；
  :::
  :::note
  节点流 和 处理流 的区别：

- 节点流是底层流，直接跟数据源相接；
- 处理流 包装了节点流，既可以消除不用节点流的实现差异，也可以提供更方便的方法来完成输入输出
- 处理流 对 节点流进行包装，使用了修饰器设计模式，不会直接与数据相连；

————————————————————————————————————————————————
处理流的主要功能：

- 性能的提高：主要以增加缓冲的方式来提高输入输出的效率；
- 操作的便捷： 处理流可能提供了一系列便捷的方法来一次输入输出大批量的数据，使用更加灵活方便；
- BufferedReader 和 BufferedWriter
- BufferedInputStream 和 BufferedOutputStream
- 读取完成后 返回 null；
  :::

#### 1.字符 处理流

```java
public class Reader1 {
    public static void main(String[] args) {

    }
    @Test
    public void read1() throws IOException {
        // 获取文件路径
        String absolutePath = new File("").getAbsolutePath();
        System.out.println(absolutePath);

        // 创建文件对象
        FileReader fileReader = new FileReader(absolutePath + "/src/com/io_/hello.txt");
        BufferedReader br = new BufferedReader(fileReader);
        String data;

        // 读取文件   br.readLine() 按行读取
        while ((data = br.readLine()) != null) {
            System.out.println(data);
        }

        // 关闭文件, 只需关闭处理流即可
        br.close();
    }
}
```

```java
public class Writer1 {
    public static void main(String[] args) {

    }

    /**
     * 从一个文件中读取,写入另一个文件
     */
    @Test
    public void writer1() throws IOException {
        // 获取文件路径
        String absolutePath = new File("").getAbsolutePath();
        System.out.println(absolutePath);

        // 创建文件对象
        File demo1 = new File(absolutePath + "/src/com/io_/demo1.txt");
        if (!(demo1.exists())){
            if (demo1.createNewFile()){
                System.out.println("文件创建成功");
            }
        }

        FileReader fileReader = new FileReader(absolutePath + "/src/com/io_/hello.txt");
        FileWriter w1 = new FileWriter(absolutePath + "/src/com/io_/demo1.txt", true);
        BufferedReader r = new BufferedReader(fileReader);
        BufferedWriter w = new BufferedWriter(w1);
        String data;

        // 读取文件
        while ((data = r.readLine()) != null) {
            w.write(data);
            // 换行
            w.newLine();
        }

        // 关闭文件
        r.close();
        w.close();
    }
}
```

#### 2.字节 处理流

```java
public class BufferedReaderWriter1 {
    public static void main(String[] args) {

    }

    @Test
    public void writer1() throws IOException {
        // 获取文件路径
        String absolutePath = new File("").getAbsolutePath();
        System.out.println(absolutePath);

        // 创建文件对象
        File demo1 = new File(absolutePath + "/src/com/io_/demo.mp4");
        if (!(demo1.exists())){
            if (demo1.createNewFile()){
                System.out.println("文件创建成功");
            }
        }

        FileInputStream fileInput = new FileInputStream(absolutePath + "/src/com/io_/iShot_2022-06-06_15.39.50.mp4");
        FileOutputStream fileOutput = new FileOutputStream(absolutePath + "/src/com/io_/demo.mp4", true);
        BufferedInputStream i = new BufferedInputStream(fileInput);
        BufferedOutputStream o = new BufferedOutputStream(fileOutput);

        byte[] b = new byte[1024];
        int data = 0;

        // 读取文件
        while ((data = i.read(b)) != -1) {
            o.write(b, 0, data);
        }

        // 关闭文件
        o.close();
        i.close();
    }
}
```

#### 3. 对象 处理流

:::tip
序列化 和 反序列化：

- 序列化： 在保存数据时，同时保存数据的值 和 数据的类型；
  - ObjectOutputStream （写入文件）
- 反序列化： 在回复数据时，同时回复数据的值 和 类型；
  - ObjectInputStream （读取文件）
- 需要让某个对象支持序列化机制，则需要让其类是可序列化的，因此必须实现以下接口之一：

  - **Serializable （标记接口，推荐使用）**
  - Externalizable（该接口有方法需要实现，不推荐使用）
    :::
    :::danger
    注意事项：

- 序列化 与 反序列化 的顺序必须一致；
- 要实现 序列化 与 反序列化对象， 类 必须实现 Serializable 接口
- 序列化 的类中建议添加 SerialVersionUID，为了提高版本的兼容性；
- 序列化对象时，默认将里面所有属性都进行序列化，但除了 static 或 transient 修饰的成员
- 序列化对象时， 要求里面的属性的类型也需要实现序列化接口；
- 序列化具备可继承性，也就是如果某个类实现了序列化，则它所有的子类也已经默认实现了序列化；
  :::

```java
public class ObjectInput1 {
    public static void main(String[] args) {

    }

    // 序列化
    @Test
    public void objectOutputStream1() throws IOException {
        // 获取文件路径
        String filePath = new File("").getAbsolutePath() + "/src/com/io_/demo1.json";
        new File(filePath).createNewFile();     // 创建文件

        // 创建对象序列化
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath));

        // 基本数据类型的包装类 实现了 Serializable
        oos.writeInt(100);
        oos.writeBoolean(true);
        oos.writeChar('a');
        oos.writeUTF("李焕英");    // 字符串

        Dog dog = new Dog("旺财", 10);
        oos.writeObject(dog);

        oos.close();
    }

    // 反序列化
    @Test
    public void objectInputStream1() throws IOException, ClassNotFoundException {
        // 获取文件路径
        String filePath = new File("").getAbsolutePath() + "/src/com/io_/demo1.json";

        // 创建对象序列化
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath));

        // 反序列化
        // 读取的顺序 必须 和 序列化的顺序一致
        System.out.println(ois.readInt());
        System.out.println(ois.readBoolean());
        System.out.println(ois.readChar());
        System.out.println(ois.readUTF());
        System.out.println(ois.readObject());

        ois.close();
    }
}


class Dog implements Serializable{
    private String name;
    private int age;

    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

### 4. 标准输入、输出流

|            |          | 编译类型    | 运行类型            | 默认设备 |
| ---------- | -------- | ----------- | ------------------- | -------- |
| System.in  | 标准输入 | InputStream | BufferedInputStream | 键盘     |
| System.out | 标准输出 | PrintStream | PrintStream         | 显示器   |

### 5.转换流

:::tip

- InputStreamReader：Reader 的子类，可以将 InputStream（字节流）包装成 Reader（字符流）；
- OutputStreamWriter：Writer 的子类，实现将 OutputStream（字节流）包装成 Writer（字节流）；
- 当处理纯文本数据时，如果使用字符流效率更高，并且可以有效解决中文问题，所以建议将字节流转换成字符流；
- 可在使用时置顶编码格式（如：utf-8，gdk，gb2312 等）
  :::

```java
public class InputStreamReader1 {

    @Test
    public void transition1() throws IOException {
        String filePath = new File("").getAbsolutePath() + "/src/com/io_/hello.txt";
        FileInputStream fis = new FileInputStream(filePath);

        // 将字节流 转为 字符流,编码为 utf-8
        InputStreamReader isr = new InputStreamReader(fis, "UTF-8");

        // 将字符流 转为 BufferedReader
        BufferedReader br = new BufferedReader(isr);
        String s;
        while ((s = br.readLine()) != null){
            System.out.println(s);
        }

        br.close();
    }
}
```

```java
public class OutputStreamWriter1 {

    @Test
    public void transition1() throws IOException {
        String filePath = new File("").getAbsolutePath() + "/src/com/io_/hello.txt";

        FileOutputStream fos = new FileOutputStream(filePath);

        // 将字符流 转为 字节流,编码为 utf-8
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos, StandardCharsets.UTF_8));

        bw.write("你好,李焕英");

        // 将字符流 转为 BufferedReader
        bw.close();
    }
}
```

### 6.打印流

:::tip

- PrintStream ： 字节打印流，默认输出为 显示器；
- PrintWriter ： 字符打印流，
  :::

```java
public class PrintStream1 {
    public static void main(String[] args) {
    }

    @Test
    public void print1() throws IOException {

        PrintStream out = System.out;
        out.print("你好,你不好");

        // 因为 print 底层使用的是 write,所以可以直接调用 write 进行打印/输出
        out.write("天王盖地虎".getBytes(StandardCharsets.UTF_8));

        // 创建文件
        String filePath = new File("").getAbsolutePath()+"/src/com/io_/demo2.txt";
        new File(filePath).createNewFile();

        // 修改打印 设备, 到文件 demo2.txt
        System.setOut(new PrintStream(filePath));
        // 不会打印到控制台, 会保存到文件
        System.out.println("宝塔管水貂");

        out.close();
    }
}
```

```java
public class PrintWriter1 {
    public static void main(String[] args) {
    }

    @Test
    public void print1() throws IOException {

        // PrintWriter writer = new PrintWriter(System.out);
        // writer.print("你好,你不好");

        // 创建文件
        String filePath = new File("").getAbsolutePath()+"/src/com/io_/demo3.txt";
        File file = new File(filePath);
        if (!(file.exists())) {
            if (new File(filePath).createNewFile()){
                System.out.println("文件创建成功");
            }
        }else{
            System.out.println("文件已存在");
        }
        // 修改打印 设备, 到文件 demo3.txt
        PrintWriter printWriter = new PrintWriter(filePath);

        // 不会打印到控制台, 会保存到文件
        printWriter.print("宝塔管水貂");

        printWriter.close();
    }
}
```

## 三、Properties 类

:::tip

- Properties 类 ： 专门用于读写配置文件的集合类；
- 配置文件格式：键 = 值
  - 键值对不需要有 空格，值不需要用引号，默认类型时 String；
    :::
    Properties 常用方法：

| load                      | 加载配置文件的键值对到 Properties 类                            |
| ------------------------- | --------------------------------------------------------------- |
| list                      | 将数据显示到指定设备                                            |
| getProperty（key）        | 根据键获取值                                                    |
| setProperty（key，value） | 设置键值对到 Properties 对象                                    |
| store                     | 将 Properties 中的键值对存储到配置文件（中文以 unicode 码存储） |

```java
public class Properties1 {
    public static void main(String[] args) {

    }
    @Test
    public void proper () throws IOException {
        // 获取文件路径
        String filePath = new File("").getAbsolutePath()+"/src/com/properties_/mysql.properties";
        File file = new File(filePath);

        // 判断文件是否存在,如果不存在就创建文件
        if (!(file.exists())){
            if(file.createNewFile()){
                System.out.println("文件创建成功" + filePath);
            }
        }else {
            System.out.println("文件已存在" + filePath);
        }

        // 创建 Properties 对象
        Properties properties = new Properties();

        // 加载指定配置文件
        properties.load(new FileReader(file));

        // 以 k-v 的形式显示所有的内容
        properties.list(System.out);

        // 根据 k 获取值
        String user = properties.getProperty("user");
        System.out.println(user);

        // 修改 文件
        properties.setProperty("user", "Pupper");
        properties.list(System.out);

        // 添加 内容
        properties.setProperty("server", "测试服务器");
        properties.list(System.out);

        // 删除内容
        properties.remove("ip");
        properties.list(System.out);

        // 保存 配置 文件
        properties.store(new FileOutputStream(
                new File("").getAbsolutePath()+"/src/com/properties_/demo1.properties"),
                "这里是一个注释,可以为 null");
    }
}
```
