# 从零搭建开发环境
## Win10系统
1. 下载安装[Node](https://nodejs.org/en/)，选择LTS版
2. 安装cnpm，并设置为默认，终端输入
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
3. 生成`package.json`、`tsconfig.json`等文件，根目录新建`webpack.config.js`和`babel.config.js`等文件
```
npm init -y
tsc --init
```
4. 安装必要的第三方包
```
cnpm i webpack webpack-cli typescript ts-loader babel-loader @babel/core @babel/preset-env core-js@3 terser-webpack-plugin -D
cnpm i axios puppeteer@17 yamljs -D
```
5. 
6. 
# 设置定时执行
1. 右击此电脑 -> 管理 -> 任务计划程序 -> 操作 -> 创建基本任务 -> 名称和描述自己随便写 -> 下一步 -> 每天 -> 下一步 -> 设置执行脚本时间 -> 下一步 -> 启动程序 -> 下一步 -> 添加AutoClock.bat文件 -> 下一步 -> 完成
2. 在`config.yaml`文件中配置相关参数
