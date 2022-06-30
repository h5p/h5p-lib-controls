const path = require('path');
const libraryName = process.env.npm_package_name;
const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = (nodeEnv !== 'production');

const config = {
  mode: nodeEnv,
  context: path.resolve(__dirname, 'src'),
  entry: "./entries/dist.js",
  devtool: isDev ? 'inline-source-map' : undefined,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${libraryName}.js`,
    sourceMapFilename: '[file].map'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  stats: {
    colors: true
  }
};

module.exports = config;