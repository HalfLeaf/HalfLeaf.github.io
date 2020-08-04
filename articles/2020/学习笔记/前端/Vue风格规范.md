<div id="metaData" createTime="2020-08-03 18:40:00" category="学习笔记" tags="前端;vue" title="Vue风格规范"></div>

# Vue风格规范


### 为列表渲染设置属性key

<p style="border-left-color: #42b983;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    key值主要用于虚拟DOM短发中，对比新旧虚拟节点时辨识虚拟节点，提升查找速度
</p>

虚拟DOM更新时，需要从旧的虚拟节点中查找与新虚拟节点相同的节点进行更新，设置key值，查找速度会提升很快


### 在v-if/v-else-if/v-else中使用key值


默认情况下，Vue更新时，在相同类型的元素之间切换时，会修补已经存在的元素，而不是将旧的元素移除，然后在同一位置生成新的元素

添加属性key后，对比虚拟DOM时，会被认为两个不同的节点，于是会将旧元素移除，在相同位置上添加新元素

从而可以避免两个本不相同的元素被识别为相同，出现的意外


### 路由切换，组件不变

<p style="border-left-color: #f66;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    当页面切换到同一路由但不同的参数地址时，组件的生命周期钩子并不会重新触发
</p>

vue-router识别两个路由，使用同一组件进行复用，而非重新创建组件，避免性能浪费

解决方案：
* 路由导航守卫 <i style="color: #41b883"> beforeRouteUpdate </i>
* 监听 <i style="color: #41b883"> $route </i> 对象变化
* 为 <i style="color: #41b883"> router-view </i>设置key属性

#### 路由导航守卫 <i style="color: #41b883"> beforeRouteUpdate </i>

<p style="border-left-color: #41b883;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    在当前路由改变，且组件被复用时调用，触发该钩子函数
</p>

```javascript
export default{
   beforeRouteUpdate(to,from,next){

   },
}

```

#### 监听 <i style="color: #41b883"> $route </i> 对象变化

```javascript
watch:{
    '$route.query.id'(){
    }
}
```

存在依赖追踪的内存开销

#### 为 <i style="color: #41b883"> router-view </i>设置key属性

暴力破解，设置key值后，每次切换路由key不一样，虚拟DOM认为是一个新的组件，销毁原有组件，创建新组件


### 为所有路由统一添加query

解决方案：
* 全局守卫 <i style="color: #41b883"> beforeEach </i>
* 函数劫持

#### 全局守卫 <i style="color: #41b883"> beforeEach </i>

通过next方法中断当前导航，并切换到新的导航上，统一添加query

注意需要：判断这个全局添加的参数是否在路由中存在，如存在，则不开启新导航

优点： 可以全局统一配置公共的query参数，并且在组件切换路由时，无需进行其他处理

缺点：每次切换路由，调用了两次beforeEach


#### 函数劫持

通过拦截<i style="color: #41b883"> router.history.transitionTo </i>,在vue-router内部在切换路由之前将参数添加到query中

```javascript
const query = { referer: ''}
const transitionTo = router.history.transitionTo

router.history.transitionTo = function (location, onComplete, onAbout) {
    location = typeof location === 'object'
        ? { ...location, query:{...location.query, ...query }}
        : {path: location, query}
    transitionTo.call(router.history, location, onComplete, onAbout)
}

```

### Vuex & props

<p style="border-left-color: #42b983;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    业务组件使用Vuex维护状态； 通用组件使用props进行事件及父子间通信（业务解耦）
</p>


### 组件样式表设置作用域

* scoped特效
* CSS Modules

对于组件库，推荐选用基于class的策略，而非scoped特性

因为基于class策略使得复写内部样式更容易，使用容易理解的class名称且没有太高的选择器优先级，不容易导致冲突

#### scoped特性方式

```javascript
<template>
    <button class="btn"></btn>
</template>
<style scoped>
    .btn {
    }
</style
```


#### 基于class的策略

```javascript
<template>
    <button :class="[$style.btn]"></btn>
</template>
<style module>
    .btn {
    }
</style
```

### <i style="color: #41b883"> prop向下传递，事件向上传递 </i>

### 文件组件命名

* 单文件组件：业务组件
* 基础组件：应用特定样式和约定的基础组件，展示类的无逻辑或无状态的组件，只包含：
    * HTML元素
    * 其他基础组件
    * 第三方UI组件库
* 单例组件：只拥有单个活跃实例的组件，每个页面只使用一次，应用订制，无prop上下文
* 紧密耦合的组件：和父组件紧密耦合的子组件


 <p style="border-left-color: #42b983;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    单文件组件： <i style="color: #41b883"> 首字母大写（PascalCase） </i>或者横线连接（kebab-case），并且风格统一
</p>

 <p style="border-left-color: #67C23A;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    基础组件： 特定前缀 <i style="color: red">Base, APP, V</i>
</p>

 <p style="border-left-color: #409EFF;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    单例组件： 特定前缀 <i style="color: red">The</i>
</p>

 <p style="border-left-color: #E6A23C;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    紧密耦合的组件： 以父组件名作为前缀命名，或者父组件命名的目录嵌套子组件
</p>

 <p style="border-left-color:#EA80FC;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    模板中的组件名： 首字母大写（PascalCase）或者横线连接（kebab-case），由于HTML对大小写不敏感，推荐使用<i style="color: #41b883"> 横线连接 </i>的方式
</p>


