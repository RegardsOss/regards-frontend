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


const PLUGIN_TYPE = 'criterion'
const PLUGIN_NAME = 'enumerated'

if (!process.env.GATEWAY_PLUGINS) {
  console.log('GATEWAY_PLUGINS var must be set')
  console.log('Syntax: GATEWAY_PLUGINS=http://validation-regards.cloud-espace.si.c-s.fr yarn build:watch')
  process.abort()
}

const conf = webpackConfigurator
  .generateConfig({
    mode: 'pkg_build_dev',
    projectContextPath: __dirname,
  })
  // Save the plugin into the webpack dev server public folder (dist/dev)
  .saveDevPlugin(PLUGIN_TYPE, PLUGIN_NAME)
  .merge({
    plugins: [
      new webpack.DefinePlugin({
        GATEWAY_HOSTNAME: JSON.stringify(process.env.GATEWAY_PLUGINS || 'http://gateway_to_modify_in_your_plugin_webpack_config.cs'),
      }),
    ],
  })
  .get()

module.exports = conf
