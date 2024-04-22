---
title: JavaScript - DOM 基础操作
categories:
  - 学习笔记
  - 前端基础
tags:
  - JavaScript
abbrlink: 9cb7fb70
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-277.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#0c4b52'
---

## 一、 DOM

>      web API 是浏览器 提供的一套操作 浏览器功能（BOM）和 页面元素（DOM）的 API。
>
>      DOM：处理 HTML 的标准 编程接口

### 1. 获取元素

::: note

1.  通过 `document` 查找元素，是查找整个页面所有的元素；
2.  通过 `标签元素`查找，是查找的该标签元素下的 `子元素`；

:::

#### id 获取 元素 （ `getElementById()` ）

- 获取的元素的返回值是一个对象；
- `console.dir(元素对象)` ：可以查看元素的 属性 和方法；
- 如果没有找到元素，则返回 `null`；

```HTML
<div id="time"></div>

<script type="text/javascript">
    var el = document.getElementById('time')
    console.log(el)
</script>
```

#### 标签名 获取元素 （ `getElementsByTagName()` ）

- `getElementsByTagName()` : 返回一个 元素 **对象合集**，以伪数组的形式存储；
- 如果没有找到元素，则返回一个 **空 数组**

获取页面所有的 li 标签元素：

```HTML
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>

<script type="text/javascript">
    var el = document.getElementsByTagName('li')
    console.log(el)		// [li, li, li, li, li]
</script>
```

获取 父元素中 指定 标签名 的子元素：

::: warning

1.  父元素必须是 单个对象（必须指明是哪一个元素对象）；
2.  获取的元素不包括父元素 自己；

:::

```html
<ol>
  <li>这是 ol 中的 li 元素</li>
  <li>这是 ol 中的 li 元素</li>
  <li>这是 ol 中的 li 元素</li>
  <li>这是 ol 中的 li 元素</li>
  <li>这是 ol 中的 li 元素</li>
</ol>
<ul>
  <li>这是 ul 中的 li 元素</li>
  <li>这是 ul 中的 li 元素</li>
  <li>这是 ul 中的 li 元素</li>
  <li>这是 ul 中的 li 元素</li>
  <li>这是 ul 中的 li 元素</li>
</ul>

<script type="text/javascript">
  var ol = document.getElementsByTagName('ol')

  // 必须指明是哪一个元素对象 ol[0]
  var li = ol[0].getElementsByTagName('li')
  console.log(li)
</script>
```

#### 类名 获取元素 （`getElementsByClassName`）

- 返回的是 一个 伪类集合；
- 使用时需要指定具体的一个 对象；

```html
<div class="box"></div>
<div class="box"></div>

<script type="text/javascript">
  var box = document.getElementsByClassName('box')
  console.log(box) // [div.box, div.box]
</script>
```

#### 指定选择器 获取元素 （`querySelector('选择器')`）

- 返回的是 元素中 的 **_第一个对象_**;
- 选择器参数 格式 和 css 格式一致， `.` 表示类， `#`表示 id

```HTML
<div class="box">元素1</div>
<div class="box">元素2</div>

<script type="text/javascript">
    var box = document.querySelector('.box');
    console.log(box)		// <div class="box">元素1</div>
</script>
```

`querySelectorAll('选择器')` ： 返回 选择器的 所有元素

- 返回的是 一个 伪数组

```HTML
<div class="box">元素1</div>
<div class="box">元素2</div>

<script type="text/javascript">
    var box = document.querySelectorAll('.box');
    console.log(box)		// [div.box, div.box]
</script>
```

### 2. 获取 body 和 html 元素

获取 body 元素 : 返回 body 元素对象

```js
var el_body = document.body
```

获取 html 元素 ： 返回 HTML 元素对象

```js
var el_html = document.documentElement
```

## 二、 操作元素

常见鼠标事件：

| 鼠标事件    | 触发条件         |
| ----------- | ---------------- |
| onclick     | 鼠标左键点击     |
| onmouseover | 鼠标经过触发     |
| onmouseout  | 鼠标离开触发     |
| onfocus     | 获取鼠标焦点触发 |
| onblur      | 失去鼠标焦点触发 |
| onmousemove | 鼠标移动触发     |
| onmouseup   | 鼠标弹出触发     |
| onmousedown | 鼠标按下触发     |

### 1. 事件三要素

> 事件三要素：1. 事件源，2. 绑定事件，3. 事件处理程序

- 事件源：事件触发的对象
- 绑定事件：如何触发，什么时间
- 事件处理程序： 通过 函数赋值的方式 完成

```js
<button type="button" class="mui-btn mui-btn-blue">唐伯虎</button>

<script type="text/javascript">
    var but = document.querySelector('.mui-btn');
    but.onclick = function(){
        alert('点秋香')
    }
</script>
```

### 2. 修改元素内容

