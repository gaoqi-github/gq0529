const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin"); //复制css文件

module.exports = {
  // entry: path.resolve(__dirname, "src/index.js"),//入口
  entry: "./src/index.js", //入口
  output: {
    path: path.resolve(__dirname, "dist"), //打包完成后的文件放在自动创建好的dist文件夹内
    filename: "bundle.js",
  },

  //配置loader
  module: {
    rules: [
      //打包js
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      //打包css  vue-style-loader是style-loader的增强版
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"], //先解析css，在创建style标签，吧css放进去
      },
      //打包图片，内部用到了file-loader
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, //如果图片小于8k这个值，会被base64编码为一个字符串，提高效率
              name: "[hash:8].[ext]", //图片名截取哈希值前8位
            },
          },
        ],
      },
      //配置loader处理vue文件
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },

  //配置插件，完成其他webpack搞不定的功能
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),
    new CleanWebpackPlugin(), //清除多余dist插件
    new VueLoaderPlugin(), //vue相关插件
    new CopyPlugin([
      //把public文件夹内的除html外的文件复制到dist内
      {
        from: path.resolve(__dirname, "src/public"),
        to: path.resolve(__dirname, "dist"),
        ignore: ["index.html"],
      },
    ]),
  ],

  //配置开发模式
  mode: "development",

  //配置自动打包
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000, //端口号
    open: true, //是否自动打开浏览器
    quiet: true, //输出少量提示信息
  },
  //定位出错的原始代码行
  devtool: "cheap-module-eval-source-map",
  //解决导入省略后缀
  resolve: {
    extensions: [".js", ".json", ".vue"],
  },
};
