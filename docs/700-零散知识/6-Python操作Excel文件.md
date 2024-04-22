---
title: Python 操作 Excel 文件库 - openpyxl
categories:
  - 学习笔记
tags:
  - openpyxl
abbrlink: c1f6bdd6
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-215.webp
date: '2023-05-05 19:03:17'
update: '2023-05-05 19:03:22'
main_color: '#363530'
---

[Python 操作 Excel 文件库 - openpyxl](https://openpyxl.readthedocs.io/en/stable/tutorial.html)

# 一. 安装

```sh
pip install openpyxl
```

# 二. 基本操作

## 2.1 创建工作簿

::: info
创建工作簿时, 会自动产生一个 sheet, 可以通过 `active` 获取
:::

```Python
import openpyxl

# 创建工作簿
wx = openpyxl.Workbook()

# 获取默认 工作表
sheet = wx.active
```

## 2.2 创建工作表

```Python
sh1 = wb.create_sheet("工作表 1")  # 在最后插入工作表
sh2 = wb.create_sheet("工作表 2", 0)   # 在首位插入工作表
sh3 = wb.create_sheet("工作表 3", -1)  # 在倒数第二个位置插入工作表
```

### 2.2.1 修改工作表名

```Python
sh3 = wb.create_sheet("工作表 3", -1)  # 在倒数第二个位置插入工作表

sh3.title = "表 3"
```

### 2.2.2 查看工作表名

```Python
print(wb.sheetnames)

"""
['工作表 2', 'Sheet', '表 3', '工作表 1']
"""
```

```Python
for sheet in wb:
    print(sheet.title)

"""
工作表 2
Sheet
表 3
工作表 1
"""
```

### 2.2.3 复制工作表

::: tip

- 仅复制单元格（包括值、样式、超链接和注释）和某些工作表属性(包括维度、格式和属性)
- 不会复制所有其他工作簿/工作表属性 - 例如图像、图表。
  :::

```Python
target = wb.copy_worksheet(sh1)
print(wb.sheetnames)

"""
['工作表 2', 'Sheet', '表 3', '工作表 1', '工作表 1 Copy']
"""
```

## 2.3 修改单元格

### 2.3.1 修改单个单元格

```Python
# 方式一、直接赋值
sheet["A3"] = "Python"
print(sheet["A3"].value)

# 方式二、sheet.cell(行, 列, 值)
d =  sheet.cell(2, 3, 10)
print(sheet.cell(2, 3).value)
```

### 2.3.2 修改多个单元格

#### 获取指定区域的单元格 `sh['xx':'xx']`

```Python
cell_range = sh['A1':'C2']
for i in cell_range:
    print(i)

"""
(<Cell 'Sheet'.A1>, <Cell 'Sheet'.B1>, <Cell 'Sheet'.C1>)
(<Cell 'Sheet'.A2>, <Cell 'Sheet'.B2>, <Cell 'Sheet'.C2>)
"""
```

#### 获取指定列的单元格 `sh['xx']`

```Python
colC = sh['C']
for i in colC:
    print(i)

"""
<Cell 'Sheet'.C1>
<Cell 'Sheet'.C2>
"""
```

## 2.4 插入行、列

::: tip
sheet 对象的 `insert_rows` 和 `insert_cols` 方法，分别用来插入 行 和 列
:::

```Python
import openpyxl

wb = openpyxl.load_workbook('income.xlsx')
sheet = wb['2018']

sheet.insert_rows(2)  # 在第2行的位置插入1行

sheet.insert_rows(3,3)  # 在第3行的位置插入3行

sheet.insert_cols(2)  # 在第2列的位置插入1列

sheet.insert_cols(2,3)  # 在第2列的位置插入3列

wb.save('income-1.xlsx')  # 指定不同的文件名，可以另存为别的文件
```

## 2.5 删除行、列

::: tip
sheet 对象的 `delete_rows` 和 `delete_cols` 方法，分别用来删除 行 和 列
:::

```Python
import openpyxl

wb = openpyxl.load_workbook('income.xlsx')
sheet = wb['2018']

sheet.delete_rows(2)  # 在第2行的位置删除1行

sheet.delete_rows(3,3)  # 在第3行的位置删除3行

sheet.delete_cols(2)  # 在第2列的位置删除1列

sheet.delete_cols(3,3)  # 在第3列的位置删除3列

wb.save('income-1.xlsx')  # 指定不同的文件名，可以另存为别的文件
```
