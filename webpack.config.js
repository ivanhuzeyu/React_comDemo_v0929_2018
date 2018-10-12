
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

    mode: 'development',
    entry: {
        monitorpanel: './src/public/chartMonitor.js',
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
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            module: true
                        }
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                exclude: /node_modules/,
                loader: 'url-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'url-loader',
                exclude: /node_modules/
            }
        ]
    },
    performance: {

        hints: false

    },
    plugins: [
        new htmlWebpackPlugin({
            filename: './index.html',
            template: './src/test/test.html',
            inject: true
        })
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