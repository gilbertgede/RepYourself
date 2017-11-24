const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const glob = require('glob-all')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const OfflinePlugin = require('offline-plugin');


module.exports = {
  entry: {
    // 'webpack-hot-middleware/client',
    // 'babel-polyfill',
    bundle: path.join(__dirname, 'app/index'),
    polyfills: path.join(__dirname, 'app/polyfills'),
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: "[name].js",
    publicPath: './',    
  },
  module: {
    loaders: [
      { 
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015', 'react', 'stage-2'] }
          },
        ],
      },
      {
        test: /\.webmanifest$/,
        include: /assets\//,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            loader: 'webmanifest-loader',
            options: {
              name: 'RepYourself.org',
              shortName: 'RepYourself',
              description: 'Reach out to your representatives!'
            }
          }
        ]
      },
      { 
        test: /\.(jpe?g|png|gif|svg)$/,
        include: /assets\//,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          }
        ]
      },
      { 
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: glob.sync('./node_modules').map((d) => path.join(__dirname, d)),
              },
            },
          ],
          fallback: "style-loader",
        })
      },                                            
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "RepYourself.org",
      favicon: "assets/favicon.ico",
      template: "assets/index-template.ejs",
      excludeChunks: ['polyfills'],      
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PLATFORM_ENV: JSON.stringify('web'),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        dead_code: true,
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),    
    new ExtractTextPlugin("styles.css"),
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, 'dist/*.html'),
        path.join(__dirname, 'dist/bundle.js'),
      ]),
      moduleExtensions: ['.html', '.ejs', '.js'],
      styleExtensions: ['.css', 'scss', 'sass'],
    }),
    new OfflinePlugin(),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      // set to false when you want to examine the size of the output files
      deleteOriginalAssets: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
    }),
  ],
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class',
      'react-tap-event-plugin': 'preact-tap-event-plugin',
    }
  },
  stats: {
    children: false  
  }
}
