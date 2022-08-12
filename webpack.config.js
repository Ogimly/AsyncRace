const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) =>
  isDev
    ? {
        devServer: {
          static: {
            directory: path.join(__dirname, 'public'),
          },
          compress: true,
          port: 9000,
          open: {
            app: { name: 'chrome', arguments: ['--new-window'] },
          },
        },
      }
    : {};

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',

  devtool: development ? 'inline-source-map' : false,

  entry: {
    main: ['./src/index.ts', './src/main.scss'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),

    filename: '[name].js',

    assetModuleFilename: 'assets/[name][ext]',
  },

  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new ESLintPlugin({ extensions: ['ts', 'js'] }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          noErrorOnMissing: true,
          to: 'assets',
        },
      ],
    }),

    // new CleanWebpackPlugin({
    //   cleanStaleWebpackAssets: false,
    // }),
  ],

  ...devServer(development),
});
