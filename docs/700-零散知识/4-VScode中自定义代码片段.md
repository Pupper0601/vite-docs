---
title: VScode 使用技巧 - 自定义 markdown 代码判断
categories:
  - 经验分享
tags:
  - vscode
  - markdown
abbrlink: de0897b0
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-142.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#302427'
---

# 一. 创建配置文件

## 1. 选择 "配置用户代码片段"

![](https://img.pupper.cn/img/202304031751540.png)

## 2. 创建配置文件

输入文件名,创建 markdown 配置文件

```json
markdown.json
```

![](https://img.pupper.cn/img/202304031756408.png)

- 类型一：全局作用域
  - 这种类型的代码块是创建在 vscode 软件内部的文件。是跟随这当前安装的 vscode 这个软件的，不会随着项目的关闭而失效，会一直存在。
- 类型二：文件夹作用域
  - 这种类型的代码块是创建在某个文件下.vscode 这个隐藏文件夹中的，这个代码块只适用于当前文件夹，出了这个文件夹就不能使用这个代码块了
- 类型三：特定文件类型作用域 - 这种类型的代码块跟全局作用域的文件路径是一致的，都是创建在了 vscode 中，会一直存在。但是这种代码块只适合于你指定的文件类型。比如：如果你创建的是 JavaScript 类型，那这个代码块就不能再 vue 文件中使用。
  _注意三种类型的代码块书写规范都是一致的_

## 3. 编写自定义代码块

```json
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }

	"行内文本": {
		"prefix": "span",
		"body": [
			"{% span ${1|red,yellow,green,cyan,blue,gray|}, $2 %}",
		],
		"description": "行内文本"
	},
```

- `prefix`： 触发代码块的字符串。写代码的时候我们只需敲出这个字符串就会触发我们的代码块。
- `body`：代码块的主体内容。我们需要把我们的代码书写在这个属性中。仔细观察我们可以看出，代码块主体就是字符串的数组。
- `description`：代码块的简单介绍，我们可以介绍一下这段代码块是干什么用的

![](https://img.pupper.cn/img/202304031759595.png)

## 4. 自定义代码块的使用

![](https://img.pupper.cn/img/202304031810513.gif)

# 二. 一些使用技巧

代码主体的书写规范：

- 每个字符串元素就代表一行，行与行之间用" , "隔开表示换行。或者使用\n 换行
- 行内不能使用 tab 键缩进，只能使用空格或者\t 缩进
- $1 使用代码块敲击回车或者 tab 键后光标定位的位置。$2 $3 $4…表示我们按下 tab 光标依次出现的位置
- ${1|one,two,three|}: 占位符(Placeholders)可以有多选值，每个选项的值用 , 分隔，选项的开始和结束用管道符号(|)将选项包含。

1. 在不同的`$`之间切换用 `tab键`， 如果想反向切换使用`shift +tab`键。
2. `${1:defaultVal}` 可以直接设置当前位置的默认值。
3. `${1|GET,POST,PUT,DELETE,UPDATE|}`可以给默认可选项供人选择。其中`|`之间用逗号分隔的字符为选项
4. `\n`换行, `\t`制表符。 支持转义字符。比如如果想输出`this.$message.success("xx")`这行代码。 就需要在`body`中添加`"this.\\$message.success(\"xx\")"`
5. 在不同的文件中设置不同的`scope`可以有效防止出错或混淆，最好设置下。常用的 scope 有`vue, script, css, javascript, typescript, html, json`等 如果不设置， 默认在任何文件中都生效。
6. 如果`prefix`设置的代码片段名称一致， 不会造成覆盖和报错， 而是会与插件中的同名代码片段和其他同名代码片段同时出现在提示代码中, 所以要写好描述和名称来进行区分。
7. `$0`最好在每个代码片段中都设置一下， 否则。会造成无法结束代码片段操作，每次都要多操作一次才能结束。
8. `Trigger Suggest`: 当网络比较卡或者你当前的代码片段不显示时， 可以使用`trigger suggest`触发建议快捷键来查看当前文本的代码片段是什么。 快捷键打开方式(首选项 -> Keyboard Shortcuts)。 这是推荐的做法。 当然也有比较 low 的做法， 删一个字符串， 也能重新看到代码片段提示。
9. _重要_: 自己写代码片段有时是比较容易出错的且费时费力， 还好有现成的网站， 可以把我们的代码直接生成代码片段 [snippet-generator](http://snippet-generator.app/)

::: details 一些较常用变量， 使用语法: ${TM_SELECTED_TEXT}
TM_SELECTED_TEXT 当前选定的文本或空字符串
TM_CURRENT_LINE 当前行的内容
TM_CURRENT_WORD 光标下的单词的内容或空字符串
TM_LINE_INDEX 基于零索引的行号
TM_LINE_NUMBER 基于一索引的行号
TM_FILENAME 当前文档的文件名
TM_FILENAME_BASE 当前文档的文件名（不含后缀名)
TM_DIRECTORY 当前文档的目录
RELATIVE_FILEPATH 当前文件的相对目录
TM_FILEPATH 当前文档的完整文件路径
CLIPBOARD 剪切板里的内容

CURRENT_YEAR 当前年(四位数)
CURRENT_MONTH 当前月
CURRENT_DATE 当前日
CURRENT_DAY_NAME_SHORT 当天的短名称（’Mon’）
CURRENT_HOUR 当前小时
CURRENT_MINUTE 当前分钟
CURRENT_SECOND 当前秒

插入随机值
RANDOM 6 位随机 10 进制数
RANDOM_HEX 6 位 16 进制数
UUID 一个版本 4 的 UUID

/\*_
286055
f570d8
0a831688-a7f1-4668-9964-f6100114792c
_/

BLOCK*COMMENT_START 块注释开始标识,如 PHP /* 或 HTML <!--
BLOCK_COMMENT_END 块注释结束标识,如 PHP _/ 或 HTML -->
LINE_COMMENT 行注释，如： PHP // 或 HTML <!-- -->
:::

# 三. 问题解决

## 3.1 解决 "自定义代码片段不生效的问题"

在 `settings.json` 配置文件中加入一下代码即可

```json
"[markdown]": {
        "editor.quickSuggestions": true,
    },
```

![](https://img.pupper.cn/img/202304031826459.png)
