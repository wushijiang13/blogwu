const path = require('path');
const configs = require('./config')
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

console.log("当前环境:"+process.env.NODE_ENV);
console.log("当前运行项目:"+process.env.PACK_NAME);

function resolve (dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    publicPath:'./',
    outputDir:process.env.PACK_NAME,//由于打包需要同名处理
    configureWebpack:{
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
            new CompressionPlugin({
                test:/\.js$|\.html$|.\css/, //匹配文件名
                threshold: 10240,//对超过10k的数据压缩
                deleteOriginalAssets: false //不删除源文件
            })
        ],
        resolve:{
            alias: {
                '@ant-design/icons/lib/dist$': path.resolve(__dirname,'./src/config/ant/icons.js')  // 自建的文件的相对路径
            }
        }
    },
    chainWebpack: config => {
        config.entry('app').clear().add(configs.entryUrl) //入口文件
        config.resolve.alias
            .set('@',path.join(__dirname, './src'))
            .set('@config',resolve('src/config'))
        if(process.env.NODE_ENV =='development'){
            //开发环境
        }else{
            config.plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, "./src/config/ant/theme.less")] // 引入全局样式变量
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    productionSourceMap:false,
    transpileDependencies: ['strip-ansi', 'ismobilejs'],
}