| 方法                                  | 说明                                                   | 实例                    |
| ------------------------------------- | ------------------------------------------------------ | ----------------------- |
| `element.innerText`                   | 替换元素内容，不识别 HTML 标签<br />去除空格 和 换行符 | div.innerText = '你好'; |
| `element.innerHTML`<br />（w3c 推荐） | 替换元素内容，可识别 HTML 标签<br />保留空格 和 换行符 | div.innerHTML = '你好'; |

区别：

```html
<div class="demo1">
  <strong>innerText</strong>
  不识别 HTML 标签
</div>
<hr />
<div class="demo2">
  <strong>innerHTML</strong>
  识别 HTML 标签
</div>

<script>
  var div1 = document.querySelector('.demo1')
  var div2 = document.querySelector('.demo2')

  console.log(div1.innerText) // innerText 不识别 HTML 标签
  console.log(div2.innerHTML) // <strong>innerHTML</strong> 识别 HTML 标签
</script>
```

### 案例

<iframe height="400" style="width: 100%;" scrolling="no" title="innertext" src="https://animpen.com/embed/Myxuvd?tab=rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

::: details

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <button>显示当前时间</button>
    <div>123</div>

    <p></p>

    <script>
      var bt = document.querySelector('button')
      var div = document.querySelector('div')
      var date = new Date()
      bt.onclick = function () {
        div.innerText = getDate()
      }

      var p = document.querySelector('p')
      p.innerText = getDate()

      function getDate() {
        var day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        var date = new Date()
        var Y = date.getFullYear()
        var M = date.getMonth()
        var D = date.getDate()
        var d = date.getDay()
        d = day[d]
        var h = date.getHours()
        h = h < 10 ? '0' + h : h
        var m = date.getMinutes()
        m = m < 10 ? '0' + m : m
        var s = date.getSeconds()
        s = s < 10 ? '0' + s : s
        return Y + '年' + M + '月' + D + '日 ' + d + ' ' + h + ':' + m + ':' + s
      }
    </script>
  </body>
</html>
```

:::

### 3. 操作元素属性

::: tip

自定义属性命名规范：以 `data-` 开头。

html5 新增的获取自定义属性的方法（ ie 11 才支持）：

1.  `element.dataset` ，返回的是所有自定义属性的集合
2.  `element.dataset['index']`, 返回的是所有自定义属性的集合
3.  如果属性名是多个单词组成，获取属性值时需要用驼峰命名法，
    1.  如：属性名：`data-time-set` ，获取属性值时：`timeSet`

```HTML
<div data-time='20' data-ind="2"></div>

<script>
    var div = document.querySelector('div')

    console.log(div.dataset);			// {time: '20', ind: '2'}
    console.log(div.dataset.ind);		// 2
    console.log(div.dataset['time']);	// 20
</script>
```

:::

#### 获取元素属性的方法：

::: note

1.  `element.属性`，如： `console.log(div.id)`
1.  只能获得 元素的 **内置** 属性；
1.  `element.getAttribute('属性')`， 如： `console.log(div.getAttribute('id'))`
    1.  可以获得 元素的 **自定义属性**

:::

#### 设置元素属性的方法：

::: note

1.  `element.属性` ，如： `div.className = 'bg'`
    1.  主要用于设置 **内置** 属性
2.  `element.setAttribute('属性', '值')` ， 如： `div.setAttribute('index', 'bg')`
    1.  主要用于设置 **自定义** 属性

:::

#### 移除元素属性的方法：

::: note

`element.removeAttribute('属性')`，如： `div.removeAttribute('index')`

:::

```HTML
<button class="ldh">刘德华</button>
<button class="vxy">张学友</button>
<img src="https://img.pupper.cn/img/202112091653296.jpg" alt="">


<script>
    var ldh = document.querySelector('.ldh');
    var vxy = document.querySelector('.vxy');
    var img = document.querySelector('img');

    ldh.onclick = function() {
        img.src = 'https://img.pupper.cn/img/202112091653296.jpg';
        img.title = '刘德华';
    }
    vxy.onclick = function() {
        img.src = 'https://img.pupper.cn/img/202112091653109.jpg';
        img.title = '张学友';
    }
```

### 案例 1

<iframe height="500" style="width: 100%;" scrolling="no" title="操作元素属性" src="https://animpen.com/embed/8alGwm?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

::: details

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        img {
            margin: 10px;
            display: block;
        }

        button {
            margin: 10px;
        }
    </style>
</head>

<body>
    <button class="ldh">刘德华</button>
    <button class="vxy">张学友</button>
    <img src="https://img.pupper.cn/img/202112091653296.jpg" alt="">


    <script>
        var ldh = document.querySelector('.ldh');
        var vxy = document.querySelector('.vxy');
        var img = document.querySelector('img');

        ldh.onclick = function() {
            img.src = 'https://img.pupper.cn/img/202112091653296.jpg';
            img.title = '刘德华';
        }
        vxy.onclick = function() {
            img.src = 'https://img.pupper.cn/img/202112091653109.jpg';
            img.title = '张学友';
        }
    </script>
</body>

</html>
```

