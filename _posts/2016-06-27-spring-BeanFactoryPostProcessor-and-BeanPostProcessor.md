---
layout: post
title: spring后置处理器BeanFactoryPostProcessor和BeanPostProcessor的用法和区别
tags: Java Spring
category: 技术
---

BeanFactoryPostProcessor和BeanPostProcessor都是Spring初始化bean的扩展点。两个接口非常相似。它们的主要区别是： BeanFactoryPostProcessor可以修改BEAN的配置信息而BeanPostProcessor不能，BeanFactoryPostProcessor的回调比BeanPostProcessor要早。
 
BeanFactoryPostProcessor可以对bean的定义（配置元数据）进行处理。也就是说，Spring IoC容器允许BeanFactoryPostProcessor在容器实际实例化任何其它的bean之前读取配置元数据，并有可能修改它。如果你愿意，你可以配置多个BeanFactoryPostProcessor。你还能通过设置'order'属性来控制BeanFactoryPostProcessor的执行次序。

注册BeanFactoryPostProcessor的实例，需要重载

```java
void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException;
```

通过beanFactory可以获取bean的示例或定义等。同时可以修改bean的属性，这是和BeanPostProcessor最大的区别。

例如：

```java
BeanDefinition bd = beanFactory.getBeanDefinition("xxBean");  
MutablePropertyValues mpv =  bd.getPropertyValues();  
if(pv.contains("xxName"))  {  
    pv.addPropertyValue("xxName", "icoder");  
}
```

注册BeanPostProcessor的实例，需要重载

```java
Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException;
Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException;
```

BeanFactoryPostProcessor的回调比BeanPostProcessor要早。

OVER

### 联系我

- 邮箱: xmusaber@163.com
- QQ: 932191671
- [网易云音乐](http://music.163.com/#/user/home?id=63589002)
- [微博](http://weibo.com/u/1662536394)
- [片刻](http://pianke.me/profile/1924980/)
- [知乎](https://www.zhihu.com/people/tao-xiao-xiao-99)
- [牛客](http://www.nowcoder.com/profile/213475)