<div id="metaData" createTime="2020-08-01 19:40:00" category="学习笔记" tags="前端;vue" title="VUE全局API - 全局API"></div>

# VUE全局API

## Vue.extend

Vue.extend(options)

参数:
   * { Object } options

用法:

使用基础Vue构造器创建一个子类，其参数是一个包含组件选择的对象

创建一个子类，直接在Vue上挂载对象，让它继承Vue的一些功能。

```javascript

let cid = 1
Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this
    // 为了性能考虑，增加缓存策略
    // 使用父类的id作为缓存的key，并且存入cachedCtors中
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name) // 进行校验名字是否合法
    }
    const Sub = function VueComponent (options) {
      this._init(options)
    }
    //原型的继承
    Sub.prototype = Object.create(Super.prototype)
    // 此时Sub.prototype.constructor指向的是Super，所以要进行修改
    Sub.prototype.constructor = Sub
    // 为子类增加cid，作为每个类的唯一标识
    Sub.cid = cid++
    // 合并了父类选项与子类选项的逻辑，并将父类保存到子类的super属性中
    // mergeOptions方法会将两个选项合并为一个新对象
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // 如果选项中存在props属性，初始化它
    if (Sub.options.props) {
      initProps(Sub)
    }
    // 如果选项中存在computed属性，初始化它
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // 子类继承父类静态方法 extend,mixin, use, component, directive, filter
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    //  ASSET_TYPES = ['component', 'directive', 'filter']

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    if (name) {
      Sub.options.components[name] = Sub
    }

    // 子类新增属性 superOptions, extendOptions, sealedOptions
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // 进行缓存构造函数
    cachedCtors[SuperId] = Sub
    return Sub
  }
}

```

```javascript
// 初始化props，将key代理到_props中
function initProps(Comp){
    const props = Comp.options.props
    for (const key in props){
        proxy(Comp.prototype, `_props`, key)
    }
}
function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
        return this[sourceKey][key]
    }
     sharedPropertyDefinition.set = function proxySetter (val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

// 初始化computed，对computed对象中的每一项进行定义
function initComputed(Comp){
    const computed = Comp.options.computed
    for (const key in computed){
        defineComputed(Comp.prototype, key, computed[key])
    }
}

```

## Vue.nextTick

Vue.nextTick([callback, context])

参数:
   * { Function } [callback]
   * { Object } [context]

用法:

    在下次DOM更新循环结束之后执行延迟回调，修改数据之后立即使用这个方法获取更新后的DOM


## Vue.set

Vue.set(target, key, value)

参数:
   * { Object | Array } target
   * { string | number } key
   * { any } value

用法:

    设置对象属性值
    如果对象是响应式，确保属性被创建后也是响应式的，同时触发视图更新
    这个方法主要用于避开Vue不能检测到的属性被添加的限制

注意：
    对象（key值）不能是Vue.js实例或者Vue.js实例的根数据对象


## Vue.delete

Vue.delete(target, key)

参数:
   * { Object | Array } target
   * { string | number } key

用法:

    删除对象属性
    如果对象是响应式，确保属性被创建后也是响应式的，同时触发视图更新
    这个方法主要用于避开Vue不能检测到的属性被删除的限制


## Vue.directive

Vue.directive(id, [definition])

参数:
   * { string } id
   * { Function | Object } [definition]

用法:

    注册或获取全局指令

实现逻辑:

```javascript
// 存放选项，并在选项上新增directive方法用于存放指令
Vue.options = Object.create(null)
Vue.options[directives] = Object.create(null)

Vue.directive = function (id, definition){
    // definition参数不存在，则使用id从选项中读出指令
    if(!definition){
        return this.options['directives'][id]
    }else{
        // definition参数存在时，说明是注册操作
        if(typeof definition === 'function'){
            // definition是函数的情况下，默认监听 bind和update两个事件
            // 将definition函数分别赋值给对象中的bind和update
            // 使用该对象覆盖definition
            definition = { bind:definition, update:definition }
        }
        // definition不是函数的情况下，用户自定义的指令对象
        // 此时将用户自定义的指令对象，保存到this.options['directives']
        this.options['directives'][id] = definition
        return definition
    }
}
```


