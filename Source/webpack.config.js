const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const fs = require("fs");
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const pages = fs
  .readdirSync(path.resolve(__dirname, "./public"))
  .filter(fileName => fileName.endsWith(".html"));

module.exports = {
  entry: {
    main: ["@babel/polyfill","./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "build/static"),
    filename: "[name].[chunkhash].js",
    library: 'Widgets'
  },
  
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [/images|videos/],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/fonts/"
            }
          }
        ]
      },
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   exclude: [/fonts|videos/],
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       outputPath: "./assets/images/",
      //       name: "[name].[ext]"
      //     }
      //   }
      // },
      {
        test: /\.(mp4|mp3|webm)$/,
        exclude: [/fonts|images/],
        use: {
          loader: "file-loader",
          options: {
            outputPath: "./assets/videos/",
            name: "[name].[ext]"
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.pug$/,
        use: ['html-loader?interpolate', 'pug-html-loader?pretty=true']
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin("build", {}),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),

    ...pages.map(
      page =>
        new HtmlWebpackPlugin({
          inject: true,
          hash: true,
          template: "./public/" + page,
          filename: page
        })
    ),
    new WebpackMd5Hash(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyPlugin([
      { from: './public/img', to: 'img' },  
      { from: './public/static', to: 'static' },
      { from: './public/', test: /\.json$/,to:'' }
    ]),
  ]
};
