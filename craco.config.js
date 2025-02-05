module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        webpackConfig.output = {
          ...webpackConfig.output,
          filename: 'static/js/online-meeting-list.js', // Static filename for the main bundle
          chunkFilename: 'static/js/[name].chunk.js',  // Optional: handle additional chunks
        };
      }
      return webpackConfig;
    },
  },
};
