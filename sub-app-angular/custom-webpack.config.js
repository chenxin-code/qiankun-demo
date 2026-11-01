module.exports = {
  output: {
    library: 'sub-app-angular',
    libraryTarget: 'umd',
    chunkLoadingGlobal: 'webpackJsonp_sub_app_angular',
  },
  devServer: {
    port: 8084,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
