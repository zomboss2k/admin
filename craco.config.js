// eslint-disable-next-line
const CracoLessPlugin = require('craco-less');
// eslint-disable-next-line
require('dotenv/config');
// eslint-disable-next-line
const cracoBabelLoader = require('craco-babel-loader');
// const BabelRcPlugin = require('@jackwilsdon/craco-use-babelrc');
// eslint-disable-next-line
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: {
        ...cracoBabelLoader,
        overrideWebpackConfig(e) {
          const webpack = cracoBabelLoader.overrideWebpackConfig(e);
          webpack.module.rules.push({
            test: /\.worker\.js$/,
            use: {
              loader: 'worker-loader',
            },
          });
          return webpack;
        },
      },
      options: {},
    },
  ],
};
