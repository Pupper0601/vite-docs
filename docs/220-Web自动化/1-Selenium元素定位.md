---
title: WebUI测试 - selenium 元素定位
categories:
  - 学习笔记
  - 软件测试
tags:
  - WebUI测试
abbrlink: d885fa73
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-292.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#21215e'
---

# Seleniumy 元素定位

[Chrome 浏览器元素定位插件 -- Ranorex Selocity](https://chrome.google.com/webstore/detail/ranorex-selocity/ocgghcnnjekfpbmafindjmijdpopafoe)

地址 ： https://chrome.google.com/webstore/detail/ranorex-selocity/ocgghcnnjekfpbmafindjmijdpopafoe

![image-20210817164326539](https://img.pupper.cn/img/20210817164326.png)

## 一、 webUI 自动化

### 1. 什么是 UI 自动化测试

1.  通过代码来模拟人的手工操作，执行测试内容
2.  自动化是为了代替重复的手工操作，提高测试效率，不是为了装 x

### 2. UI 自动化的价值

1.  回归速度的对比，以前进行全量回归测试需要 x 天，现在有没有减少
2.  负责功能测试的同事，是不是有更多的时间测试新需求了
3.  自动化测试不是为了发现 bug，而是为手工测试节省回归时间

### 3. UI 自动化原理 selenium 与 webdriver

> `selenium` 是一个用于 web 测试的工具，测试运行在浏览器当中
>
> `webdriver` 对浏览器原生的 api 进行封装，使用这套 api 可以操作浏览器的操作页面元素、截屏等

我们使用 selenium 进行自动化，主要涉及三个方面：

1.  测试脚本，就是你我写的代码
2.  浏览器，目前支持所有的主流浏览器
3.  浏览器驱动，充当翻译官的角色
    1.  脚本将指令发给驱动，驱动操作浏览器
    2.  浏览器执行后将结果返回给驱动，驱动再告诉脚本

## 二、 元素定位

### 1. id 定位

通过了解 HTML 可以知道 id 是唯 一表示，通过查找 id 的方法进行查找

```python
find_element_by_id()

ele = driver.find_element_by_id("kw")
```

### 2. name 定位

name 在 HTML 中通常指元素的名称

```python
find_element_by_name()

driver.find_element_by_name("username").send_keys("libai")
driver.find_element_by_name("password").send_keys("opmsopms123")
```

### 3. tag 定位（标签）

通过 HTML 可以了解到 tag 定义不同页面的元素。

```python
driver.find_element_by_tag_name("")
```

### 4. class 定位

通过 HTML 了解到 class 是指元素的类名

若 class 属性有空格，证明是复合类，多个值以空格区分

```python
find_element_by_class_name()

driver.find_element_by_class_name("btn-login").click()
```

### 5. link_text 定位

link_text 从字面意思上了解到是通过文本的形式进行定位的

text 可以获取元素的文本值

```python
find_element_by_link_text()

print(driver.find_element_by_link_text("OPMS官网").text)
```

### 6. partial_link 定位

partial_link 是属于 link_text 的补充定位方法，定位一些文本比较长的内容

```
find_element_by_partial_link_text()
```

## 三、 xpath 高级语法

XPath 使用路径表达式来选取 XML 文档中的节点或者节点集。

### 1. 标准语法

```python
Xpath=//tagname[@attribute='value']
```

- `//` ： 选择当前节点
- `Tagname` ： 节点标签名
- `@` ： 选择属性
- `Attribute` ：节点属性名
- `value` ： 属性值

> xpath 定位方式， webdriver 会将整个页面的 **所有元素** 进行扫描以定位我们所需要的元素， 这是个 **非常费时** 的操作， 如果脚本中大量使用 xpath 做元素定位的话， 脚本的执行速度会明显变慢。

#### 2. xpath 绝对路径定位元素

绝对路径 ： 从根节点一层层地搜索到需要被定位的页面元素，

绝对路径 `正斜杠(/)` 开始，每一步均被斜杠分割。

xpath 定位表达式：

```css
/html/body/div/input[@value="查询"]
```

python 定位语句：

```python
element = driver.find_element_by_xpath('/html/body/div/input[@value="查询"]')
```

> 1.  路径表达式`“/”`表示跟节点。
>
> 2.  使用绝对历经定位是十分脆弱的，因为即便页面代码结构只发生了微小的变化，也可能会造成原先有效的 xpath 定位表达式定位失败。

#### 3. xpath 相对路径定位元素

相对路径 ：以 `//` 开始，可以从 HTML 任何位置开始

xpath 定位表达式：

```css
//div[@value='查询']
```

python 定位语句：

```python
element = driver.find_element_by_xpath('//div[@value='查询']')
```

> 1.  `input[@value="查询"]` 表示定位 value 值为 “查询” 两个字的 input 页面元素。
>
> 2.  相对路径的 xpath 定位表达式更加简洁，不管页面发生了何种变化，只要 input 标签的 value 属性值没变，始终都可以定位到。

#### 4. xpath 使用索引号定位元素

索引号 ： 表示某个被定位的页面元素在其父元素节点下的同名元素中的位置符号，需要从 1 开始。

xpath 定位表达式：

```css
//input[1]
```

python 定位语句：

```python
element=driver.find_element_by_xpath("//input[1]")
```

上述 xpath 定位表达式表示查找页面中 第二个 出现的 input 元素

基于实例中的被测网页，下面给出更多的通过索引号定位的实例

| 预期定位圆面的元素                                 | 定位表达式实例              | 使用的属性值                                                                   |
| -------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------ |
| 定位第二个 div 下的超链接                          | `//div[last()]/a`           | `div[last()]`表示最后一个 div 元素，last（）函数获取的是指定元素的最后的索引号 |
| 定位第一个 div 中的超链接                          | `//div[last()-1]/a`         | `div[last()-1]`表示倒数第二个 div 元素                                         |
| 定位最前面一个属于 div 元素的子元素中的 input 元素 | `//div/input[position()<2]` | `position（）`函数获取当前元素 input 的位置序号                                |

#### 5. xpath 使用页面元素的属性值定位元素

xpath 定位表达式：

```css
//input[@alt='div1-img1']
```

python 定位语句：

```python
img = driver.find_element_by_xpath("//input[@alt='div1-img1']")
```

下面给出更多的定位实例。

| 预定位的页面元素                     | 定位表达式实例                                                                  | 使用的属性值                                         |
| ------------------------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 定位页面的第一张图片                 | `//img[@href="http://www.sogou.com"] `                                          | 使用 img 标签的属性 href 值                          |
| 定位第二个 div 中第一个 input 输入框 | `//div[@id="div2"]/input[@name="div2input"]` 或者 `//inuput[@name="div2input"]` | 使用 div 变迁的 name 值使用 input 标签的 name 属性值 |
| 定位第一个 div 中的第一个链接        | `//div[@id="div1"]/a[@href="http://www.sogou.com"]`                             | 使用 div 标签的 ID 属性值使用 a 标签的 href 属性值   |
| 定位页面的查询按钮                   | `//input[@type="button"]`                                                       | 使用 input 标签的 type 属性值                        |

#### 6. xpath 使用模糊属性值定位元素

模糊属性值定位方式 ： 表示使用属性值的一部分内容定位。

| xpath 函数                  | 定位表达式实例                    | 表达式解释                                                                 |
| --------------------------- | --------------------------------- | -------------------------------------------------------------------------- |
| `starts-with（str1，str2）` | `//img[starts-with(@alt,"div1")]` | 查找属性 alt 的属性值以 div1 关键字开始的页面元素                          |
| `contains（str1，str2）`    | `//img[contains(@alt,"img")]`     | 查找 alt 属性的属性值包含 img 关键字的页面元素，只要包含即可，无需考虑位置 |

contains 函数属于 xpath 的高级用法，使用场景比较多，尽管页面元素的属性值经常变化，但只要其属性值有几个固定不变的关键词，就可以使用 cotains 函数进行定位。

#### 7. xpath 使用 xpath 轴定位元素

轴可以定义相对于当前节点的节点集。

使用 xpath 定位方式可以根据再文档树中的元素相对位置关系进行页面元素定位。先找到一个相对好定位的元素，让它作为轴，根据它和要定位元素间的相对位置关系进行定位，可解决一些点定位难的问题。

我们根据被测页面的代码来画一下结构图：

![img](https://img.pupper.cn/img/1421063-20181130123046854-2037592568.png)

xpath 常用轴关键字：

| xpath 轴关键字    | 轴的含义说明                           | 定位表达式实例                                               | 表达式解释                                                                                                    |
| ----------------- | -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| parent            | 选择定钱节点的上一层父节点             | `//img[@alt='div2-img2']/parent::div`                        | 查找到属性 alt 的属性值为 div2-img2 的 img 元素，并基于该 img 元素的位置找到它上一级的 div 页面元素           |
| child             | 选择当前节点的下层所有子节点           | `//div[@id='div1']/child::img`                               | 查找到 ID 属性值为 div1 的 div 元素，并基于 div 的位置找到它下层节点中的 img 页面元素                         |
| ancestor          | 选择当前节点所有上层节点               | `//img[@alt='div2-img2']/ancestor::div`                      | 查找到属性 alt 的属性值为 div2-img2 的 img 元素，并基于该 img 元素的位置找到它上级的 div 元素                 |
| descendant        | 选择当前节点所有下层的节点（子，孙等） | `//div[@name='div2']/descendant::img`                        | 查找到属性 name 的属性值为 div2 的 div 元素，并基于该元素的位置找到它下级所有节点中的 img 页面元素            |
| following         | 选择当前节点之后显示的所有节点         | `//div[@id='div1']/following::img`                           | 查找到 ID 属性值为 div1 的 div 页面元素，并基于 div 的位置找到它后面节点中的 img 页面元素                     |
| following-sibling | 选择当前节点后续所有兄弟节点           | `//a[@href='http://www.sogou.com']/following-sibling::input` | 查找到链接地址为 http://www.sogou.com 的链接页面元素 a，并基于链接的位置找到它后续兄弟节点中的 input 页面元素 |
| preceding         | 选择当前节点前面的所有节点             | `//img[@alt='div2-img2']/preceding::div`                     | 查找到属性 alt 的属性值为 div2-img2 的图片页面元素 img，并基于图片的位置找到它前面节点中的 div 页面元素       |
| preceding-sibling | 选择当前节点前面的 所有兄弟节点        | `//input[@value='查询']/preceding-sibling::a[1]`             | 查找到 value 属性值为“查询”的输入框页面元素，并基于该输入框的位置找到他前面同级节点中的第一个链接页面元素     |

有时候我们会再轴后面加一个星号*， 便是通配符，如：`//input[@value="查询"]/preceding::*`，它表示查找属性 value 的值为“查询”的输入框 input 元素前面所有的同级元素，但不包括 input 元素本身

#### 8. xpath 使用页面元素的文本定位元素

通过 text()函数可以定位到元素文本包含某些关键内容的页面元素。

xpath 表达式：

```css
//a[text()="搜狗搜索"]

//a[.="搜狗搜索"]

//a[contains(.,"百度")]

//a[contains(text(),'百度')]

//a[contains(text(),"百度")]/preceding::div

//a[contains(. , "百度")]/..
```

python 定位语句：

```python
sogou_a=driver.find_element_by_xpath('//a[text()="搜狗搜索"]')
sogou_a=driver.find_element_by_xpath('//a[.="搜狗搜索"]')
baidu_a=driver.find_element_by_xpath('//a[contains(.,"百度")]')
baidu_a=driver.find_element_by_xpath('//a[contains(text(),'百度')]')
div=driver.find_element_by_xpath('//a[contains(text(),"百度")]/preceding::div')
div=driver.find_element_by_xpath('//a[contains(. , "百度")]/..')
```

代码解释

xpath 表达式 1 和表达式 2 等价，都是查找文本内容为“搜狗搜索”的链接页面元素，使用的是精准匹配方式，也就是说文本内容必须完全匹配，不能多一个字也不能少一个字。第二个 xpath 语句中使用了以个点. 这里的点等价于 text()，都指代的是当前节点的文本内容

xpath 表达式 3 和表达式 4 等价，都是查找文本内容包含“百度”关键字的链接页面元素，使用的是模糊匹配方式，即可以根据部分文本关键字进行匹配。

xpath 表达式 5 和表达式 6 等价，都是查找文本内容包含“百度”关键字的链接页面元素 a 的上层父元素 div，6 最后使用了两个点。。，它表示选取当前节点的父节点，等价于 preceding::div。

使用文本内容匹配模式进行定位，为定位复杂元素又提供了一种强大的定位模式，再遇到定位困难时，可以优先考虑使用此方式进行定位。建议大家对此定位方式进行练习，一边做到随意定位页面的任意元素。

## 四、 css 定位

Css 是一种语言，通常 Css 定位方法的速度比 xpath 的快，就是稍微有点难，爬虫中的 pyquery 就是通过 Css 的方法来实现的。

```python
find_element_by_css_selector()
```

### 1. 使用绝对路径定位元素

CSS 定位方式：

```css
html > body > div >input[value="查询"]
```

Python 定位语句：

```python
element = driver.find_element_by_css_selector('html > body > div >input[value="查询"]')
```

从 CSS 定位表达式可以看出，步间通过“>"分割，区别于 XPATH 路径中的正”/“，并且也不再使用@符号选择属性。

### 2. 使用相对路径定位元素

CSS 定位表达式：

```css
input[value="查询"]
```

Python 定位语句：

```python
element = driver.find_element_by_css_selector('input[value="查询"]')
```

### 3. 使用 class 名称定位元素

CSS 定位表达式：

```css
css.spread
```

python 定位语句：

```python
element = driver.find_element_by_css_selector('css.spread')
```

用点`.`分割元素名与 class 属性名，点号后面是 class 属性名称

### 4. 使用 ID 属性值定位元素

CSS 定位语句：

```css
input#div1input
```

Python 定位语句：

```python
element = driver.find_element_by_css_selector('input#div1input')
```

使用`#`号分割 元素名 和 ID 属性值，# 后面是 ID 属性值

### 5. 使用页面其他属性值定位元素

CSS 定位表达式：

```css
img[alt="div1-img1"]
img[alt="div1-img1"][href="http://www.sogou.com"]
```

Python 定位语句：

```python
element = driver.find_element_by_css_selector('img[alt="div1-img1"]')
element = driver.find_element_by_css_selector('img[alt="div1-img1"][href="http://www.sogou.com"]')
```

- 表达式 1 和表达式 2 是等价的，都是定位第一个 img 元素

- 表达式 1：表示使用 img 页面元素的 alt 元素的属性值 div1-img1 进行定位。
  - 若定位的页面元素始终具有唯一的属性值，此定位方式可以解决很多频繁变动的页面元素
- 表达式 2：表示同时使用了 img 页面元素的 alt 和 href 属性进行页面元素的定位。
  - 在某些复杂的定位场景，可使用多个属性来确保定位元素的唯一性。

### 6. 使用属性值的一部分内容定位元素

CSS 定位表达式：

```css
a[href^="http://www.so"]
a[href$="gou.com"]
a[href*="sogou"]
```

Python 定位语句：

```python
element = driver.find_element_by_css_selector('a[href^="http://www.so"]')
element = driver.find_element_by_css_selector('a[href$="gou.com"]')
element = driver.find_element_by_css_selector('a[href*="sogou"]')
```

1.  `^`指明从字符串的开始匹配

2.  `$`指明在字符串的结尾匹配

3.  `*`指明在需要进行模糊查询

使用此模糊定位方式，可匹配动态变化的属性值的页面元素，只要找到属性值固定不变的关键部分，就可以进行模糊匹配定位。

### 7. 使用页面元素进行子页面元素的查找

CSS 定位表达式：

```css
1 div#div1>input#div1input
2 div input
```

Python 定位语句：

```python
1 element=driver.find_element_by_css_selector("div#div1>input#div1input")
2 element=driver.find_elements_by_css_selector("div input")
```

1.  表达式 1 中的 div#div1，表示在被测试网页上定位到 ID 属性值为 div1 的 div 页面元素，> 表示在以查找到的 div 元素的子页面元素中进行查找，input#div1input 表示查找 ID 属性值为 div1input 的 input 页面元素，此方法可实现查找 div 下子页面元素的办法

2.  表达式 2 表示匹配所有属于 div 元素后代的 input 元素，表达式中父元素 div 和子元素 input 中间需用空格分割，注意此表达式是定位一组 input 元素，并不是单个 input 元素

### 8. 使用伪类定位元素

CSS 定位表达式：

```css
div#div1 :first-child
div#div1 :nth-child(2)
div#div1 :last-child
input:focus
input:enabled
input:checked
input:not([id])
```

Python 定位语句：

```python
element=driver.find_element_by_css_selector("div#div1 :first-child")
element=driver.find_element_by_css_selector("div#div1 :nth-child(2)")
element=driver.find_element_by_css_selector("div#div1 :last-child")
element=driver.find_element_by_css_selector("input:focus")
element=driver.find_elements_by_css_selector("input:enabled")
element=driver.find_elements_by_css_selector("input:checked")
element=driver.find_elements_by_css_selector("input:not([id])")
```

伪类表达式 ：是 CSS 语法支持的定位方式，前 3 个表达式特别注意的是 **在冒号前一定要有一个空格**，否则定位不到想要定位的元素

1.  表达式 1 表示查找 ID 属性值为 div1 的 div 页面元素下的第一个子元素，根据被测试网页定位的是 div 下的 input 元素，first-child 表示查找某个页面元素下的第一个子页面元素

2.  表达式 2 表示查找 ID 属性值为 div1 的 div 页面元素下的第二个子元素，参照被测网页，定位到的页面元素是一个链接元素

3.  表达式 3 表示查找 ID 属性值为 div1 的 div 页面元素下的最后一个子元素，根据被测试网页定位的是一个按钮元素；last-child 表示的是查找某个页面元素下的最后一个子页面元素

4.  表达式 4 表示查找当前获取焦点的 input 页面元素

5.  表达式 5 表示查找可操作的 input 元素

6.  表示查找处于勾选状态的 checkbox 页面元素

7.  表示查找所有无 id 属性的 input 页面元素

### 9. 查找同级兄弟页面元素

CSS 定位表达式：

```css
div1#div1 > input + a
div1#div1 > input + a + img
div1#div1 > input + * + img
ul#recordlist > p~li
```

Python 定位语句：

```python
element=driver.find_element_by_css_selector("div1#div1 > input + a")
element=driver.find_element_by_css_selector("div1#div1 > input + a + img")
element=driver.find_element_by_css_selector("div1#div1 > input + * + img")
element=driver.find_elements_by_css_selector("ul#recordlist > p~li")
```

1.  表达式 1 表示在 ID 属性值为 div1 的页面元素下，查找 input 页面元素后的同级的且相邻的链接元素 a

2.  表达式 2 表示在 ID 属性值为 div1 的页面元素下，查找 input 元素和链接元素 a 后面相邻的图片元素 img

3.  表达式 3 表示在 ID 属性值为 div1 的页面元素下，创造找 input 页面元素和任意一种页面元素后面的同级且相邻的图片元素 img，

    1.  `*` 表示任意类型的一个页面元素，只能表示一个元素，如果想用此方法查找第一个 div 下的最后一个 input 元素，表达式写法为

        ```css
        div#div1 > input + * + * + input
        或
        div#div1 > input + a + * + input
        或
        div#div1 > input + a + img + input
        ```

4.  表达式 4 表示 ID 属性值为 recordlist 的 ul 页面元素下，查找 p 页面元素以后所有的 li 元素

### 10. 多元素选择器

CSS 定位表达式支持多元素选择器，也就是一次可以同时选择多个相同的标签，也可以同时选择多个不同的标签，不同标签间用英文的逗号隔开

CSS 定位表达式：

```css
div#div1，input，a
```

Python 定位语句：

```python
element=driver.find_elements_by_css_selector("div#div1，input，a')
```

上面的 css 表达式表示同时查找所有 ID 属性值为 div1 的 div 元素，所有的 input 元素，所有的 a 元素

## 五、 另类定位方法

### 1. 导入 By 方法

```python
from selenium.webdriver.common.by import By
```

### 2. 使用方法

```python
inputElement = driver.find_element(By.ID, "58680504-89fc-42d4-ab86-afc9456f880e")
```

```python
# 同样也有对应的获取列表的方法
inputElementSli = driver.find_elements(By.NAME, "pwd")
```
