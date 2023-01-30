# 第二章 Maven的核心概念

## 2.1 约定的目录结构

一个maven项目是一个文件夹，比如项目叫Hello

```
Hello
  |_src
      |_main            主程序目录（完成项目功能的代码和配置文件）
           |_java       源代码（包盒相关的类定义）
           |_resources   配置文件
      |_test            测试代码（开发人员自己写的测试代码）
           |_java       测试代码junit
           |_resources   测试程序需要的配置文件
  |_pom.xml             maven的核心配置文件
```

maven可以独立使用：创建代码，编译代码，测试程序，打包，部署等等

maven和idea一起使用，idea借助maven实现编译测试打包等等



## 2.2 POM文件

Project Object Model项目对象模型，maven把项目当作模型处理，操作这个模型就是操作项目。

maven通过pom.xml文件实现项目的构建和依赖的管理



### 坐标

坐标由groupId,artifactId,version组成，坐标概念来自于数学
坐标作用：确定资源，是资源的唯一标识。在maven中每个资源都是坐标，坐标是唯一的，简称为gav

groupId:组织名称，代码，公司单位的标识。这个值常使用的是公司域名的倒写。
               如果项目的规模比较大，也可以是域名倒写+大项目名称。

artifactId：项目名称。如果groupId中有项目，此时当前的值就是子项目。

version：版本，三位。例如5.2.5
               注意：版本号中有-SHAPSHOT 快照，表示该版本不是稳定版本

packing：打包类型，放在坐标的下面

项目使用gav：
1.每个项目都应该有一个自己的gav
2.管理依赖，需要使用其他的jar包时，也需要使用gav做为说明



### 依赖 dependency

项目中要使用的其他资源(jar)
需要使用dependency和gav一起完成依赖的使用

pom.xml中加入依赖的方式

```xml
<dependencies>
  <!--日志依赖-->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
  <!--mysql依赖-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.49</version>
</dependency>
</dependencies>

```

查询相关坐标：[https://mvnrepository.com](https://mvnrepository.com)
maven使用gav做为标记，从互联网下载依赖的jar



## 2.3 仓库

仓库是存放东西的，maven的仓库存放的是：
 1.maven工具自己的jar包
 2.第三方的其他jar，比如项目中需要使用的mysql驱动
 3.自己写的程序，可以打包为jar，存放在仓库

仓库的分类：
 1.本地仓库：位于你自己的计算机，它是磁盘的某个目录。
    默认路径是你登陆操作系统的账号的目录中./m2/repository

   修改本地仓库位置：需要修改maven工具的配置文件（在maven的安装路径/conf/settings.xml)

 

## 2.4 maven插件和命令

maven生命周期：项目构建的各个阶段。包括清理，编译，报告，打包，安装，部署

插件：要完成构建项目的各个阶段，要使用maven命令。执行命令是通过插件完成，插件就是jar

命令：执行maven的功能是由命令来发出的。比如mvn compile

### 单元测试（junit）

 junit是一个单元测试，在java中经常使用
 单元：在java中指的是方法。一个方法就是一个单元，方法是测试的最小单位
 作用：使用junit去测试方法是否完成了要求。开发人员自测

 使用单元测试：
 1）：加入依赖
 2）：在src/test/java目录中创建测试文件，写测试代码
           单元测试使用建议：
           1.测试类的定义，名称一般是Test+要测试的类名称
			2.测试类的包名要和测试类的包名一样
			3.在类中定义方法，要测试代码
				方法的定义：public方法，没有返回值，方法名称自定义（建议Test+测试的方法名），方法没有参数
			4.在测试类中的方法可以单独执行。测试类也可以单独执行
    		5.在方法上面要加上@Test

### 命令

#### 1) mvn clean

​    清理命令，删除以前生成的target目录。在maven项目目录下
​	例如我有一个Hello项目，就在Hello项目目录下执行
​    使用插件：maven-clean-plugin:2.5:clean

#### 2）mvn compile

编译，把src/mian/java目录中的java代码编译为class文件，并将文件拷贝到target/classes文件夹下（一次编译所有文件）
编译插件：maven-compiler-plugin:3.1:compile
资源插件：maven-resources-plugin:2.6:resources
                 作用是把src/main/resources目录中的文件拷贝到target/classes目录中

#### 3）mvn test-compile

编译src/test/java目录中的源文件，并将文件拷贝到target/test/classes文件夹下,同时把把src/test/resources目录中的文件拷贝到target/test-classes目录中

4) #### mvn test

   测试命令
   插件：maven-surefire-plugin:2.12.4:test 

#### 5）mvn package

　　打包，把项目中的class文件和配置文件都在放一个压缩包中，默认文件是jar类型。web应用是war，扩展是jar，war的。
       插件：maven-jar-plugin:2.4:jar
	   生成的jar包的文件名来源于pom.xml的artifactId-version.packaging
		01-helloMaven-1.0.0.jar 

```xml
<!--坐标-->
 <groupId>com.mavenHello</groupId>
 <artifactId>01-helloMaven</artifactId>
 <version>1.0.0</version>
```

