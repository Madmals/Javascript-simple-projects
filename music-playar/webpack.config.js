import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin';
//webpack 5 dont support polyfillinit so need to add manually
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
mode: 'development',
    entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    } ,
output: {
    path: path.resolve(__dirname, 'dist'), //output folder
        filename: '[name].[contenthash].js',
            clean: true,
    },
devtool: 'source-map',
    devServer: {
    static: {
        directory: path.resolve(__dirname, 'dist'),
        },
    port: 3000,
        open: true,
            hot: true,
                compress: true,
                    historyApiFallback: true,
    },
module: {
    rules: [
        {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'src'),
            use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
            test: /\.js$/,
            exclude: /node_modules/, 
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },

        },
        {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'assets'
        },
    ]
},
plugins: [
    new HtmlWebpackPlugin({
        title: 'test webpack', //name of html after build
        filename: 'index.html',
        template: 'src/index.html' //template area for html
    }),
    new NodePolyfillPlugin()

],
}
