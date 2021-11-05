const path = require('path')

console.log(__dirname);

function resolve (dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@',path.join(__dirname, './src'))
            .set('@config',resolve('src/config'))
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, "./src/config/css/theme.less")] // 引入全局样式变量
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}