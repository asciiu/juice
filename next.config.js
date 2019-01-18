// https://github.com/zeit/next-plugins/tree/master/packages/next-css
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
module.exports = withCss(withLess())