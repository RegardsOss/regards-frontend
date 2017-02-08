const path = require('path');
const webpack = require('webpack')

module.exports = {
  module: {
    loaders: [
      {
        test:   /\.scss$/,
        loaders: ['style', 'raw', 'sass'],
        include: path.resolve(__dirname, '../css/')
      },
      {
        test: /\.svg$/,
        loader: 'babel!react-svg'
      },
      {
        test: /\.(jpg|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: [/node_modules/, /json/],
        loader: require.resolve('file-loader'),
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        query: { mimetype: 'image/png' },
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    // Allow to define React as a global variable for JSX.
    new webpack.ProvidePlugin({ React: 'react' }),
  ],
  eslint: {
    failOnWarning: false,
    failOnError: false,
    emitWarning: true,
    fix: true,
  },
};