## Vue.filter

Vue.filter(id, [definition])

参数:
   * { string } id
   * { Function | Object } [definition]

用法:

    注册或获取全局过滤器

    自定义过滤器，用于常见的文本格式化

    一般可用于：
        * 双括号插值
        * v-bind表达式

实现逻辑:

```javascript
// 存放选项，并在选项上新增directive方法用于存放指令
Vue.options['filters'] = Object.create(null)
Vue.filter = function (id, definition){
    // definition参数不存在，则使用id从选项中读出指令
    if(!definition){
        return this.options['filters'][id]
    }else{
        // 注册操作，直接将该参数保存到 this.options['filters']
        this.options['filters'][id] = definition
        return definition
    }
}
```

## Vue.component

Vue.component(id, [definition])

参数:
   * { string } id
   * { Function | Object } [definition]

用法:

    注册或获取全局组件，注册组件时还会自动使用给定的id设置组件的名称

    自定义过滤器，用于常见的文本格式化

    一般可用于：
        * 双括号插值
        * v-bind表达式

实现逻辑:

```javascript
// 存放选项，并在选项上新增directive方法用于存放指令
Vue.options['components'] = Object.create(null)
Vue.component = function (id, definition){
    // definition参数不存在，则使用id从选项中读出指令
    if(!definition){
        return this.options['components'][id]
    }else{
        // definition是Object对象时，注册组件
        if(isPlainObject(definition)){
          definition.name = definition.name || id
          definition = Vue.extend(definition)
        }
        this.options['components']['id'] = definition
        return definition
    }
}
```

## Vue.use

Vue.use( plugin )

参数:
   * { Function | Object } plugin

用法:
    安装Vue.js插件。
    * 如果插件是一个对象，必须提供install方法。
    * 如果插件是一个函数，它会作为install方法
    * 调用install方法时，会将Vue作为参数传入

实现逻辑:

```javascript
Vue.use = function ( plugin ){
    // 判断插件是否被注册过，每个插件只会注册一次
    const installPlugins = (this._installPlugins || (this._installPlugins = []))
    if(installPlugins.indexOf(plugin) > -1){
        return this
    }
    const args = toArray(arguments, 1)
    // Vue插入到arguments最前面，保证install方法执行时第一个参数是Vue
    args.unshift(this)
    // plugin 参数支持对象和函数类型
    if(typeof plugin.install === 'function'){
        plugin.install.apply(plugin, args)
    }else if(typeof plugin === 'function'){
        plugin.apply(null, args)
    }
    // 插入到组件库中，保证不会被重复注册
    installedPlugins.push(plugin)
    return this
}
```

## Vue.mixin

Vue.mixin( mixin )

参数:
   * { Object } mixin

用法:
    全局注册一个混入（mixin），Vue.mixin方法注册后会影响之后创建的每一个Vue.js实例
    因为此方法会更改 Vue.options属性

实现逻辑:

```javascript
import { mergeOptions } from '../util/index'
export function initMixin(Vue) {
    Vue.Mixin = function (mixin){
        // mergeOptions将用户传入的mixin与this.options合并成为一个新对象
        this.options = mergeOptions(this.options, mixin)
        return this
     }
}
```

## Vue.compile

Vue.compile( template )

参数:
   * { string } template

用法:
    编译模板字符串并返回包含渲染函数的对象，只在完整版Vue中有效

## Vue.version

Vue.version()

用法:
    提供字符串形式的Vue.js安装版本号

实现逻辑:

```javascript
var version = Number(Vue.version.split('.')[0])
```

Vue.js在构建文件的配置中定义了 __VERSION__常量，
使用rollup-plugin-replace插件在构建过程中将代码中的常量__VERSION__替换成package.json文件中的版本号