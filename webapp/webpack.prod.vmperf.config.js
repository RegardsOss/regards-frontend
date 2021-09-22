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

/**
 * Webpack configuration file
 * Override the default dev configuration in order to run the app with the Regards continuous integration backend on VM perf.
 */
const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')
console.log("You are running a production build on PERF")
console.log("You need to:")
console.log("   - run npm run build:production-dll")
console.log("   - mkdir -p dist/prod/conf && cp webpack-config-front/src/conf/staticConfiguration.js dist/prod/conf/")
console.log("   - add inside file dist/prod/conf/staticConfiguration.js")
console.log("     API_URL = 'api/v1';GATEWAY_HOSTNAME = 'http://172.26.47.52'")
const conf = webpackConfigurator
  .generateConfig({
    mode: 'prod',
    projectContextPath: __dirname,
  })
  .merge({
    plugins: [
      new webpack.DefinePlugin({
        GATEWAY_HOSTNAME: JSON.stringify('http://172.26.47.52'),
      }),
    ],
  })
  .addProductionPlugins()
  .get()

module.exports = conf
