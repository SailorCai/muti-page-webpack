# muti-page-webpack
basic webpack configuration for mutiple page application

### 2018.8.26最新更新

1、完善url-loader对图片资源的处理功能

2、添加html-withimg-plugin处理html中img标签src属性引入的图片

3、把所有配置文件迁移到 './build/' 路径下，目的是让配置文件看起来更整洁

4、加入process.evn.NODE_ENV环境配置

5、添加mini-css-extract-plugin，把css文件从bundle.js中独立成单独的css文件


### 这次配置调整中遇到的问题及解决方案记录：

1、按理说使用url-loader处理图片应该不需要下载file-loader,但是当图片大小超过限制编译就会报“can not find modlue file-loader”的错，文档是说“当图片大小超过限制时会默认使用file-loader”，但不知具体原因是否是因为新版本url-loader将file-loader的功能剔除了。

2、webapck4.0+以上版本不再推荐使用extract-text-webpack-plugin处理css模块，而使推荐mini-css-extract-plugin

不过这里有一个问题，就是当你把css文件放入dist/css/目录下将会导致css中引用的图片路径出错，网上有很多人推荐的解决方案是在output配置中加入 publicPath: '../' 配置，

但其实这样回到指除了css中引用图片的路径是对的外其他所有文件中的路径都是错的，甚至导致css文件引入错误。

最优的解决方案是在引入MiniCssExtractPlugin.loader时使用对象方式，并在options目录下添加
publicPath: '../' 配置

具体配置请查看配置文件，谢谢

———— 8.26


