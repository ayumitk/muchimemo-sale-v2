module.exports = {
  siteUrl: "https://sale.muchimemo.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: "/admin/" }],
  },
  sitemapSize: 7000,
  exclude: ["/admin/*"],
};