:::

### 案例 2

<iframe height="500" style="width: 100%;" scrolling="no" title="根据时间显示" src="https://animpen.com/embed/YqHAIv?tab=rlt,js" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

::: details

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        img {
            margin: 10px;
            display: block;
            width: 200px;
        }
    </style>
</head>

<body>
    <img src="https://img.pupper.cn/img/202112091713378.gif" alt="">
    <p>上午好</p>


    <script>
        var img = document.querySelector('img')
        var p = document.querySelector('p')

        function getDate() {
            var date = new Date();
            var h = date.getHours();
            return h;
        }

        if (getDate() < 12) {
            img.src = 'https://img.pupper.cn/img/202112091713378.gif';
            p.innerHTML = '上午好';
        } else {
            img.src = 'https://img.pupper.cn/img/202112091713834.gif';
            p.innerHTML = '下午好';
        }
    </script>
</body>

</html>
```

:::

### 4. 操作表单 元素属性

> 利用 DOM 可以操作表单属性，type、value、checked、selected、disabled 等

表单中的值 需要通过 value 才能修改，innerHTML 不能修改

> `this` ： 指向 时间函数的调用者

```HTML
<button>按钮</button>
<input type="text">

<script>
    var btn = document.querySelector('button');
    var input = document.querySelector('input');

    btn.onclick = function() {
        input.value = '按钮被禁用了';

        // `this` ： 指向 时间函数的调用者
        this.disabled = true;
    }
</script>
```

### 案例 -- 密码框

<iframe height="500" style="width: 100%;" scrolling="no" title="密码框" src="https://animpen.com/embed/bM3zFU?tab=rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

::: details

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .box {
            position: relative;
            margin: 100px auto;
            background-color: rgb(248, 238, 238);
            width: 200px;
            height: 30px;
        }
        .box img {
            position: absolute;
            top: -5px;
            right: 5px;
            width: 40px;
        }
        .box input {
            width: 100%;
            height: 100%;
            outline: none;
            padding-left: 10px;
            padding-right: 50px;
        }
    </style>
</head>

<body>
    <div class="demo">
        <div class="box">
            <img src="https://img.pupper.cn/img/202112091853918.png" alt="">
            <input type="password">
        </div>
    </div>

    <script>
        var img = document.querySelector('img');
        var inp = document.querySelector('input');
        var flag = 0;
        img.onclick = function () {
            switch (flag) {
                case 0:
                    img.src = "https://img.pupper.cn/img/202112091853475.png";
                    inp.type = 'text';
                    flag = 1;
                    break;
                case 1:
                    img.src = 'https://img.pupper.cn/img/202112091853918.png';
                    inp.type = 'password';
                    flag = 0;
                    break;
            }
        }
    </script>

</body>

</html>
```

:::

### 5. 操作 样式属性

| 方法              | 说明                                 |
| ----------------- | ------------------------------------ |
| element.style     | 行内样式操作                         |
| element.className | 通过改变标签的 类名 来获取 新 的样式 |

注意：

js 修改的样式 为 行内样式，他的权重 最高

## 三、节点操作

> 一般时，节点至少拥有 nodeType（节点类型）、nodeName（节点名称）、nodeValue（节点值）三个基本属性

::: note

- 元素节点： `nodeType` 为 **1**
- 属性节点： `nodeType` 为 **2**
- 文本节点： `nodeType` 为 **3** （文本节点包括：文字、空格、换行等）

:::

### 1. 父节点（parentNode）

使用父节点时，一般得到的是离他最近的 父节点，如果找不到父节点，就返回 null。

```HTML
<div class="demo">
    <div class="box">
        <p class="set"></p>
    </div>
</div>

<script>
    var div = document.querySelector('.set')
    console.log(div.parentNode);	// <div class="box"><p class="set"></p></div>
</script>
```

### 2. 子节点（children）

> `children`： 返回所有的子元素节点集合数组
>
> `childNode` ： 返回所有的子节点集合数组，包含元素节点、文本节点等

```html
<div class="demo">
  <div class="box">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</div>

<script>
  var div = document.querySelector('.box').querySelector('ul')
  console.log(div.childNodes) // [text, li, text, li, text, li, text, li, text]
  console.log(div.children) // [li, li, li, li]
</script>
```

> 1.  `firstChild`： 获取第一个子节点，不管是文本节点还是元素节点，
> 2.  `lastChild`： 获取最后一个子节点，不管是文本节点还是元素节点，
>
> 以下方法需要 ie9 以上才能支持：
>
> 1.  `firstElementChild` ： 返回第一个 子 元素 节点
> 2.  `lastElementChild` ： 返回 最后一个 子 元素 节点

