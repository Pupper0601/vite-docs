---
title: JavaScript - DOM(案例)
categories:
  - 学习笔记
  - 前端基础
tags:
  - JavaScript
abbrlink: 5a605a7c
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-141.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#665747'
---

# DOM 案例

## 1. 显示当前时间

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

## 2. 根据当前时间改变图片及问候语

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

## 3. 密码显示与隐藏

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

## 4. 精灵图 快速添加

<iframe height="500" style="width: 100%;" scrolling="no" title="精灵图-服务" src="https://animpen.com/embed/ZA_6Kt?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            list-style: none;
        }

        .demo ul {
            width: 400px;
        }

        .demo ul li {
            float: left;
            width: 100px;
            height: 100px;
            border: 1px solid #222;
            text-align: center;

        }

        .demo ul li i {
            display: inline-block;
            margin-top: 20px;
            width: 24px;
            height: 24px;
            background: url(https://img.pupper.cn/img/202112101140615.png) no-repeat 0 0;
        }
    </style>
</head>

<body>
    <div class="demo">
        <ul>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
        </ul>
    </div>

    <script>
        var li = document.querySelectorAll("li")

        for (var i = 0; i < li.length; i++) {
            var ei = li[i].querySelector('i');
            var num = i * 44;
            ei.style.backgroundPositionY = '-' + num + 'px';
        }
    </script>

</body>

</html>
```

:::

## 5. 密码提示及效验

<iframe height="500" style="width: 100%;" scrolling="no" title="密码提示" src="https://animpen.com/embed/ip3yCu?tab=rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

::: details

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 600px;
            margin: 100px auto;
        }

        .message {
            display: inline-block;
            font-size: 12px;
            color: #999;
            background: url(https://img.pupper.cn/img/202112101459674.png) no-repeat left center;
            padding-left: 20px;
        }

        .wrong {
            color: red;
            background-image: url(https://img.pupper.cn/img/202112101116909.png);
        }

        .right {
            color: green;
            background-image: url(https://img.pupper.cn/img/202112101459932.png);
        }
    </style>
</head>

<body>
    <div class="register">
        <input type="password" class="ipt">
        <p class="message">请输入6~16位密码</p>
    </div>
    <script>
        var ipt = document.querySelector('.ipt');
        var message = document.querySelector('.message');
        ipt.onblur = function() {
            if (this.value.length < 6 || this.value.length > 16) {
                message.className = 'message wrong';
                message.innerHTML = '您输入的位数不对要求6~16位';
            } else {
                message.className = 'message right';
                message.innerHTML = '您输入的正确';
            }
        }
    </script>
</body>

</html>
```

:::

## 6. 点击更换网页背景

<iframe height="500" style="width: 100%;" scrolling="no" title="换背景" src="https://animpen.com/embed/7Oo2YS?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            list-style: none;
        }
        em,
        i {
            font-style: normal;
        }
        body {
            background: url(https://img.pupper.cn/img/202112101605471.jpg) ;
            background-repeat: no-repeat;
            background-size: 100%;
        }
        .box {
            margin: 100px auto;
            width: 600px;
            height: 100px;
            border: 3px solid #fff;
        }
        .box img {
            float: left;
            width: 25%;
            height: 100%;
            border-left: 2px solid #fff;
        }
        .box img:nth-child(1) {
            border: none;
        }
    </style>
</head>

<body>
    <div class="demo">
        <div class="box">
            <img src="https://img.pupper.cn/img/202112101605471.jpg" alt=""><img
                src="https://img.pupper.cn/img/202112101605097.jpg" alt=""><img
                src="https://img.pupper.cn/img/202112101605182.jpg" alt=""><img
                src="https://img.pupper.cn/img/202112101606060.jpg" alt="">
        </div>
    </div>

    <script>
        var img = document.querySelectorAll('img');
        for (var i = 0; i < img.length; i++) {
            img[i].onclick = function () {
                document.body.style.backgroundImage = 'url(' + this.src + ')';
            }
        }
    </script>
</body>
</html>
```

:::

## 7. 鼠标经过，表格变色

<iframe height="500" style="width: 100%;" scrolling="no" title="鼠标经过变色" src="https://animpen.com/embed/0OxOPR?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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
			padding: 0;
			margin: 0;
			box-sizing: border-box;
			list-style: none;
		}
		em,
		i {
			font-style: normal;
		}
		.box table {
			width: 600px;
			text-align: center;
			line-height: 30px;
			border-collapse: collapse;

		}

		.box table tr:nth-child(1) {
			background-color: #22B0FF;
		}

		.box table tr td {
			border-bottom: 2px solid #22B0FF;
		}
		.bg {
			background-color: rgb(73, 212, 247);
		}
		.nbg {
			background-color: #fff;
		}
	</style>
</head>

<body>
	<div class="demo">
		<div class="box">
			<table>
				<tr>
					<th>代码</th>
					<th>名称</th>
					<th>最新</th>
					<th>累计</th>
					<th>前单位</th>
					<th>增长率</th>
					<th>公布日期</th>
				</tr>
				<tr>
					<td>270047</td>
					<td>广发理财30天</td>
					<td>0.932</td>
					<td>3.333</td>
					<td>0.000</td>
					<td>0.000%</td>
					<td>2021-12-11</td>
				</tr>
				<tr>
					<td>270047</td>
					<td>广发理财30天</td>
					<td>0.932</td>
					<td>3.333</td>
					<td>0.000</td>
					<td>0.000%</td>
					<td>2021-12-11</td>
				</tr>
				<tr>
					<td>270047</td>
					<td>广发理财30天</td>
					<td>0.932</td>
					<td>3.333</td>
					<td>0.000</td>
					<td>0.000%</td>
					<td>2021-12-11</td>
				</tr>
			</table>
		</div>
	</div>

	<script>
		var tr = document.querySelector('.box').querySelector('table').querySelectorAll('tr');
		for (var i = 1; i < tr.length; i++) {
			tr[i].onmouseover = function(){
				this.className = 'bg';
			}
			tr[i].onmouseout = function () {
				this.className = 'nbg'
			}
		}
	</script>
</body>

</html>
```

:::

## 8. 复选框 全选

<iframe height="500" style="width: 100%;" scrolling="no" title="表格 全选" src="https://animpen.com/embed/PZBr3O?tab=rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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
			padding: 0;
			margin: 0;
			box-sizing: border-box;
			list-style: none;
		}

		em,
		i {
			font-style: normal;
		}

		.box table {
			margin: 100px auto;
			width: 300px;
			text-align: center;
			border: 1px solid #ccc;
			line-height: 30px;
			border-collapse: collapse;
		}

		.table_body tr td,
		.table_head th {
			border: 1px solid #ccc;
		}

		.box table tr th {
			background-color: rgb(35, 192, 240);
		}
	</style>
