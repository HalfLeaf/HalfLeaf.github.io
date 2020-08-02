<div id="metaData" createTime="2020-08-01 18:10:00" category="学习笔记" tags="前端;vue" title="VUE全局API - $nextTick"></div>

# VUE全局API - $nextTick

## vm.$nextTick

    通过renderMimix挂载到Vue构造函数的prototype属性上

用法:

接收一个回调函数作为参数，将回调延迟到下次DOM更新周期之后执行

本质是将回调添加到微任务中，等待下次微任务执行时，触发该回调

作用:

当更新了状态(数据)后，需要对新DOM做一些操作，但是此时无法获取到更新后的DOM，此时使用nextTick方法，等待DOM下次更新

### 下一次更新周期: 下一次微任务执行时更新DOM
    数据更新，变化侦测通知到组件的watcher，添加到队列中缓存，下一次时间循环时，队列中的watcher触发渲染流程并清空队列。
    确保多个状态改变，只执行一次渲染流程

### 事件队列
当任务处理完毕后，js将这个事件加入到一个队列中（事件队列）

加入到事件队列中的事件不会立刻执行其回调，而是等待当前执行栈中的所有任务执行完毕后，主线程查找微任务队列，执行微任务队列

然后从宏任务队列中取出一个事件，把对应回调加入到当前执行栈

如此无限循环，形成事件循环

#### 微任务事件:
* Promise.then
* MutationObserver
* Object.observe
* process.nextTick

#### 宏任务事件:
* setTimeout
* setInterval
* setImmediate
* MessageChannel
* requestAnimationFrame
* I/O
* UI交互事件

### 执行栈

当我们执行一个方法时，js会生成一个与该方法对应的执行环境（执行上下文）

执行环境中有这个方法的:
* 私有作用域
* 上层作用域的指向
* 方法的参数
* 私有作用域定义的变量
* this对象

然后执行环境会被添加到一个栈中，这个栈即为执行栈


```javascript

// import { nextTick } from '../util/index'

// 存储用户注册的回调
const callback = []
// 标记是否已经向任务队列中添加了任务
// 每当向任务队列中插入任务时，置为true
// 每当任务被执行时，置为true
let pending = false

// 执行队列中所有任务，并清空队列
function flushCallbacks() {
    pending = false
    const copies = callback.slice(0)
    callbacks.length = 0
    for (let i = 0; i <copies.length; i++) {
        copies[i]()
    }
}


let microTimerFunc
let macroTimerFunc
let useMacroTask = false

//  添加到宏任务队列中
//  优先调用setImmediate方法（只支持IE），messageChannel备选，最后调用setTimeout

if(typeof setImmediate !== "undefined" && isNative(setImmediate)){
    macroTimerFunc = () => {
        setImmediate(flushCallbacks)
    }
}else if(typeof messageChannel !== "undefined"
         && ( isNative(messageChannel)
            || messageChannel.toString() === "[Object MessageChannelConstructor]")){
    const channel = new messageChannel()
    const port = channel.port2
    channel.port1.onmessage = flushCallbacks
    macroTimerFunc = () => {
        port.postMessage(1)
    }
}else{
    macroTimerFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}

// 添加到微任务队列中
// 仅限本轮事件循环中第一次使用nextTick触发
// 通过Promise.then添加到微任务队列
// 浏览器不支持Promise方法时，降级到macroTimerFunc
if(typeof Promise !== "undefined" && isNative(Promise)){
    const p = Promise.resolve()
    microTimerFunc = () => {
        p.then(flushCallbacks)
    }
}else{
    microTimerFunc = macroTimerFunc
}

// 给回调函数做一层包装，保证整个回调函数执行过程汇总，如果修改了状态，更新DOM操作推迟到宏任务队列
export function withMacroTask(fn){
    return fn._withTask || (fn._withTask = function(){
        useMacroTask = true
        const res = fn.apply(null, arguments)
        useMacroTask = false
        return res
    })
}

export function nextTick(cb, ctx) {
    let _resolve
    callbacks.push( () => {
        if(cb){
            cb.call(ctx)
        }else if(_resolve){
            _resolve(ctx)
        }
    })
    if(!pending){
        pending = true
        if(useMacroTask){
            macroTimerFunc()
        }else{
            microTimerFunc()
        }
    }

    if(!cb && typeof Promise !== "undefined"){
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}
```
