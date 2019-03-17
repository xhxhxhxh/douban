const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new htmlWebpackPlugin ({
    template: path.join(__dirname, './src/index.html'),
    filename: 'index.html'
});

module.exports = {
    mode: 'production',
    plugins: [
        htmlPlugin
    ],
    module: {
        rules: [
            {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.less$/, use: ['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]','less-loader']},
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=9999&name=[hash:8]-[name].[ext]']},
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: ['url-loader']}
        ]
    },
    resolve: {
        extensions: ['.js','.jsx','.json'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    }
};