</head>

<body>
	<div class="demo">
		<div class="box">
			<table>
				<thead class="table_head">
					<th><input type="checkbox" name="" id="all"></th>
					<th>商品</th>
					<th>价钱</th>
				</thead>
				<tbody class="table_body">
					<tr>
						<td><input type="checkbox" name="" id=""></td>
						<td>iphone8</td>
						<td>8000</td>
					</tr>
					<tr>
						<td><input type="checkbox" name="" id=""></td>
						<td>ipad pro</td>
						<td>5000</td>
					</tr>
					<tr>
						<td><input type="checkbox" name="" id=""></td>
						<td>ipad air</td>
						<td>2000</td>
					</tr>
					<tr>
						<td><input type="checkbox" name="" id=""></td>
						<td>appil watch</td>
						<td>2000</td>
					</tr>
				</tbody>

			</table>
		</div>
	</div>

	<script>
		var th_checkbox = document.querySelector('#all');
		var tb_checkbox = document.querySelector('.table_body').querySelectorAll('input');
		th_checkbox.onclick = function () {
			for (var i = 0; i < tb_checkbox.length; i++) {
				tb_checkbox[i].checked = this.checked;
			}
		}
		for (var i = 0; i < tb_checkbox.length; i++) {
			tb_checkbox[i].onclick = function(){
				var flag = true;
				for(var i = 0; i < tb_checkbox.length; i++) {
					if (!tb_checkbox[i].checked){
						flag = false;
                        break;
					}
				}
				th_checkbox.checked = flag;
			}
		}
	</script>
</body>

</html>
```

:::

## 9. table 选项卡

<iframe height="500" style="width: 100%;" scrolling="no" title="table 选项卡" src="https://animpen.com/embed/4z5t4T?tab=rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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
			padding: 0;
			margin: 0;
			box-sizing: border-box;
			list-style: none;
		}
		em,
		i {
			font-style: normal;
		}

		.demo {
			width: 800px;
			height: 300px;
			border: 2px solid;
			margin: 100px auto;
		}

		.nav {
			width: 100%;
			height: 30px;
			background-color: aquamarine;
		}

		.nav li {
			float: left;
			width: 100px;
			line-height: 30px;
			text-align: center;
		}

		.bgc {
			background-color: red;
			color: #fff;
		}

		.content li {
			display: none;
		}

		.content .ct {
			display: block;
		}
	</style>
</head>

<body>
	<div class="demo">
		<div class="nav">
			<ul>
				<li class="bgc">商品介绍</li>
				<li>规格与包装</li>
				<li>售后保障</li>
				<li>商品评价</li>
				<li>手机社区</li>
			</ul>
		</div>
		<div class="content">
			<ul>
				<li class="ct">商品介绍-内容</li>
				<li>规格与包装-内容</li>
				<li>售后保障-内容</li>
				<li>商品评价-内容</li>
				<li>手机社区-内容</li>
			</ul>
		</div>
	</div>

	<script>
		var nav = document.getElementsByClassName('nav')[0].querySelectorAll('li');
		var list = document.getElementsByClassName('content')[0].querySelectorAll('li');

		for (var i = 0; i < nav.length; i++) {
			nav[i].setAttribute('index', i)
			nav[i].onclick = function () {
				for (var i = 0; i < nav.length; i++) {
					nav[i].className = '';
				}
				this.className = 'bgc';

				var ind = this.getAttribute('index');
				for (var i = 0; i < list.length; i++) {
					list[i].style.display = 'none';
				}
				list[ind].style.display = 'block';
			}

		}

	</script>
</body>

</html>
```

