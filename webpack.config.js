const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

//const webpack = require('webpack');

module.exports = (config, options) => {
  // config.plugins.push(
  //   new MergeJsonWebpackPlugin({
  //     output: {
  //       groupBy: [
  //         {
  //           pattern: './src/i18n/en-US/*.json',
  //           fileName: 'assets/i18n/en-US.json',
  //         },
  //         {
  //           pattern: './src/i18n/ru-RU/*.json',
  //           fileName: 'assets/i18n/ru-RU.json',
  //         },
  //       ],
  //     },
  //   }),
  // );

  return config;
};
