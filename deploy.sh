#!/usr/bin/env sh
#抛出异常信息
set -e
#定义一些变量
push_addr =`git remote get-url --push origin`
commit_info = `git describe --all --always --long`
#打包产物路径
dist_path=`docs\.vuepress\dist`
push_branch=gh-pages


#开始执行脚本
npm run docs:build
cd $dist_path

git init 
git add -A
git commit -m 'deploy:$commit_info'
git push -f $push_addr EHEAD:$push_branch #提交到远程gh-pages 分支

cd - #可以切换到上次访问的目录
rm -rf $dist_path #删除