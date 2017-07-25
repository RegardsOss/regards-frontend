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
const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'dll',
    projectContextPath: __dirname
  })
  .addProductionPlugins()
  .merge({
    output: {
      path:  `${__dirname}/dist/prod/`
    },
    entry: {
      coreoss: [
        '@regardsoss/admin-data-entities-attributes-management',
        '@regardsoss/api',
        '@regardsoss/attributes-common',
        '@regardsoss/authentication-manager',
        '@regardsoss/client',
        '@regardsoss/components',
        '@regardsoss/display-control',
        '@regardsoss/domain',
        '@regardsoss/endpoints-common',
        '@regardsoss/entities-common',
        '@regardsoss/form-utils',
        '@regardsoss/global-system-error',
        '@regardsoss/i18n',
        //'@regardsoss/model',
        '@regardsoss/plugins',
        '@regardsoss/project-handler',
        '@regardsoss/redux',
        '@regardsoss/shape',
        '@regardsoss/store-utils',
        '@regardsoss/store',
        '@regardsoss/theme',
        '@regardsoss/user-metadata-common',
      ],
    },
    plugins: [
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`${__dirname}/dist/prod/core-manifest.json`),
        context: __dirname,
      }),
      new webpack.DllPlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        path: `${__dirname}/dist/prod/[name]-manifest.json`,
        // The name of the global variable which the library's
        // require function has been assigned to. This must match the
        // output.library option above
        name: '[name]',
      }),
    ],
  })
  // Save production DLLs in the @regardsoss/webpack-config-front plugin
  .runShell({
    onBuildEnd: [
      'echo "Updating webpack-config-front dist folder for plugins production build"',
      'rm -rf ./webpack-config-front/dist || true',
      'cp -Rp ./dist/prod ./webpack-config-front/dist'
    ]
  })
  .get()

module.exports = conf