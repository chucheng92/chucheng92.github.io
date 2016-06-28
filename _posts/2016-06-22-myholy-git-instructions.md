---
layout: post
title: 写给非IT专业同学的Git入门全攻略
tags: Git
category: 技术
---

## 写作初衷

因为有好友经常会把自己保存的文档丢失，或是编辑过的文件丢失修改。然后被boss大骂只能无奈重新去做一遍。这种事情不在少数，浪费时间也浪费了精力，同时保不准改日又会犯错。这时候我就在想，为什么作为IT男的我从来没有遇到过这样的问题呢。哈哈，因为我们开发者都会使用Git对自己的代码、文档进行管理，使用Git将文档、文章、图片、代码分布式存储，随时同步云端，完善的轨迹追踪和版本回退，妈妈再也不用担心我的文件、代码忘记保存、忘记丢失了。除了本职的代码管理，我也渐渐爱上了在GitHub写作。求职CV、软文、记账、日记、心情，每天都会写点东西，同时做好Git追踪和备份。所以，说了那么多，Git或者GitHub到底是什么呢？真的能够帮助我们学生党或者职场人士提高效率吗？慢慢往下看咯。

## Git&GitHub简介

Git（我们的主角）是由 Linux（一种电脑操作系统）之父 Linus Tovalds （鼎鼎大名之人）为了更好地管理Linux内核开发而创立的分布式版本控制系统。（这句看不懂咱就略过好了，不重要不重要~）至于GitHub呢，它是一个网站，给用户提供git服务。（其实，它还有个介绍---全世界最大的同性交友网站，是不是很可怕可怕= =）这样你就不用自己部署git系统，直接注册账号，用他们提供的git服务就可以了。而这也是我在本文中采取的方式，以GitHub for windows或者GitHub for mac的客户端工具（集成了Git）去讲解。

好吧，我相信看到这里你已经晕了，这也是很多人一开始看很多类似专业教程的感受。简单来说，Git是一个管理你的「代码的历史记录」的工具。只要我们的代码或者文件加入了Git管理，从出生到死亡，以及生命中的任何修改都会被记录下来。这样，你就有迹可循，随时回退到曾经修改之处。作为文科生来说，这样你就不至于将设计好的海报、文档之类的丢失了。

说了这么多，我不是程序员啊，你们程序员都没女朋友，你们程序员好可怕，我为什么要学这个啊啊啊！我又不要管理代码！

![](http://7xlkoc.com1.z0.glb.clouddn.com/c5325f74486d910a4068e54a152d32ac_b.jpg)

所以不是程序猿的文科生到底用这个干啥呢？

想一想，你有没有碰到过团队里几个人共同协作写一个文档的时候？或者说需要反复修改的东西？比如最简单的写论文，用word 保存一个一个版本，毕业论文final-1.docx，毕业论文final-2.docx，毕业论文final-n.docx，毕业论文-最终版.docx，毕业论文-最终最终版.docx。。。哈哈，这真不是搞笑，真的有看到萌萌的童鞋就是这么干的。然后把某个版本发邮件给老师？下次再找上次修改了什么地方简直要死啊有木有！！！如果你使用GitHub的话，写文章、写论文时，你就可以随时查阅之前的修改。清晰而有条理。当然GitHub的作用不止于此，所以不是程序猿可以用这个来做什么呢？我们从写小说慢慢讲起吧。

话说，最近少年打算写一个短篇小说，叫做《梦回少年》，因为习惯了markdown写作所以就打算把小说托管在GitHub上了，因为GitHub是支持markdown的。关于markdown，它是一种可以使用普通文本编辑器编写的标记语言，通过类似HTML的标记语法，它可以使普通文本内容具有一定的格式，轻量而好用。比如说我新建了一个文件叫hello.md(md是类似doc文件扩展名)，内容是`**HelloWorld**`，两个星号括起来的HelloWorld就会显示为粗体。关于markdown的其他语法，大家可以百度一下，你就知道了。我只能告诉你，markdown写作不要太酸爽。后续有时间的话，我也可以写一篇面向文科生的markdown教程。（挖个坑先~233）当然，现在咱们暂且不用markdown去写，直接txt文本去创作《梦回少年》。那么，废话不多说，here we go，开启我们的GitHub小说之路吧。

### 注册账号和安装GitHub客户端

1.访问https://github.com注册账号。

网站就是下面这样的啦，sign up注册账号。

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-1.png)

2.访问https://desktop.github.com下载一个GitHub Desktop 客户端，地址如下！

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-2.png)用你刚刚申请的账号登录进去。软件界面大致如下，功能什么的咱们慢慢说。

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-3.png)

3.好了，客户端软件先放着。咱们上网站瞧瞧，还是github.com，用你刚刚注册的账号登陆进去。首页应该是酱紫的。

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-4.png)

4.OK，点击repositories开始创建我们的小说仓库吧，

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-5.png)

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-6.png)

