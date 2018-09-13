require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';

const PATH = {
  src: path.resolve('./src'),
  dist: path.resolve('./dist'),
  public: path.resolve('./public/'),
  nodeModules: path.resolve('./node_modules'),
};

if (IS_DEV) {
  console.log(`Proxy to ${process.env.DOMAIN}`);
}

const getProxy = () => {
  return {
    '/api': {
      target: 'https://api.github.com/', // proxy for github
      secure: false,
      changeOrigin: true,
      disableHostCheck: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  };
};

const devServer = {
  contentBase: PATH.public,
  compress: true,
  historyApiFallback: true,
  port: 3000,
  disableHostCheck: true,
  publicPath: '/',
  proxy: getProxy(),
};

const pluginGlobal = new webpack.DefinePlugin({
  __CLIENT__: true,
  __SERVER__: false,
  __BUILD__: JSON.stringify(`${+new Date()}`),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
  'process.env.HOST': JSON.stringify(process.env.HOST),
});

const loaderJs = {
  test: /\.js$/,
  include: PATH.src,
  loader: 'babel-loader',
  options: {
    plugins: ['transform-class-properties'],
  },
};
const loaderFont = {
  test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {name: 'font/[name]-[hash].[ext]'},
    },
  ],
};
const loaderCss = {
  test: /\.css$/,
  use: [IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
};

const loaderImage = {
  test: /\.(jpe?g|png|svg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: 'static/[name]-[hash].[ext]',
        limit: 7000,
      },
    },
  ].concat(
    IS_PROD
      ? [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ]
      : []
  ),
};

const loaderLess = {
  test: /\.less$/,
  use: [
    IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader', // translates CSS into CommonJS
      options: {
        modules: true,
        root: '.',
        localIdentName: IS_DEV
          ? '[path]--[local]___[hash:base64:5]'
          : '[local]_[hash:base64:5]',
        importLoaders: 1,
        sourceMap: IS_DEV,
      },
    },
    {
      loader: 'less-loader', // compiles Less to CSS
      options: {
        paths: [PATH.src],
        sourceMap: IS_DEV,
      },
    },
  ],
};

const config = {
  context: PATH.src,
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_DEV ? 'inline-source-map' : 'source-map',
  entry: {
    app: './index',
  },
  output: {
    path: PATH.dist,
    filename: 'static/[name].min.js',
    publicPath: '/',
    chunkFilename: 'static/chunks/[name]_[chunkhash].min.js',
  },
  resolve: {
    modules: [PATH.src, PATH.nodeModules],
  },
  devServer: IS_DEV ? devServer : undefined,
  stats: {
    reasons: false,
    performance: true,
    context: PATH.src,
    timings: true,
    version: true,
    warnings: true,
    modules: false,
    chunkModules: false,
    children: false,
    env: true,
    colors: true,
  },
  parallelism: 4,
  cache: IS_DEV,
  module: {
    rules: [loaderJs, loaderLess, loaderCss, loaderFont, loaderImage],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../template.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? 'static/[name].css' : 'static/[name].min.css',
      chunkFilename: IS_DEV
        ? 'static/[id].css'
        : 'static/chunks/[id]_[chunkhash].min.css',
    }),
    pluginGlobal,
  ],
};

module.exports = config;
