const merge = require('webpack-merge');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const base = require('./webpack.base.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let htmlArr = fs.readdirSync(path.resolve(__dirname, 'src/html'));

let entrys = {};
let htmlPlugins = [];

for(let item of htmlArr){
	let name = item.split('.html')[0];
	htmlPlugins.push(new WebpackHtmlPlugin({
		filename: `${name}.[chunkhash].html`,
		template: path.resolve(__dirname, `src/html/${item}`),
		chunks: ['common', name],
		inject: true,
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true
			// 更多配置:
			// https://github.com/kangax/html-minifier#options-quick-reference
		},
	}));
	entrys[name] = `./src/js/${name}.js`;
};

module.exports = merge(base, {
	entry: entrys,
	plugins: [
		...htmlPlugins,
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			//生产环境默认不使用source-map
			//sourceMap: "#source-map",
			parallel: true
		}),
	]
});