当然，如果你不想自己从头写小说，看到Lemonjing曾经写过的一个好到炸裂的文章，想把他的直接全部偷过来，修改修改就成你自己的文章了，这应该怎么办呢？github 还提供了一个很赞的功能叫做 fork ，你只需要点击这个神奇的按钮，就可以Lemonjing的「梦回少年」变成你自己的啦！任意修改都可以哦~

好的，创建完毕，是不是很easy。

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-7.png)

注意浏览器地址栏那里，这就是我们小说的仓库地址啦。

这时候，登录我们的客户端工具。执行clone命令，会把刚刚服务器（GitHub网站）上新建的梦回少年的小说仓库下载到本地。如下。

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-8.png)

5.开始写小说咯

**git clone**

小提示：git clone命令用来将服务器的仓库（包括其内容）复制一份到本地（即你的电脑）并且关联起来。使得以后你在自己电脑的所有修改都可以写回到服务器上，保持状态的同步。

这时候，我们定位到刚才clone的地址，会找到menghuishaonian的文件夹，这时候我们就可以愉快的开始写小说啦。比如说我写了第一章，文件名为梦回少年-1.txt。内容为第一章 记忆。写完后你会发现，客户端已经追踪到了。提示我们修改未提交。

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-11.png)

这时候我们点击commit将刚刚的操作提交。这样就做成了一个版本。

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-12.png)

这时候点击右上角的publish/sync就可以同步到服务器了。试试看。点击以后，访问 https://github.com/Lemonjing/menghuishaonian, 看到了吗，我们的文章已经同步到服务器啦，真是令人激动的一刻。

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-13.png)

为了熟悉一下提交，我们在第一章中多写点字把。

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-14.png)

然后点击左下角提交加入本地管理，如果想同步到服务器，再点击右上角sync就可以了。

话说，今天我突然觉得昨天的那句话“年纪渐渐大了，忽然之间，想起曾经的我，那是怎样的一个过去啊。”写的不好，想回退到第一章 记忆那里，只需要点击revert就可以了啊。（随时回退，这个功能真赞！）

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-15.png)

话说今天lemon写了一章华丽无比的番外，你要更新本地的小说和他写的保持一致怎么办？

**git pull**

小提示：git pull命令用来从服务器拉取更新到本地。使你的电脑上的仓库内容也保持最新。

