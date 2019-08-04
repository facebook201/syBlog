---
pageClass: getting-started
---

# Git指南

## Git基础
基础命令 学会查文档



| 命令                                         | 功能                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| git help                                     | 查看git的帮助信息                                            |
| git config --global user.name shiyao         | 配置用户名称                                                 |
| git config --global user.email shiyao@qq.com | 配置用户email                                                |
| git config --global core.autocrlf input      | 配置提交的格式  windows上的换行符和mac和类unix不一样，在跨平台时就痛苦了，为了统一，可以将提交到仓库的换行符同配置成unix格式 |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
| git branch -D branchName                     | 删除本地分支                                                 |
| git push origin :branchName                  | 先删除刚才的本地分支 再推送 就可以删除远程分支               |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |



## workflow

![img](https://pic1.zhimg.com/v2-86810fd98b9f40c9d098b4b65aceef0f_1200x500.jpg)





* master 分支。主干分支 任何项目都必须要有这个分支，对项目进行tag或发布版本等操作。
* develop 分支 开发分支 从master分支上分出来的，其他人不能直接更改该分支，而是从该分支检出自己的feature分支，开发完成后将feature分支上的改动merge回develop分支 同时release分支
* release分支，即发布分支，从develop分支上检出。该分支用作发版前的测试，可进行简单的bug修复。如果bug修复比较复杂，可merge回develop分支后由其他分支进行bug修复。此分支测试完成后，需要同时merge到master和develop分支上。
* feature分支 功能分支 从dev上分出，团队成员每个人维护自己的一个feature分支 并进行开发 完成开发就merge回dev
* fix分支 补丁分支 从dev分支检出 修复bug 修复完成之后合回dev分支 该分支属于零时分支。
* hotfix分支  热补丁分支 由master分支检出 进行线上版本的bug修复 修复完成后merge 到 master 并且合到 dev。最后完成再删除



[处理git的问题](https://www.zhihu.com/question/20866683/answer/711725573)

