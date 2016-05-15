---
layout: post
title: activity生命周期和启动模式深入理解
category: 技术
tags: android
description: double eleven happy to me
---

>Activity的生命周期和启动模式的深入理解

参考书籍： [android开发艺术](http://bornbeauty.github.io/2015/11/06/book-list-of-2015.html#Android开发艺术探索)
参考博客： [楚云之南-android的task任务栈](http://www.cnblogs.com/CSU-PL/p/3794280.html)
　　　　　 [Activity的task相关](http://blog.csdn.net/liuhe688/article/details/6761337)
　　　　　 [Activity的四种launchMode ](http://blog.csdn.net/liuhe688/article/details/6754323)


## 一.Activity的生命周期

这个问题大家应该是比较清楚的，这个也比较简单，很好理解。首先，我们先来看一张Activity的生命周期图。
![activity生命周期](http://7xjtan.com1.z0.glb.clouddn.com/activity_lifecycle.png)

挨个看下每一个生命周期(准确的说这只是每一个生命周期开始的时候的回调函数而已)：

##### 1.onCreate()

表示activity正在被创建，这里我们主要是做一些初始化的工作。比如调用`setContentView()`方法去设置布局文件，初始化activity所需要的数据等等。
***要注意***，这个时候并不能保证activity已经完全运行起来了，我们要是想动态加载一些布局，测量view的大小等等可能不会得到想要的结果。google其实给我们提供了另外一个回调方法`onPostCreate()`,这个方法是在activity完成加载完成呈现给用户后回调的方法。看一下官方文档怎么说的

>Since: API Level 1
>Called when activity start-up is complete (after onStart() and onRestoreInstanceState(Bundle) have been called). Applications will generally not implement this method; it is intended for system classes to do final initialization after application code has run.
Derived classes must call through to the super class's implementation of this method. If they do not, an exception will be thrown.

稍微翻译一下：
onPostCreate()将会在activity加载完成后被调用(在onCreate()和onRestoreInstanceState(Bundle)方法已经被调用后)。应用一般不用复写这个方法，这个方法最初设计的目的是在应用运行后做一些初始化的工作。
派生类中复写这个方法的时候必须首先调用父类的onPostCreate()方法，不然会有异常抛出。

##### 2.onRestart()

表示activity正在重新启动。一般是activity从不可见状态转换到可见状态的时候会被调用。比如用户按下home键的时候activity被切换到后台，onPause()和onStop()被调用，然后用户又重新打开了这个应用，就会调用onRestart()方法。

##### 3.onStart()

表示activity正在被启动，这个时候activity已经可见了，但是我们还不能看到，不能直接与用户进行交互操作。可以理解为已经显示出来了，但是我们还看不到。

##### 4.onResume()

表示activity已经可见，并且已经在前台开始活动了；

##### 5.onPause()

表示activity被暂停，android开发艺探索作者认为：onPause()调用后onstop()方法就会紧接着被调用，除非快速的重新切入这个activity不然很难重现onPause()->onResume()这一过程，我认为可能在activity被部分遮盖的时候会出现这种情况，根据官方文档：

>The foreground lifetime of an activity happens between a call to onResume() until a corresponding call to onPause(). During this time the activity is in front of all other activities and interacting with the user. An activity can frequently go between the resumed and paused states -- for example when the device goes to sleep, when an activity result is delivered, when a new intent is delivered -- so the code in these methods should be fairly lightweight.

这里暂且一放，改日代码测试；
***2015年11月13日19:49:38:***
<u>测试后发现，无论是锁屏还是dialog遮盖均是onPause()调用后onStop()立即被调用，没有出现只调用onPause()的情况，印证了作者的说的话。当然，我觉得既然google设置了onPause和onStop两个回调必然有他的理由，所以再以后的开发中可以留意一下。</u>



***这里需要注意的是：不要在onPause()中一些重量级的回收工作 根据官方文档所说，只有在onPause()结束后，下一个activity才会重新开始***

>Implementations of this method must be very quick because the next activity will not be resumed until this method returns.

##### 6.onStop()

表示activity即将停止，可以稍微做一些重量级的回收工作。

##### 7.onDestory()

表示activity即将被销毁，这是最后一个回调，我们可以做一些回收和资源释放的工作。

## 二.异常情况下Activity的生命周期

我们这里说的异常主要包括两种情况：
 - 资源相关的配置发生了变化导致了Activity被杀死并重新创建
 - 在内存不足的情况下导致优先级比较低的Activity被杀死

google给我们提供了`onSaveInstanceState()`和`onRestoreInstanceState()`这两个方法来保存我们的数据。
***需要注意的是只有发生异常情况的时候才会调用这两个方法，如果是正常finish掉的话是不会被调用的***

## 三.Activity的启动模式

activity共有四种启动模式：
- standard：标准模式
- singleTop：栈顶复用模式
- singleTask：栈内复用模式
- singleInstance：单实例模式

这里我们先要补充一个概念：任务栈(task stack)
它是一个具有栈性质的activity的容器，用来存放多个activity实例。任何在系统中存活的activity都会交由任务栈去管理。至于任务栈和启动什么关系，我们待会会有详细介绍。

**我们先看第一种-标准模式：**
这是系统默认的启动方式。简单的说，每一个调用`startActivityForResult()`都会启动一个新的activity(`startActivity()也是去调用startActivityForResult()的`)，并且进入调用他的那个actiivty的任务栈的栈顶。
很典型的一个例子，当我们使用ApplicationContext去启动一个标准启动模式的activity的模式是会失败的。我们往往得到这样的报错信息:

>android.util.AndroidRuntimeException:Calling startActivity from outside of an activity context requires the FLAG_ACTIVITY_NEW_TASK flag. Is this really what you want?

这个其实就很好理解了，standard启动模式的activity在启动的时候要进入任务栈，但是非activity的context又没有这个东西，自然就会处错了。解决办法就是在`intent`里面添加一个值为FLAG_ACTIVITY_NEW_TASK的flag就好了。这时候就是以singleTask模式来启动的activity。

**第二种启动模式-栈顶复用模式**
在这种模式下，如果要启动的activity已经处于任务栈的栈顶了，则去回调`oneNewIntent()`方法，而不是去新启动一个activity。但是如果actiivty没有处于栈顶则无法复用，系统会重新启动一个新的activity。

**第三种启动模式-栈内复用模式**
这是一种单例模式(相对于一个任务栈来说)，只要任务栈内存在这个activity的实例了，就会直接回调`onNewIntnet()`方法。同时需要注意，在该activity被复用的同时，位于它上方的activity都会被出栈销毁。
举个列子，例如我们有ABCD四个activity位于同一个任务栈里面，A位于栈顶，D位于栈底端。如果此时以`singleTask`模式去启动D，这时候ABC都会出栈从而使得D出现在栈的顶端。如果是调用C，那么AB出栈。

**第四种地洞模式-单实例模式**
这就是一个加强版的`singleTask`。以这种模式启动的时候，系统会新开一个任务栈，并且只允许这一个activity运行在这里面。例如很多分享界面都是采用这模式的。
加入你使用知乎通过qq分享给你的好友，在分享的页面使用按下home键，这时候在打开qq的时候你会发现直接到了分享的界面中了。

我们可以通过`android：taskAffinity`属性来指定启动模式，也可以在通过在`intent`中添加flag来指定。








