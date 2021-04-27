/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const alias = require('../utils/alias')

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
      path: `${projectContextPath}/target/${mode}`,
      filename: 'plugin.js',
    },
    resolve: {
      // Automaticaly get extensions files from javascript code with import or require.
      // exemple require('main') look for main, main.js or main.jsx with our configuration
      extensions: ['.js', '.jsx'],
      modules: [
        // Root directories from which requires are made
        path.join(projectContextPath),
        path.join(projectContextPath, '../../..'),
        'web_modules',
        'node_modules',
      ],
      alias: alias(path.join(projectContextPath, '../../..'), mode),
    },
    module: {
      rules: [
        // Transpile ES6 Javascript into ES5 with babel loader
        {
          test: /\.jsx?$/,
          exclude: [/node_modules/, /json/],
          loader: 'babel-loader',
          options: {
            // @Since babel 7, we can specify where is located the babel config file
            // Here it walks upward from the "root" directory, looking for a directory containing a babel.config.js file.
            // https://babeljs.io/docs/en/options#rootmode
            rootMode: 'upward',
          },
        },
        {
          test: /\.css$/,
          use: mode !== 'test' ? [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ] : ['css-loader'],
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
          options: { mimetype: 'image/png' },
        },
      ],
    },
    plugins: [
      // Allow to define React as a global variable for JSX.
      new webpack.ProvidePlugin({
        React: 'react',
        PropTypes: 'prop-types',
      }),
      new MiniCssExtractPlugin({ filename: 'css/styles.css' }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  }
}
