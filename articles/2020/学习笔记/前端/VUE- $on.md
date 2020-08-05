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

#### 事件修饰符
Vue.js 为 v-on 提供了事件修饰符，修饰符是由点开头的指令后缀来表示的。

* <b style="color:#42b983"> .stop </b>
* <b style="color:#42b983"> .prevent </b>
* <b style="color:#42b983"> .capture </b>
* <b style="color:#42b983"> .self </b>
* <b style="color:#42b983"> .once </b>
* <b style="color:#42b983"> .passive </b>

```javascript
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

```

因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。
