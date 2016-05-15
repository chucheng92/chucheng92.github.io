---

layout: post
title: 为什么使用sudo命令执行sh会报command not found错误
category: 技术
tags: linux
description: 为什么使用sudo命令执行sh会报command not found错误

---

>明明sh文件存在,为什么还会说命令找不到呢?

[参考博客-Linux下执行一些命令前加sudo时出现command not found的原因](http://blog.csdn.net/poechant/article/details/7216892)

为了科(翻)学(墙)上网,一直在用[laod](www.laod.cn)给的hosts,非常感谢!为了能高效的更换hosts,想用sh来完成.由于涉及了系统文件的操作,所以需要使用sudo来用root权限执行.

```
sudo changehosts.sh
sudo:changehosts.sh 找不到命令
```
但是输出PATH看了一下,路径设置是没问题的.只好请教万能的[google](www.google.com),终于找到了答案.

原来,在Linux下用sudo执行某一命令时,是在原进程(parent process)的基础上fork出来一个子进程(child process),这个子进程是以root权限执行的.然后在子进程中,执行你在sudo后面跟的命令.在子进程中是无法调用涉及到父进程的状态的一些命令的,所以非系统内置命令会被拒绝.这就是为什么会出现command not found的提示.
原因找到了,但是文中没有给解决办法.
那我们该怎么办呢?
我们可以用`su - root`开启root账号,然后执行完在退出.

```
su - root
密码:
root@username:#
```
执行完我们发现我们已经取得了root权限,这时候执行准没错了.
但是令人失望的是还是找不到命令,这又是怎么了?

```
echo $PTAH
```

输出发现没有我们设置的shell路径了,恍然大悟,我们已经切换到了root账号下面,设置也已经变了.这样的话我们只要先进入预先的目录然后在执行,ok,成功.