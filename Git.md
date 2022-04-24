



SVN是**集中式的版本控制**系统，版本库是集中放在中央服务器上。

GIT是**分布式的版本控制**系统，没有中央服务器，每个人的电脑就是一个完整的版本库。



# 1.Git环境配置

**查看配置文件**
git config -l

**查看用户名和密码**
git config --global --listgit 



# 2.Git基本理论

## 2-1 四个工作区

### 工作目录（Working Directory）

平时存放代码的地方

### 暂存区（Stage/Index）

暂存区，用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息

### 资源库（Repository）

本地仓库，安全存放数据的地方。其中HEAD指向最新放入仓库的版本

### 远程Git仓库（Remote Directory）

远程仓库，代码托管的服务器

![Git的四个工作区域和工作流程- 知乎](https://pic2.zhimg.com/v2-948b88649b9f68bffe8cdf0daefc0401_b.jpg)



# 3 GIT基本操作

**git init 初始化仓库**

**git clone [url] 克隆远程仓库**



生成SSH

# 4 IDEA集成GIT

查看分支
git branch

查看远程分支
git branch -r

新建分支
git branch [branch-name]

新建分支的同时切换到新的分支
git checkout -b  [branch-name]

**合并指定分支到当前分支**
git merge [branch]





# 步骤

```
git push origin master
```
