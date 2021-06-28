const path = require('path')

module.exports = {
    lintOnSave: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('@assets', path.join(__dirname, './src/assets/'))
    },
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? 'https://static2.51fanli.net/mobile/personas/' : './',
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "Fet",
                appId: "fet.imaopao.cn",
                dmg: {
                    "icon": "build/icon/icon.ico.png"
                },
                mac: {
                    "icon": "build/icon/icon.ico.png"
                },
                win: {
                    "icon": "build/icon/icon.ico.png"
                }
            }
        }
    }
}
