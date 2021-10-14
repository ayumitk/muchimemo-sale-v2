module.exports = {
  images: {
    domains: [
      "m.media-amazon.com",
      "www.cmoa.jp",
      "img.papy.co.jp",
      "ebook-assets.dmm.com",
      "cmoa.akamaized.net",
      "muchimemo.com"
    ],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
