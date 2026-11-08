# 部署到 GitHub Pages (chenxin-code.github.io/qiankun-demo/)
# 用法: .\deploy.ps1

$ErrorActionPreference = "Stop"
$DeployDir = "deploy-github-pages"
$GitHubRepo = "chenxin-code.github.io"
$SubPath = "qiankun-demo"

Write-Host "🚀 开始部署到 GitHub Pages..." -ForegroundColor Cyan

# 清理旧的部署目录
if (Test-Path $DeployDir) {
    Remove-Item -Recurse -Force $DeployDir
}
New-Item -ItemType Directory -Path "$DeployDir\$SubPath" | Out-Null

# 复制主应用到 qiankun-demo 目录
Write-Host "📦 复制主应用..."
Copy-Item -Recurse -Path "main-app\dist\*" -Destination "$DeployDir\$SubPath"

# 复制子应用
Write-Host "📦 复制 Vue3 子应用..."
New-Item -ItemType Directory -Path "$DeployDir\$SubPath\sub-app-vue3" | Out-Null
Copy-Item -Recurse -Path "sub-app-vue3\dist\*" -Destination "$DeployDir\$SubPath\sub-app-vue3"

Write-Host "📦 复制 Vue2 子应用..."
New-Item -ItemType Directory -Path "$DeployDir\$SubPath\sub-app-vue2" | Out-Null
Copy-Item -Recurse -Path "sub-app-vue2\dist\*" -Destination "$DeployDir\$SubPath\sub-app-vue2"

Write-Host "📦 复制 React 子应用..."
New-Item -ItemType Directory -Path "$DeployDir\$SubPath\sub-app-react" | Out-Null
Copy-Item -Recurse -Path "sub-app-react\dist\*" -Destination "$DeployDir\$SubPath\sub-app-react"

Write-Host "📦 复制 Angular 子应用..."
New-Item -ItemType Directory -Path "$DeployDir\$SubPath\sub-app-angular" | Out-Null
Copy-Item -Recurse -Path "sub-app-angular\dist\*" -Destination "$DeployDir\$SubPath\sub-app-angular"

# 进入部署目录
Set-Location $DeployDir

# 初始化 git 仓库
Write-Host "🔧 初始化 Git 仓库..."
git init
git checkout -b master
git add -A
git commit -m "deploy: 更新 GitHub Pages 部署"

# 推送到 GitHub
Write-Host "📤 推送到 GitHub..." -ForegroundColor Yellow
git remote add origin "git@github.com:chenxin-code/$GitHubRepo.git"
git push -f origin master

# 清理
Set-Location ..
Remove-Item -Recurse -Force $DeployDir

Write-Host "✅ 部署完成！访问 https://chenxin-code.github.io/$SubPath/" -ForegroundColor Green
