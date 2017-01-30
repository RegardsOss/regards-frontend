var webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    'core': ["chart.js", "flux-standard-action", "gsap", "immutable", "isomorphic-fetch", "lodash", "material-ui", "moment", "normalizr", "react", "react-chartjs-2", "react-dnd", "react-dnd-html5-backend", "react-dom", "react-infinite", "react-intl", "react-redux", "react-resizable", "react-router", "react-tap-event-plugin", "redux", "redux-api-middleware", "redux-form", "redux-form-material-ui", "redux-logger", "redux-thunk", "scriptjs", "sockjs-client", "window-or-global"],
  },
  resolve: {
    // Automaticaly get extensions files from javascript code with import or require.
    // exemple require('main') look for main, main.js or main.sass with our configuration
    // extensions: ['', '.js', '.scss'],
    extensions: ['', '.js', '.jsx'],
    // Root directories from wich requires are made
    root: [
      path.join(__dirname),
    ],
    modulesDirectories: ['node_modules'],
  },
  output: {
    filename: '[name].bundle.js',
    path: 'build/',
    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: 'build/[name]-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]'
    }),
    // Remove the build folder before building
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: false,
      dry: false,
    }),
  ],
}
