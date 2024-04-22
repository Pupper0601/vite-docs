---
title: JavaScript - BOM 操作
categories:
  - 学习笔记
  - 前端基础
tags:
  - JavaScript
abbrlink: 10dfe401
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-1.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#bca59b'
---

## 一、窗口加载事件

```js
window.onload = function () {}
或
window.addEventListener('load', function () {})
```

### 1. `window.onload`

`window.onload` : 窗口（页面）加载事件，当页面完成加载后直接触发事件，就调用的处理函数

::: warning

- 有了 `window.onload`，就可以把 JS 代码放到页面元素的任何地方，因为 `onload` 是页面加载完成后才调用的函数
- 页面有多个 `window.onload` 时，以最后一个为准

:::

```HTML
<script>
    // onload 可以使 函数在 页面加载完成后再执行，所以可以使JS 代码放到页面的任何位置
    window.onload = function () {
        var but = document.querySelector('button');
        but.addEventListener('click', function(){
            alert('弹框1')
        })
    }
    // 如果有多个 onload 时，以最后一个为准
    window.onload = function () {
        alert('弹框2')
    }
</script>
<div class="demo">
    <button>点击</button>
</div>
```

### 2. `addEventListener`

注意：

- 没有数量限制，JS 代码可以放在页面任意位置

```HTML
<script>
    // addEventListener 使 load 方法没有数量限制
    window.addEventListener('load', function () {
        var but = document.querySelector('button');
        but.addEventListener('click', function () {
            alert('弹框1')
        })
    })
    window.addEventListener('load', function () {
        alert('弹框2')
    })

</script>
<div class="demo">
    <button>点击</button>
</div>
```

### 3. `DOMContentLoaded`

> `DOMContentLoaded` : DOM 加载完成后即可触发，不用等待 图片、视频等资源加载

```js
document.addEventListener('DOMContentLoaded', function () {
  alert('不用等待页面资源加载')
})
```

load 与 DOMContentLoaded 的区别：

- load 等页面内容全部加载完毕，包含页面 dom 元素 图片 flash css 等等
- DOMContentLoaded 是 DOM 加载完毕，不包含图片 falsh css 等就可以执行 加载速度比 load 更快一些

## 二、 调整窗口大小事件

```js
window.onresize = function () {}
或
window.addEventListener('resize', function () {})
```

> `window.onresize` : 调整窗口大小加载事件，当触发时就调用的处理函数

注意：

- 只要窗口大小改变，就会触发这个事件
- 常利用这个事件完成响应式布局
  - `window。innerWidth` ： 获取当前窗口的宽度

```HTML
<div class="demo">
</div>
<script>
    var div = document.querySelector('.demo');
    window.addEventListener('resize', function(){
        if (window.innerWidth <= 900){
            div.style.display = 'none';
        }else{
            div.style.display = 'block';
        }
    })
</script>
```

## 三、 定时器

### 1. `setTimeout`

语法：

```js
window.setTimeout(调用函数, [延迟的毫秒数])；
```

> `setTimeout` ： 用于设置一个定时器，该 定时器 在 **定时到期** 后 执行函数

::: warning

1.  window 在调用时可以省略不写
2.  延时时间的单位为 **毫秒**，省略延时时间，则默认为 0；
3.  调用的函数可以直接写，也可以写函数名；
4.  多个定时器时，可以使用不同的变量接收；

:::

```HTML
<div class="demo">
</div>
<script>
    var div = document.querySelector('.demo');
    // 直接写入 函数
    setTimeout(() => {
        console.log('3s之后消失');
        div.style.display = 'none';
    }, 3000);
    // 用 函数名 调用
    setTimeout(block, 5000);
    function block (){
        console.log('5s之后出现');
        div.style.display = 'block';
    }
    var time1 = setTimeout(() => {
        console.log('计时器1');
    })
    var time2 = setTimeout(() => {
        console.log('计时器2');
    })
</script>
```

