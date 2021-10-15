const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const locales = new MomentLocalesPlugin({
  localesToKeep: ["ja"],
});
const MomentTimezoneDataPlugin = require("moment-timezone-data-webpack-plugin");
const currentYear = new Date().getFullYear();
const timezone = new MomentTimezoneDataPlugin({
  matchZones: "Asia/Tokyo",
  startYear: currentYear - 5,
  endYear: currentYear + 5,
});

module.exports = withBundleAnalyzer({
  webpack: (config) => {
    config.plugins.push(locales, timezone);
    return config;
  },
  images: {
    imageSizes: [128, 256],
    domains: [
      "m.media-amazon.com",
      "www.cmoa.jp",
      "img.papy.co.jp",
      "ebook-assets.dmm.com",
      "cmoa.akamaized.net",
      "muchimemo.com",
    ],
  },
});
