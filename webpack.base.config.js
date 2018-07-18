const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'src/js')
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
				include: path.resolve(__dirname, 'src/css')
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
				}
			},
		]
	},
	optimization: {
		//用于分离公共js模块
		splitChunks: {
			chunks: 'all',
			name: 'common'
		}
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
	]
};
