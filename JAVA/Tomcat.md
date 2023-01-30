==Tomcat是一个WEB应用服务器==

**web资源的分布**

静态资源：html，css，js，txt
动态：jsp，servlet

**常用的WEB服务器**

Tomcat:由apache组织提供的一种web服务器，提供对jsp和servlet的支持。它是一种轻量级的javaWeb容器（服务器）

jboss，GlassFish



# 1.Tomcat的安装

## 目录简介

bin---------存放可执行程序
conf-------存放tomcat服务器的配置文件
lib---------tomcat服务器的jar包
logs-------日志
temp------产生的临时数据
webapps----存放部署的web工程
work--------tomcat的工作目录，用来存放tomcat运行时jsp翻译为servlet的源码，和session敦化的目录

## 如何启动tomcat服务器

通过tomcat/bin下的startup.bat

测试启动是否成功：
http://localhost:8080
http://127.0.0.1:8080
http://真实IP:8080

## 如何部署web工程到Tomcat

1.将工程文件移动到Tomcat的work文件夹下。
   在浏览器中输入：http://ip:port/工程名文件夹/文件名(类似index.html)

2.找到Tomcat下的conf/Catalina/localhost目录，创建如下的配置文件

```xml
context表示一个工程的上下文
path：表示工程的访问路径（配置的xml文件叫abc.xml。通过读取abc.xml里的工程目录进行访问）
docBase：表示工程目录
<context path="/abc" docBase="/User/mona/1.html"/>
```

?**手拖html文件到浏览器和输入访问地址的区别**

手拖时使用的协议是file协议（file:///E:/book/index.html)
file协议不走网络

输入访问地址http地址是http协议

http://localhost:8080后面没有工程名时默认访问的是tomcat的work目录下的ROOT工程

## IDEA中配置TOMCAT

Preferences | Build, Execution, Deployment | Application Servers中添加Tomcat服务







