# 从零搭建开发环境
## Win10系统
1. 下载安装[Node](https://nodejs.org/en/)，选择LTS版
2. 安装cnpm，并设置为默认，终端输入
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
3. 生成`package.json`、`tsconfig.json`文件，根目录新建`webpack.config.js`和`babel.config.js`文件
```
npm init -y
tsc --init
```
4. 安装必要的第三方包
```
cnpm i webpack webpack-cli terser-webpack-plugin -D
cnpm i babel-loader @babel/core @babel/preset-env -D
cnpm i typescript ts-loader -D
cnpm i axios puppeteer@17 yamljs -D
```
5. 项目打包
```
npm run build
```
# 目前功能
1. 东南大学健康打卡每日自动申报
2. 青春浙江-青年大学习每日自动打卡
3. 记录日志文件
# 设置定时执行
1. 在`config.yaml`文件中配置相关参数，并与打包生成的`.js`文件和`AutoClock.bat`文件共同移至根目录
2. 右击此电脑 -> 管理 -> 任务计划程序 -> 操作 -> 创建基本任务 -> 名称和描述自己随便写 -> 下一步 -> 每天 -> 下一步 -> 设置执行脚本时间 -> 下一步 -> 启动程序 -> 下一步 -> 添加`AutoClock.bat`文件 -> 下一步 -> 完成
