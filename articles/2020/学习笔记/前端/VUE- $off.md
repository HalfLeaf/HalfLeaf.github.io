<div id="metaData" createTime="2020-08-01 16:30:00" category="学习笔记" tags="前端;vue" title="VUE全局API - $off"></div>

# VUE全局API - $off

## vm.$off

vm.$off([event, callback])

参数:
   * { string | Array<string> } event
   * { Function } callback

用法:

移除自定义事件的监听器

* 如未提供参数，则移出所有事件的监听器
* 如只提供了事件，则移出该事件的所有监听器
* 如同时提供了事件与回调，则只移出这个回调的监听器

实现代码:

```javascript

Vue.prototype.$off = function(event, fn) {
    const vm = this
    // 移出所有事件的监听器
    if(!arguments.length){
        vm._events = Object.create(null)
        return vm
    }

    // event 支持数组
    if(Array.isArray(event)){
        for(let i = 0; i <event.length; i++) {
            this.$off(event[i], fn)
        }
        return vm
    }

    const cbs = vm._events[event]
    if(!cbs){
        return vm
    }

    // 移除该事件的所有监听器
    if(arguments.length === 1){
        vm._events[event] = null
        return vm
    }

    // 只移除与fn相同的监听器
    if(fn){
        const i = cbs.length
        let cb
        while(i--){
            cb = cbs[i]
            if(cb === fn || cb.fn === fn){
                cbs.splice(i, 1)
                break
            }
        }
    }
    return vm
}

```

释义:

浏览器传递给函数的隐式参数arguments。

在函数调用的时候，浏览器每次都会传递进两个隐式参数：
1. 函数的上下文对象this
2. 封装实参的对象arguments


注意点:

数组从后向前遍历，删除元素，不影响前面元素的位置

