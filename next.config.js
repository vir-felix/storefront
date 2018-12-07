const appConfig = require("./src/config");

const initExport = {
  /**
   * `serverRuntimeConfig` is available in browser code, ONLY when run on the server
   * @example
   * import getConfig from "next/config";
   * const { serverRuntimeConfig } = getConfig();
   */
  serverRuntimeConfig: {
    graphqlUrl: appConfig.INTERNAL_GRAPHQL_URL
  },
  /**
   * `publicRuntimeConfig` is available in browser code, even when run on the server
   * @example
   * import getConfig from "next/config";
   * const { publicRuntimeConfig } = getConfig();
   */
  publicRuntimeConfig: {
    canonicalUrl: appConfig.CANONICAL_URL,
    graphqlUrl: appConfig.EXTERNAL_GRAPHQL_URL,
    segmentAnalytics: {
      skipMinimize: appConfig.SEGMENT_ANALYTICS_SKIP_MINIMIZE,
      writeKey: appConfig.SEGMENT_ANALYTICS_WRITE_KEY
    },
    stripePublicApiKey: appConfig.STRIPE_PUBLIC_API_KEY,
    enableSPARouting: appConfig.ENABLE_SPA_ROUTING
  },
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.(gql|graphql)$/,
      loader: "graphql-tag/loader",
      exclude: ["/node_modules/", "/.next/"],
      enforce: "pre"
    });

    return webpackConfig;
  }
};

/* eslint-enable global-require */
module.exports = initExport;
