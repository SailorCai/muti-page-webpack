const merge = require('webpack-merge');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const base = require('./webpack.base.config.js');

let htmlArr = fs.readdirSync(path.resolve(__dirname, 'src/html'));

let entrys = {};
let htmlPlugins = [];

for(let item of htmlArr){
	let name = item.split('.html')[0];
	htmlPlugins.push(new WebpackHtmlPlugin({
		filename: item,
		template: path.resolve(__dirname, `src/html/${item}`),
		chunks: ['common', name]
	}));
	entrys[name] = `./src/js/${name}.js`;
};
module.exports = merge(base, {
	entry: entrys,
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 8080,
		hot: true,
		index: 'index.html',
		open: true
	},
	plugins: [
		...htmlPlugins,
	]
});