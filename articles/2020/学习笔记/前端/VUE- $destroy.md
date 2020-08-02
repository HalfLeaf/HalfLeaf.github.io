<div id="metaData" createTime="2020-08-01 17:30:00" category="学习笔记" tags="前端;vue" title="VUE全局API - $destroy"></div>

# VUE全局API - $destroy

## vm.$destroy

    通过lifecycleMimix挂载到Vue构造函数的prototype属性上

用法:

完全销毁一个实例
* 清理该实例与其他实例的连接
* 解绑其全部指令和监听器
* 触发beforeDestroy和destroyed的钩子函数

实现代码:

```javascript
Vue.prototype.$destroy = function() {
    const vm = this
    // 判断实例是否正在销毁，防止反复销毁
    if(vm._isBeingDestroyed){
        return
    }
    // 调用beforeDestroy钩子函数
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true

    // 删除自己与父级之间的连接
    const parent = vm.parent
    // 当前实例存在父级，且父级没有被销毁，且不是抽象组件
    if(parent && !parent._isBeingDestroyed && !vm.$options.abstract){
        // 将自己从父级的子级列表中删除
        remove(parent.$children, vm)
    }
    // 将实例所监听的状态都取消掉
    if(vm._watcher){
        // teardown方法从所有依赖想的Dep列表中将自己移除，断掉这个watcher所监听状态
        vm._watcher.teardown()
    }
    // 移除watcher实例
    let i = vm._watchers.length
    while (i--) {
        wm._watcher[i].teardown()
    }
    // _isDestroyed标志位表示Vue实例已销毁
    vm._isDestroyed = true
    // 在vnode树上触发destroy钩子函数解绑指令
    vm.__patch__(vm.vnode, null)
    // 触发destroyed钩子函数
    callHook(vm, 'destroyed')
    // 移除所有的时间监听器
    vm.$off()
}
```