:::

## 10. 下拉导航

<iframe height="500" style="width: 100%;" scrolling="no" title="下拉导航" src="https://animpen.com/embed/pnCz3K?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		li {
			list-style: none;
		}
		.demo {
			height: 200px;
			width: 400px;
			margin: 100px auto;
		}

		.demo>ul>li {
			float: left;
			width: 80px;
			height: 200px;
		}
		.demo>ul>li>a {
			display: block;
			width: 80px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			color: black;
			text-decoration: none;
		}
		.demo>ul>li>a:hover {
			background-color: #ccc;
			color: #fff;
		}
		.demo>ul>li>ul{
			display: none;
		}
		.demo>ul>li>ul>li {
			width: 80px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border: 1px solid rgb(252, 152, 4);
		}
		.demo>ul>li>ul>li:hover{
			background-color: rgb(236, 190, 129);
		}
	</style>
</head>

<body>
	<div class="demo">
		<ul>
			<li>
				<a href="#">微博</a>
				<ul>
					<li>私信</li>
					<li>@我</li>
					<li>评论</li>
				</ul>
			</li>
			<li>
				<a href="#">微博</a>
				<ul>
					<li>私信</li>
					<li>@我</li>
					<li>评论</li>
				</ul>
			</li>
			<li>
				<a href="#">微博</a>
				<ul>
					<li>私信</li>
					<li>@我</li>
					<li>评论</li>
				</ul>
			</li>
			<li>
				<a href="#">微博</a>
				<ul>
					<li>私信</li>
					<li>@我</li>
					<li>评论</li>
				</ul>
			</li>
		</ul>
	</div>
</body>
<script>
	var a = document.querySelector('.demo').querySelector('ul');
	var lis =  a.children;
	for(var i = 0; i < lis.length; i++){
		lis[i].onmouseover = function(){
			this.children[1].style.display = 'block';
		}
		lis[i].onmouseout = function () {
			this.children[1].style.display = 'none';
		}
	}
</script>

</html>
```

:::

## 11. 创建节点、删除节点

<iframe height="500" style="width: 100%;" scrolling="no" title="创建节点、删除节点" src="https://animpen.com/embed/AMSJRa?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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
			width: 400px;
			margin: 100px auto;
		}

		.demo ul li {
			background-color: pink;
			line-height: 30px;
			margin: 5px 0;
			width: 300px;
		}
		.demo ul li a{
			float: right;
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

		but.onclick = function () {
			if (text.value == ''){
				alert('没有内容');
				return false;
			}else{
				var li = document.createElement('li');
				li.innerHTML = text.value + "<a href='javascript:;'>删除</a>";
				ul.appendChild(li);
				var as = document.querySelectorAll('a');
				for (var i = 0; i < as.length; i++) {
					as[i].onclick = function () {
						ul.removeChild(this.parentNode);
					}
				}
			}
		}
	</script>

</html>
```

:::

## 12. 动态数据添加及删除

<iframe height="500" style="width: 100%;" scrolling="no" title="未命名代码片段" src="https://animpen.com/embed/XOPZ08?tab=html,rlt" frameborder="no"  allowtransparency="true" allowfullscreen="true"></iframe>

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

		a {
			text-decoration: none;
		}

		.demo {
			width: 600px;
			height: 300px;
			margin: 100px auto;
		}

		table {
			width: 400px;
			text-align: center;
			border-collapse: collapse;
			line-height: 40px;
		}

		table th,
		table td {
			border: 1px solid #222;
			width: 100px;

		}

		thead {
			background-color: #ccc;
		}
	</style>
</head>

<body>
	<div class="demo">
		<table>
			<thead>
				<th>姓名</th>
				<th>科目</th>
				<th>成绩</th>
				<th>操作</th>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>

	<script>
		var data = [
			{
			username: '张三',
				kemu: 'JavaScript',
				chengji: 100,
			},
		{
			username: '李四',
				kemu: 'JavaScript',
				chengji: 90,
			},
		{
			username: '王五',
				kemu: 'JavaScript',
				chengji: 80,
			},
		]
		var tb = document.querySelector('tbody');
		for (var i = 0; i < data.length; i++){
			var tr = document.createElement('tr');
			tb.appendChild(tr);

			for (var k in data[i]) {
				var td = document.createElement('td');
				td.innerHTML = data[i][k];
				tr.appendChild(td)
			}
			var td = document.createElement('td');
			td.innerHTML = "<a href='javascript:;'>删除</a>"
			tr.appendChild(td);
		}
		var as = document.querySelectorAll('a')
			for (var i = 0; i < as.length; i++) {
				as[i].onclick = function () {
					tb.removeChild(this.parentNode.parentNode);
				}
			}
	</script>
</html>
```

:::
