---

layout: post
title: Android的消息机制
category: 技术
tags: android
description: Android的消息机制是怎样的呢?我们今天一起来看一下

---

>Android的消息机制是怎样的呢?我们今天一起来看一下

参考书籍: [Android开发艺术探索](http://bornbeauty.github.io/2015/11/06/book-list-of-2015.html#Android开发艺术探索)

今天学了一下android的消息机制,在开头我想先说下Android Studio 2.0!
今天在被窝里就看到了来自各个媒体有关Android Studio2.0的新闻,我也存在同样的疑问:不是刚刚才升级到1.5么?看到新闻上说速度提高了许多,自己也迫不及待的试了一下,果然快了好多好多!真是爽~这样的速度开发简直就是享受啊~

[AndroidStudio2.0](http://android-developers.blogspot.jp/2015/11/android-studio-20-preview.html)

### 1.消息机制概述

Android的消息机制主要是指Handler的运行机制.在Handler的背后,还需要Looper和MessageQueen的支持. MessageQueen顾名思义,就是消息队列,它的内部存放是一组消息.它仅仅负责消息的入队出队,并不负责怎么去处理消息.消息怎么去处理还要依靠Looper来完成.Looper会一直监听是否有新的消息,有的话就去处理消息,没有就会一直阻塞.

我以前在开发的时候曾经想这样干:
在线程的内部创建一个匿名内部类Handler去处理该线程的消息,在里面做一些更新UI的工作.但是却得到这样的错误信息:

```
java.lang.RuntimeException: Can't create handler inside thread that has not called Looper.prepare()
at android.os.Handler.<init>(Handler.java:200)
at android.os.Handler.<init>(Handler.java:128)
at com.example.jimbo.myapplication.MainActivity$2.run(MainActivity.java:59)
at java.lang.Thread.run(Thread.java:818)
```

当时很不解,但是我试着上面的说明,先去调用一下`Looper.prepare()`方法,然后在运行没有错误了,但是界面并没有更新,也就是说线程的消息并没有得到处理,或者是Handler并没有接收到消息.当时为了赶进度也就没深究,今天可以看一看到底哪里出了问题.
其实, `Looper.prepare()`只是创建了一Looper,但是并没有开始工作,所以上面的消息并没有发送处理,也就不会有什么错误出现.所以还要适时调用`Looper.loop()`方法才能真正使得Looper工作起来.
加上上面代码,再次运行,其实还是会有错误的.原因待会讲:

```
android.view.ViewRootImpl$CalledFromWrongThreadException: Only the original thread that created a view hierarchy can touch its views.
                    at android.view.ViewRootImpl.checkThread(ViewRootImpl.java:6357)
                    at android.view.ViewRootImpl.invalidateChildInParent(ViewRootImpl.java:909)
                    at android.view.ViewGroup.invalidateChild(ViewGroup.java:4690)
                    at android.view.View.invalidateInternal(View.java:11801)
                    at android.view.View.invalidate(View.java:11765)
                    at android.view.View.invalidate(View.java:11749)
                    at android.widget.TextView.checkForRelayout(TextView.java:6858)
                    at android.widget.TextView.setText(TextView.java:4057)
                    at android.widget.TextView.setText(TextView.java:3915)
                    at android.widget.TextView.setText(TextView.java:3890)
                    at com.example.jimbo.myapplication.MainActivity$2$1.handleMessage(MainActivity.java:51)
                    at android.os.Handler.dispatchMessage(Handler.java:98)
                    at android.os.Looper.loop(Looper.java:135)
                    at com.example.jimbo.myapplication.MainActivity$2.run(MainActivity.java:55)
                    at java.lang.Thread.run(Thread.java:818)
```

原因很明显:没有在主线程中更新UI.
这些错误还是对Handler消息机制不够清楚导致的,其实我还差一点就可以正确的时候内部类更新UI了,这个我们最后再说.我们还是先看一下消息机制到底是怎么运行的?

Handler创建完成后,这时候就需要Looper和MessageQueen一起协作完成消息处理工作了.首先,Handler通过`post()`方法将`Runnable`投递到Looper去处理,或者通过`send()`方法发送消息去Looper中处理.当然,这里的`post()`方法也是通过`send()`方法实现的.当Handler的`send()`方法被调用的时候,他会调用`MessageQueen`的`enqueueMessage()`将消息放入队里中,然后Looper发现新消息来了,就会去处理这个消息.***注意,Looper会运行在创建Handler的那个线程中,这样,Handler中的业务就会切换到了创建时候的线程中去了.***

到这里我们就应该知道上面为什么会出错误了吧.

### 2.MessageQueen工作原理分析

MessageQueen比较简单,主要就是包括`enqueueMessage()`和`next()`;
`enqueueMessage()`:将收到的消息加入到队列中去,对消息对先来先服务处理
`next()`:将消息出队,交于Looper处理

### 3.Looper工作原理

通过`Looper.prepare()`可以为当前的线程去创建一个Looper对象,与之对应的是一个`Looper.prepareMainLooper()`,通过名字也可以知道他是做什么的-专门为ActivityThread(也就是UI线程)去创建Looper.还有一个`Looper.getMainLooper()`方法获取这个Looper.这些仅仅是创建一个Looper,并没有进入监听MesageQueen状态中去,我们还应该调用`Looper.loop()`去开启他.
`Looper`也是可以退出的,有`quit()`和`quitSafely()`,区别就在于`quit()`会直接退出,而`quitSafely()`只是设定一个标记,在消息全部处理完毕后就会退出.Looper退出后,Handler的send方法发送消息会得到一个true,表示消息发送失败.
在子线程中手动创建的Looper,在完成所有的工作后要将其退出,不然子线程会一直处于等待状态.

### 4.Handler的工作原理

Handler的工作包括消息的发送和接收过程.发送消息的方法主要有`post()`和`send()`这两个系列,他们都包括延时等的一些重载函数可以供我们使用.Handler发送消息仅仅就是向MessageQueen里面插入了一条消息而已.
MessageQueen发现Message后通过`next()`方法将消息传递给`Looper`,Looper最后在调用Handler里的`dispatchMessage()`方法,这时候Handler就会进入消息处理阶段了,而这时候会切换到创建Handler的线程中去了.
处理消息就是通过`handleMessage()`回调方法,处理数据.
这里我们还要说明一点就是,Handler的构造方法里面有这样的参数`Looper`,也就是说我们可以在创建Handler的时候指定一个Looper给他,回到我们最初那个问题,可能就会有答案了.

```
        new Thread(new Runnable() {
            @Override
            public void run() {
                Looper.prepare();
                new Handler(Looper. getMainLooper(), new Handler.Callback() {
                    @Override
                    public boolean handleMessage(Message msg) {
                        Toast.makeText(MainActivity.this, "收到消息", Toast.LENGTH_SHORT).show();
                        test.setText("piu~");
                        return true;
                    }
                }).sendEmptyMessage(0);
            }
        }).start();
```






