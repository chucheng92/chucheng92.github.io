---

layout: post
title: Android跨进程通信机制(二)
category: 技术
tags: android
description: 继续学习AIDL

---

>昨天简单的看了一下AIDL怎么使用 今天我们深入学一下这个过程

还记得通过aidl.exe编译.aidl文件生成的java代码吗？让我们来看看里面都有哪些内容吧~

1. Interface的实现类-Stub

生成的IMyAidlInterface只有一个Stub类，而这个类继承了Binder类并且实现了IMyAidlInterface接口。查看Stub类发现，里面不仅实现了我们自定义的方法，还多了其他方法。

a. DESCRIPTOR 这是binder的唯一表示

b. asInterface(android.os.IBinder obj)

```java
public static com.jimbo.aidl.IMyAidlInterface asInterface(android.os.IBinder obj)
{
if ((obj==null)) {
return null;
}
android.os.IInterface iin = obj.queryLocalInterface(DESCRIPTOR);
if (((iin!=null)&&(iin instanceof com.jimbo.aidl.IMyAidlInterface))) {
return ((com.jimbo.aidl.IMyAidlInterface)iin);
}
return new com.jimbo.aidl.IMyAidlInterface.Stub.Proxy(obj);
}

```

这个方法是将服务端的Binder转换成客户端所需要的AIDL接口，并且是区分线程的。如果客户端和服务端位于同一服务端则返回对象本身，否则返回一个代理-Stub.proxy对象。

c. asBinder()

```java
@Override
public android.os.IBinder asBinder()
{
return this;
}

```

返回自己

d. onTranslate

运行在服务端中的Binder线程池中，当客户端发起跨进程请求的时候，proxy代理会通过

```java
mRemote.transact(Stub.TRANSACTION_add, _data, _reply, 0);        

```

代码将数据交给系统底层，然后通过`onTranslate()`方法中接受数据。

e. proxy代理类

这个类也继承了IMyAidlInterface接口，跨进程通信的时候这个类会暴漏给客户端，改类实现了IMyAidlInterface接口里我们定义的方法。

2. 跨进程通信过程分析

![](http://7xjtan.com1.z0.glb.clouddn.com/1111111111.png)




