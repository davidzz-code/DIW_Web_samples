const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
   mode: "development",

   entry: "./src/js/main.js",

   devServer: {
      static: './dist',
   },

   plugins: [
      new CopyPlugin({
         patterns: [
            { from: "src/img", to: "img" },
         ],
      }),

      new HTMLWebpackPlugin({
         template: 'src/index.html'
      })
   ],

   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
      clean: true
   },


   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
         },
         
         //  No es necesario este código para imágenes ya que el html las está importando
         // Tampoco es necesario para las tipos ya que las está importando el css
         // {
         //    test: /\.(png|svg|jpg|jpeg|gif)$/i,
         //    type: "asset/resource",
         // },
         // {
         //    test: /\.(woff|woff2|eot|ttf|otf)$/i,
         //    type: "asset/resource",
         // },
      ],
   },
};
