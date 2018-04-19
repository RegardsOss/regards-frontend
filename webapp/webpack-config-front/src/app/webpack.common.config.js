const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        'node_modules',
      ],
    },
    module: {
      rules: [
        // Transpile ES6 Javascript into ES5 with babel loader
        {
          test: /\.jsx?$/,
          // Exclude the DLL folder build from the transpilation
          // and staticConfiguration this file is just copied not interpreted
          exclude: [/node_modules/, /dist/, /staticConfiguration(\.dev)?\.js$/],
          use: [
            'thread-loader',
            // used to cache the results of the loader.
            // Next builds will attempt to read from the cache
            // the cache is different depending of the value of NODE_ENV
            'babel-loader?cacheDirectory',
          ],
        },
        { // @regardsoss-modules icon handler
          test: /default-icon\.svg$/,
          loader: 'file-loader',
          options: {
            regExp: /modules\/([\w-]+)\/default-icon\.svg$/,
            name: '[1].[ext]',
            outputPath: 'modules-icon/',
          },
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
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
          test: /staticConfiguration(\.dev)?\.js$/,
          loader: 'file-loader',
          options: {
            name: 'staticConfiguration.js',
            outputPath: 'conf/',
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
      ],
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      // Generate the index.html automatically
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        hash: true,
        isProduction: mode === 'prod',
      }),
      // Allow to define React as a global variable for JSX.
      new webpack.ProvidePlugin({
        React: 'react',
        PropTypes: 'prop-types',
      }),
      // Create a single css file for the whole application instead of setting css inline in the javascript
      new ExtractTextPlugin({ filename: 'css/styles.css', disable: false, allChunks: true }),
      // Using http://webpack.github.io/analyse/#hints
      // And npm run build:stats
      // We can start to prefetch these files before they are imported
      new webpack.PrefetchPlugin('./web_modules/utils/modules/src/components/LazyModuleComponent.jsx'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-microservice-management/src/containers/plugin/PluginConfigurationListContainer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-user-role-resource-access-management/src/containers/ResourceAccessFormContainer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/components/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/components/src/content/MarkdownFileContentDisplayer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-results/src/containers/AdminContainer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-results/src/containers/ModuleContainer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/business-common/entities-common/src/containers/description/EntityDescriptionContainer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/business-common/entities-common/src/components/description/properties/PropertiesTabComponent.jsx'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-graph/src/containers/user/UserModuleContainer.jsx'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-graph/src/components/user/SearchGraph.jsx'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-graph/src/containers/user/GraphLevelDisplayerContainer.jsx'),

      // All business modules
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-datasource-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-module-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-accessright-accessgroup-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-document-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-plugin-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-accessright-dataaccess-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-fragment-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-service-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-accessright-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-modelattribute-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-theme-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-account-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-model-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-user-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-board-acquisition/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ingest-processing-chain-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-user-projectuser-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-board-collections/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ingest-sip-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-user-role-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-board-models/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-microservice-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-user-role-resource-access-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-attributemodel-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-project-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/portal/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-collection-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-storage-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/user/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-data-connection-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-modules/admin-ui-layout-management/src/main.js'),

      // All modules
      new webpack.PrefetchPlugin('./web_modules/modules/authentication/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/licenses/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/order-cart/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/projects-list/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-form/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/storage-monitoring/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/embedded-html/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/menu/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/order-history/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-graph/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/news/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/project-about-page/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/modules/search-results/src/main.js'),

      // Business common
      new webpack.PrefetchPlugin('./web_modules/business-common/admin-data-entities-attributes-management/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-common/endpoints-common/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-common/global-system-error/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-common/order-common/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-common/user-metadata-common/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-common/attributes-common/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-common/entities-common/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-common/microservice-plugin-configurator/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/business-common/project-handler/src/main.js'),

      // Utils
      new webpack.PrefetchPlugin('./web_modules/utils/adapters/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/display-control/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/i18n/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/layout/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/plugins/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/redux/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/theme-ui/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/authentication-utils/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/form-utils/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/i18n-ui/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/modules/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/plugins-api/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/store-utils/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/theme/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/utils/units/src/main.js'),

      // Data
      new webpack.PrefetchPlugin('./web_modules/data/client/src/main.js'),
      new webpack.PrefetchPlugin('./web_modules/data/domain/main.js'),
    ],
  }
}