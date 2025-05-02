import { resolve as _resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import autoprefixer from "autoprefixer";
import Dotenv from "dotenv-webpack";
import fs from "fs";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const { DefinePlugin } = webpack;
const __dirname = "./";

export default (env = {}) => {
  const currentEnv = env.production ? "production" : "development";
  const dotenvPath = fs.existsSync(`./.env.${currentEnv}`)
    ? `./.env.${currentEnv}`
    : "./.env";
  return {
    mode: currentEnv,
    entry: "./src/main.tsx",
    output: {
      filename: "[name].js",
      chunkFilename: "[id].[chunkhash].js",
      sourceMapFilename: "[name].[hash:8].map",
      path: _resolve(__dirname, "build"),
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()],
        },
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new Dotenv({
        path: dotenvPath,
        safe: false, // doesn't require .env.example
        systemvars: true, // allows fallback to process.env
        allowEmptyValues: true,
      }),
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(currentEnv),
      }),
      new BundleAnalyzerPlugin(),
    ],
    devServer: {
      static: "./build",
      port: 3000,
      open: true,
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
