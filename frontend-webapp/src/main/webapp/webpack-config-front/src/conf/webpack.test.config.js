const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const getCommonConfig = require('./webpack.common.config')
const path = require('path')

module.exports = function (projectContextPath) {

  let config = getCommonConfig(projectContextPath)

  config = merge(config, {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({
      // this WILL include `*regardsoss*` in the bundle
      whitelist: [/regardsoss/, /react-material-color-picker/],
    })], // in order to ignore all modules in node_modules folder
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'inline-source-map',
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
    module: {
      noParse: [
        /sinon/,
        /iconv-loader/,
        /enzyme/,
      ],
    },
    plugins: [
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`${projectContextPath}/dist/dev/core-manifest.json`),
        context: projectContextPath,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('test'),
        },
        GATEWAY_HOSTNAME: JSON.stringify('http://localhost:8000'),
        API_URL: JSON.stringify('/api/v1/'),
        STATIC_CONF: JSON.stringify({
          // Available microservices from backend server.
          MSERVICES: {
            ACCESS_PROJECT: 'rs-access-project',
            ADMIN: 'rs-admin',
            AUTHENTICATION: 'rs-authentication',
            CATALOG: 'rs-catalog',
            DAM: 'rs-dam',
          },
          IMSERVICES: {
            ACCESS_INSTANCE: 'rs-access-instance',
          },
          // Default driver used to create a project connection (see module admin-database-management)
          projectConnectionDriver: 'org.postgresql.Driver',
        }),
      }),
    ],
    // enable sourcemaps support
    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },

  })
  return config
}
