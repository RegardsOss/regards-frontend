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

// You are running a production build on PERF
// You need to:
//    - Build DLL
//      npm run build:production-dll

//    - mkdir -p dist/prod/conf && cp webpack-config-front/src/conf/staticConfiguration.js dist/prod/conf/

//    - Fix the content of the file dist/prod/conf/staticConfiguration.js
//      echo "API_URL = 'api/v1'" >> dist/prod/conf/staticConfiguration.js
//      sed -i s@\$\{regards\.config\.cloud\.gateway\.url}@http://172.26.47.52@g dist/prod/conf/staticConfiguration.js

//    - Fix Cesium
//      sed -i "s+\".\": {+\"./\": \"./Source/\",\".\": {+g" node_modules/cesium/package.json

//    - Then run the command
//      npm run start:prodvmperf

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