#### 停止 计时器

语法：

```js
window.clearTimeout(计时器标识符)
```

```js
var st = setTimeout(() => {
  div.style.display = 'none'
}, 5000)

// 停止倒计时
but.addEventListener('click', function () {
  clearTimeout(st)
})
```

### 2. `setInterval`

> `setInterval()` : 每过固定的时间，调用一次 函数

语法：

```js
window.setInterval(回调函数, [间隔的毫秒数])
```

- window 可以省略
- 调用的函数 可以直接写，也可以写函数名
- 间隔时间单位为 **毫秒** ，不行默认为 0
- 可以用变量接收计时器

```js
var st1 = setInterval(() => {
  --i
  div.innerHTML = i + '<span>X</span> <button> 停止倒计时</button>'
}, 1000)
```

#### 停止定时器 （`clearInerval`）

语法：

```js
window.clearInterval(intervalID)
```

### 案例 --- 倒计时

<iframe height="500" style="width: 100%;" scrolling="no" title="京东秒杀倒计时" src="https://animpen.com/embed/Eo6KNL?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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
			font-style: normal;
		}

		li {
			list-style: none;
		}

		@font-face {
			font-family: 'iconfont';
			/* Project id 2303857 */
			src: url('//at.alicdn.com/t/font_2303857_w55dl274uko.woff2?t=1640252281330') format('woff2'),
				url('//at.alicdn.com/t/font_2303857_w55dl274uko.woff?t=1640252281330') format('woff'),
				url('//at.alicdn.com/t/font_2303857_w55dl274uko.ttf?t=1640252281330') format('truetype');
		}

		.demo {
			width: 168px;
			height: 237px;
			background-color: #F74630;
			margin: 100px auto;
			overflow: hidden;
		}

		.box {
			width: 122px;
			height: 123px;
			margin: 46px 22px 17px;
		}

		.box h2 {
			height: 40px;
			color: #fff;
			text-align: center;
			font-size: 30px;
		}

		.box h6 {
			height: 20px;
			font-size: 17px;
			text-align: center;
			color: #ccc;
		}

		.box span {
			display: block;
			font-family: 'iconfont';
			content: '\e6da';

			height: 40px;
			color: rgb(139, 230, 20);
			font-size: 40px;
		}

		.box em {
			display: block;
			height: 17px;
			font-size: 15px;
			color: #fff;
			text-align: center;
		}

		.times {
			position: relative;
			height: 40px;
			width: 122px;
			margin: 0 22px;
		}


		.bgc li {
			float: left;
			width: 35px;
			height: 16px;
			background-color: #333;
			margin: 1px 2px 0;
		}

		.time li {
			float: left;
			color: #fff;
			font-size: 18px;
			font-weight: 700;
		}

		.time li:nth-child(1) {
			position: absolute;
			left: 10px;
			top: 5px;
		}

		.time li:nth-child(2) {
			position: absolute;
			left: 47px;
			top: 5px;
		}

		.time li:nth-child(3) {
			position: absolute;
			left: 86px;
			top: 5px;
		}
	</style>
</head>

<body>
	<div class="demo">
		<div class="box">
			<h2>京东秒杀</h2>
			<h6>FLASH DEALS</h6>
			<span></span>
			<em>本场距离结束还剩</em>
		</div>
		<div class="times">
			<ul class="bgc">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<ul class="time">
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>

	</div>
	<script>
		var lis = document.querySelector('.time').querySelectorAll('li');
		var inputTime = +new Date('2021-12-24 18:03:00');

		function conutDown() {
				var nowTime = +new Date();
				var times = (inputTime - nowTime) / 1000; // 剩余时间的总秒数

				var h = parseInt(times / 60 / 60 % 24);
				h = h < 10 ? '0' + h : h;
				lis[0].innerHTML = h;
				var m = parseInt(times / 60 % 60);
				m = m < 10 ? '0' + m : m;
				lis[1].innerHTML = m;
				var s = parseInt(times % 60);
				s = s < 10 ? '0' + s : s;
				lis[2].innerHTML = s;
			}
		setInterval(function () {
			if (parseInt(lis[0].innerHTML) == 0 && parseInt(lis[1].innerHTML) == 0 && parseInt(lis[2].innerHTML) == 0){
				lis[0].innerHTML = '00';
				lis[1].innerHTML = '00';
				lis[2].innerHTML = '00';
				return false;
			}else {
				conutDown();
			}
		}, 1000)
	</script>
