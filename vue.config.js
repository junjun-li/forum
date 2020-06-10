const path = require(`path`);
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // eslint校验
  lintOnSave: false,
  // 生产环境 sourceMap
  productionSourceMap: false,
  devServer: {
    port: 19265,
    open: true,
    // 让浏览器 overlay 同时显示警告和错误：
    // overlay: {
    //   warnings: true,
    //   errors: true
    // }
    disableHostCheck: true
  }
};
