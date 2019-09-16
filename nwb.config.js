/* eslint-disable no-param-reassign */

module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: false,
  },
  polyfill: false,
  babel: {
    plugins: 'babel-plugin-typescript-to-proptypes',
  },
  webpack: {
    config(config) {
      config.entry = {
        demo: ['./demo/src/index.tsx'],
      };
      config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
      config.module.rules.push({
        test: /\.tsx?$/,
        loader: 'ts-loader',
      });

      return config;
    },
  },
};
/* eslint-enable no-param-reassign */
