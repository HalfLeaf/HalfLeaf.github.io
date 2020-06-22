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
          nav:[
            { text: 'Home', link: '/', icon: '/assert/github.png' },
            { text: 'Notes', prefix: '/notes/', icon: 'project',
              items: [
                { text: 'Python', link: '/python/', icon: 'infofill' },
                { text: 'Vue', link: '/vue/', icon: 'infofill' },
                { text: 'Backend', link: '/backend/', icon: 'markdown' },
                { text: 'Fontend', link: '/fontend/', icon: 'markdown' },
                { text: 'Advanced', link: '/advanced/', icon: 'markdown'},
              ]
            },
            { text: 'Solution', link: '/solution/', icon: 'project' },
            { text: 'Collection', link: '/collection/', icon: 'project' },
            { text: 'TimeLine', link: '/timeline/', icon: '/timeline.ico' },
          ]
        }
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
            { text: '前沿技术', link: '/advanced/', icon: 'icon-markdown'},
          ]
        },
        { text: '踩坑随记', link: '/solution/', icon: 'project' },
        { text: '收藏', link: '/collection/', icon: 'project' },
        { text: '时间轴', link: '/timeline/', icon: 'icon-project' },
      ],
      // 侧边栏
      sidebar:[],
      blog:false,
      // Markdown 增强
      markdown: {
        enableAll: true,
      },
    }
})
