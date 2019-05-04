
module.exports = {
  title: '皮卡丘的前端体系',
  base: '/sy-fontend-system/', // 设置站点根目录
  description: '飘飘乎如遗世独立 羽化而登仙',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/pkq.jpeg'
      } 
    ]
  ],
  themeConfig: {
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      { 
        text: '前端',
        items: [
          {
            text: 'JavaScript基础知识',
            link: '/fontEnd/JS/'
          },
          {
            text: 'JS功能函数',
            link: '/fontEnd/functionMap/'
          },
          {
            text: 'node',
            link: '/fontEnd/Node/'
          },
          {
            text: 'JS提升阶段',
            link: '/fontEnd/Improve/'
          },
          {
            text: 'JS内置方法',
            link: '/fontEnd/Native/'
          },
          {
            text: 'element-ui使用',
            link: '/fontEnd/ElementUI/'
          },
          {
            text: 'JavaScript的技巧',
            link: '/fontEnd/Skills/'
          },
          {
            text: '正则表达式',
            link: '/fontEnd/RegExr/'
          }
        ]
      },
      {
        text: '计算机基础',
        link: '/computerBasics/'
      },
      {
        text: 'python',
        link: '/python/'
      },
      { text: 'leetcode', link: '/leetcode/' },
      {
        text: '其他',
        items: [
          { text: '英文', link: '/Other/English/' },
          { text: '面试', link: '/Other/Interview/' }
        ]
      }
    ],
    sidebar: {
      '/fontEnd/JS/' : [
        {
          title: 'JavaScript基础知识',
          collapsable: false,
          children: [
            '/fontEnd/JS/'
          ]
        }
      ],
      '/fontEnd/functionMap/': [
        {
          title: 'JS功能函数',
          collapsable: false,
          children: [
            '/fontEnd/functionMap/'
          ]
        }
      ],
      '/fontEnd/Improve/': [
        {
          title: 'Js提升阶段',
          collapsable: false,
          children: [
            '/fontEnd/Improve/'
          ]
        }
      ],
      '/fontEnd/Native/': [
        {
          title: 'JS原生内置方法',
          collapsable: false,
          children: [
            '/fontEnd/Native/'
          ]
        }
      ],
      '/fontEnd/ElementUI/': [
        {
          title: 'ElementUI的使用',
          collapsable: false,
          children: [
            '/fontEnd/ElementUI/'
          ]
        }
      ],
      '/fontEnd/Skills/': [
        {
          title: 'JavaScript开发技巧',
          collapsable: false,
          children: [
            '/fontEnd/Skills/'
          ]
        }
      ],
      '/fontEnd/RegExr/': [
        {
          title: '正则表达式',
          collapsable: false,
          link: '/fontEnd/RegExr/'
        }
      ],
      '/computerBasics/': [
        {
          title: '计算机基础',
          collapsable: false,
          children: [
            '/computerBasics/'
          ]
        }
      ],
      '/Other/English/': [
        {
          title: '英文',
          collapsable: false,
          children: [
            '/Other/English/'
          ]
        }
      ],
      '/Other/Interview/': [
        {
          title: '面试',
          collapsable: false,
          children: [
            '/Other/Interview/'
          ]
        }
      ]
    },
    repo: 'facebook201/sy-fontend-system', // github 地址
    docsRepo: 'facebook201/sy-fontend-system',
    docsDir: 'docs',
    editLinks: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public'
      }
    }
  }
};

