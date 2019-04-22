
module.exports = {
  title: '皮卡丘的知识体系',
  base: '/sy-fontend-system/', // 设置站点根目录
  description: '宁静致远 淡泊明志',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      } 
    ]
  ],
  themeConfig: {
    nav: [
      { text: '前端', link: '/fontEnd' },
      { text: 'python', link: '/python' },
      { text: 'leetcode', link: 'leetcode' }
    ],   
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

