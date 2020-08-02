<div id="metaData" createTime="2020-08-01 19:06:00" category="学习笔记" tags="前端;vue" title="VUE全局API - $mount"></div>

# VUE全局API - $mount

## vm.$mount

vm.$mount([elementOrSelector])

参数:
   * { Element | string } [elementOrSelector]

用法:

手动挂载一个尚未挂载的实例

如果没有提供elementOrSelector参数，模板将被渲染为文档之外的元素，并且必须使用原生的DOM API将其插入文档中

Vue运行时版本 + 编译器（mount核心功能） = 完整版




