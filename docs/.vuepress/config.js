/*
 * @Author: shiyao
 * @Description: 
 * @Date: 2019-08-05 07:49:39
 */

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
            text: 'node',
            link: '/fontEnd/Node/'
          },
          {
            text: 'ElementUI',
            link: '/fontEnd/ElementUI/'
          },
          {
            text: 'CSS',
            link: '/fontEnd/CSS/'
          },
          {
            text: 'BOM',
            link: '/fontEnd/BOM/'
          },
        ]
      },
      {
        text: '计算机基础',
        items: [
          {
            text: '计算机基础',
            link: '/computerBasics/basic/'
          },
          {
            text: '数据结构和算法',
            link: '/computerBasics/algorithm/'
          },
          {
            text: '设计模式',
            link: '/computerBasics/designPattern/'
          },
          {
            text: 'leetcode算法',
            link: '/computerBasics/leetcode/'
          },
          {
            text: 'Nginx',
            link: '/computerBasics/nginx/'
          }
        ]
      },
      {
        text: 'JavaScript',
        items: [
          {
            text: 'javascript',
            link: '/Native/JS/'
          },
          {
            text: 'ES6',
            link: '/Native/ES6/'
          },
          {
            text: '正则表达式',
            link: '/Native/RegExp/'
          },
          {
            text: 'JS提升阶段',
            link: '/Native/Improve/'
          },
          {
            text: 'JS功能函数',
            link: '/Native/Function/'
          }
        ]
      },
      {
        text: '其他',
        items: [
          { text: '英文', link: '/Other/English/' },
          { text: '面试', link: '/Other/Interview/' },
          { text: '好文连接', link: '/Other/fontendLink/' },
          { text: '团队规范', link: '/Other/Standard/' },
          { text: 'HTTP', link: '/Other/HTTP/'},
          { text: '一往而深', link: '/Other/Article/' },
          { text: '每日学习', link: '/Other/DailyStudy/' }
        ]
      }
    ],
    sidebar: {
      '/fontEnd/BOM/': [
        {
          title: 'BOM浏览器模型',
          collapsable: false,
          children: [
            '/fontEnd/BOM/',
          ]
        }
      ],
      '/Native/JS/': [
        {
          title: 'JS基础知识',
          collapsable: false,
          children: [
            '/Native/JS/',
            '/Native/JS/Error.md',
            '/Native/JS/Object.md',
            '/Native/JS/Advanced.md',
            '/Native/JS/SpecialTopic.md',
            '/Native/JS/JSON.md',
            '/Native/JS/FileAPI.md'
          ]
        }
      ],
      '/Native/RegExp/': [
        {
          title: '正则表达式',
          collapsable: false,
          children: [
            '/Native/RegExp/',
            '/Native/RegExp/Concept.md'
          ]
        }
      ],
      '/Native/Function/': [
        {
          title: 'JS功能函数',
          collapsable: false,
          children: [
            '/Native/Function/',
            '/Native/Function/Array.md',
            '/Native/Function/Other.md',
            '/Native/Function/RegExp.md',
            '/Native/Function/DOM.md'
          ]
        }
      ],
      '/Native/Improve/': [
        {
          title: 'Js提升阶段',
          collapsable: false,
          children: [
            '/Native/Improve/',
            '/Native/Improve/Test.md'
          ]
        }
      ],
      '/Native/Object/': [
        {
          title: 'Object',
          collapsable: false,
          children: [
            '/Native/Object/'
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
      '/Native/ES6/': [
        {
          title: 'ES6',
          collapsable: false,
          children: [
            '/Native/ES6/Promise.md',
            '/Native/ES6/Module.md',
            '/Native/ES6/Class.md',
            '/Native/ES6/set-map.md'
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
      ],
      '/Other/fontendLink/': [
        {
          title: '前端知乎好文链接',
          collapsable: false,
          children: [
            '/Other/fontendLink/'
          ]
        }
      ],
      '/computerBasics/designPattern/': [
        {
          title: '计算机基础',
          collapsable: false,
          children: [
            '/computerBasics/designPattern/',
            '/computerBasics/designPattern/sectionTwo.md'
          ]
        }        
      ],
      '/computerBasics/basic/': [
        {
          title: '计算机基础',
          collapsable: false,
          children: [
            '/computerBasics/basic/'
          ]
        }
      ],
      '/computerBasics/algorithm/': [
        {
          title: '数据结构和算法',
          collapsable: false,
          children: [
            '/computerBasics/algorithm/',
            '/computerBasics/algorithm/sort.md'
          ]
        }
      ],
      '/computerBasics/leetcode/': [
        {
          title: 'leetcode算法题',
          collapsable: false,
          children: [
            '/computerBasics/leetcode/'
          ]
        }
      ],
      '/computerBasics/nginx/': [
        {
          title: 'nginx',
          collapsable: false,
          children: [
            '/computerBasics/nginx/'
          ]
        }
      ],
      '/fontEnd/CSS/': [
        {
          title: 'CSS',
          collapsable: false,
          children: [
            '/fontEnd/CSS/'
          ]
        }
      ],
      '/Native/JSON/': [
        {
          title: 'JSON',
          collapsable: false,
          children: [
            '/Native/JSON/'
          ]
        }
      ],
      '/Other/Standard/': [
        {
          title: '标准',
          collapsable: false,
          children: [
            '/Other/Standard/',
            '/Other/Standard/ESlint.md'
          ]
        }
      ],
      '/Other/HTTP/': [
        {
          title: 'HTTP',
          collapsable: false,
          children: [
            '/Other/HTTP/'
          ]
        }
      ],
      '/Other/Article/': [
        {
          title: '一往而深',
          collapsable: false,
          children: [
            '/Other/Article/'
          ]
        }
      ],
      '/Other/DailyStudy/': [
        {
          title: '每日学习',
          collapsable: false,
          children: [
            '/Other/DailyStudy/'
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

