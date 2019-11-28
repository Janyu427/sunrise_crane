
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.config.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

let config = merge(webpackBaseConfig, {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                test: /\.js$/,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    devtool: false,
    mode: "production"
});

module.exports = config;
