---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 木偶笔记
  text: 码无止境の世界
  tagline: 知识是进步的阶梯，争取每天都有知识点更新
  image:
    src: https://img.pupper.cn/img/1710229767.gif
    alt: 码无止境
  actions:
    - text: 前端物语
      link: /100-Python/1-对象与变量
    - text: 导航
      link: /nav
      theme: alt
features:
  - icon: 📖
    title: 前端物语
    details: 整理前端常用知识点<br />如有异议按你的理解为主，不接受反驳
    link: /410-HTML/3-常用标签详解
    linkText: 前端常用知识
  - icon: 📘
    title: 自动化
    details: 测试常用的 接口、web、app 等自动化技术
    link: /210-接口自动化/1-HTTP协议解读
    linkText: 源码阅读
  - icon: 💡
    title: 零散的知识
    details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
    link: /700-零散知识/1-MAC中Jmeter向python脚本传参
    linkText: 常用工具库
  # - icon: 🧰
  #   title: 提效工具
  #   details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
  #   link: /efficiency/online-tools
  #   linkText: 提效工具
  # - icon: 🐞
  #   title: 踩坑记录
  #   details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
  #   link: /pit/npm
  #   linkText: 踩坑记录
  # - icon: 💯
  #   title: 吾志所向，一往无前。
  #   details: '<small class="bottom-small">一个想躺平的小开发</small>'
  #   link: /mao
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>