::: note

实际开发中的写法： `console.log(div.children[0])`

```js
// 获取最后一个子元素

console.log(div.children[div.children.length - 1])
```

:::

### 3. 兄弟节点（nextSibling）

> `node.nextSibling` : 返回下一个兄弟节点，找不到则返回 null，返回中包含所有节点

```html
<div>我是div</div>
<span>我是span</span>

<script>
  var div = document.querySelector('div')
  console.log(div.nextSibling) // #next
</script>
```

> `node.previousSibling` : 返回上一个兄弟节点，找不到返回 null， 返回中包含所有节点

```HTML
<div>我是div</div>
<span>我是span</span>

<script>
	var div = document.querySelector('div');
    console.log(div.previousSibling);	// #next
</script>
```

以下方法 需要 ie9 以上支持

> `nede.nextElementSibling` : 返回下一个兄弟元素节点，找不到返回 null

```HTML
<div>我是div</div>
<span>我是span</span>

<script>
	var div = document.querySelector('div');
    console.log(div.nextElementSibling);	// <span>我是span</span>
</script>
```

> `nede.previousElementSibling` : 返回上一个兄弟元素节点，找不到返回 null

```HTML
<div>我是div</div>
<span>我是span</span>

<script>
    var div = document.querySelector('div');
    console.log(div.previousElementSibling);    // null
</script>
```

#### 兼容封装函数

```js
function getNextElementSibling(element){
    var el = element;
    while (el = el.nextSibling) {
        if (el.nodeTpye === 1) {
            return el;
        }
    r
}
```

### 3. 创建及添加节点

语法：

```js
// 创建节点
document.createElement('tagName')
// 后面添加节点
node.appendChild(child)

node.insertBefore(child, 指定元素)
```

> `createElement` ： 创建元素
>
> `appendChild` : 在父元素后追加元素
>
> `insertBefore` ： 在指定 元素前 添加元素

```HTML
<ul>
    <li>123</li>
</ul>

<script>
    //  创建元素
    var li = document.createElement('li');
    // 在最后追加元素
    var ul = document.querySelector('ul');
    ul.appendChild(li)
    // 在指定元素前添加元素
    var li1 = document.createElement('li');
    ul.insertBefore(li1, ul.children[0])
</script>
```

运行结果：

```HTML
<ul>
    <li></li>
    <li>123</li>
    <li></li>
</ul>
```

<iframe height="500" style="width: 100%;" scrolling="no" title="输入文本创建元素" src="https://animpen.com/embed/gqo4Ta?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

::: details

```HTML
<!DOCTYPE html>
<html lang="zh">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title></title>
	<style type="text/css">
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		.demo {
			width: 600px;
			margin: 100px auto;
		}
	</style>
</head>

<body>
	<div class="demo">
		<textarea name="" id="" cols="30" rows="10"></textarea>
		<button>发布</button>
		<ul></ul>
	</div>

	<script>
		var text = document.querySelector('textarea');
		var but = document.querySelector('button');
		var ul = document.querySelector('ul');

		but.onclick = function(){
			var li = document.createElement('li');
			li.innerHTML = text.value;
			var li1 = ul.appendChild(li);
		}
	</script>
</html>
```

:::

### 3. 删除节点

语法：

```js
node.removeChild(child)
```

```html
<div class="demo">
  <button>删除</button>
  <ul>
    <li>熊大</li>
    <li>熊二</li>
    <li>光头强</li>
  </ul>
</div>

<script>
  var but = document.querySelector('button')
  var ul = document.querySelector('ul')
  but.onclick = function () {
    if (ul.children.length != 0) {
      ul.removeChild(ul.children[0])
    } else {
      this.disabled = true
    }
  }
</script>
```

### 4. 复制节点

语法：

```js
node.cloneNode()
```

> `cloneNode()` : 返回调用该方法的节点的一个副本。

::: warning

1.  如果括号里的参数为空 或为 false， 则是 浅拷贝，只复制节点本身，不复制里面的子元素；
2.  如果括号里的参数为 true，则是 深拷贝，会复制他里边的所有内容

:::

```HTML
<div class="demo">
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
</div>

<script>
    var ul = document.querySelector('ul');
    var li = ul.children[0].cloneNode(true);
    ul.appendChild(li)
</script>
```

### 5. 三种动态创建元素的区别

```js
document.write()
document.innerHTML()
document.createElement()
```

区别：

1.  `document.write` ： 直接写入页面的内容流，会导致页面全部重绘
2.  `innerHTML` ： 使用数字的形式 创建多个元素 时效率更高，但是结构复杂
3.  `createElement` ： 创建多个元素时 效率稍低，但是结构清晰
