const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './index.tsx',
  output: {
      filename:'bundle.js',
      path: path.join(__dirname,'/dist')
  },
      devtool: "source-map",
  module:{
    rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                 test: /\.(jpg|png|svg)$/,
                 use: {
                     loader: 'file-loader'
                 }
             }
        ]
  },
  plugins:[

      new HtmlWebpackPlugin({
        filename: path.join(__dirname,'/dist/index.html'),
        template: path.join(__dirname,'/index.html')
      })

  ],
  resolve: {
    extensions: ['.ts', '.tsx','.js', '.json']
  },
  watch: true
}
