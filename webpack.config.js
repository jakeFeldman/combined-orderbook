const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const __DEV__ = process.env.NODE_ENV === 'development';

module.exports = {
    mode: __DEV__ ? 'development' : 'production',
    entry: path.resolve('src', 'client', 'index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.join('public', 'index.html'),
        })
    ],
    output: {
        filename: __DEV__ ? 'bundle.js' : 'bundle.[hash:8].js',
        path: path.join(__dirname, 'public'),
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    }
};
