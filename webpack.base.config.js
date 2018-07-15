const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let htmlArr = fs.readdirSync(path.resolve(__dirname, 'src/html'));

let entrys = {};

let htmlPlugins = [];

for(var item of htmlArr){
	let name = item.split('.html')[0];
	htmlPlugins.push(new WebpackHtmlPlugin({
		filename: item,
		template: path.resolve(__dirname, `src/html/${item}`),
		chunks: ['common', name]
	}));
	entrys[name] = `./src/js/${name}.js`;
};

module.exports = {
	entry: entrys,
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src');
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'src'); 
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader", "postcss-loader"]
			}
		]
	},
	plugins: [
		...htmlPlugins,
		new CleanWebpackPlugin(['dist'])
	]
};
