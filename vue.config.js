const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        maxSize: 100000,
        minChunks: 1,
        automaticNameDelimiter: "~",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/
          }
        }
      }
    }
  }
};
