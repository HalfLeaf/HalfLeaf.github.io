<div id="metaData" createTime="2020-08-01 16:10:00" category="学习笔记" tags="前端;vue" title="VUE全局API - $on"></div>

# VUE全局API - $on

## vm.$on

vm.$on(event, callback)

参数:
   * { string | Array<string> } event
   * { Function } callback

用法:

监听当时实例上的自定义事件，事件可以由vm.$emit触发。回调函数会接收所有传入事件所触发的函数的额外参数

实现代码:

```javascript

Vue.prototype.$on = function(event, fn) {
    const vm = this
    // 遍历数组，是回调可以被注册到数组中每一项事件名所指定的事件列表中
    if(Array.isArray(event)){
        for(let i = 0; i <event.length; i++) {
            this.$on(event[i], fn)
        }
    }else{
        // 向事件列表中添加回调
        (vm._events[event] || (vm._events[event] = [])).push(fn)
    }
    return vm
}

```

作用:

将回调注册到事件列表中

释义:

vm._events是一个对象，用例存储事件，在代码中，通过参数event从vm._events中取出事件列表，在列表不存在的时候，则使用空列表初始化

vm._events在new Vue()会执行this._init方法进行初始化操作，其中便会创建 _events属性，用于存储事件

vm._events = Object.create(null)