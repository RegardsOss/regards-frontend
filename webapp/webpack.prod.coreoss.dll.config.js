/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
    mode: 'dll_prod',
    projectContextPath: __dirname,
  })
  .addProductionPlugins()
  .merge({
    output: {
      path: `${__dirname}/dist/prod/`,
    },
    entry: {
      coreoss: [
        '@regardsoss/api',
        '@regardsoss/authentication-utils',
        '@regardsoss/client',
        '@regardsoss/components',
        '@regardsoss/display-control',
        '@regardsoss/domain',
        '@regardsoss/form-utils',
        '@regardsoss/i18n',
        '@regardsoss/i18n-ui',
        '@regardsoss/plugins',
        '@regardsoss/redux',
        '@regardsoss/shape',
        '@regardsoss/store-utils',
        '@regardsoss/store',
        '@regardsoss/theme',
        '@regardsoss/theme-ui',
        '@regardsoss/plugins-api',
      ],
    },
    plugins: [
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        // eslint-disable-next-line import/no-dynamic-require
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
    onBuildEnd: {
      scripts: [
        'echo "Updating webpack-config-front dist folder for plugins production build"',
        'rm -rf ./webpack-config-front/dist || true',
        'cp -Rp ./dist/prod ./webpack-config-front/dist',
      ],
      blocking: true,
      parallel: false,
    },
  })
  .get()

module.exports = conf
