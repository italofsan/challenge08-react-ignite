const { isPropertyAccessChain } = require('typescript');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isPropertyAccessChain.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})