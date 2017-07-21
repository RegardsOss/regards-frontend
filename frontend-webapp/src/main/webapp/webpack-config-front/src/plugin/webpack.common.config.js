/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (projectContextPath, mode) {
  return {
    // Hide stats information from children during webpack compilation
    stats: { children: false },
    // Webpack working directory
    context: projectContextPath,
    // Javascript main entry
    entry: './src/main.js',
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
    },
    output: {
      path: projectContextPath + '/target/' + mode,
      filename: 'plugin.js',
    },
    resolve: {
      // Automaticaly get extensions files from javascript code with import or require.
      // exemple require('main') look for main, main.js or main.jsx with our configuration
      extensions: ['.js', '.jsx'],
      modules: [
        // Root directories from wich requires are made
        path.join(projectContextPath),
        'node_modules'
      ],
    },
    module: {
      rules: [
        // Transpile ES6 Javascript into ES5 with babel loader
        {
          test: /\.jsx?$/,
          exclude: [/node_modules/, /json/],
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
        },
        {
          test: /\.jpg$/,
          loader: 'file-loader?name=[name].[ext]&outputPath=./img/',
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?name=/img/[name].[ext]&limit=10000&minetype=application/font-woff',
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?name=/img/[name].[ext]',
        },
        {
          test: /\.html/,
          loader: 'file-loader?name=[name].[ext]',
        },
        {
          test: /\.png$/,
          loader: 'url-loader',
          query: { mimetype: 'image/png' },
        },
      ],
    },
    plugins: [
      // Allow to define React as a global variable for JSX.
      new webpack.ProvidePlugin({
        React: 'react',
        PropTypes: 'prop-types',
      }),
      new ExtractTextPlugin({
        filename: 'css/styles.css',
        disable: false,
        allChunks: true
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
  }
}
