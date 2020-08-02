<div id="metaData" createTime="2020-07-30 17:20:00" category="学习笔记" tags="前端;vue" title="patch 虚拟DOM"></div>

# patching算法

将VNode渲染成真实的DOM，在现有DOM上进行修改来实现更新视图的目的

利用JavaScript运算速度远快于DOM操作的执行速度，减少DOM操作，来提升性能!
`