---

layout: post
title: Android进程间通信机制(一)
category: 技术
tags: android
description: Android进程间通信机制

---

> 本片博客让我们一起来学一下android的进程之间的通信机制

参考视频：[慕课网-AIDL-小白成长记](http://www.imooc.com/learn/606)
[android官网文档](http://developer.android.com/guide/components/aidl.html)

## 一 什么是IPC？
IPC 即 inter-Process Communication，含义为进程间通信或者硕士跨进程通信。当我们需要在不同的进程之间通信的时候就需要了解Android的IPC。
Android有很多种方式来实现IPC，包括：

1. 使用Bundle，在使用intent调用组件的时候传递数据
2. 使用文件共享
3. 使用Messenger
4. 使用AIDL
5. 使用Socket

一般来说，我们使用3,4比较多，其他方式都可以使用，也比较简单，但是会有数据同步的问题。

## 二 使用AIDL计算A+B=C

我们先抛开原理底层不看，来看一下AIDL怎么使用，然后我们在深入学习一下。做一个A+B=C的Demo来学习一下。应用场景是这样的，client端要计算A+B的值，所以去server端调用`add()`方法来计算，然后server将结果给client，client显示给用户。

注：AIDL 即 Android Interface Definition Language.AIDL is similar to other IDLs you might have worked with. It allows you to define the programming interface that both the client and service agree upon in order to communicate with each other using interprocess communication (IPC). On Android, one process cannot normally access the memory of another process. So to talk, they need to decompose their objects into primitives that the operating system can understand, and marshall the objects across that boundary for you. The code to do that marshalling is tedious to write, so Android handles it for you with AIDL.

AIDL类似于其他你曾经用过的IDL语言.它允许您定义的编程接口,客户端和服务达成一致,以便互相交流使用进程间通信(IPC)。在Android上,一个进程无法正常访问另一个进程的内存。所以说,他们需要他们的对象分解为原语操作系统可以理解,和马歇尔的对象边界。编组的代码是乏味的写,所以与AIDL Android为您处理。

1. 编写server端
新建工程什么的略过不说，我们直接新建一个`module`来模拟server，起名叫AIDLServer

a. 在AIDLServer中新建AIDL Folder 然后新建一个包 新建一个AIDL文件

这个时候得到如图所示的项目结构：
![](http://7xjtan.com1.z0.glb.clouddn.com/QM%24R%5B%24DX094O2%40OYR4IBUOI.png)

b. 在接口中添加一个`add()`方法 添加完成后编译一下`module` android studio会自动为我们生成相应的java代码(在android SDK的tools里面有一个aidl.exe工具 由他完成这个工作).在Project模式下，可以在AIDLServer-build-generated-source-aidl-debug下面看到相应的java代码

c. 新建一个Service，然后新建一个IBinder
![](http://7xjtan.com1.z0.glb.clouddn.com/5J088BAW6F2_INBOKHOSV3.png)

d. 记得在manifest文件中注册Service，并且声明成`android:exported="true"`

否则会抛出：java.lang.SecurityException: Not allowed to bind to service Intent { cmp=com.jimbo.server/.IMyAidlServer }
这样server就算编写完毕了

2. 编写client端

a. 完成计算界面

b. 在client端也要编写AIDL文件，且与Server端一致，所以拷贝过去 编译一下

c. 在MainActivity中添加一个启动Service的方法 在安卓5.0后必须通过显示的方式启动Service；conn是一个ServiceConnection对象，其中有两个回调函数`onServiceConnected`,`onServiceDisconnected`，我们可以在‘onServiceConnected`方法中获取到Server端的Service，然后在条用其中的方法

``` java
    ServiceConnection conn = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            Log.d("TestAIDL", "成功连接到server");
            // 获取到远端的服务
            iMyAidlInterface = IMyAidlInterface.Stub.asInterface(service);
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            Log.d("TestAIDL", "断开连接");
            iMyAidlInterface = null;
        }
    };
    private void bindService() {
//        Intent intent = new Intent(MainActivity.this,
//                com.jimbo.server.IMyAidlServer.class);
        Intent intent = new Intent();
        intent.setComponent(new ComponentName("com.jimbo.server",
                "com.jimbo.server.IMyAidlServer"));

        boolean isBind = bindService(intent, conn, Context.BIND_AUTO_CREATE);
        Log.d("TestAIDL", "请求开启远端服务");
        if (isBind) {
            Log.d("TestAIDL", "bind成功");
        } else {
            Log.d("TestAIDL", "bind失败");
        }
    }
``` 


运行效果图：

![](http://7xjtan.com1.z0.glb.clouddn.com/testAIDLResultImage.png)

学习了简单的怎么使用后 下一篇我们继续深入学习一下

参考代码下载 [点这里](http://pan.baidu.com/s/1eRdrMyI)