### prop名大小规范

 <p style="border-left-color:#42b983;padding: 12px 24px 12px 30px;margin: 2em 0;border-left-width: 4px;border-left-style: solid;background-color: #f8f8f8;position: relative; border-bottom-right-radius: 2px; border-top-right-radius: 2px;">
    声明prop： <i style="color: #41b883"> 驼峰式命名（camelCase） </i>的方式
</p>


### Vue 组件属性

* 全局感知（要求组件之外的感知）
    *  name
    *  parent

~~~
name
    类型：string
    限制：只有作为组件选项时起作用。
    详细：
        允许组件模板递归地调用自身。
        指定 name 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。
~~~

~~~
parent
    类型：Vue instance
    详细：
        指定已创建的实例之父实例，在两者之间建立父子关系。
        子实例可以用 this.$parent 访问父实例
        子实例被推入父实例的 $children 数组中。
~~~

* 组件类型（更改组件类型）
    *  functional

~~~
functional
    类型：boolean
    详细：
        使组件无状态 (没有 data) 和无实例 (没有 this 上下文)。
        他们用一个简单的 render 函数返回虚拟节点使它们渲染的代价更小。
~~~

* 模板修改器（修改模板的编译方式）
    *  delimiters
    *  comments

~~~
delimiters
    类型：Array<string>
    默认值：
        ["{{", "}}"]
    限制：
        这个选项只在完整构建版本中的浏览器内编译时可用。
    详细：
        改变纯文本插入分隔符。
~~~

~~~
comments
    类型：boolean
    默认值：false
    限制：这个选项只在完整构建版本中的浏览器内编译时可用。
    详细：
        当设为 true 时，将会保留且渲染模板中的 HTML 注释。默认行为是舍弃它们。
~~~


* 模板依赖（模板内使用的资源）
    *  components
    *  directives
    *  filters

~~~
components
    类型：Object
    详细：
        Vue 实例可用组件的哈希表
~~~

~~~
directives
    类型：Object
    详细：
        Vue 实例可用指令的哈希表
~~~

~~~
filters
    类型：Object
    详细：
        Vue 实例可用过滤器的哈希表
~~~

* 组合（向选项中合并属性）
    *  extends
    *  mixins
~~~
extends
    类型：Object | Function
    详细：
        允许声明扩展另一个组件 (可以是一个简单的选项对象或构造函数)，而无需使用 Vue.extend。
        这主要是为了便于扩展单文件组件。

        var CompA = { ... }
        // 在没有调用 `Vue.extend` 时候继承 CompA
        var CompB = {
          extends: CompA,
          ...
        }
~~~

~~~
mixins
    类型：Array<Object>
    详细：
        mixins 选项接收一个混入对象的数组。
        这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，
        使用的是和 Vue.extend() 一样的选项合并逻辑。
        也就是说，如果你的混入包含一个 created 钩子，而创建组件本身也有一个，那么两个函数都会被调用。
        Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
~~~

* 接口（组件的接口）
    *  inheritAttrs
    *  model
    *  props/propsData
~~~
inheritAttrs
    类型：boolean
    默认值：true
    详细：
        默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
        当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。
        通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。
        而通过 (同样是 2.4 新增的) 实例 property $attrs 可以让这些 attribute 生效，
        且可以通过 v-bind 显性的绑定到非根元素上。
    注意：这个选项不影响 class 和 style 绑定。
~~~

~~~
model
    类型：{ prop?: string, event?: string }
    详细：
      允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，
      一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，
      但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。
      使用 model 选项可以回避这些情况产生的冲突。
~~~

~~~
props
    类型：Array<string> | Object
    详细：
       props 可以是数组或对象，用于接收来自父组件的数据。
       你可以基于对象的语法使用以下选项：
            type：
                可以是下列原生构造函数中的一种：
                String、Number、Boolean、Array、Object、Date、Function、Symbol、任何自定义构造函数、或上述内容组成的数组
            default：any
                为该 prop 指定一个默认值。
            required：Boolean
                定义该 prop 是否是必填项。
            validator：Function
                自定义验证函数会将该 prop 的值作为唯一的参数代入。
~~~

~~~
propsData
    类型：{ [key: string]: any }
    限制：只用于 new 创建的实例中。
    详细：
        创建实例时传递 props。主要作用是方便测试。
~~~

* 本地状态（本地的响应式属性）
    *  data
    *  computed

~~~
data
    类型：Object | Function
    限制：组件的定义只接受 function。
    详细：
        Vue 实例的数据对象。
        Vue 将会递归将 data 的 property 转换为 getter/setter，
        从而让 data 的 property 能够响应数据变化。
~~~

~~~
computed
    类型：{ [key: string]: Function | { get: Function, set: Function } }
    详细：
        计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
~~~


* 事件（通过响应式事件触发的回调）
    *  watch
    *  beforeCreate
    *  created
    *  beforeMount
    *  mounted
    *  beforeUpdate
    *  updated
    *  activated
    *  deactivated
    *  beforeDestroy
    *  destroyed

~~~
activated
    类型：Function
    详细：
        被 keep-alive 缓存的组件激活时调用。
        该钩子在服务器端渲染期间不被调用。
~~~

~~~
deactivated
    类型：Function
    详细：
        被 keep-alive 缓存的组件停用时调用。
        该钩子在服务器端渲染期间不被调用。
~~~

* 非响应式属性（不依赖响应系统的实例属性）
    *  methods

* 渲染（组件输出的声明式描述）
    *  template/render
    *  renderError