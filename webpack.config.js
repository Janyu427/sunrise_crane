
const path = require("path");
const webpack = require("webpack");

let config = {
    entry: {
        main: "./src/js/main.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    mode: "development"
};

module.exports = config;
