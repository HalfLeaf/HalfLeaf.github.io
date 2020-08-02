<div id="metaData" createTime="2020-08-01 17:20:00" category="学习笔记" tags="前端;vue" title="VUE全局API - $forceUpdate"></div>

# VUE全局API - $forceUpdate

## vm.$forceUpdate

    通过lifecycleMimix挂载到Vue构造函数的prototype属性上

用法:

迫使Vue.js实例重新渲染，仅仅影响实例本身以及插入插槽内容的子组件，并非所有子组件

使用事件名从vm._events中取出对应时间监听器回调函数列表，然后依次执行列表中的监听器回调并将参数传递给监听器回调

实现代码:

```javascript
Vue.prototype.$forceUpdate = function() {
    const vm = this
    if(vm._watcher){
        vm._watcher.update()
    }
}
```




