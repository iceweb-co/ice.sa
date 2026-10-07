const withBundleAnalyzer =
  process.env.NODE_ENV === "development"
    ? require("@next/bundle-analyzer")({
        enabled: process.env.ANALYZE === "true",
      })
    : (config) => config;

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ["ar-SA", "en"],
    defaultLocale: "ar-SA",
    localeDetection: false,
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/admin",
        destination: `https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries`,
        permanent: false,
      },
      {
        source: "/edge",
        destination: `https://app.netlify.com/sites/www-ice`,
        permanent: false,
      },
    ];
  },
});
