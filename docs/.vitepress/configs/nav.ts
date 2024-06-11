import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/00.导航/nav', activeMatch: '^/nav' },
  {
    text: '编程基础',
    items: [
      {
        text: '',
        items: [{ text: 'Python', link: '/01.编程语言/01.Python/01.对象与变量.md' }],
      },
      {
        text: '',
        items: [{ text: 'Java', link: '/01.编程语言/05.Java/01.环境搭建.md' }],
      },
      {
        text: '',
        items: [{ text: 'Linux', link: '/01.编程语言/07.Linux/Linux常用命令.md' }],
      },
    ],
  },
  {
    text: '前端技术',
    items: [
      {
        text: '',
        items: [
          { text: 'HTML5', link: '/04.前端技术/01.HTML5/01.常用标签详解.md' },
          { text: 'CSS3', link: '/04.前端技术/02.CSS3/01.选择器.md' },
          {
            text: 'JavaScript',
            link: '/04.前端技术/03.JavaScript/01.输入输出、数据类型与转换.md',
          },
        ],
      },
      {
        text: 'Vue3',
        link: '/04.前端技术/04.Vue3/01.VUE基础.md',
      },
    ],
  },
  {
    text: '软件测试',
    items: [
      {
        text: '',
        items: [
          {
            text: '接口自动化',
            link: '/02.软件测试/01.接口自动化/01.HTTP协议解读.md',
          },
          {
            text: 'Web自动化',
            link: '/02.软件测试/02.Web自动化/01.Selenium元素定位.md',
          },
          {
            text: 'APP自动化',
            link: '/02.软件测试/03.APP自动化/01.Appium环境搭建.md',
          },
        ],
      },
      {
        text: '',
        items: [
          {
            text: '测试工具开发',
            link: '/03.测试开发/01.测试工具开发/01.Python知识点回顾.md',
          },
          {
            text: 'Django框架技术',
            link: '/03.测试开发/02.Django框架技术/01.Django入门.md',
          },
          {
            text: '测试平台实践',
            link: '/03.测试开发/03.测试平台实战/01.httprunner入门.md',
          },
        ],
      },
      {
        text: '性能测试',
        link: '/02.软件测试/04.性能测试/01.概述.md',
      },
    ],
  },
  {
    text: '零散知识',
    link: '/05.零散知识/01.MAC中Jmeter向python脚本传参.md',
  },
  {
    text: '常用工具',
    link: '/06.常用工具/服务器连接软件FinalShell.md',
  },
  {
    text: '密文',
    link: '/99.加密文章/加密文章测试.md',
  },
  {
    text: '关于',
    items: [
      { text: '分类', link: '/pages/archives.md' },
      { text: '标签', link: '/pages/tags.md' },
    ],
  },
]