![](http://7xlkoc.com1.z0.glb.clouddn.com/f5c5c0b43d1f9f7ab27267fbcc16d9fd_b.png)

好了，知道这些基本操作入门应该够了，我们来回顾一下（不要嫌弃我的画工啊喂！）

![](http://7xlkoc.com1.z0.glb.clouddn.com/github-flow.png)

以上以写小说为例，在日常工作学习中，你当然可以用GitHub来写作，写论文，存设计稿，图片都是可以的。

入门初期可以尝试一下简单的文本修改然后提交，熟悉后，由于迅速得到的一些正反馈会让你更有信心和动力去掌握好Git，加速你的办公效率！

所以先不要管GitHub网站上那些复杂的 issue 呀 wiki 呀乱七八糟的操作，按照上面的一步一步来，如果遇到什么问题百度谷歌 之，一般都会解决的。

当然，你也可以求助贴心的少年我。有时间都会帮忙的哈。

回到文章开头，我又不是程序猿不用写代码玩这个干啥？

github 其中一位创始人Chris详细描述了GitHub初创的前因后果，对github可以做什么他说道：

**Do whatever you want.**

所以不是程序猿可以用这个来做什么呢？（以下部分内容转自知乎）

1、**写书**

和 33 一起写小说的例子，还记得吧？几个人你一章我一章共同修改一本书，或是几个出版社的编辑对新书进行校对，利用这个神器就可以随时看到哪里出现了问题和更改。如果想自己写书的话 gitbook 也是不错的选择（又是一个坑。。）

2、**写文档神器**

身为科研狗、产品狗、射鸡湿的你，是不是经常写文档？一个成熟的文档可能会有好几个版本，需要不断地迭代，然后不断提交给老板看哪里需要修改。在不同版本间自如切换就要用到git branch和git rebase了。（这两个命令熟悉后可以再使用）
想想看，用 git 的分支管理不比拷贝粘贴更方便吗？

3、**健身**

有个哥们为了激励自己健身把每日计划都放上去了，还可以邀请其他人一起来相互监督！（我才不会说我自己也开了一个呢哈哈哈）
[hoosin/EveryDaySport · GitHub](https://github.com/hoosin/EveryDaySport)

4、**找女/男票**

没错，看这个项目！利用众包的形式一起罗列男友/女票条件的 list 然后试图自己开发出一个男票/女票233333
[YixuanFranco/YourBoyfriend](https://github.com/YixuanFranco/yourBoyFriend) · GitHub
[YixuanFranco/YourGirlfriend](https://github.com/YixuanFranco/yourGirlFriend) · GitHub
有人评论问我用这个找到女票了吗？
统一回复：
并！没！有！

5、**用GitHub搭建博客、个人网站**

一个有自己域名的独立博客，是不是很帅？！GitHub本身提供免费的托管服务，又提供了贴心的GitHub Pages 功能，可以绑定你自己的域名，免费、高效、不限流量，做一个个人页面绰绰有余。
Jekyll或Hexo的教程有空的话也写一个。。（又给自己挖个坑）各位看官如果想尝尝鲜，可以访问我的个人网站http://tinymood.com，本站即是Jekyll支持搭在GitHub上的。前前后后一年多了，我也写了上百篇文章了，用文字去结识朋友，记录心情，顺便给简历提升下逼格也是极好的。

![](http://7xlkoc.com1.z0.glb.clouddn.com/tinymood.png)

现在开始，抛开微博，使用GitHub制作一个自己的站点吧~

6、**用GitHub协作翻译**

与写书类似，团队协作，合作翻译著作。如果你是研究僧，科研狗，帮助老师翻译书籍的时候，GitHub就派上大用场了，create一个仓库，团队协作，快速翻译，钞票，房子，想想就激动，从此走向人生巅峰之路。（哎哎哎，好好说话，方向又歪了。）

7、**项目管理**

GitHub最初是为了开发的管理而生，当然也就具备了项目管理的潜质，特别是与开发密切联系的项目中，它的优势尽显。比如这篇文章介绍了如何使用GitHub结合 Trello 等其它工具进行项目管理：[使用GitHub进行团队合作](http://xiaocong.github.io/blog/2013/03/20/team-collaboration-with-github/)。当然，GitHub还是很偏重开发的管理，一般的项目管理还是适合使用 wortile 之类的产品。

8、**政府文件？**

之前看到一个知乎回答说：日本政府把宪法放上去了，德国政府也做过类似的事：German Federal Law Now on GitHub。除了德日之外，英美在 GitHub 上也有很多公众服务：英国政府多达 10 页的项目目录：[Government Digital Service · GitHub](https://github.com/alphagov) 其中很多是政府项目的源代码或者设计原则之类。芝加哥的公开地理信息：Forking your CityNew York Open City： City of New York

9、**科研项目及数据**

较早的[arXiv](http://arxiv.org/)、[PLoS](https://plos.org/)之外,在
教育方面：[OpenStudy](http://openstudy.com/)：一个社会性学习网络，通过互助来更好地学习，主题涉及到计算机、数学、写作等。
[openhatch](https://openhatch.org/): 通过练习、任务等帮助新手更好地进入开源社区

10、**个人简历**

GitHub上的代码无法造假，也容易通过你关注的项目来了解你的知识面的宽度与深度。现在越来越多知名公司活跃在GitHub，发布开源库并招募各类人才，例如：Facebook、Twitter、Yahoo ...
开始有了第三方网站提供基于GitHub的人才招聘服务，例如：
GitHire:通过它，可以找出你所在地区的程序员。
[Gitalytics.com](http://www.hugedomains.com/domain_profile.cfm?d=gitalytics&e=com)：通过它，能评估某位程序员在GitHub、LinkedIn、StackOverflow、hackernews等多个网站的影响力。
甚至专门有一个项目就是自动根据你的 GtiHub 公开项目创建个人简历：
[我们可以使用 Git 以及 GitHub 做哪些事情？ - Kane Blueriver 的回答](https://www.zhihu.com/question/23835324/answer/25972644)

11、**设计资源库（重点来了！！！）**

做 ppt 不知道到哪里去找高质量美图？
最近半年初入设计圈，收集了不少 bookmark 想在年底来一个总结。 于是自己创建了这个Design- Resource List 项目，旨在让更多的设计师找资源变得有章可循。
[timmy3131/design-resource · GitHub](https://github.com/timmy3131/design-resource)
先更新一部分，大概还有200多个还没放过来。。（吐血） 所以，欢迎大家也推荐自己收藏的资源，加入这个项目并一起持续更新么么哒 ：）

12、**更多的更多...**

更多好玩的内容等你自己发现哦

祝大家愉快的用上Git，再也不要回头重新做一遍文档或是其他了。升职加薪指日可待~

话说，手机屏幕小，链接点不了。手把手玩起来有压力啊。

还好贴心的少年我已经在个人网站同步更新了此文，传送门 http://tinymood.com/2016/06/22/myholy-git-instructions.html，大屏更精彩。

> 本文系本人个人公众号「梦回少年」原创发布，转载请联系。

### 联系我

- 邮箱: xmusaber@163.com
- QQ: 932191671
- [网易云音乐](http://music.163.com/#/user/home?id=63589002)
- [微博](http://weibo.com/u/1662536394)
- [片刻](http://pianke.me/profile/1924980/)
- [知乎](https://www.zhihu.com/people/tao-xiao-xiao-99)
- [牛客](http://www.nowcoder.com/profile/213475)