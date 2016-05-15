---

layout: post
title: upsdnu使用说明
category: 技术
tags: 其他
description: 

---

>upsdnu使用说明
任何意见以及建议都可以反馈 在博客下面留言即可

>BUG集合：
2016年3月15日20:58:09
1. 由于采用thread去请求认证 可能会导致内存泄露问题
2. 计算绩点操作数据的时候可能导致了精度丢失 
------------------------------------------------------------------------------------
1.alpha_2.1 2016年1月6日16:46:29：(尚未处理)
java.lang.StringIndexOutOfBoundsException: length=0; regionStart=1; regionLength=-2
at java.lang.String.startEndAndLength(String.java:504)
at java.lang.String.substring(String.java:1333)
at com.jimbo.myapplication.MainActivity.getWifiName(MainActivity.java:315)
可能是WIFI的名字过长溢出了
2.alpha_2.0 2016年1月6日16:56:12: (已经处理)
at android.view.ViewRootImpl.setView(ViewRootImpl.java:677)
at android.view.WindowManagerGlobal.addView(WindowManagerGlobal.java:248)
at android.view.WindowManagerImpl.addView(WindowManagerImpl.java:69)
at android.app.Dialog.show(Dialog.java:281)
at com.gc.materialdesign.widgets.SnackBar.show(SnackBar.java:93)
可能是因为activity被切换到后台导致的问题

# 1. 使用说明

>SDNU WIFI连接模块
1.首先在菜单选项里面找到`设置sdnu账号`
2.进入设置账号
3.在首页即可使用

注：软件没有任务后台服务，只会在网络状态改变的时候被激活(重启手机后没有打开过或者被强制关闭过软件不会被激活)，并且连接后完全释放资源。由于sdnu网络环境比较复杂，并不能保证每一次都能自动连接到网络，没有接收到通知的时候可以手动启动软件连接。

>成绩查询模块
1.在菜单选项里面找到`本学期成绩`和`计算绩点`
2.进入输入教务处`学号`和`密码`即可

注：这是我见过最丑的界面= =

# 2. 关于

>1.如果有意见请在下面留言或者发送邮件到 zhongjinbao1994@gmail.com，欢迎大家反馈
2.代码开源 不会窃取用户信息
3.唯一指定软件下载地址 [upsdnu-蒲公英](http://www.pgyer.com/upsdun)，不要相信其他途径，防止被钓鱼。

# 3. 软件部分截图

![截图2](http://7xjtan.com1.z0.glb.clouddn.com/screenshot.jpg)
![截图3](http://7xjtan.com1.z0.glb.clouddn.com/screenshot1_meitu_2.jpg)
![截图1](http://7xjtan.com1.z0.glb.clouddn.com/screenshot2_meitu_3.jpg)




