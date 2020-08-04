<div id="metaData" createTime="2020-08-03 17:40:00" category="学习笔记" tags="前端;vue" title="Vue指令"></div>

# Vue指令

<p style="border-left-color: #42b983;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    指令是Vue提供的带有<i style="color: #41b883"> v- </i> 前缀标识的特殊特性;
    当表达式的值改变时，将其产生的连带影响响应式地作用于DOM
</p>

### 指令生效的过程

* 模板解析阶段，将节点上的指令解析出来，并添加到AST的directives属性中
* directives数据传递到VNode中
* 通过vnode.data.directives获取一个节点所绑定的指令
* 当虚拟DOM进行patch时，根据节点的对比结果触发一些钩子函数
* 钩子函数触发后，指令生效





