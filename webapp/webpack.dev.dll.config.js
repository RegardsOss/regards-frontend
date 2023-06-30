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
const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'dll_dev',
    projectContextPath: __dirname,
  })
  .cleanFolder()
  .merge({
    mode: 'development',
    output: {
      path: `${__dirname}/dist/dev/`,
    },
    entry: {
      core: [
        'chart.js',
        'immutable',
        'isomorphic-fetch',
        'lodash',
        'material-ui',
        'moment',
        'normalizr',
        'react',
        'resium',
        'regards-mizar',
        'react-chartjs-2',
        'react-dnd',
        'react-dnd-html5-backend',
        'react-dom',
        'react-infinite',
        'react-intl',
        'react-redux',
        'react-responsive',
        'react-resizable',
        'react-router',
        'redux',
        'redux-api-middleware',
        'redux-form',
        'redux-form-material-ui',
        'redux-logger',
        'redux-thunk',
        'scriptjs',
        'window-or-global',
        'fixed-data-table-2',
        'react-measure',
        'react-remarkable',
        'react-scrollbar',
        'react-transition-group',
        'reselect',
        'mdi-material-ui',
        'intl',
        'react-ace',
        'react-notification-system',
      ],
    },
    plugins: [
      new webpack.DllPlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        path: `${__dirname}/dist/dev/[name]-manifest.json`,
        // The name of the global variable which the library's
        // require function has been assigned to. This must match the
        // output.library option above
        name: '[name]',
      }),
    ],
  })
  .get()

module.exports = conf
