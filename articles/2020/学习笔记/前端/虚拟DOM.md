<div id="metaData" createTime="2020-07-30 09:20:00" category="学习笔记" tags="前端;vue" title="虚拟DOM"></div>

# 虚拟DOM

状态映射成视图的解决方案
可避免不必要的DOM操作，节省一定的性能开销

<span style="font-size:12px;color:grey;">
通过状态生成一个虚拟节点树，然后通过虚拟节点树进行渲染。在渲染之前，会使用新生成的虚拟节点树和上一次生成的虚拟节点树进行对比，只渲染不同的部分，而不是整个节点树更新
</span>

# VNode

JavaScript中一个普通对象，从VNode类实例化的对象，节点描述对象。
<br />
作用：渲染视图时先创建vnode，然后使用它创建真实的DOM插入到页面上，将上一次渲染视图时所创建的vnode缓存起来，
之后每当需要重新渲染视图的时候，将新创建的vnode和上一次缓存的vnode进行对比，比较不同，并基于此修改真实的DOM
VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory)

```vue
{
    /*当前节点的标签名*/
    this.tag = tag
    /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.data = data
    /*当前节点的子节点，是一个数组*/
    this.children = children
    /*当前节点的文本*/
    this.text = text
    /*当前虚拟节点对应的真实dom节点*/
    this.elm = elm
    /*当前节点的名字空间*/
    this.ns = undefined
    /*编译作用域*/
    this.context = context
    /*函数化组件作用域*/
    this.functionalContext = undefined
    /*节点的key属性，被当作节点的标志，用以优化*/
    this.key = data && data.key
    /*组件的option选项*/
    this.componentOptions = componentOptions
    /*当前节点对应的组件的实例*/
    this.componentInstance = undefined
    /*当前节点的父节点*/
    this.parent = undefined
    /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.raw = false
    /*静态节点标志*/
    this.isStatic = false
    /*是否作为跟节点插入*/
    this.isRootInsert = true
    /*是否为注释节点*/
    this.isComment = false
    /*是否为克隆节点*/
    this.isCloned = false
    /*是否有v-once指令*/
    this.isOnce = false
  }
```

## VNode 节点类型

* 注释节点
* 文本节点
* 元素节点
* 组件节点
* 函数式组件
* 克隆节点


### 注释节点

* text 文本内容
* isComment 是否为注释节点

```vue
export const createEmptyVNode = text => {
    const node = new VNode()
    node.text = text
    node.isComment = true
    return node
}
```

### 文本节点

* text 文本内容

```vue
export const createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val))
}
```

### 元素节点

* tag 节点名称
* data 节点数据
* children 子节点列表
* context 当前组件的Vue实例

```vue
{
    children:[VNode， VNode],
    context:{...},
    data:{...},
    tag:"p"
}
```

```vue
export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode {
  /*兼容不传data的情况*/
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  /*如果alwaysNormalize为true，则normalizationType标记为ALWAYS_NORMALIZE*/
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  /*创建虚拟节点*/
  return _createElement(context, tag, data, children, normalizationType)
}

/*创建虚拟节点*/
export function _createElement (
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode {
  /*
    如果data未定义（undefined或者null）或者是data的__ob__已经定义（代表已经被observed，上面绑定了Oberver对象），
    那么创建一个空节点
  */
  if (isDef(data) && isDef((data: any).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
      'Always create fresh vnode data objects in each render!',
      context
    )
    return createEmptyVNode()
  }
  /*如果tag不存在也是创建一个空节点*/
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  /*默认默认作用域插槽*/
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    /*获取tag的名字空间*/
    ns = config.getTagNamespace(tag)
    /*判断是否是保留的标签*/
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      /*如果是保留的标签则创建一个相应节点*/
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      /*从vm实例的option的components中寻找该tag，存在则就是一个组件，创建相应节点，Ctor为组件的构造类*/
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      /*未知的元素，在运行时检查，因为父组件可能在序列化子组件的时候分配一个名字空间*/
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    /*tag不是字符串的时候则是组件的构造类*/
    vnode = createComponent(tag, data, context, children)
  }
  if (isDef(vnode)) {
    /*如果有名字空间，则递归所有子节点应用该名字空间*/
    if (ns) applyNS(vnode, ns)
    return vnode
  } else {
    /*如果vnode没有成功创建则创建空节点*/
    return createEmptyVNode()
  }
}

```

### 组件节点

* tag 节点名称
* data 节点数据
* context 当前组件的Vue实例
* componentOptions 独有属性，组件节点的选项参数，包括：propsData,tag,children等
* componentInstance 独有属性，组件实例

```vue
{
    componentInstance:{...},
    componentOptions:{...},
    context:{...},
    data:{...},
    tag:"vue-component-1-child",
    ...
}
```
```vue
{
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }

  /*如果在该阶段Ctor依然不是一个构造函数或者是一个异步组件工厂则直接返回*/
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(`Invalid Component definition: ${String(Ctor)}`, context)
    }
    return
  }

  /*处理异步组件*/
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context)
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      /*如果这是一个异步组件则会不会返回任何东西（undifiened），直接return掉，等待回调函数去触发父组件更新。s*/
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor)

  data = data || {}

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data)
  }

  // extract props
  const propsData = extractPropsFromVNodeData(data, Ctor, tag)

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  const listeners = data.on
  // replace with listeners with .native modifier
  data.on = data.nativeOn

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {}
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data)

  // return a placeholder vnode
  const name = Ctor.options.name || tag
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children }
  )
  return vnode
}

```



### 函数式节点

* tag 节点名称
* data 节点数据
* context 当前组件的Vue实例
* functionalContext 函数节点的上下文
* functionalOptions 函数节点的选项参数

```vue
{
    componentInstance:{...},
    componentOptions:{...},
    context:{...},
    data:{...},
    tag:"div",
    ...
}
```

### 克隆节点

将现有节点的属性复制到新节点中，让新创建的节点和被克隆的节点属性保持一致，从而实现克隆的效果
优化静态节点和插槽节点

* tag 节点名称
* data 节点数据
* context 当前组件的Vue实例
* functionalContext 函数节点的上下文
* functionalOptions 函数节点的选项参数

```vue
export function cloneVNode(vnode, deep) {
    const cloned = new VNode(
        vnode.tag,
        vnode.data,
        vnode.children,
        vnode.text,
        vnode.elm,
        vnode.context,
        vnode.componentOptions,
        vnode.asyncFactory,
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.isCloned = true   // 唯一区别
    if(deep && vnode.children){
        cloned.children = cloneChildren(vnode.children)
    }
    return cloned
}
```