</body>

</html>
```

:::

### 案例 --- 验证码发送

<iframe height="400" style="width: 100%;" scrolling="no" title="验证码发送" src="https://animpen.com/embed/jg0Iji?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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

	</style>
</head>
<body>
	<div class="demo">
		<input type="text" name="" id="yv" value="" />
		<input type="button" name="" id="fs" value="发送验证码" />
	</div>
	<script type="text/javascript">
		var fs = document.querySelector('#fs');
		var time = 5;
		fs.addEventListener('click', function(){
			fs.disabled = true;
			var si = setInterval(function(){
				if (time > 0){
					fs.value = '验证码 ' + time + 's 后可以再次发送';
					time--;
				}else{
					clearInterval(si);
					fs.value = '发送验证码';
					fs.disabled = false;
					time = 5;
				}
			}, 1000)
		})
	</script>
</body>
</html>
```

:::

### 3. this 的指向问题

::: note

1.  全局作用域或者普通函数中 this 指向全局对象 window
    1.  定时器里面的 this 指向 window
2.  方法中的 this ，谁调用就 指向 谁
3.

:::

## 四、 JS 执行机制

### 1. 同步 和 异步

> 同步 ： 程序的执行顺序与任务的排列顺序一致，前一个任务结束后才会执行下一个任务；
>
> 异步 ： 在执行一个任务的同时执行另一个任务

同步任务：

- 同步任务都在主线程上执行，形成一个 执行栈

异步任务：

- JS 的异步 是通过 回调函数实现的
- 包含：普通事件（click、resize 等）、资源加载（load、error 等）、定时器（setInterval、setTimeout 等）

### 2. JS 执行 机制

**事件循环** ：

- 当主线程的同步任务执行完成后，会不断的去获取异步任务再到主线程执行

## 五、 `location` 对象

> `location` ： 用于获取 或 设置 窗体的 URL，并解析 URL

### 1. URL

URL 的一般语法格式：

```nginx
protocol://host[:port]/path/[?query]#fragment

http://www.itcast.cn/index.html?name=andy&age=18#link
```

| 组成     | 说明                                                      |
| -------- | --------------------------------------------------------- |
| protocol | 通讯协议（http、https）                                   |
| host     | 主机域名（www.pupper.cn）                                 |
| port     | 端口号（可选，http 的默认端口为 80）                      |
| path     | 路由（由 0 到 多个 "/" 隔开的字符串，一般为主机文件地址） |
| query    | 参数 （以键值对的形式，通过 "&" 符号分割开来              |
| fragment | 片段 "#" 后面的内容，常见于连接锚点                       |

### 2. `location` 对象属性

| 对象属性          | 返回值                                       |
| ----------------- | -------------------------------------------- |
| location.href     | 获取 或者 设置 整个 URL                      |
| location.host     | 返回 注意域名（www.pupper.cn）               |
| location.port     | 返回 端口号 （如果未写，则返回 空字符串）    |
| location.pathname | 返回 路径                                    |
| location.search   | 返回 参数                                    |
| location.hash     | 返回 片段 （ # 后面的内容，常见于连接 锚点） |

### 案例 --- 页面自动跳转

