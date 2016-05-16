---
layout: post
title: 『原创』Eclipse下maven3安装配置发布运行实战
tags: maven
category: 技术 
date: 2015-10-23 20:34:26
---

<center><font color="red">原创 2015年10月测试运行通过。</font></center>

```bash
> 系统和环境:
> 
> Eclipse luna4.4.2(luna和最新的mars已经集成maven插件，无需安装m2eclipse插件)
> 
> JDK 1.7
> 
> OS:win10
> 
> maven版本:maven3.3
```

**一 Eclipse配置maven**

1.官网下载maven并配置
设置环境变量M2_HOME 路径为你的maven目录
设置path:%M2_HOME%\bin
测试:cmd下运行mvn –v 如出现版本号则maven安装成功。
如图
![102315_1232_Eclipsemave1.png](http://112.74.15.218/wp-content/uploads/2015/10/102315_1232_Eclipsemave1.png)

2.新建maven本地仓库
任意目录,如D:/maven/repository

3.eclipse中的maven重新定位一下，点击Window -> Preference -> Maven -> Installation -> Add进行设置
![102315_1232_Eclipsemave2.png](http://112.74.15.218/wp-content/uploads/2015/10/102315_1232_Eclipsemave2.png)

Window -> Preference -> Maven ->UserSettings进行设置

![102315_1232_Eclipsemave3.png](http://112.74.15.218/wp-content/uploads/2015/10/102315_1232_Eclipsemave3.png)

注:这里我将maven3.3的settings文件拷贝了一份到本地仓库目录，这样避免以后maven版本更换后设置的更改。

至此，eclipse中配置maven结束。
让我们新建一个maven-quickstart项目测试一下吧。

**二 quickstart项目测试**

1.新建->Other->maven项目
选择原型

![102315_1232_Eclipsemave4.png](http://112.74.15.218/wp-content/uploads/2015/10/102315_1232_Eclipsemave4.png)

选择maven-archetype-quickstart

设置groupid和artifactid。groupid为公司域名反写加项目名
artifactid为项目模块名

![102315_1232_Eclipsemave5.png](http://112.74.15.218/wp-content/uploads/2015/10/102315_1232_Eclipsemave5.png)

2.测试和运行

将项目进行编译，测试之后，下一个重要步骤就是打包。pom.xml中如果没有指定打包类型，默认打包类型为：jar。我们可以简单地执行命令打包： mvn clean pachage。
类似地，maven会在打包之前执行编译，测试等操作。如以打jar包为例，jar:jar任务负责打包，实际上就是jar插件的jar目标将项目主代码打包成一个名为xxxxxx-1.0-SNAPSHOT.jar的文件。该文件也位于target/输出目录中，它是根据artifact-version.jar的规则进行命名的，如有需要，还可以使用finalName来自定义该文件的名称，这里暂且不展开，后面会详细解释。
在打包之后，又执行了安装任务install:install。从输出可以看到任务将项目输出的jar安装到了maven本地仓库中，可以打开相应的文件夹看到项目的pom和jar。之前我们说只有构件被下载到本地仓库后，才能由所有Maven项目使用，这里同样的道理，只有将自己编写的项目安装到本地仓库之后，其他maven项目才能使用它。
我们已经体验了maven最主要的命令：mvn clean compile，mvn clean test，mvn clean package，mvn clean install。执行test之前是会先执行compile的，执行package之前是会先执行test的，而类似地，install之前会执行package。可以在任何一个maven项目中执行这些命令。

**maven-shade-plugin**

默认的main目录下会有一个App.java文件，其主方法打印helloword。注意：当你执行package会打包好执行jar文件。但是当你运行java –jar时会提示找不到主类清单。这是因为默认打包生成jar是不能够直接运行的，因为带有main方法的类信息不会添加到manifest中(打开jar文件中的META-INF/MANIFEST.MF文件，将无法看到Main-Class一行)。为此为了生成可执行的jar文件，需要借助maven-shade-plugin,配置该插件如下：

```java
<plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-shade-plugin</artifactId>
        <version>1.2.1</version>
        <executions>
            <execution>
                <phase>package</phase>
                <goals>
                        <goal>shade</goal>
                </goals>
                    <configuration>
                        <transformers>
                            <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                <mainClass>com.saber.hi.hi.App</mainClass>
                            </transformer>
                        </transformers>
                    </configuration>
            </execution>
        </executions>
     </plugin>
```

现在构建完成后，对应于一个常规的helloword-0.0.1-SNAPSHOT.jar文件，我还得到了一个original-helloword-0.0.1-SNAPSHOT.jar文件。最后，我可以通过helloword-0.0.1-SNAPSHOT.jar命令运行程序。

3 之后再运行maven install,把生成的jar打入到本地的maven仓库，可以在C:\Documents and Settings\hcen\.m2\repository\com\houwen\test\helloword\0.0.1-SNAPSHOT
找到helloword-0.0.1-SNAPSHOT.jar

4 最后，我可以通过java -jar  (jar包路径)/helloword-0.0.1-SNAPSHOT.jar命令运行程序。
我的maven-qucikstart的pom文件分享

**三 maven-web项目**

在选择原型时选择webapp

![102315_1232_Eclipsemave6.png](http://112.74.15.218/wp-content/uploads/2015/10/102315_1232_Eclipsemave6.png)

下面主要讲述配置maven到tomcat7

1.下载tomcat7并配置好JAVA_HOME,tomcat7\webapps目录除了manager之外,其它都可以删除(删除没用的,可加速tomcat的启动).

2.tomcat7\conf\tomcat-users.xml加入

```java
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<user username="admin" password="admin" roles="manager-gui,manager-script"/>
```

当然用户名和密码可以不一样,但没有manager-gui就不能通过浏览器去访问manage应用,没有manager-script就不能通过manage去上传war包达到部署的目的.

3.我的pom.xml的一个应用例子 注:url也必须有/text,否则也上传不了war包

```java
<build>
    <finalName>maven-web1</finalName>
    <plugins>
			<plugin>
				<groupId>org.apache.tomcat.maven</groupId>
				<artifactId>tomcat7-maven-plugin</artifactId>
				<version>2.2</version>
				<configuration>
					<!-- 注意此处的url -->
        			<url>http://localhost:8888/manager/text/manager/text</url>
        			<username>admin</username>  
					<password>admin</password> 
        			<server>tomcat7</server> _<!-- 此处的名字必须和setting.xml中配置的ID一致-->_
        			<path>/mavenProject</path> _<!-- 此处的名字是项目发布的工程名-->_
				</configuration>
			</plugin>
	</plugins>
  </build>
```

4.配置setting.xml，定位到%MAVEN_HOME%\conf\setting.xml
servers标签中加入

```java
<server>  
  	<id>tomcat7</id>  
       <username>admin</username>  
       <password>admin</password>  
</server>
```  

至此大功告成 启动tomcat eclipse中执行[v_error]tomcat7:deploy或redeploy命令[/v_error]，一键部署到tomcat7.打开浏览器，哇塞，熟悉的helloworld，简直棒！

![102315_1232_Eclipsemave7.png](http://112.74.15.218/wp-content/uploads/2015/10/102315_1232_Eclipsemave7.png)