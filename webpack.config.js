const path = require('path');

const config = {
  entry: "./src/entries/dist.js",
  devtool: 'inline-source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: "h5p-sdk-controls.js",
    sourceMapFilename: '[file].map'
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules/h5p-sdk/src/scripts')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  }
};

module.exports = config;