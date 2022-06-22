require('dotenv').config();

const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const {NODE_ENV, CONFIG_NAME, CLIENT_ID} = process.env
const IsDev = NODE_ENV === 'development'

const filename = (ext) => (IsDev ? `[name].${ext}` : `[name].[contenthash].${ext}`)

const cssLoaders = (extra) => {
    const loaders = [
        MiniCssExtractPlugin.loader,
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = (preset) => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    return loaders
}

const plugins = () => [
    // new CopyPlugin({
    //     patterns: [
    //         {
    //             from: path.resolve(__dirname, './config'),
    //             to: 'config',
    //         },
    //     ],
    // }),
    // new FaviconsWebpackPlugin({
    //     logo: path.resolve(__dirname, './src/assets/favicon.png'),
    //     prefix: 'icons-[fullhash]/',
    // }),
    new HTMLWebpackPlugin({
        template: './src/index.html',
        CONFIG_NAME
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: filename('css')
    }),
    new webpack.DefinePlugin({
        'CLIENT_ID': `'${CLIENT_ID}'`,
        'MODE': `'${NODE_ENV}'`,
    }),
]

module.exports = {
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.scss'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@config': path.resolve(__dirname, './src/config'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@containers': path.resolve(__dirname, './src/containers'),
            '@helpers': path.resolve(__dirname, './src/helpers'),
            '@requests': path.resolve(__dirname, './src/requests'),
            '@store': path.resolve(__dirname, './src/store'),
        }
    },
    mode: NODE_ENV || 'production',
    entry: ['@babel/polyfill', path.resolve(__dirname, './src/index.jsx')],
    output: {
        path: path.resolve(__dirname, './build'),
        // publicPath: './',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                oneOf: [
                    {
                        resourceQuery: /tsx/,
                        use: ['@svgr/webpack']
                    },
                    {
                        resourceQuery: /jsx/,
                        use: ['@svgr/webpack']
                    },
                    {
                        use: 'url-loader'
                    }
                ],
                issuer: /\.[jt]sx?$/
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[contenthash][ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.jsx$/,
                include: [/sbx-.+/, /src/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-react')
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 8088,
        static: './build',
        historyApiFallback: true
    },
    plugins: plugins()
}
