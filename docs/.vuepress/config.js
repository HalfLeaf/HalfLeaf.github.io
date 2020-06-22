const resolve = require("vuepress-theme-hope/resolve");


module.exports = resolve({
    baseLang:'zh-CN',   // 主目录所对应的语言
    author: "半片叶",   // 文章显示的默认作者
    title: "半片叶 の 小窝 ~",
    description: " ☰ &emsp;&emsp;  潜龙在渊 &emsp;&emsp; 凤栖于巢 ",
    headOption: {
      icon: "/favicon.ico" , // 增加一个自定义的 favicon(网页标签的图标)
    },
    base: "/",

    themeConfig: {
      logo: "/favicon.ico",          // 导航栏的 logo 图片, 需填入绝对路径并放入 .vuepress/public 文件夹
      sidebarDepth:2,               // 侧边栏嵌套的标题深度
      displayAllHeaders:false,     // 显示所有页面的标题链接
      activeHeaderLinks:true,     // 自动更新嵌套的标题链接和 URL 中的 Hash 值
      search: true,              // 启用默认的搜索框
      searchMaxSuggestions: 3,  // 搜索框显示的搜索结果数量
      nextLinks:true,          // 所有页面的 下一篇 链接
      nextLinks:true,         // 所有页面的 上一篇 链接
      SEO: false,            // SEO 搜索
      themeColor: {
        blue: '#409eff',
        red: '#f56c6c',
        green: '#3eaf7c',
        orange: '#fb9b5f',
        purple: '#c888f6',
        cyan: '#67c23a',
      },
      // 主题的多语言配置
      locales: {
        "/en/": {
          title: "Half Leaf の Home ~",
          description: "Strengthen myself, and wait for the right time ~ ",
        },
      },
      // 导航栏
      nav:[
        { text: '主页', link: '/', icon: '/assert/github.png' },
        { text: '学习笔记', prefix: '/study-note/', icon: 'project',
          items: [
            { text: 'python', link: '/python/', icon: 'infofill' },
            { text: 'vue', link: '/vue/', icon: 'infofill' },
            { text: '后端技能', link: '/backend/', icon: 'markdown' },
            { text: '前端技术', link: '/fontend/', icon: 'markdown' },
            { text: '前沿技术', link: '/advanced/', icon: 'markdown'},
          ]
        },
        { text: '踩坑随记', link: '/solution/', icon: 'project' },
        { text: '收藏', link: '/collection/', icon: 'project' },
      ],
      // 侧边栏
      sidebar:[],
      blog:false
    }
})



/* 

     isTimeLine: true, // 时间轴
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
            { text: '收藏', link: '/gather/gather.md' , icon: '/gather.ico'},
            { text: '时间轴', link: '/timeline/', icon: '/timeline.ico' },
            {text:'关于', link:'/guide/guide.md'},
        ],
        displayAllHeaders: true, // 默认值：false
        activeHeaderLinks: true, // 默认值：true
        //侧边栏配置
        sidebar: {
            '/': [
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
                {
                  title: '链接',
                  collapsable: false, // 不可折叠
                  children: [
                    { text: 'Github', link: 'https://github.com/HalfLeaf', icon: '/github.ico' },
                    { text: 'Gitee', link: 'https://github.com/HalfLeaf', icon: '/gitee.ico' },
                    { text: '博客园', link: 'https://www.cnblogs.com/halfleaf', icon: '/bokeyuan.ico' },
                  ]
              },
            ]
        }        
    },
             
    algolia: {
        apiKey: '<API_KEY>',
        indexName: '<INDEX_NAME>'
        }
*/