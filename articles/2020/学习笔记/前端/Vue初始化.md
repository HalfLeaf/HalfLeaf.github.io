<div id="metaData" createTime="2020-08-02 13:50:00" category="学习笔记" tags="前端;vue" title="Vue初始化"></div>

# Vue初始化

## new Vue()

1. this._init(options)

Vue.prototype._init = function (options) {
    vm.$options = mergeOptions(
        // 获取当前实例中构造函数的options选项机器所有父级构造函数的options
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
    )

    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm)
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')

    if(vm.$options.el){
        vm.$mount(vm.$options.el)
    }

}

2. callHook

触发用户设置的生命周期钩子

所有生命周期钩子的函数名：
* beforeCreate
* Created
* beforeMount
* mounted
* beforeUpdate
* updated
* beforeDestroy
* destroyed
* activated
* deactivated
* errorCaptured

3. errorCapture

用来捕获子孙组件的错误

参数：

1. error：错误对象

2. vm：发生错误的组件实例

3. info:包含错误来源信息的字符串


返回值：

false，阻止该错误继续向上传播

用户错误被try...catch捕获后，Vue会使用handleError函数来处理错误，

该函数会依次触发父组件链路上的每一个父组件中定义的errorCapture钩子函数

如全局的config.errorHandler被定义，那么所有的错误也将会同时发送给config.errorHandler

#### 初始化实例属性

~~~
$开头的属性一般是提供给用户使用的外部属性
_开头的属性一般是提供给内部使用的内部属性
~~~

##### initLifecycle

```javascript
export function initLifecycle(vm) {
    const options = vm.$options

    // 找到第一个非抽象父类
    let parent = options.parent
    if(parent && !options.abstract){
        while(parent.$options.abstract && parent.$parent){
            parent = parent.$parent
        }
        parent.$children.push(vm)
    }

    vm.$parent = parent
    // 当前组件树的根Vue.js实例
    vm.$root = parent? parent.$root : vm

    vm.$parent = []
    vm.$refs = []

    vm._watcher = null
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
}
```

##### initEvents 初始化事件

##### 初始化inject/provide

通过provide注入的内容，可以被所有子孙组件通过inject得到

~~~
provide/inject主要是为高阶插件、组件库提供用例，并不推荐直接用于程序代码中
~~~

~~~
inject 在data/props之前初始化
provide 在data/props之后初始化
~~~

##### 初始化状态

* 初始化 props
* 初始化 methods
* 初始化 data
* 初始化 computed
* 初始化 watcher