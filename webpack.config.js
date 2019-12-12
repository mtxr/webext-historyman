const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const sourceRootPath = path.resolve(__dirname, 'src');
const distRootPath = path.resolve(__dirname, 'dist');
const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * @type {webpack.Configuration}
 */
const baseConfig = {
  entry: {
    background: ['regenerator-runtime/runtime', path.resolve(sourceRootPath, 'ts', 'background', 'index.ts')],
    options: ['regenerator-runtime/runtime', path.resolve(sourceRootPath, 'ts', 'options', 'index.tsx')],
    popup: ['regenerator-runtime/runtime', path.resolve(sourceRootPath, 'ts', 'popup', 'index.tsx')],
  },
  devtool: IS_DEV ? 'inline-source-map' : undefined,
  output: {
    path: distRootPath,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '@utils': path.resolve(sourceRootPath, 'utils'),
      '@bg': path.resolve(sourceRootPath, 'ts/background'),
      '@components': path.resolve(sourceRootPath, 'ts/components'),
      '@containers': path.resolve(sourceRootPath, 'ts/containers'),
      '@options': path.resolve(sourceRootPath, 'ts/options'),
      '@popup': path.resolve(sourceRootPath, 'ts/popup'),
      '@svg': path.resolve(sourceRootPath, 'svg'),
    },
  },
  module: {
    rules: [
      { test: /\.(js|ts|tsx)?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  stats: 'minimal',
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(sourceRootPath, 'html', 'options.html'),
      inject: 'body',
      filename: 'options.html',
      chunks: ['options'],
      templateParameters: {
        title: 'HistoryMan - Options Page',
        IS_DEV
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(sourceRootPath, 'html', 'popup.html'),
      inject: 'body',
      filename: 'popup.html',
      chunks: ['popup'],
      templateParameters: {
        title: 'HistoryMan - Popup Page',
        IS_DEV
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(sourceRootPath, 'assets'),
        to: path.resolve(distRootPath, 'assets'),
        test: /\.(jpg|jpeg|png|gif|svg)?$/,
      },
      {
        from: path.resolve(sourceRootPath, 'manifest.json'),
        to: path.resolve(distRootPath, 'manifest.json'),
        toType: 'file',
      }
    ]),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'IS_DEV': JSON.stringify(IS_DEV),
    }),
  ],
}

if (!IS_DEV) {
  module.exports.plugins.push(new CleanWebpackPlugin(distRootPath, { verbose: true, dry: false }));
}

module.exports = (_, { watch, hot }) => {
  baseConfig.watch = watch;
  if (watch) {
    baseConfig.plugins.push(new ExtensionReloader({
      port: 9128,
      reloadPage: true,
      entries: {
        background: 'background',
        // extensionPage: ['popup'/* , 'options' */],
      }
    }));
  }
  if (hot) {
    baseConfig.devServer = {
      contentBase: './dist',
      hot: true,
    };
  }
  return baseConfig;
}