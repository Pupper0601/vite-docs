---
title: 测试平台开发 - REST 进阶
categories:
  - 学习笔记
tags:
  - 测试平台开发
abbrlink: 1462770c
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-79.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#3c5758'
---

## 一、 资源的增删改查

### 1. 新增资源

```python
# views.py

@api_view(['GET', 'POST'])  # 允许的请求方法
def request_list(request, format=None):
    # 查询数据
    if request.method == 'GET':
        # 构造序列化器
        serializer = RequestSerializer(Request.objects.all(), many=True)
        # 返回 json 格式数据
        # safe=False 是为了支持 {} 以外的 python 对象转 json
        return Response(serializer.data)  # 将 python 原生格式转成 json 数据

    # 新增数据 --- POST
    elif request.method == 'POST':
        # 用请求数据构造序列化器
        # request.data 可以获得任何请求的请求体中的数据
        serializer = RequestSerializer(data=request.data)
        # 判断数据是否合法
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

![](https://img.pupper.cn/img/20220726100231.png)

### 2. 修改资源

修改使用的是 PUT 方法

```python
# views.py

@api_view(['GET', 'PUT','DELETE'])
def request_detail(request, _id, format=None):
    try:
        req_obj = Request.objects.get(id=_id)  # 根据 ID 查找单个数据
    except Exception:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # 查询 单个数据
    if request.method == 'GET':
        serializer = RequestSerializer(req_obj)
        return Response(serializer.data)

    # 修改数据
    elif request.method == 'PUT':
        serializer = RequestSerializer(req_obj, data=request.data)    # 序列化器
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        # 数据不合法返回异常
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

![](https://img.pupper.cn/img/20220726100303.png)

### 3. 删除数据

```python
# views.py

@api_view(['GET', 'PUT','DELETE'])
def request_detail(request, _id, format=None):
    try:
        req_obj = Request.objects.get(id=_id)  # 根据 ID 查找单个数据
    except Exception:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # 查询 单个数据
    if request.method == 'GET':
        serializer = RequestSerializer(req_obj)
        return Response(serializer.data)

    # 修改数据
    # 序列化器
    elif request.method == 'PUT':
        serializer = RequestSerializer(req_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        # 数据不合法返回异常
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除数据
    elif request.method == 'DELETE':
        # 调用数据对象的  delete 方法
        req_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

## 二、 基于类的视图

### 1、 用类重写视图（继承 REST 框架的 APIView 类 ）

```python
# views.py

from rest_framework.views import APIView

class RequestList(APIView):
    """
    列出所有的 request 数据 或者创建一个新的 request
    """

    def get(self, request, format=None):
        # 构造序列化器
        serializer = RequestSerializer(Request.objects.all(), many=True)
        # 返回 json 格式数据
        # safe=False 是为了支持 {} 以外的 python 对象转 json
        return Response(serializer.data)  # 将 python 原生格式转成 json 数据

    def post(self, request, format=None):
        # 用请求数据构造序列化器
        # request.data 可以获得任何请求的请求体中的数据
        serializer = RequestSerializer(data=request.data)
        # 判断数据是否合法
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

以上代码完成了查询列表和新增单个数据的功能 ,新增了 get（处理 get 请求）和 post（处理 post 请求）方法，

```python
# views.py

class RequestDetail(APIView):

    def get(self, request, _id, format=None):
        req_obj = Request.objects.get(id=_id)  # 根据 ID 查找单个数据
        serializer = RequestSerializer(req_obj)
        return Response(serializer.data)

    def put(self, request,  _id, format=None):
        req_obj = Request.objects.get(id=_id)  # 根据 ID 查找单个数据
        serializer = RequestSerializer(req_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        # 数据不合法返回异常
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, _id, format=None):
        req_obj = Request.objects.get(id=_id)  # 根据 ID 查找单个数据
        # 调用数据对象的  delete 方法
        req_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

启动服务之前，修改下`sqpt/urls.py`,此时我们使用的是基于类的视图

```python
# urls.py

from django.urls import path
from sqpt import views
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    # 调用类视图 as_view 才能被路由指向
    path('requests/', views.RequestList.as_view()),
    path('requests/<int:_id>', views.RequestDetail.as_view()),
]

# 处理不同后缀的请求
urlpatterns = format_suffix_patterns(urlpatterns)
```

### 2. 通用类视图 - 1

> `generics.ListCreateAPIView` ：提供 列出所有 和 创建数据 功能
>
> `generics.RetrieveUpdateDestroyAPIView` ：提供 查询单个 、修改 和 删除数据 功能

```python
# views.py

# REST 通用类视图
class RequestList(generics.ListCreateAPIView):
    """
    列出所有的 request 数据 或者创建一个新的 request
    """
    # 赋予类视图 query_set 属性用于查询
    queryset = Request.objects.all()
    # 指定序列化器
    serializer_class = RequestSerializer


class RequestDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    查询单个 request 数据 ，修改 或者 删除
    """
    # 赋予类视图 query_set 属性用于查询
    queryset = Request.objects.all()
    # 指定序列化器
    serializer_class = RequestSerializer
```

修改路由：

```python
# pk 为 ID的默认参数， _id 为我们自定义的参数

path('requests/<int:pk>', views.RequestDetail.as_view()),
```

## 三、 视图集 ViewSet（重点）

### 1. ViewSet（视图集）

`ViewSet（视图集）`代替 View 类重构视图

```python
# views.py

# 视图集 ViewSet
class RequestViewSet(viewsets.ModelViewSet):
    """
    列出所有的 request 数据 或者创建一个新的 request
    查询单个 request 数据 ，修改 或者 删除
    """
    # 赋予类视图 query_set 属性用于查询
    queryset = Request.objects.all()
    # 指定序列化器
    serializer_class = RequestSerializer
```

一个 ViewSet 类只绑定到一组方法处理程序，

```python
class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer


class ConfigViewSet(viewsets.ModelViewSet):
    queryset = Config.objects.all()
    serializer_class = ConfigSerializer


class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


class SuiteViewSet(viewsets.ModelViewSet):
    queryset = Suite.objects.all()
    serializer_class = SuiteSerializer
```

当它被实例化成一组视图的时候，通常通过使用一个 Router 类来代替自己定义复杂的 URL。

### 2. 路由设计的自动化

利用 rest 框架的 router，可以帮助我们自动生成路由列表。

```python
# urls.py

from django.urls import path, include
from sqpt import views
# 导入 rest 路由器
from rest_framework.routers import DefaultRouter

# 创建 路由器 并注册自己的视图集
router = DefaultRouter()
# 自动生成相关路由列表
router.register(r'requests', views.RequestViewSet)
router.register(r'steps', views.StepViewSet)
router.register(r'suites', views.SuiteViewSet)
router.register(r'configs', views.ConfigViewSet)
router.register(r'cases', views.CaseViewSet)
urlpatterns = [
    # 引用相关路由
    path('', include(router.urls)),
]
```

router 的作用是根据你注册的路由前缀，帮助你自动生成诸如此类的路由列表

```tex
^requests/$ [name='request-list']
^requests\.(?P<format>[a-z0-9]+)/?$ [name='request-list']
^requests/(?P<pk>[^/.]+)/$ [name='request-detail']
^requests/(?P<pk>[^/.]+)\.(?P<format>[a-z0-9]+)/?$ [name='request-detail']
```
