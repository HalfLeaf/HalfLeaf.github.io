<div id="metaData" createTime="2020-08-01 16:40:00" category="学习笔记" tags="前端;vue" title="VUE全局API - $once"></div>

# VUE全局API - $once

## vm.$once

vm.$once(event, callback)

参数:
   * { string | Array<string> } event
   * { Function } callback

用法:

监听一个自定义事件，但是只触发一次，在第一次触发后移除监听器


实现代码:

```javascript

Vue.prototype.$once = function(event, fn) {
    const vm = this
    // 执行事件移除操作
    function on(){
        vm.$off(event, on)
        fn.apply(vm, arguments)
    }
    on.fn = fn
    // 注册监听事件，事件触发后，执行on函数
    vm.$on(event, on)
    return vm
}

```

释义:

on.fn = fn 在移除监听器时，需要将用户提供的监听器函数与列表中的监听器函数进行对比，相同部分会被移除，

这导致我们使用拦截器代替监听器注入到事件列表中时，拦截器和用户提供的函数是不相同的，

此时用户使用vm.$off来移除监听器，移除操作失败

这个问题的解决方案是，

将用户提供的原始监听器保存到拦截器的fn属性中

当vm.$off方法遍历事件监听器列表时，同时会检查监听器和监听器的fn属性是否与用户提供的监听器函数相同，

只要存在一个相同，说明要被移除的监听器被找到了，移除即可

fn.apply(vm, arguments) 这句话不知道啥意思？？

apply说是 能劫持另外一个对象的方法，继承另外一个对象的属性

Function.apply(obj,args)方法能接收两个参数
* obj：这个对象将代替Function类里this对象
* args：这个是数组，它将作为参数传给Function（args-->arguments）