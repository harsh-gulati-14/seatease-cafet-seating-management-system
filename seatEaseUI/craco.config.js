const {getLoaders, loaderByName, throwUnexpectedConfigError} = require('@craco/craco');

const throwError = message =>
  throwUnexpectedConfigError({
    packageName: 'craco',
    githubRepo: 'gsoft-inc/craco',
    message,
    githubIssueQuery: 'webpack',
  });

module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    configure: (webpackConfig) => {
      // Improve vendor chunk names in development: https://github.com/facebook/create-react-app/pull/9569
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      webpackConfig.optimization.splitChunks.name = true;

      const {hasFoundAny, matches} = getLoaders(webpackConfig, loaderByName('file-loader'));
      if (!hasFoundAny) throwError('failed to find file-loader');

      const [fileLoader] = matches;
      // Fix for issue where static/media directory is captialized static/MEDIA randomly
      fileLoader.loader.options.name = 'media/[name].[hash:8].[ext]';
      return webpackConfig;
    }
  }
};
