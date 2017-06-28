const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (projectContextPath, mode = 'dev') {
  return {
    // Hide stats information from children during webpack compilation
    stats: { children: false },
    // Webpack working directory
    context: projectContextPath,
    // Javascript main entry
    entry: './src/main.jsx',
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
    },
    resolve: {
      // Automaticaly get extensions files from javascript code with import or require.
      // exemple require('main') look for main, main.js or main.jsx with our configuration
      extensions: ['.js', '.jsx'],
      modules: [
        // Root directories from which requires are made
        path.join(projectContextPath),
        // Add the current folder (for webpack loaders)
        __dirname,
        'web_modules',
        'node_modules'
      ],
    },
    module: {
      rules: [
        // Transpile ES6 Javascript into ES5 with babel loader
        {
          test: /\.jsx?$/,
          // Exclude the DLL folder build from the transpilation
          exclude: [/node_modules/, /dist/],
          // used to cache the results of the loader.
          // Next builds will attempt to read from the cache
          // the cache is different depending of the value of NODE_ENV
          loader: 'babel-loader?cacheDirectory',
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        },
        {
          test: /\.(jpg|gif|png)$/,
          loader: 'file-loader?name=[name].[ext]&outputPath=./img/',
        },
        {
          test: /staticConfiguration(\.dev)?\.js$/,
          loader: 'file-loader?name=staticConfiguration.js&outputPath=./conf/',
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
          loader: 'file-loader?name=/html/[name].[ext]'
        },
      ],
    },
    plugins: [
      // Generate the index.html automatically
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        hash: true,
        isProduction: mode === 'prod'
      }),
      // Allow to define React as a global variable for JSX.
      new webpack.ProvidePlugin({
        React: 'react',
        PropTypes: 'prop-types',
      }),
      // Create a single css file for the whole application instead of setting css inline in the javascript
      new ExtractTextPlugin({ filename: 'css/styles.css', disable: false, allChunks: true }),
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('api/v1'),
      }),
      // Using http://webpack.github.io/analyse/#hints
      // And npm run build:stats
      // We can start to prefetch these files before they are imported
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/vendors/storybook-addon-material-ui-custom/src/index.js'),
      new webpack.PrefetchPlugin('./web_modules/vendors/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-datasource-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/modules/src/components/LazyModuleComponent.jsx'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-microservice-management/src/containers/plugin/PluginConfigurationListContainer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-user-role-resource-access-management/src/containers/ResourceAccessFormContainer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-results/src/containers/AdminContainer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/utils/tests-helpers/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/components/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/authentication/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/menu/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-project-management/src/router.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-connection-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-module-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-form/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-user-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-theme-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-module-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-modelattribute-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-facets/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-results/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-attributemodel-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-microservice-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-common/entities-common/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-accessright-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-accessright-dataaccess-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-graph/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-service-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/data/shape/src/main.js'),
    ],
  }
}
