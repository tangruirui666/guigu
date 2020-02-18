const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  //针对antd实现按需打包，使用import来打包
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  //使用自定义主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1da57a" }
  })
);
