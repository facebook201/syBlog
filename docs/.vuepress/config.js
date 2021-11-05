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
        text: '刷题系列',
        items: [
          {
            text: '剑指Offer',
            link: '/Leetcode/Offer/'
          },
          {
            text: '面试金典',
            link: '/Leetcode/Dict/'
          },
          {
            text: 'Leetcode',
            link: '/Leetcode/lcode/'
          }
        ]
      },
      { 
        text: '前端',
        items: [
          {
            text: '浏览器',
            link: '/fontEnd/Browser/'
          },
          {
            text: 'CSS',
            link: '/fontEnd/CSS/'
          },
          {
            text: 'BOM',
            link: '/fontEnd/BOM/'
          },
          {
            text: 'Node',
            link: '/fontEnd/Node/'
          },
          {
            text: '深入场景',
            link: '/fontEnd/deepKnow/'
          },
          {
            text: '前端工程化',
            link: '/fontEnd/RollupTools/'
          }
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
            text: '数据结构与算法之美',
            link: '/computerBasics/dataAndAlg/'
          },
          {
            text: '常见算法和数据结构',
            link: '/computerBasics/algorithm/'
          },
          {
            text: '设计模式',
            link: '/computerBasics/designPattern/'
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
          { text: '好的问题', link: '/Other/GoodQS/' },
          { text: '英文', link: '/Other/English/' },
          { text: '面试', link: '/Other/Interview/' },
          { text: '移动端问题', link: '/Other/mobileQS/' },
          { text: '好文连接', link: '/Other/fontendLink/' }
        ]
      }
    ],
    sidebar: {
      '/Leetcode/Offer/': [
        {
          title: '剑指Offer',
          collapsable: false,
          children: [
            '/Leetcode/Offer/',
            '/Leetcode/Offer/array.md',
            '/Leetcode/Offer/LinkedList.md',
          ]
        }
      ],
      '/fontEnd/BOM/': [
        {
          title: 'BOM浏览器模型',
          collapsable: false,
          children: [
            '/fontEnd/BOM/',
          ]
        }
      ],
      '/fontEnd/Node/': [
        {
          title: 'Node',
          collapsable: false,
          children: [
            '/fontEnd/Node/',
            '/fontEnd/Node/repo.md'
          ]
        }
      ],
      '/fontEnd/deepKnow/': [
        {
          title: '深入场景',
          collapsable: false,
          children: [
            '/fontEnd/deepKnow/',
          ]
        }
      ],
      '/fontEnd/RollupTools/': [
        {
          title: '前端工程化',
          collapsable: false,
          children: [
            '/fontEnd/RollupTools/',
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
            '/Native/JS/FileAPI.md',
            '/Native/JS/FunctionalLibrary.md'
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
      '/fontEnd/Browser/': [
        {
          title: '浏览器',
          collapsable: false,
          children: [
            '/fontEnd/Browser/',
            '/fontEnd/Browser/browser.md'
          ]
        }
      ],
      '/Native/ES6/': [
        {
          title: 'ES6',
          collapsable: false,
          children: [
            '/Native/ES6/',
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
            '/Other/Interview/',
            '/Other/Interview/Vue.md',
            '/Other/Interview/React.md',
            '/Other/Interview/code.md',
            '/Other/Interview/Browser.md',
            '/Other/Interview/Performance.md'
          ]
        }
      ],
      '/Other/mobileQS/': [
        {
          title: '移动端问题',
          collapsable: false,
          children: [
            '/Other/mobileQS/'
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
            '/computerBasics/designPattern/sectionTwo.md',
            '/computerBasics/designPattern/CreationalPatterns.md',
            '/computerBasics/designPattern/StructuralPatterns.md',
            '/computerBasics/designPattern/BehavioralPatterns.md',
            '/computerBasics/designPattern/DesignPrinciples.md',
            '/computerBasics/designPattern/DesignCase.md'
          ]
        }        
      ],
      '/computerBasics/algoritms/': [
        {
          title: '常见的算法',
          collapsable: false,
          children: [
            '/computerBasics/algoritms/'
          ]
        }        
      ],
      '/computerBasics/basic/': [
        {
          title: '计算机基础',
          collapsable: false,
          children: [
            '/computerBasics/basic/',
            '/computerBasics/basic/XHR.md',
            '/computerBasics/basic/TCP.md',
            '/computerBasics/basic/Memory.md',
          ]
        }
      ],
      '/computerBasics/dataAndAlg/': [
        {
          title: '数据结构和算法之美',
          collapsable: false,
          children: [
            '/computerBasics/dataAndAlg/',
            '/computerBasics/dataAndAlg/linked.md',
          ]
       }
      ],
      '/computerBasics/algorithm/': [
        {
          title: '常见算法和数据结构',
          collapsable: false,
          children: [
            '/computerBasics/algorithm/',
            '/computerBasics/algorithm/sort.md',
            '/computerBasics/algorithm/Hash.md',
            '/computerBasics/algorithm/List.md',
            '/computerBasics/algorithm/Tree.md',
            '/computerBasics/algorithm/BinaryTree.md',
            '/computerBasics/algorithm/recursion.md',
            '/computerBasics/algorithm/higherAlg.md'
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
      '/computerBasics/protocol/': [
        {
          title: '深入Http协议',
          collapsable: false,
          children: [
            '/computerBasics/protocol/'
          ]
        }
      ],
      '/fontEnd/CSS/': [
        {
          title: 'CSS',
          collapsable: false,
          children: [
            '/fontEnd/CSS/',
            '/fontEnd/CSS/css-world.md'
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
      '/Other/HTTP/': [
        {
          title: 'HTTP',
          collapsable: false,
          children: [
            '/Other/HTTP/'
          ]
        }
      ],
      '/Other/GoodQS/': [
        {
          titile: '高质量问题',
          collapsable: false,
          children: [
            '/Other/GoodQS/'
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

