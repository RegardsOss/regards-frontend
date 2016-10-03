const autoprefixer = require('autoprefixer')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // Hide stats information from children during webpack compilation
  stats: {children: false},
  // Webpack working directory
  context: __dirname,
  // Javascript main entry
  entry: './src/main.tsx',
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  postcss: [
    // Plugin to Automaticaly add vendors prefix to css classes
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    // Automaticaly get extensions files from javascript code with import or require.
    // exemple require('main') look for main, main.js or main.sass with our configuration
    // extensions: ['', '.js', '.scss'],
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
    // Root directories from wich requires are made
    root: [
      path.join(__dirname)
    ],
    modulesDirectories: ["web_modules", "node_modules"]
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx{0,1}?$/,
        exclude: [/node_modules/, /json/, /web_modules\/.*\/index\.d\.ts$/],
        loaders: ["babel-loader", "ts-loader"]
      },
      // Transpile ES6 Javascript into ES5 with babel loader and react
      {
        test: /\.js$/,
        exclude: [/node_modules/, /json/, /\/\..*/],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/, /json/],
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.json$/,
        exclude: [/node_modules/],
        loader: "json-loader"
      },
      {
        test: /\.jpg$/,
        exclude: [/node_modules/],
        loader: "file-loader?name=/img/[name].[ext]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?name=/img/[name].[ext]&limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=/img/[name].[ext]"
      },
      {
        test: /\.json$/,
        loader: "file-loader?name=/json/[name].[ext]"
      }
    ]
  },
  plugins: [
    // Create a single css file for the whole application
    new ExtractTextPlugin('/css/styles.css', {allChunks: true}),
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: false,
      dry: false
    }),
  ]
}
