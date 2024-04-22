---
title: VUE3 - 基础
categories:
  - 学习笔记
  - 前端基础
tags:
  - VUE3
abbrlink: 983e9fbf
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-263.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#81705e'
---

## –、 安装 Vue

### 1. 本地引用

[安装 — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/installation.html#直接用-lt-script-gt-引入)

```html
<script src="../lib/vue.js"></script>
```

### 2. 外部引用

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

## 二、 模板语法

### 1. 插值语法

- 功能：用于解析标签体内容。

语法：

```js
// xxx是js表达式，
{
  {
    xxx
  }
}
```

- 可以直接读取到 data 中的所有属性。

#### 1. 文本

```html
<div id="app">{{ message }}</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
    },
  })
</script>
```

#### 2. 表达式

```js
<div id="app">
  {{ number + 1 }}
  {{ ok ? 'YES' : 'NO' }}
  {{ message.split('').reverse().join('') }}
</div>
```

### 2. 指令语法

- 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
- 举例：v-bind:href="xxx" 或 简写为 :href="xxx"，
  - xxx 同样要写 js 表达式，且可以直接读取到 data 中的所有属性。
- 备注：Vue 中有很多的指令，且形式都是：v-????

```html
<div id="root">
  <h1>插值语法</h1>
  <h3>你好，{{name}}</h3>
  <hr />
  <h1>指令语法</h1>
  <a v-bind:href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
  <a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
</div>

<script type="text/javascript">
  //阻止 vue 在启动时生成生产提示。
  Vue.config.productionTip = false
  new Vue({
    el: '#root',
    data: {
      name: 'jack',
      school: {
        name: '尚硅谷',
        url: 'http://www.atguigu.com',
      },
    },
  })
</script>
```

### 3. el 和 data 的两种写法

#### 1. el 的两种写法

- new Vue 时候配置 el 属性。

- 先创建 Vue 实例，随后再通过 `vm.$mount('#root')` 指定 el 的值。\*

```js
//el的两种写法
const v = new Vue({
  //第一种写法
  el: '#root',
  data: {
    name: '尚硅谷',
  },
})

//第二种写法
v.$mount('#root')
```

#### 2. data 的两种写法

```js
//data的两种写法
new Vue({
  el:'#root',
  //data的第一种写法：对象式
  data:{
				name:'尚硅谷'
			}

  //data的第二种写法：函数式
  data(){
    console.log('@@@',this) //此处的this是Vue实例对象
    return{
      name:'尚硅谷'
    }
  }
})
```

## 三、 数据代理

1.  Vue 中的数据代理
    1.  通过 vm 对象 来代理 data 对象 中属性的操作（读/写）
2.  Vue 中数据代理的好处
    1.  更加方便的操作 data 中的数据
3.  基本原理
    1.  通过 Object.defineProperty() 把 data 对象 中所有属性添加到 vm 上。
    2.  为每一个添加到 vm 上的属性，都指定一个 getter/setter。
    3.  在 getter/setter 内部去操作（读/写）data 中对应的属性。

```html
<div id="root">
  <h2>学校名称：{{name}}</h2>
  <h2>学校地址：{{address}}</h2>
</div>

<script type="text/javascript">
  //阻止 vue 在启动时生成生产提示。
  Vue.config.productionTip = false
  const vm = new Vue({
    el: '#root',
    data: {
      name: '尚硅谷',
      address: '宏福科技园',
    },
  })
</script>
```

### 1. 动态单向绑定（`v-bind`）

> `v-bind` ： 数据只能从 data 流向页面
>
> `v-bind` 可以简写为 `:`

```js
// 完整写法
<a v-bind:href="url">...</a>

// 简化写法
<a :href="url">...</a>
```

### 2. 动态双向绑定（`v-model`）

> `v-model` : 数据不仅能从 data 流向页面，还可以从页面流向 data
>
> `v-model` ： 双向绑定一般都应用在表 **单类元素** 上（如：input、select 等）
>
> `v-model:value` 可以简写为 `v-model`，因为 v-model 默认收集的就是`value`值。

```js
// 完整写法
<input v-model:value="message">

// 简写
<input v-model="message">
```

例如：

```html
<div class="box">
  <input v-model="message" placeholder="edit me" />
  <p>Message is: {{ message }}</p>
</div>

<script>
  new Vue({
    el: '.box',
    data: {
      message: 'hello',
    },
  })
</script>
```

## 四、事件处理 `v-on:`

### 1. 事件绑定

> 使用 `v-on` 来绑定事件
>
> `v-on` 可以简写为 `@`

注意：

1.  使用 v-on:xxx 或 @xxx 绑定事件，其中 xxx 是事件名；
2.  事件的回调需要配置在 `methods` 对象中，最终会在 vm 上；
3.  methods 中配置的函数，不要用 **箭头函数**！否则 this 就不是 vm 了；
4.  methods 中配置的函数，都是被 Vue 所管理的函数，this 的指向是 vm 或 组件实例对象；
5.  `@click="demo"` 和 `@click="demo($event)"` 效果一致，但后者可以传参；\*

```html
<div id="root">
  <h2>欢迎来到{{name}}学习</h2>
  // 原始写法
  <button v-on:click="showInfo">点我提示信息</button>

  // 简写
  <button @click="showInfo1">点我提示信息1（不传参）</button>
  <button @click="showInfo2($event,66)">点我提示信息2（传参）</button>
</div>

<script type="text/javascript">
  //阻止 vue 在启动时生成生产提示。
  Vue.config.productionTip = false

  const vm = new Vue({
    el: '#root',
    data: {
      name: '尚硅谷',
    },
    methods: {
      showInfo1(event) {
        alert('同学你好！')
      },
      showInfo2(event, number) {
        console.log(event, number)
        alert('同学你好！！')
      },
    },
  })
</script>
```

### 2. 事件修饰符

_Vue 中的事件修饰符：_

1.  `prevent`：阻止默认事件（常用）；
2.  `stop`：阻止事件冒泡（常用）；
3.  `once`：事件只触发一次（常用）；
4.  `capture`：使用事件的捕获模式；
5.  `self`：只有 event.target 是当前操作的元素时才触发事件；
6.  `passive`：事件的默认行为立即执行，无需等待事件回调执行完毕；

```html
<div id="root">
  <h2>欢迎来到{{name}}学习</h2>
  <!-- 阻止默认事件（常用） -->
  <a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>

  <!-- 阻止事件冒泡（常用） -->
  <div class="demo1" @click="showInfo">
    <button @click.stop="showInfo">点我提示信息</button>

    <!-- 修饰符可以连续写 -->
    <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a>
  </div>

  <!-- 事件只触发一次（常用） -->
  <button @click.once="showInfo">点我提示信息</button>

  <!-- 使用事件的捕获模式 -->
  <div class="box1" @click.capture="showMsg(1)">
    div1
    <div class="box2" @click="showMsg(2)">div2</div>
  </div>

  <!-- 只有event.target是当前操作的元素时才触发事件； -->
  <div class="demo1" @click.self="showInfo">
    <button @click="showInfo">点我提示信息</button>
  </div>

  <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
  <ul @wheel.passive="demo" class="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>
</div>

<script type="text/javascript">
  Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
  new Vue({
    el: '#root',
    data: {
      name: '尚硅谷',
    },
    methods: {
      showInfo(e) {
        alert('同学你好！')
        // console.log(e.target)
      },
      showMsg(msg) {
        console.log(msg)
      },
      demo() {
        for (let i = 0; i < 100000; i++) {
          console.log('#')
        }
        console.log('累坏了')
      },
    },
  })
</script>
```

### 3. 键盘事件

1.  Vue 中常用的按键别名：

    | 按键 |                别名                 |
    | :--: | :---------------------------------: |
    | 回车 |                enter                |
    | 删除 |    delete (捕获“删除”和“退格”键)    |
    | 退出 |                 esc                 |
    | 空格 |                space                |
    | 换行 | tab (特殊，必须配合 keydown 去使用) |
    |  上  |                 up                  |
    |  下  |                down                 |
    |  左  |                left                 |
    |  右  |                right                |

2.  Vue 未提供别名的按键，可以使用按键原始的 key 值去绑定，

    1.  如果是多个单词组成的按键名，需要将所有单词全部小写，并且用 `-` 隔开
    2.  例如： CapsLock（大写键），需要写成 caps-lock

3.  系统修饰键（用法特殊）：`ctrl、alt、shift、meta`

    1.  配合 keyup 使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
    2.  .配合 keydown 使用：正常触发事件。

4.  也可以使用 keyCode 去指定具体的按键（不推荐）

5.  `Vue.config.keyCodes.自定义键名 = 键码`，可以去定制按键别名\*

```HTML
<div id="root">
  <h2>欢迎来到{{name}}学习</h2>
  <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo">
</div>


<script type="text/javascript">
  Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
  Vue.config.keyCodes.huiche = 13 //定义了一个别名按键

  new Vue({
    el:'#root',
    data:{
      name:'尚硅谷'
    },
    methods: {
      showInfo(e){
        // 获取 按键名 及 按键编码
        console.log(e.key,e.keyCode)
        console.log(e.target.value)
      }
    },
  })
</script>
```

## 五、 计算属性（computed）

> 计算属性 需要写在 `computed` 中
>
> 定义：要用的属性不存在，要通过已有属性计算得来。
>
> 原理：底层借助了 `Objcet.defineproperty` 方法提供的`getter`和`setter`

get 函数 执行时间：

1.  初次读取时会执行一次
2.  当依赖的数据发生改变时会被再次调用

优势：与 methods 实现相比，内部有缓存机制（复用），效率更高，调试方便。

注意：

1.  计算属性最终会出现在 vm 上，直接读取使用即可。
2.  如果计算属性要被修改，那必须写 set 函数去响应修改，且 set 中要引起计算时依赖的数据发生改变。

```HTML
<div id="root">
  姓：<input type="text" v-model="firstName"> <br/><br/>
  名：<input type="text" v-model="lastName"> <br/><br/>
  全名：<span>{{fullName}}</span> <br/><br/>
</div>
<script type="text/javascript">
  Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

  const vm = new Vue({
    el:'#root',
    data:{
      firstName:'张',
      lastName:'三',
    },
    computed:{
      // 完整写法
      fullName:{
        get(){
          console.log('get被调用了')
          //此处的this是vm
          return this.firstName + '-' + this.lastName
        },
        // 当fullName被修改时。
        set(value){
          const arr = value.split('-')
          this.firstName = arr[0]
          this.lastName = arr[1]
        }
      }

      // 简写（当 fullName 只会被读取不会被修改时，可以简写）
      fullName(){
    		return this.firstName + '-' + this.lastName
  		}
    }
  })
</script>
```

## 六、 监视属性 （watch）

> 监视属性 需要写在 `watch` 中
>
> `immediate: true` 运行时立即执行，默认为 false（关）
>
> `deep:true` ： 深度监视开关，默认为 false（关）

监视属性 watch：

1.  当被监视的属性 变化 时, 回调函数 自动调用 , 进行相关操作
2.  监视的属性必须存在，才能进行监视！！
3.  监视的两种写法：
    1.  new Vue 时传入 watch 配置
    2.  通过 vm.$watch 监视

深度监视 （`deep:true`）：

1.  Vue 中的 watch 默认 只监视对象，不监测 对象内部 值的改变（一层）。
2.  配置 `deep:true` 可以 监测 对象内部 值改变（多层）。

注意：

- Vue 自身可以监测对象内部值的改变，但 Vue 提供的 watch 默认不可以！
- 使用 watch 时根据数据的具体结构，决定是否采用深度监视。

<iframe height="400" style="width: 100%;" scrolling="no" title="监视天气" src="https://codepen.io/pupperc/embed/zYEXVqO?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pupperc/pen/zYEXVqO">
  监视天气</a> by pupper (<a href="https://codepen.io/pupperc">@pupperc</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
::: details

```HTML
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>天气案例_监视属性_简写</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<br>
			<h2>今天天气很{{info}}</h2> <br>
			<button @click="changeWeather">切换天气</button>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el:'#root',
			data:{
				isHot:true,
			},
			computed:{
				info(){
					return this.isHot ? '炎热' : '凉爽'
				}
			},
			methods: {
				changeWeather(){
					this.isHot = !this.isHot
				}
			},
			watch:{
				//正常写法
				isHot:{
					// immediate:true, //初始化时让handler调用一下
					// deep:true,//深度监视
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				},
				//简写
				isHot(newValue,oldValue){
					console.log('isHot被修改了',newValue,oldValue,this)
				}
			}
		})
	</script>
</html>
```

:::

## 七、 绑定样式

class 样式绑定：

- 写法`:class="xxx"` ，xxx 可以是字符串、对象、数组。

- 字符串写法适用于：类名不确定，要动态获取。

- 对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。

- 数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。

style 样式 绑定：

`:style="{fontSize: xxx}"`，其中 xxx 是动态值。

`:style="[a,b]" `， 其中 a、b 是样式对象。

<iframe height="500" style="width: 100%;" scrolling="no" title="样式绑定" src="https://codepen.io/pupperc/embed/zYEXgbR?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pupperc/pen/zYEXgbR">
  样式绑定</a> by pupper (<a href="https://codepen.io/pupperc">@pupperc</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

::: details

```HTML
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>绑定样式</title>
		<style>
			.basic{
				width: 400px;
				height: 100px;
				border: 1px solid black;
			}

			.happy{
				border: 4px solid red;;
				background-color: #ffff00a4;
				background: linear-gradient(30deg,yellow,pink,orange,yellow);
			}
			.sad{
				border: 4px dashed #02c502;
				background-color: gray;
			}
			.normal{
				background-color: skyblue;
			}

			.atguigu1{
				background-color: yellowgreen;
			}
			.atguigu2{
				font-size: 30px;
				text-shadow:2px 2px 10px red;
			}
			.atguigu3{
				border-radius: 20px;
			}
		</style>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
			<div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/><br/>

			<!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
			<div class="basic" :class="classArr">{{name}}</div> <br/><br/>

			<!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
			<div class="basic" :class="classObj">{{name}}</div> <br/><br/>

			<!-- 绑定style样式--对象写法 -->
			<div class="basic" :style="styleObj">{{name}}</div> <br/><br/>
			<!-- 绑定style样式--数组写法 -->
			<div class="basic" :style="styleArr">{{name}}</div>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false

		const vm = new Vue({
			el:'#root',
			data:{
				name:'尚硅谷',
				mood:'normal',
				classArr:['atguigu1','atguigu2','atguigu3'],
				classObj:{
					atguigu1:false,
					atguigu2:false,
				},
				styleObj:{
					fontSize: '40px',
					color:'red',
				},
				styleObj2:{
					backgroundColor:'orange'
				},
				styleArr:[
					{
						fontSize: '40px',
						color:'blue',
					},
					{
						backgroundColor:'gray'
					}
				]
			},
			methods: {
				changeMood(){
					const arr = ['happy','sad','normal']
					// 随机获取一个 类的下标
					const index = Math.floor(Math.random()*3)
					this.mood = arr[index]
				}
			},
		})
	</script>

</html>
```

:::

## 八、 条件渲染

`v-if` 和 `v-else-if` 和 `v-else` ： 根据条件判断元素是否显示（不展示时元素直接删除）

```HTML
<div v-if="n === 1">Angular</div>
<div v-else-if="n === 2">React</div>
<div v-else-if="n === 3">Vue</div>
<div v-else>哈哈</div>
```

适用于：切换频率较低的场景。

注意：v-if 可以和 v-else-if、v-else 一起使用，但要求结构不能被“打断”。

`v-show` ： 根据条件判断元素是否显示（不显示时，display：none 隐藏）

```HTML
<h2 v-show="false">欢迎来到{{name}}</h2>
<h2 v-show="1 === 1">欢迎来到{{name}}</h2>
```

适用于：切换频率较高的场景。

特点：不展示的 DOM 元素未被移除，仅仅是使用样式隐藏掉

注意：使用 v-if 的时，元素可能无法获取到，而使用 v-show 一定可以获取到。

## 九、 列表渲染

### 1. `v-for` 指令的 key

语法：

```html
v-for="(item, index) in xxx" :key="xxx"
```

说明：

- key 是虚拟 DOM 对象的标识，vue 可以根据 key 准确找到变化的元素，构建新的虚拟 DOM ，并渲染到 真实 DOM 中
- 最好使用每条数据的唯一标识作为 key, 比如 id、手机号、身份证号、学号等唯一值

### 案例 --- 筛选排序

<iframe height="500" style="width: 100%;" scrolling="no" title="筛选排序" src="https://codepen.io/pupperc/embed/BamBjMq?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pupperc/pen/BamBjMq">
  筛选排序</a> by pupper (<a href="https://codepen.io/pupperc">@pupperc</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

::: details

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>列表排序</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!-- 准备好一个容器-->
    <div id="root">
      <h2>人员列表</h2>
      <input type="text" placeholder="请输入名字" v-model="keyWord">
      <button @click="sortType = 2">年龄升序</button>
      <button @click="sortType = 1">年龄降序</button>
      <button @click="sortType = 0">原顺序</button>
      <ul>
        <li v-for="(p,index) of filPerons" :key="p.id">
          {{p.name}}-{{p.age}}-{{p.sex}}
          <input type="text">
        </li>
      </ul>
    </div>
  </body>

    <script type="text/javascript">
      Vue.config.productionTip = false

      new Vue({
        el:'#root',
        data:{
          keyWord:'',
          sortType:0, //0原顺序 1降序 2升序
          persons:[
            {id:'001',name:'马冬梅',age:30,sex:'女'},
            {id:'002',name:'周冬雨',age:31,sex:'女'},
            {id:'003',name:'周杰伦',age:18,sex:'男'},
            {id:'004',name:'温兆伦',age:19,sex:'男'}
          ]
        },
        computed:{
          filPerons(){
            const arr = this.persons.filter((p)=>{
              // 输入框的内容是否在 数组对象的 name 中，如果没有则返回 -1
              return p.name.indexOf(this.keyWord) !== -1
            })
            //判断一下是否需要排序
            if(this.sortType){
              arr.sort((p1,p2)=>{
                return this.sortType === 1 ? p2.age-p1.age : p1.age-p2.age
              })
            }
            return arr
          }
        }
      })
    </script>
 </html>
```

:::

### 2. 监视数据

通过 setter 实现监视，且要在 new Vue 时就传入要监测的数据。

1.  对象中 后追加的属性，Vue 默认不做响应式处理
2.  如需给后添加的属性做响应式，请使用如下 API：

```js
Vue.set(target，propertyName/index，value)
或                                                  vm.$set(target，propertyName/index，value)
```

在 Vue 修改数组中的某个元素一定要用如下方法：

1. 使用这些 API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
1. Vue.set() 或 vm.$set()

注意：

Vue.set() 和 vm.$set() 不能给 vm 或 vm 的根数据对象 添加属性！！！

### 案例 --- 条件渲染

<iframe height="500" style="width: 100%;" scrolling="no" title="条件渲染" src="https://codepen.io/pupperc/embed/NWwKNrQ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pupperc/pen/NWwKNrQ">
  条件渲染</a> by pupper (<a href="https://codepen.io/pupperc">@pupperc</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

::: details

```HTML
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>总结数据监视</title>
		<style>
			button{
				margin-top: 10px;
			}
		</style>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<h1>学生信息</h1>
			<button @click="student.age++">年龄+1岁</button> <br/>
			<button @click="addSex">添加性别属性，默认值：男</button> <br/>
			<button @click="student.sex = '未知' ">修改性别</button> <br/>
			<button @click="addFriend">在列表首位添加一个朋友</button> <br/>
			<button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br/>
			<button @click="addHobby">添加一个爱好</button> <br/>
			<button @click="updateHobby">修改第一个爱好为：开车</button> <br/>
			<button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br/>

			<h3>姓名：{{student.name}}</h3>
			<h3>年龄：{{student.age}}</h3>
			<h3 v-if="student.sex">性别：{{student.sex}}</h3>
			<h3>爱好：</h3>
			<ul>
				<li v-for="(h,index) in student.hobby" :key="index">
					{{h}}
				</li>
			</ul>
			<h3>朋友们：</h3>
			<ul>
				<li v-for="(f,index) in student.friends" :key="index">
					{{f.name}}--{{f.age}}
				</li>
			</ul>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el:'#root',
			data:{
				student:{
					name:'tom',
					age:18,
					hobby:['抽烟','喝酒','烫头'],
					friends:[
						{name:'jerry',age:35},
						{name:'tony',age:36}
					]
				}
			},
			methods: {
				addSex(){
					// Vue.set(this.student,'sex','男')
					this.$set(this.student,'sex','男')
				},
				addFriend(){
					this.student.friends.unshift({name:'jack',age:70})
				},
				updateFirstFriendName(){
					this.student.friends[0].name = '张三'
				},
				addHobby(){
					this.student.hobby.push('学习')
				},
				updateHobby(){
					// this.student.hobby.splice(0,1,'开车')
					// Vue.set(this.student.hobby,0,'开车')
					this.$set(this.student.hobby,0,'开车')
				},
				removeSmoke(){
					this.student.hobby = this.student.hobby.filter((h)=>{
						return h !== '抽烟'
					})
				}
			}
		})
	</script>
</html>
```

:::

## 九、 收集表单数据

- `<input type="text"/>` 输入框

  - 则 v-model 收集的是 value 值，用户输入的就是 value 值。

- `<input type="radio"/>` 单选框
  - 则 v-mode l 收集的是 value 值，且要给标签配置 value 值。

```HTML
<input type="radio" name="sex" v-model="userInfo.sex" value="male">
```

- `<input type="checkbox"/>` 多选框

  - 没有配置 input 的 value 属性，
    - 那么收集的就是 checked（勾选 or 未勾选，是布尔值）

  ```HTML
  <input type="checkbox" v-model="userInfo.hobby">
  ```

  - 配置 input 的 value 属性:
    - v-model 的初始值是 非数组，那么收集的就是 checked（勾选 or 未勾选，是布尔值）
    - v-model 的初始值是 数组，那么收集的的就是 value 组成的数组

v-model 的三个修饰符：

- `lazy`：失去焦点再收集数据

- `number`：输入字符串转为有效的数字

- `trim`：输入首尾空格过滤

### 案例 --- 收集表单数据

<iframe height="500" style="width: 100%;" scrolling="no" title="收集表单数据" src="https://codepen.io/pupperc/embed/yLPBJWx?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pupperc/pen/yLPBJWx">
  收集表单数据</a> by pupper (<a href="https://codepen.io/pupperc">@pupperc</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

::: details

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>收集表单数据</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!-- 准备好一个容器-->
    <div id="root">
      <form @submit.prevent="demo">
        账号：
        <input type="text" v-model.trim="userInfo.account" />
        <br />
        <br />
        密码：
        <input type="password" v-model="userInfo.password" />
        <br />
        <br />
        年龄：
        <input type="number" v-model.number="userInfo.age" />
        <br />
        <br />
        性别： 男
        <input type="radio" name="sex" v-model="userInfo.sex" value="male" />
        女
        <input type="radio" name="sex" v-model="userInfo.sex" value="female" />
        <br />
        <br />
        爱好： 学习
        <input type="checkbox" v-model="userInfo.hobby" value="study" />
        打游戏
        <input type="checkbox" v-model="userInfo.hobby" value="game" />
        吃饭
        <input type="checkbox" v-model="userInfo.hobby" value="eat" />
        <br />
        <br />
        所属校区
        <select v-model="userInfo.city">
          <option value="">请选择校区</option>
          <option value="beijing">北京</option>
          <option value="shanghai">上海</option>
          <option value="shenzhen">深圳</option>
          <option value="wuhan">武汉</option>
        </select>
        <br />
        <br />
        其他信息：
        <textarea v-model.lazy="userInfo.other"></textarea>
        <br />
        <br />
        <input type="checkbox" v-model="userInfo.agree" />
        阅读并接受
        <a href="http://www.atguigu.com">《用户协议》</a>
        <button>提交</button>
      </form>
    </div>
  </body>

  <script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
      el: '#root',
      data: {
        userInfo: {
          account: '',
          password: '',
          age: 0,
          sex: 'female',
          hobby: [],
          city: 'beijing',
          other: '',
          agree: '',
        },
      },
      methods: {
        demo() {
          console.log(JSON.stringify(this.userInfo))
        },
      },
    })
  </script>
</html>
```

:::

## 十、 过滤器 `filter`

> `filters` : 对要显示的数据进行特定的格式化处理后再显示

[day.js 中文官网](https://dayjs.fenxianglu.cn/)

语法：

```html
// 注册过滤器 Vue.filter(name, callback) 或 new Vue{filters:{}} // 使用过滤器 {{ xxx | 过滤器名}} 或
v-bind:属性 = "xxx | 过滤器名"
```

注意：

1. 过滤器也也可以接收额外参数，多个过滤器也可以串联
2. 过滤器没有改变原来的数据，而是产生了新的对应的数据

全局过滤器：

```js
Vue.filter('mySlice', function (value) {
  return value.slice(0, 4)
})
```

局部过滤器：

```js
filters:{
				timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
					return dayjs(value).format(str)
				}
			}
```

::: details

```HTML
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>过滤器</title>
		<script type="text/javascript" src="../js/vue.js"></script>
		<script type="text/javascript" src="../js/dayjs.min.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>显示格式化后的时间</h2>
			<!-- 计算属性实现 -->
			<h3>现在是：{{fmtTime}}</h3>
			<!-- methods实现 -->
			<h3>现在是：{{getFmtTime()}}</h3>
			<!-- 过滤器实现 -->
			<h3>现在是：{{time | timeFormater}}</h3>
			<!-- 过滤器实现（传参） -->
			<h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
			<h3 :x="msg | mySlice">尚硅谷</h3>
		</div>

		<div id="root2">
			<h2>{{msg | mySlice}}</h2>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false
		//全局过滤器
		Vue.filter('mySlice',function(value){
			return value.slice(0,4)
		})

		new Vue({
			el:'#root',
			data:{
				time:1621561377603, //时间戳
				msg:'你好，尚硅谷'
			},
			computed: {
				fmtTime(){
					return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
				}
			},
			methods: {
				getFmtTime(){
					return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
				}
			},
			//局部过滤器
			filters:{
				timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
					// console.log('@',value)
					return dayjs(value).format(str)
				}
			}
		})
	</script>
</html>

```

:::

## 十一、 内置指令

| 指令      | 说明                                     |
| --------- | ---------------------------------------- |
| `v-bind`  | 单向动态绑定，简写 `:`                   |
| `v-model` | 双向数据绑定                             |
| `v-for`   | 遍历数组、对象、字符串                   |
| `v-on`    | 绑定事件监听，简写 `@`                   |
| `v-if`    | 条件渲染（动态控制节点是否存在           |
| `v-else`  | 条件渲染（动态控制节点是否存在）         |
| `v-show`  | 条件渲染（动态控制节点是否显示）         |
| `v-text`  | 向所在节点渲染文本内容（html 标签无效）  |
| `v-html`  | 向所在节点渲染文本内容（html 标签有效）  |
| `v-cloak` | 防止页面展示 vue 内容，如{{xxx}}, 没有值 |
| `v-once`  | 所在节点初次渲染后，将不再更新           |
| `v-pre`   | 跳过没有语法、指令的节点，加快编译速度   |

`v-cloak` ：

1. 本质是一个特殊属性，Vue 实例创建完毕并接管容器后，会删掉 v-cloak 属性。
2. 使用 css 配合 v-cloak 可以解决网速慢时页面展示出{{xxx}}的问题。

```html
<div id="root">
  <h2 v-cloak>{{name}}</h2>
</div>
```

`v-once` ：

1. v-once 所在节点在初次动态渲染后，就视为静态内容了。
2. 以后数据的改变不会引起 v-once 所在结构的更新，可以用于优化性能。

```html
<div id="root">
  <h2 v-once>初始化的n值是:{{n}}</h2>
  <h2>当前的n值是:{{n}}</h2>
  <button @click="n++">点我n+1</button>
</div>
```

`v-pre` ：

1. 跳过其所在节点的编译过程。
2. 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

```html
<div id="root">
  <h2 v-pre>Vue其实很简单</h2>
  <h2>当前的n值是:{{n}}</h2>
  <button @click="n++">点我n+1</button>
</div>
```

## 十二、 自定义指令

自定义局部指令：

```js
new Vue({
	directives:{指令名:配置对象}
})
或
new Vue({
   directives{指令名:回调函数}
})
```

例：

```js
directives:{
    //big函数调用时间：1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
    'big-number'(element,binding){
        element.innerText = binding.value * 10
    },
    big(element,binding){
        console.log('big',this) //注意此处的this是window
        element.innerText = binding.value * 10
    },
}
```

自定义全局指定：

```js
Vue.directive(指令名, 配置对象)
或
Vue.directive(指令名, 回调函数)
```

```js
Vue.directive('fbind', {
  //指令与元素成功绑定时（一上来）
  bind(element, binding) {
    element.value = binding.value
  },
  //指令所在元素被插入页面时
  inserted(element, binding) {
    element.focus()
  },
  //指令所在的模板被重新解析时
  update(element, binding) {
    element.value = binding.value
  },
})
```

配置对象中常用的 3 个回调：

1. `bind`：指令与元素成功绑定时调用。
2. `inserted`：指令所在元素被插入页面时调用。
3. `update`：指令所在模板结构被重新解析时调用。

注意：

1. 指令定义时不加 v-，但使用时要加 v-；
2. 指令名如果是多个单词，要使用 kebab-case 命名方式，不要用 camelCase 命名。
