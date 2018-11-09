
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	mode: 'development',
	entry: {
		monitorpanel: './src/public/import.js',
		index: './src/test/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		libraryTarget: "umd",
		library: "chartmonitor-panel"
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader', 'postcss-loader']
				})
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				exclude: /node_modules/,
				loader: 'url-loader',
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'url-loader'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/test/test.html',
			inject: true
		}),
		new ExtractTextPlugin("style.css")
	],
	//使用webpack-dev-server
	devServer: {
		stats: "none",
		contentBase: './',
		host: "localhost",
		port: 1024,
		inline: true,
		hot: true
	},
}