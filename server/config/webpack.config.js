const path = require('path');
const paths = require('./paths');
const WebpackNodeExternals = require('webpack-node-externals');
const { EnvironmentPlugin } = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    name: 'for development',
    mode: 'development',
    devtool: 'cheap-module-souce-map',
    externals: [WebpackNodeExternals()],
    resolve: {
        extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
        modules: ['node_modules'].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
        ),
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new BundleAnalyzerPlugin({ analyzerMode: "static" }),
        new EnvironmentPlugin({
            APP_NAME: process.env.APP_NAME,
            APP_HOST: process.env.APP_HOST,
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
            DB_URI: process.env.DB_URI,
            DB_USER: process.env.DB_USER,
            DB_PASS: process.env.DB_PASS,
        }),
    ],
    entry: {
        app: ['./src/server'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
    },
};
