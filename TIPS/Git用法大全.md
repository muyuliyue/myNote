



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

**==git add==** 命令可将该文件添加到暂存区。

添加一个或多个文件到暂存区：

```
git add [file1] [file2] ...
```

添加指定目录到暂存区，包括子目录：

```
git add [dir]
```

添加当前目录下的所有文件到暂存区：

```
git add .
```



==git status== 命令用于查看在你上次提交之后是否有对文件进行再次修改。

通常我们使用 **-s** 参数来获得简短的输出结果：$ git status -s

==git commit== 命令将暂存区内容添加到本地仓库中。

提交暂存区到本地仓库中:

```
git commit -m [message]
```

[message] 可以是一些备注信息。

提交暂存区的指定文件到仓库区：

```
$ git commit [file1] [file2] ... -m [message]
```

**-a** 参数设置修改文件后不需要执行 git add 命令，直接来提交

```
$ git commit -a
```



==**git push**== 命令用于从将本地的分支版本上传到远程并合并。



*==git branch==* (branchname) 切换分支*命令*

`git branch` 命令不僅能建立和刪除分支， 如果不加任何參數，你將會得到所有分支的簡易清單：

```console
$ git branch
  iss53
* master
  testing
```

注意 `master` 分支前面的 `*` 字元，它表示目前所檢出（checkout）的分支（換句話說，`HEAD` 指向這個分支）； 這意味著如果你現在提交，`master` 分支將隨之向前移動。 若要查看各個分支最後一個提交，執行 `git branch -v`：

```console
$ git branch -v
  iss53   93b412c fix javascript issue
* master  7a98805 Merge branch 'iss53'
  testing 782fd34 add scott to the author list in the readmes
```

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





# ⭐️GIT MAC操作

#### 1.当你想向已经存在的repositories添加文件/文件夹时

1⃣️进入 .git所在目录(cd)

2⃣️进行git基本操作
git add . 添加文件

git commit -m [message]

git push

### 2.给远程仓库添加repository

#### …or create a new repository on the command line

```
echo "# private" >> README.md
git init
git add README.md
git commit -m "first commit"

--切换到main分支
git branch -M main

--新增远程
git remote add origin git@github.com:muyuliyue/private.git
git push -u origin main
```

#### …or push an existing repository from the command line

```
git remote add origin git@github.com:muyuliyue/private.git
git branch -M main
git push -u origin main
```

