/**
 * @file main.js
 * @author mengke01
 * @date
 * @description
 * ttf模块的导出函数
 */

module.exports = {
    TTF: require('./lib/ttf/ttf'),
    TTFReader: require('./lib/ttf/ttfreader'),
    TTFWriter: require('./lib/ttf/ttfwriter'),
    ttf2eot: require('./lib/ttf/ttf2eot'),
    eot2ttf: require('./lib/ttf/eot2ttf'),
    ttf2woff: require('./lib/ttf/ttf2woff'),
    woff2ttf: require('./lib/ttf/woff2ttf'),
    ttf2svg: require('./lib/ttf/ttf2svg'),
    svg2ttfobject: require('./lib/ttf/svg2ttfobject'),
    Reader: require('./lib/ttf/reader'),
    Writer: require('./lib/ttf/writer'),
    OTFReader: require('./lib/ttf/otfreader'),
    otf2ttfobject: require('./lib/ttf/otf2ttfobject')
};
