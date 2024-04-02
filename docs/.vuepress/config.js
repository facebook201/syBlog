/*
 * @Author: shiyao
 * @Description: 
 * @Date: 2019-08-05 07:49:39
 */

module.exports = {
  title: '皮卡丘博客',
  base: '/sy-fontend-system/', // 设置站点根目录
  description: '操千曲而后晓声 观千剑而后识器 ——《文心雕龙》',
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
        text: '软基',
        items: [
          {
            text: '数据结构',
            link: '/computerBasics/dataAndAlg/'
          },
          {
            text: '算法',
            link: '/computerBasics/algorithm/'
          },
          {
            text: '模式和原则',
            link: '/computerBasics/designPattern/'
          },
          {
            text: '网络协议',
            link: '/computerBasics/basic/'
          },
        ]
      },
      { 
        text: '前端体系',
        items: [
          {
            text: 'CSS',
            link: '/fontEnd/CSS/'
          },
          {
            text: 'JS',
            link: '/fontEnd/JS'
          },
          {
            text: '浏览器',
            link: '/fontEnd/Browser/'
          },
          {
            text: 'API',
            link: '/fontEnd/API/'
          },
          {
            text: 'Node',
            link: '/fontEnd/Node/'
          },
          {
            text: '场景深入',
            link: '/fontEnd/deepKnow/'
          },
          {
            text: '前端工程化',
            link: '/fontEnd/RollupTools/'
          }
        ]
      },
      {
        text: 'OTHER',
        items: [
          { text: '好问题', link: '/Other/GoodQS/' },
          { text: '英文', link: '/Other/English/' },
          { text: '移动端问题', link: '/Other/mobileQS/' },
          { text: '好文连接', link: '/Other/fontendLink/' },
        ]
      },
      {
        text: 'LeetCode',
        items: [
          {
            text: '链表',
            link: '/Leetcode/LinkedList/'
          },
        ]
      },
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
      'fontEnd/JS': [
          {
            title: 'JS',
            collapsable: false,
            children: [
          
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

