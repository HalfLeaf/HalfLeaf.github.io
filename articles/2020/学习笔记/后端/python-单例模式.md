<div id="metaData" createTime="2020-08-12 09:00:00" category="学习笔记" tags="后端;Python" title="python -- 单例模式"></div>

# python -- 单例模式

## 单例模式

单例模式singleton:

一种常见的软件设计模式，该模式的主要目的是确保某一个类只有一个实例存在

当你希望在整个系统中，某个类只能出现一个实例时，单例对象就能派上用场

在Python 中，可以用以下方法来实现单例模式:
* 使用模块
* 使用__new__
* 使用装饰器
* 使用元类

### 使用模块

Python的模块就是天然的单例模式，因为模块在第一次导入时，会生成.pyc文件，

当第二次导入时，就会直接加载 .pyc 文件，而不会再次执行模块代码。

因此，我们只需把相关的函数和数据定义在一个模块中，就可以获得一个单例对象了

```python
from mysingleton import my_singleton

my_singleton.foo()
```

### 使用__new__()

为了使类只能出现一个实例，可以使用__new__来控制实例的创建过程

```python
class Singleton(object):
    _instance = None  # 类变量

    def __new__(cls, *args, **kw):
        if not cls._instance:
            cls._instance = super(Singleton, cls).__new__(
                cls, *args, **kw)  # 将类的实例和一个类变量 _instance 关联起来
        return cls._instance
```

### 使用装饰器

装饰器（decorator）可以动态地修改一个类或函数的功能。

也可以使用装饰器来装饰某个类，使其只能生成一个实例

```python
from functools import wraps
def singleton(cls):
    instances = {}

    @wraps(cls)
    def getinstance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return getinstance
```

### 使用元类metaclass

元类（metaclass）可以控制类的创建过程，它主要做三件事：

a.拦截类的创建

b.修改类的定义

c.返回修改后的类

```python
class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(
                Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class MyClass(metaclass=Singleton):
    pass
```