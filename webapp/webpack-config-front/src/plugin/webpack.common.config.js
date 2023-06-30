/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const getBabelEnvName = require('../utils/getBabelEnvName')

module.exports = function (projectContextPath, mode) {
  return {
    // Hide stats information from children during webpack compilation
    stats: { children: false },
    // Webpack working directory
    context: projectContextPath,
    // Javascript main entry
    entry: './src/main.js',
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
            envName: getBabelEnvName(mode),
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
          test: /\.(jpg|gif|png)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
        {
          test: /\.(svg|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          exclude: /default-icon.svg/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
        {
          test: /\.html/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'html/',
          },
        },
        {
          test: /\.png$/,
          loader: 'url-loader',
          options: { mimetype: 'image/png' },
        },
        {
          test: /\.woff$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      ],
    },
    plugins: [
      // Allow to define React as a global variable for JSX.
      new webpack.ProvidePlugin({
        React: 'react',
        PropTypes: 'prop-types',
        // Fix jsZIP
        Buffer: ['buffer', 'Buffer'],
      }),
      new MiniCssExtractPlugin({ filename: 'css/styles.css' }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  }
}
