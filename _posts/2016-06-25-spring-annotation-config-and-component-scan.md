---
layout: post
title: Spring<context:annotation-config>和<context:component-scan>诠释及区别
tags: Spring
category: 技术
---

**<context:annotation-config> 和 <context:component-scan>的区别**

<context:annotation-config>是用于激活那些已经在spring容器里注册过的bean（无论是通过xml的方式还是通过package sanning的方式）上面的注解。

<context:component-scan>除了具有<context:annotation-config>的功能之外，<context:component-scan>还可以在指定的package下扫描以及注册javabean。

下面我们通过例子来详细查看他们的区别，有三个class,A,B,C,并且B,C的对象被注入到A中。


### 联系我

- 邮箱: xmusaber@163.com
- QQ: 932191671
- [网易云音乐](http://music.163.com/#/user/home?id=63589002)
- [微博](http://weibo.com/u/1662536394)
- [片刻](http://pianke.me/profile/1924980/)
- [知乎](https://www.zhihu.com/people/tao-xiao-xiao-99)
- [牛客](http://www.nowcoder.com/profile/213475)