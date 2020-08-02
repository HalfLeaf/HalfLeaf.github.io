<div id="metaData" createTime="2020-08-01 17:00:00" category="学习笔记" tags="前端;vue" title="VUE全局API - $emit"></div>

# VUE全局API - $emit

## vm.$emit

vm.$emit(event, [...args])

参数:
   * { string } event
   * { ...args }

用法:

触发当前实例上的事件

使用事件名从vm._events中取出对应时间监听器回调函数列表，然后依次执行列表中的监听器回调并将参数传递给监听器回调

实现代码:

```javascript

Vue.prototype.$emit = function(event) {
    const vm = this
    let cbs = vm._events[event]
    if(cbs){
        // 类似于数组数据转换为真正的数组，第二个参数是起始位置
        const args = toArray(arguments, 1)
        for(let i = 0; i < cbs.length;i++){
            try {
                cbs[i].apply(vm, args)
            }catch(e){
                handleError(e, vm, `event handler for "${event}"`)
            }
        }
    }
    retun vm
}

```

释义:

在事件监听回调函数列表存在的情况下，循环遍历，依次调用每一个监听器回调，并将所有参数传给监听器回调



