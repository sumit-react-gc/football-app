const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: ['bootstrap'],
  chainWebpack: config => {
    config.resolve.alias.set('bootstrap', 'bootstrap/dist/css/bootstrap.min.css');
  }
})
