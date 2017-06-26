// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// Webpack configuration file
const DevWebpackConfig = require('../webpack.dev.config')
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// load the default config generator of storybook
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

let config = DevWebpackConfig
// Remove the entry
delete config.entry
// Reset loaders
config = merge(config, {
  plugins: [
    new webpack.DllReferencePlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      manifest: require(`${__dirname}/../dist/dev/coreoss-manifest.json`),
      context: __dirname,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('ui-development'),
      },
      GATEWAY_HOSTNAME: JSON.stringify('http://localhost:8000'),
    }),
  ],
})

module.exports = (baseConfig, env) => {
  const originalStorybookConfig = genDefaultConfig(baseConfig, env);

  // Extend it as you need.
  config = merge(originalStorybookConfig, config)

  return config;
};
