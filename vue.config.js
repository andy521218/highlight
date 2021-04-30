module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        // target:'http://59.110.218.110:8080/api',
        // target: 'http://192.168.16.70:8080/api',
        // target: 'http://101.132.150.87:8080/api',
        target: 'http://localserver:8006/api',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
  //   chainWebpack: config => {
  //     //解决iview 按需引入babel转换问题
  //    config.module
  //       .rule("view-design")  //  我目前用的是新版本的iview ,旧版本的iview，用iview代替view-design
  //       .test(/view-design.src.*?js$/)
  //       .use("babel")
  //       .loader("babel-loader")
  //       .end();
  //  }
}
