---
layout: post
title: linux命令操作随记-不定时更新
category: 技术
tags: linux
description: linux命令随记
---

> 使用linux的时候常常有些命令记不住 所以开一篇随时记录

##### 1.如何添加path

>2015年11月15日

1.修改/etc/profile

	vi /etc/profile
	//如果权限不够 请使用sudo
    
2.修改path的值

	PATH = "yourPathWantToBeSetted:$PATH"
	export PATH
    
3.保存退出 

4.重启终端生效，或者使用source命令使其生效

	source /etc/profile

5.验证

	echo $PATH //查看是否已经成功添加PATH

但是我在按照上面的方法完成后还是只能一次终端生效，在开新的终端还是无效，于是我就尝试修改了一下`.bashrc`,发现可以了。***注：我的系统是ubuntu-15.10***

	//方法大体相同啦，稍微记录一下
	//打开文件
	vi .bashrc
	//添加下面内容
	export PATH="yourPathWantToBeSetted:$PATH"
	//esc : wq enter
	//使其生效
	source .bashrc
	//验证
	echo $PATH

	//写一个shell放在目录下 就不会每次都add commit psuh了 一个命令同步博客 咩哈哈 爽~
	/**
	cd /home/jimbo/bornbeauty.github.io
	git add -A
	git commit -m "addOrchange"
	git push
	*/

但是还有个小问题，就是commit里面有个参数，总是写那个敷衍的更新说明感觉很不爽，那就去看看shell参数好了～～～


| 符号 | 含义 |
| --------|:-------:|
|$0	|当前脚本的文件名|
|$n	|传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是$1，第二个参数是$2.|
|$#	|传递给脚本或函数的参数个数。|
|$*	|传递给脚本或函数的所有参数。|
|$@	|传递给脚本或函数的所有参数。被双引号(" ")包含时，与 $* 稍有不同，下面将会讲到。|
|$?	|上个命令的退出状态，或函数的返回值。|
|$$	|当前Shell进程ID。对于 Shell 脚本，就是这些脚本所在的进程ID。|


所以就很简单了，我们就用$n来获取参数

	cd /home/jimbo/bornbeauty.github.io
	git add -A
	git commit -m $1
	git push

但是问题又来了～有时候就是懒得不想写了怎么办！
好吧～判断一下是否为空吧～
[shell选择语句语法](http://c.biancheng.net/cpp/view/7005.html)

	if [ condition ] //condition和[]必须间隔空格
    	then
        	code
    elif
    	code
    else
    	code
    fi
    
然后的问题怎么判断为空呢？
[shell怎么判断是否为空](http://w55554.blog.51cto.com/947626/1223870)

	//最后代码变成了这个样子 试了试～ 挺好 开心
	cd /home/jimbo/bornbeauty.github.io
	git add -A
	if [ $1 ]
		then
			git commit -m $1
	else
		git commit -m "changeOradd"
	fi

	git push
    
###### 2.怎么移动复制文件

Linux下移动命令是mv（move的缩写），可以用来移动文件或者将文件改名。
命令格式：
mv [选项] 源文件或目录 目标文件或目录
命令参数：
-b ：若需覆盖文件，则覆盖前先行备份；
-f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；
-i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖；
-u ：若目标文件已经存在，且 source 比较新，才会更新(update)。

CP命令
格式: CP [选项]  源文件或目录   目的文件或目录
选项说明:-b 同名,备分原来的文件
-f 强制覆盖同名文件
-r  按递归方式保留原目录结构复制文件


###### 3.linux下的文件差异比较工具

diffuse

安装方法：

	sudo apt-get install diffuse









