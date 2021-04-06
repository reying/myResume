const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist'),
    },
    // context: path.resolve(__dirname, 'src'),
    mode: 'development',
    devServer: {
        open: true,
        port: 8080,
        hot: true,
        writeToDisk: true
    },
    plugins: [
        // new HTMLWebpackPlugin({
        //     template: path.resolve(__dirname, './src/index.html'),
        // }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    },
                },
            },
            // {
            //     test: /\.css$/i,
            //     use: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /\.(png|jpg|jpeg|svg|gif)$/i,
            //     use: ['file-loader']
            // }
        ]
    },
};