```HTML
<div class="demo">
    <button type="button">点击</button>
</div>
<script type="text/javascript">
    var but = document.querySelector('button');
    var div = document.querySelector('.demo');
    var time = 5;
    but.addEventListener('click', function(){
        var si = setInterval(function () {
            if(time > 0){
                div.innerHTML = time + 's 后跳转页面。';
                time--;
            }else{
                location.href = 'https://pupper.cn';
                clearInterval(si);
            }
        }, 1000)
        })
</script>
```

### 案例 --- 不同页面参数获取

<code-group>
<code-block title=" login.html " active>

```html
<div class="demo">
  <form action="demo2.html">
    <input type="text" name="uname" id="" value="" placeholder="请输入用户名" />
    <input type="submit" value="登录" id="login" />
  </form>
</div>
```

</code-block>

<code-block title=" index.html ">

```HTML
<div class="demo">
    欢迎
    <span></span>
    登录
</div>
<script type="text/javascript">
    var sp = document.querySelector('span');
    var uname = location.search;
    var un = uname.slice(1).split('=');  // ['uname', '123']
    sp.innerHTML = un[1]
</script>
```

</code-block>
</code-group>

### 3. `location` 对象 方法

| 对象方法           | 返回值                                                                           |
| ------------------ | -------------------------------------------------------------------------------- |
| location.assign()  | 和 href 一样，可跳转页面（重定向页面），<br />记录历史，可以后退页面             |
| location.replace() | 替换当前页面，因为不记录历史，所以不能后退页面                                   |
| location.reload()  | 重新加载页面，相当于刷新按钮 或 F5<br />（如果参数为 true ，强制刷新 ctrl + F5） |

```HTML
<div class="demo">
    <button type="button" class="but1">assign(可以后退页面)</button>
    <button type="button" class="but2">replace(不能后退页面)</button>
    <button type="button" class="but3">relode(刷新页面)</button>
    <button type="button" class="but4">relode(强制刷新页面)</button>
</div>
<script type="text/javascript">
    var but1 = document.querySelector('.but1');
    var but2 = document.querySelector('.but2');
    var but3 = document.querySelector('.but3');
    var but4 = document.querySelector('.but4');

    but1.addEventListener('click', function() {
        location.assign('https://www.baidu.com');
    });
    but2.addEventListener('click',function () {
        location.replace('http://pupper.cn');
    });
    but3.addEventListener('click',function () {
        location.reload();
    });
    but4.addEventListener('click',function () {
        location.reload(true);
    });
</script>
```

## 五、 `navigator` 对象

> `navigator` ： 对象包含有关 浏览器 的所有信息

`userAgent` ： 包含了用户的浏览器信息

### 案例 --- 根据用于浏览器信息，跳转 pc 页面或手机页面

```js
if (
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  )
) {
  window.location.href = '../H5/index.html' //手机
} else {
  window.location.href = '../P/index.html' //电脑
}
```

## 六、 `history` 对象

> `history` ： 与浏览器的 历史记录 进行交互，该对象包含用户 访问过的 URL

| 对象方法  | 作用                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| back()    | 后退                                                                          |
| forward() | 前进                                                                          |
| go(参数)  | 前进后退弄能，参数如果是 1 ，则前进一个页面，<br />如果是 -1 ，则后退一个页面 |

<code-group>
<code-block title=" demo.html " active>

```HTML
  <div class="demo">
      <a href="demo2.html">点击我页面跳转</a>
      <button type="button">前进</button>
</div>
<script type="text/javascript">
    var but = document.querySelector('button');
    but.addEventListener('click', function(){
        history.forward();
    } )
</script>
```

</code-block>

<code-block title=" demo1.html ">

```HTML
<div class="demo">
    <a href="demo.html">点击我页面跳转</a>
    <button type="button">后退</button>
</div>
<script type="text/javascript">
    var but = document.querySelector('button');
    but.addEventListener('click', function(){
        history.back();
    } )
</script>
```

</code-block>
</code-group>
