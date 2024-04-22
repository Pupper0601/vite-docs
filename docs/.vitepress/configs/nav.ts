import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav', activeMatch: '^/nav' },
  {
    text: '编程基础',
    items: [
      { text: 'Python', link: '/100-Python/1-对象与变量.md' },
      { text: 'Java', link: '/130-Java/1-环境搭建.md' },
      { text: 'Linux', link: '/160-Linux/Linux常用命令.md' },
    ],
  },
  {
    text: '前端技术',
    items: [
      { text: 'HTML5', link: '/410-HTML/3-常用标签详解.md' },
      { text: 'CSS3', link: '/420-CSS3/1-选择器.md' },
      {
        text: 'JavaScript',
        link: '/430-JavaScript/1-输入输出、数据类型与转换.md',
      },
      {
        text: 'Vue3',
        link: '/440-Vue3/1-VUE基础.md',
      },
    ],
  },
  {
    text: '软件测试',
    items: [
      {
        text: '自动化测试',
        items: [
          {
            text: '接口自动化',
            link: '/210-接口自动化/1-HTTP协议解读.md',
          },
          {
            text: 'Web自动化',
            link: '/220-Web自动化/1-Selenium元素定位.md',
          },
          {
            text: 'APP自动化',
            link: '/230-APP自动化/10-Appium环境搭建.md',
          },
        ],
      },
      {
        text: '测试开发',
        items: [
          {
            text: '测试工具开发',
            link: '/310-测试工具开发/1-Python知识点回顾.md',
          },
          {
            text: 'Django框架技术',
            link: '/320-Django框架技术/1-Django入门.md',
          },
          {
            text: '测试平台实践',
            link: '/330-测试平台实战/1-httprunner入门.md',
          },
        ],
      },
      {
        text: '性能测试',
        link: '/380-性能测试/1-概述.md',
      },
    ],
  },
  {
    text: '零散知识',
    link: '/700-零散知识/',
  },
  {
    text: '密文',
    link: '/969-加密文章/加密文章测试.md',
  },
]
