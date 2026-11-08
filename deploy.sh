#!/bin/bash

# 部署到 GitHub Pages (chenxin-code.github.io/qiankun-demo/)
# 用法: ./deploy.sh

set -e

DEPLOY_DIR="deploy-github-pages"
GITHUB_REPO="chenxin-code.github.io"
SUB_PATH="qiankun-demo"

echo "🚀 开始部署到 GitHub Pages..."

# 清理旧的部署目录
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR/$SUB_PATH

# 复制主应用到 qiankun-demo 目录
echo "📦 复制主应用..."
cp -r main-app/dist/* $DEPLOY_DIR/$SUB_PATH/

# 复制子应用
echo "📦 复制 Vue3 子应用..."
mkdir -p $DEPLOY_DIR/$SUB_PATH/sub-app-vue3
cp -r sub-app-vue3/dist/* $DEPLOY_DIR/$SUB_PATH/sub-app-vue3/

echo "📦 复制 Vue2 子应用..."
mkdir -p $DEPLOY_DIR/$SUB_PATH/sub-app-vue2
cp -r sub-app-vue2/dist/* $DEPLOY_DIR/$SUB_PATH/sub-app-vue2/

echo "📦 复制 React 子应用..."
mkdir -p $DEPLOY_DIR/$SUB_PATH/sub-app-react
cp -r sub-app-react/dist/* $DEPLOY_DIR/$SUB_PATH/sub-app-react/

echo "📦 复制 Angular 子应用..."
mkdir -p $DEPLOY_DIR/$SUB_PATH/sub-app-angular
cp -r sub-app-angular/dist/* $DEPLOY_DIR/$SUB_PATH/sub-app-angular/

# 进入部署目录
cd $DEPLOY_DIR

# 初始化 git 仓库
echo "🔧 初始化 Git 仓库..."
git init
git checkout -b master
git add -A
git commit -m "deploy: 更新 GitHub Pages 部署"

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git remote add origin git@github.com:chenxin-code/$GITHUB_REPO.git
git push -f origin master

# 清理
cd ..
rm -rf $DEPLOY_DIR

echo "✅ 部署完成！访问 https://chenxin-code.github.io/$SUB_PATH/"
