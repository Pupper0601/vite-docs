---
title: 二十、random 库
categories:
  - 学习笔记
tags:
  - Python基础
date: '2024-01-08 16:05:34'
update: '2024-01-08 16:05:42'
toc_style_simple: true
cover: 'https://top-img.pupper.cn/top-img/top-img-76.webp'
main_color: '#83a1c0'
abbrlink: b782e8f7
---

# 一. 返回整数

## 1.1 `random.randrange`

```Python
random.randrange(stop)
random.randrange(start, stop[, step])
```

- `start`: 起始数字, 包含(取得到 start 这个值)
- `stop`: 末尾数字, 不包含(取不到 stop 这个值)
- `step`: 步长

```python
for i in range(5):
  print(random.randrange(20))   # 17,4,7,7,4

for i in range(5):
  print(random.randrange(10, 20)) # 13,14,11,17,17

for i in range(5):
  print(random.randrange(10, 20, 2)) # 12,12,14,14,10
```

## 1.2 `random.randint`

```python
random.randint(a, b)
```

- 返回随机整数 N 满足 `a <= N <= b`, 相等于 `randrange(a, b+1)`
- a、b 都可以取到

```python
for i in range(5):
  print(random.randint(0, 20)) # 19,20,11,6,3
```

# 二. 返回浮点数

## 2.1 `random.random()`

```Python
# 返回 [0.0, 1.0) 范围内的下一个随机浮点数

random.random()
```

```Python
for i in range(5):
  print(random.random)

# 输出结果
0.9829492243165335
0.43473506430105724
0.5198709187243076
0.6437884305820736
0.7216771961168909
```

```Python
for i in range(5):
  print(math.ceil(random.random() * 1000))  # 772, 352, 321, 62, 127
```

## 2.2 `random.uniform(a, b)`

- 返回一个随机浮点数 N
- 当 `a <= b` 时, `a <= N <= b`
- 当 `b < a` 时, `b <= N <= a`

```python
random.uniform(a, b)
```

```Python
# 栗子一
for i in range(5):
    print(random.uniform(1, 10))

####
2.6200262089754593
9.220506911469235
3.0206896704014783
9.670905330339174
1.170694187192196


# 栗子二
for i in range(5):
    print(random.uniform(8, 2))

####
2.696842757954265
6.058794935110275
7.567631220015144
2.2057698202258074
4.454083664106361
```

# 三. 传递列表作为参数

## 3.1 `random.choice`

- 从非空序列 seq 返回一个随机元素
- 如果 seq 为空, 会抛出 IndexError

```Python
random.choice(seq)
```

```Python
# 数字数组
print(random.choice([1, 2, 3, 4, 5]))   # 5

# 字母数组
print(random.choice(["a", "b", "c"]))   # c

# 字母元组
print(random.choice(("a", "b", "c")))   # c

# 字符串
print(random.choice("abcdef"))    # e

# string 模块返回的大小写字母字符串
print(random.choice(string.ascii_letters))  # l

# string 模块返回的数字字符串
print(random.choice(string.digits))   # 2

# string 模块返回的数字字符串+大小写字母字符串
print(random.choice(string.digits + string.ascii_uppercase))  # f
```

## 3.2 `random.choices`

```Python
random.choices(population, weights=None, *, cum_weights=None, k=1)
```

- `population`: 序列
- `weights`: 普通权重
- `cum_weights`: 累加权重
- `k`: 选择次数
- `weights` 和 `cum_weights` 不能同时传, 只能选择一个来传

### 3.2.1 不带参数

可重复获取元素

```Python
a = [1,2,3,4,5]
print(random.choices(a, k=5))   # [5, 5, 3, 1, 5]
```

### 3.2.2 带 weight

- 序列有多长, weights 对应的序列就得多长, 每个位置都是一一对应
- 如: 3 的权重是 1, 其他是 0, 所以每次都取 3, 因为它的权重最高, 其他元素没有权重

```Python
a = [1,2,3,4,5]
print(random.choices(a, weights=[0,0,1,0,0], k=5))  # [3,3,3,3,3]
```

- 2 的权重更大, 所以取到它的概率更高

```Python
a = [1,2,3,4,5]
print(random.choices(a, weights=[0,2,1,0,0], k=5))  # [2,2,2,2,3]
```

### 3.2.3 带 cum_weights

```Python
a = [1, 2, 3, 4, 5]

print(random.choices(a, cum_weights=[1, 1, 1, 1, 1], k=5))  # [1,1,1,1,1]

print(random.choices(a, cum_weights=[1, 4, 4, 4, 4], k=5)) # [2,2,1,2,1]

print(random.choices(a, cum_weights=[1, 2, 3, 4, 5], k=5))  # [5,5,1,4,2]
```

`cum_weights=[1,1,1,1,1]`

- 等价于 `weights=[1,0,0,0,0]`
- `[1,1+0,1+0+0,1+0+0+0,1+0+0+0+0]`

`cum_weights=[1,4,4,4,4]`

- 等价于 `weights=[1,3,0,0,0]`
- `[1,1+3,1+3+0,1+3+0+0,1+3+0+0+0]`

## 3.3 `random.shuffle`

- 将序列 x 随机打乱位置
- 只能是列表[], 元组和字符串会报错

```Python
random.shuffle(x[, random])
```

```Python
# 数字数组
a = [1, 2, 3, 4, 5]
random.shuffle(a)
print(a)   # [3, 5, 2, 4, 1]

# 字母数组
b = ["a", "b", "c"]
random.shuffle(b)
print(b)    # ['a', 'c', 'b']
```

## 3.4 `random.sample`

- 从 population 中取 k 个元素, 组成新的列表并返回
- 每次取元素都是不重复的, 所以 population 的长度必须 ≥ k, 否则会报错

```Python
random.sample(population, k)
```

```Python
# 数字数组
print(random.sample([1, 2, 3, 4, 5], 3))  # [2, 1, 3]

# 字母数组
print(random.sample(["a", "b", "c"], 3))  # ['b', 'c', 'a']

# 字母元组
print(random.sample(("a", "b", "c"), 3))  # ['a', 'b', 'c']

# 字符串
print(random.sample("abcdef", 3)) # ['a', 'f', 'b']

# string 模块返回的大小写字母字符串
print(random.sample(string.ascii_letters, 3)) # ['M', 'w', 'W']

# string 模块返回的数字字符串
print(random.sample(string.digits, 3))  # ['7', '1', '5']

# string 模块返回的数字字符串+大小写字母字符串
print(random.sample(string.digits + string.ascii_uppercase, 3))
# ['R', '8', 'O']
```
