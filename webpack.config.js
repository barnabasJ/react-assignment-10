var path = require('path')

module.exports = {
  // eslint-disable-line no-undef
  entry: "./src/index.tsx",
  module: {
    rules: [
    { 
      test: /\.tsx?$/, 
      use: [{
          loader: "babel-loader" 
        },
        {
          loader: "ts-loader"
        }
      ],
    }
  ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  }
};
