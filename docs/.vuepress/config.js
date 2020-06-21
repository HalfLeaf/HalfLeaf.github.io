module.exports = {
    title: 'Half Leaf ~ 小窝 ~',
    description: '☰  潜龙在渊  或跃在渊',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
      ],
     serviceWorker: true,
     base: '/', // 这是部署到github相关的配置  使用'/'时
                //部署到 https://<USERNAME>.github.io  USERNAME=你的用户名
       markdown: {
        lineNumbers: true // 代码块显示行号
      },
      themeConfig: {
         
        sidebar: 'auto',
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        
       //导航栏配置
        nav: [
            { text: '首页', link: '/'},
            { text: 'Python', link: '/md/python/python.md'},
            {
              text: '前端',
              items: [
                  { text: 'vue', link: '/md/vue/vue.md' },
                  { text: 'node.js', link: '/md/nodejs/nodejs.md' },
                  { text: 'Javascript', link: '/md/javascript/javascript.md' },
              ]
            },
            {
                text: '后端',
                items: [
                    { text: 'java', link: '/md/java/java.md' },
                    { text: '数据库', link: '/md/database/db.md' },
                    { text: '深度学习', link: '/md/deeplearn/deeplearn.md' },
                ]
            }, 
            { text: '收藏', link: '/gather/gather.md' },
            {
                text: '链接',
                items: [
                  { text: 'Github', link: 'https://github.com/HalfLeaf' },
                  { text: '博客园', link: 'https://www.cnblogs.com/halfleaf' },
                ]
              },
               
              {text:'关于', link:'/guide/guide.md'},
        ],
        displayAllHeaders: true, // 默认值：false
        activeHeaderLinks: false, // 默认值：true
         
        //侧边栏配置
        sidebar: {
            '/index/': [
                // 侧边栏在 /python/ 目录上
                {
                    title: 'python',
                    collapsable: true, // 不可折叠
                    children: [
                      '/md/python/python.md',
                      
                    ]
                },
                // 侧边栏在 /vue/ 目录上
                {
                  title: 'Vue',
                  collapsable: true, // 不可折叠
                  children: [
                    '/md/vue/vue.md'
                  ]
                },
            ]
        }        
    },
             
    algolia: {
        apiKey: '<API_KEY>',
        indexName: '<INDEX_NAME>'
        }
    }