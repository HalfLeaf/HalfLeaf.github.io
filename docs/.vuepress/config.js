const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
    baseLang:'zh-CN',   // 主目录所对应的语言
    author: "半片叶",   // 文章显示的默认作者
    title: "半片叶 の 小窝 ~",
    description: " ☰   潜龙在渊  凤栖于巢 ",
    head: [
      ["script", {
        "language": "javascript",
        "type": "text/javascript",
        "src": "https://cdn.staticfile.org/jquery/1.7.2/jquery.min.js"
      }],
      ["script", {
        "language": "javascript",
        "type": "text/javascript",
        "src": "/js/MouseClickEffect.js"
      }]
    ],
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
            { text: 'Home', link: '/', icon: 'home-o' },
            { text: 'Notes', prefix: '/notes/', icon: 'xuexibiji',
              items: [
                { text: 'Vue', link: '/vue/', icon: 'vue' },
                { text: 'Python', link: '/python/', icon: 'python' },
                { text: 'Backend', link: '/backend/', icon: 'java' },
                { text: 'Fontend', link: '/fontend/', icon: 'nodejsNodejsxingnengpingtai' },
                { text: 'Advanced', link: '/advanced/', icon: 'advancedtransform'},
              ]
            },
            { text: 'Solution', link: '/notes/solution/', icon: 'jiejuefangan' },
            { text: 'Collection', link: '/notes/collection/', icon: 'shoucang' },
            { text: 'TimeLine', link: '/timeline/', icon: 'shijian-xian' },
          ]
        }
      },
      // 导航栏
      nav:[
        { text: '主页', link: '/', icon: 'home-o' },
        { text: '学习笔记', prefix: '/notes/', icon: 'xuexibiji',
          items: [
            { text: 'vue', link: '/vue/', icon: 'vue' },
            { text: 'python', link: '/python/', icon: 'python' },
            { text: '后端技能', link: '/backend/', icon: 'java' },
            { text: '前端技术', link: '/fontend/', icon: 'nodejsNodejsxingnengpingtai' },
            { text: '前沿技术', link: '/advanced/', icon: 'advancedtransform'},
          ]
        },
        { text: '踩坑随记', link: '/notes/solution/', icon: 'jiejuefangan' },
        { text: '收藏', link: '/notes/collection/', icon: 'shoucang' },
        { text: '时间轴', link: '/timeline/', icon: 'shijian-xian' },
      ],
      // 侧边栏
      sidebar:[],
      // Markdown 增强
      markdown: {
        enableAll: true,
      },
      // 页面评论
      comment: false,
      // {
      //   type: "valine",
      //   appId: "VVjE3KAOY4mRq6SXauTfp0FG-gzGzoHsz",
      //   appKey: "t7rtj1n7FGvchU6h5wEks9J8",
      // },
      //博客首页
      blog:{
        avatar:"/imgs/logo.jpg",
        name:"半片叶",
        timeline:"",
        intro:"/resume/",
        numberShow:false,
        links:{
          Github: "https://github.com/HalfLeaf",
          Gitee:  "https://gitee.com/lfye/projects",
          Leetcode: "https://leetcode-cn.com/u/half-leaf/",
          BoKeYuan: "https://www.cnblogs.com/halfleaf/",
          SegmentFault: "https://segmentfault.com/u/ye_clflover",
          Zhihu: "https://www.zhihu.com/people/xie-wei-luo-2",
          NeteaseEmail: "mailto:ye944205791@163.com",
          Wechat: "/social/wechat/",
        },
        ProjectOption:[
          {
            type: 'project',
            name: "Maybe",
            link: "https://github.com/HalfLeaf/Maybe"
          }
        ]
      },
    }
})
