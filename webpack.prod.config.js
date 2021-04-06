const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: ['@babel/polyfill', './src/index.js']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        environment: {
            arrowFunction: false
        }
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                },
            },
            exclude: /node_modules/,
        }]
    },
    plugins: [
        // new HTMLWebpackPlugin({
        //     template: path.resolve(__dirname, './src/index.html'),
        // }),
        new CleanWebpackPlugin(),
    ],
};