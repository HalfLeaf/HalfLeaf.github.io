<div id="metaData" createTime="2020-08-02 13:50:00" category="学习笔记" tags="前端;vue" title="Vue生命周期"></div>

# Vue生命周期

*  初始化阶段
*  模板编译阶段
*  挂载阶段
*  卸载阶段

![creted](/articles/2020/学习笔记/前端/imgs/creted.jpg)
![compile](/articles/2020/学习笔记/前端/imgs/compile.jpg)
![mounted](/articles/2020/学习笔记/前端/imgs/mount.jpg)
![destoryed](/articles/2020/学习笔记/前端/imgs/destory.jpg)

##  初始化阶段
new Vue() 到 created之间的阶段
* new Vue()
* 初始化 Events & lifecycle
* beforeCreate
* 初始化 injection & reactivity
* created

这一阶段主要目的：

在Vue.js实例上初始化一些属性、事件、响应式数据，如：

props、methods、data、computed、watch、provide、inject等


##  模板编译阶段
created钩子函数 到 beforeMount 钩子函数之间的阶段

这一阶段主要目的：

将模板编译为渲染函数，只存在于完整版


##  挂载阶段
beforeMount 钩子函数 到 mounted 钩子函数之间的阶段

这一阶段主要目的：

Vue.js会将其实例挂载到DOM元素，将模板渲染到指定的DOM元素上。

在挂载阶段，Vue.js会开启watcher来持续追踪依赖变化


##  卸载阶段

这一阶段主要目的：

Vue.js会将自身从父组件中删除，取消实例上所有依赖的追踪并且移除所有的事件监听器


Vue.js的生命周期整体分为4个阶段：初始化阶段，模板编译阶段，挂载阶段，卸载阶段

初始化阶段结束后，会触发 created 钩子函数，在created 和 beforeMount钩子函数之间这个阶段，为模板编译阶段

模板编译阶段，只存在于完整版Vue才有

挂载阶段，在beforeMount 与 mounted 两个钩子函数期间，挂载完毕后，Vue实例处于已挂载阶段，可以持续的追踪状态的变化

当数据发生变化是，watcher会通知虚拟DOM重新渲染视图，

在渲染视图前触发 beforeUpdate 钩子函数，渲染完成后触发updated钩子函数

当调用vm.$destroy时，组件进入卸载阶段，卸载前触发 beforeDestroy 钩子函数，卸载后触发 destroyed 钩子函数
