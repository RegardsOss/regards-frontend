const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
const getCommonConfig = require('./webpack.common.config')
// load the static configuration variables
require('../conf/staticConfiguration')

module.exports = function (projectContextPath) {
  const config = getCommonConfig(projectContextPath, 'test')

  // Ensure babel environment variable is correctly setup to test
  process.env.NODE_ENV = 'test'

  return merge(config, {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    // externals: [
    //   function (ctx, request, callback) {
    //     console.log(request, callback)
    //     if (/^yourregex$/.test(request)) {
    //       // Externalize to a commonjs module using the request path
    //       return callback(null, 'commonjs ' + request);
    //     }

    //     // Continue without externalizing the import
    //     callback();
    //   },
    // ],
    // externals: [nodeExternals({
    //   whitelist: [
    //     // this WILL include `*regardsoss*` in the bundle
    //     /regardsoss/,
    //     // this fix the test build dkw
    //     /redux-api-middleware/,
    //     // instant-mocha stuff
    //     /chai/,
    //     /assertion-error/,
    //     /pathval/,
    //     /type-detect/,
    //     /get-func-name/,
    //     /deep-eql/,
    //     /check-error/,
    //     /redux/,
    //     /@babel/,
    //     /react/,
    //     /object-assign/,
    //     /prop-types/,
    //   ],
    // })], // in order to ignore all modules in node_modules folder
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'nosources-source-map',
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
    module: {
      // noParse: (content) => {
      //   const test = /iconv-loader|\/material-ui/.test(content)
      //   if (test) {
      //     console.log("noParse", content)
      //     return test
      //   }
      //   console.log("parse", content)
      //   return false
      // },

      // noParse: [
      //   /sinon/,
      //   /iconv-loader/,
      //   /enzyme/,
      // ],
    },
    resolve: {
      alias: {
        'react-router': path.resolve(projectContextPath, 'web_modules/utils/tests-helpers/src/ReactRouter.mock.jsx'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('test'),
        },
        GATEWAY_HOSTNAME: JSON.stringify('http://localhost:8000'),
        API_URL: JSON.stringify('api/v1'),
        STATIC_CONF: JSON.stringify(STATIC_CONF),
      }),
      // Define the fetch as a global var
      new webpack.ProvidePlugin({
        fetch: 'isomorphic-fetch',
      }),
    ],
    // enable sourcemaps support
    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
    mode: 'development',
  })
}
