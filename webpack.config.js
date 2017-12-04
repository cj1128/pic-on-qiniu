var webpack = require("webpack")
var path = require("path")

module.exports = {
  entry: {
    app: path.join(__dirname, "entry.jsx"),
  },
  output: {
    path: path.join(__dirname, "chrome"),
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].chunk.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "chrome"),
    port: 7040,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === "production" ?
        false
        :
        true,
    }),
  ],
  resolve: {
    root: [
      __dirname,
      path.join(__dirname, "components"),
    ],
    extensions: ["", ".jsx", ".js", ".styl", ".css", ".json"],
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "style!css",
      },
      {
        test: /\.styl$/,
        loader: "style!css!stylus?paths[]=./",
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url?limit=10000&name=images/[path][name].[hash].[ext]",
      },
      {
        test: /\.(json)$/,
        loader: "json",
      },
    ],
  },
}
