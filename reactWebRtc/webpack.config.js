var path = require('path');
var webpack = require('webpack');
module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3000,
        hot: true
    },
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './dev/js/index.js'
        ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }

        ],
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, '/src'),
        filename: 'bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