#### 6）mvn install

​		  把生成的打包文件安装到maven仓库

​			Installing /Users/mona/local/mavenwork/Hello/target/01-helloMaven-1.0.0.jar 
​             to 
​			/Users/mona/.m2/repository/com/mavenHello/01-helloMaven/1.0.0/01-helloMaven-1.0.0.jar

​		

## 2.5 自定义配置插件

```xml
<!-- 设置构建项目相关的内容 -->
 <build>
 	<!-- 插件集合 -->
 	<plugins>
 		<!-- 编译插件 -->
 		<!-- 不进行配置的话就会使用默认版本1.7的插件进行编译 -->
 		<plugin>
 			<groupId>org.apache.maven.plugins</groupId>
 			<artifactId>maven-compiler-plugin<artifactId>
 			<version>3.8.1</version>
 			<configuration>
 				<source>1.8</source> <!-- 指定编译代码的JDK版本 -->
 				<target>1.8</target> <!-- 运行java程序使用的JDK版本 -->
 			</configuration>
 		</plugin>
 	</plugins>
 </build>
```



# 第三章 Maven在IDEA中的应用

## 3.1 idea中集成maven

idea中有一个自带的maven，我们要让idea使用自己安装的maven

![屏幕快照 2021-08-15 下午2.07.01](/Users/mona/Documents/maven/图片/屏幕快照 2021-08-15 下午2.07.01.png)



***settings.xml存在于两个地方：***

1.安装的地方：$M2_HOME/conf/settings.xml

2.用户的目录：${user.home}/.m2/settings.xml

前者又被叫做全局配置，后者被称为用户配置。如果两者都存在，它们的内容将被合并，并且用户范围的settings.xml优先。

如果你偶尔需要创建用户范围的settings，你可以简单的copy Maven安装路径下的settings到目录${user.home}/.m2。Maven默认的settings.xml是一个包含了注释和例子的模板。

发现很多第三方的项目默认的setting配置都是用户目录/.m2/settings.xml

所以为了方便，需要自己创建.m2文件夹，并在其中配置settings.xml



***设置 -DarchetypeCatalog=internal***

![屏幕快照 2021-08-15 下午2.14.23](/Users/mona/Documents/maven/图片/屏幕快照 2021-08-15 下午2.14.23.png)



## 3.2 创建基于Maven的普通java项目



# 第四章 依赖管理

## SCOPE

依赖范围：表示这个（jar和里面的类）在项目构建的哪个阶段起作用

依赖范围scope:
 compile：默认，表示构建项目的所有阶段
 test：表示在测试阶段使用（比如执行mvn test会使用的junit就是需要在测试时使用该类）
 provided：提供者，表示项目在部署到服务器时，不需要提供该依赖的jar包，而是由服务器来提供这个依赖的jar包。（典型的有servlet和jsp的依赖）



# 第五章 常用设置

## 1）pom.xml里的properties

```xml
<properties>
  项目构建使用的编码，避免中文乱码
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  源码编译jdk的版本
  <maven.compiler.source>1.8</maven.compiler.source>
  运行代码的jdk版本
  <maven.compiler.target>1.8</maven.compiler.target>
  生产报告时使用的编码
  <project.reporting.out.outputEncoding>UTF8
  </project.reporting.out.outputEncoding>
</properties>
```



## 2）全局变量

在properties中定义标签，这个标签就是一个变量，标签的文本就是变量的值

使用场景：spring的两个依赖，需要使用相同的版本。如果你升级了其他一个版本，另外一个版本也需要进行改动，为了减少改动，可以定义一个全局变量

```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-core</artifactId>
  <version>5.2.9.RELEASE</version>
</dependency>

<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-webmvc</artifactId>
  <version>5.2.9.RELEASE</version>
</dependency>
```

### 使用步骤

1.在properties标签中，定义一个标签，指定版本的值

```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.source>1.8</maven.compiler.source>
  <maven.compiler.target>1.8</maven.compiler.target>
  <!--自定义变量-->
  <spring.version>5.2.5.RELEASE</spring.version>
</properties>
```

2.使用全局变量

```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-core</artifactId>
  <!--使用自定义全局变量-->
  <version>${spring.version}</version>
</dependency>
```

## 3）使用资源插件

应用场景：需要处理除了java文件以外的文件的时候

处理的配置文件的信息，maven默认处理配置文件
1⃣️maven会把src/main/resources目录中的文件拷贝到target/classes目录下
2⃣️maven只处理src/mian/java目录中的.java文件，把这些文件编译为classes文件并拷贝到target/classes下，不处理其他文件

```xml
<build>
  <!--资源插件-->
  <resources>
    <resource>
      <directory>src/main/java</directory>
      <includes>
        <!--包括目录下的.properties和.xml文件都会扫描到-->
        <include>**/*.properties</include>
        <include>**/*.xml</include>
      </includes>
      <!--false表示不启用过滤器，因为*.properties已经起到了过滤的作用-->
      <filtering>false</filtering>
    </resource>
  </resources>
</build>
```

