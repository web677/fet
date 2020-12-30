const path = require('path')

module.exports = {
    lintOnSave: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('@public', path.join(__dirname, './publiic/'))
            .set('@assets', path.join(__dirname, './src/assets/'))
    },
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? 'https://static2.51fanli.net/mobile/personas/' : '/',
}
