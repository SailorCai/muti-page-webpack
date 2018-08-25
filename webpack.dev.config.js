const merge = require('webpack-merge');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const base = require('./webpack.base.config.js');

let htmlArr = fs.readdirSync(path.resolve(__dirname, 'src/html'));

let entrys = {};
let htmlPlugins = [];

for(let item of htmlArr){
	//我们只需要.html前面的文件名
	let name = item.split('.html')[0];
	htmlPlugins.push(new WebpackHtmlPlugin({
		filename: item,
		template: 'html-withimg-loader!'+path.resolve(__dirname, `src/html/${item}`),
		//common代表公共模块，name就是html对应的同名js文件
		//这个配置将会自动在生成的html中插入你指定的js
		chunks: ['common', name]
	}));
	//配置入口
	entrys[name] = `./src/js/${name}.js`;
};
module.exports = merge(base, {
	//传入entry配置
	entry: entrys,
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 8080,
		//hot: true,
		index: 'index.html',
		open: true
	},
	plugins: [
		//传入html-webpack-plugin配置对象
		...htmlPlugins,
	]
});