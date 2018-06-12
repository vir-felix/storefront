import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import Head from "next/head";
import cookie from "cookie";
import rootMobxStores from "lib/stores";
import initApollo from "./initApollo";

/**
 * Parse browser cookies
 * @name parseCookies
 * @param {Object} req the request object
 * @param {Object} options options object
 * @returns {Object} returns the parsed cookies as an object
 */
function parseCookies(req, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
}

/**
 * Get the display name of a component
 * @name getComponentDisplayName
 * @param {React.Component} Component React component
 * @returns {String} Component display name
 */
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || "Unknown";
}

export default (App) =>
  class WithApolloClient extends React.Component {
    static displayName = `WithApolloClient(${getComponentDisplayName(App)})`;

    static propTypes = {
      apolloState: PropTypes.object.isRequired,
      router: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps) {
      const { pathname, query } = nextProps.router;

      // Update routing store with pathname and query after route change
      rootMobxStores.routingStore.updateRoute({ pathname, query });

      return null;
    }

    static async getInitialProps(ctx) {
      const { Component, router, ctx: { req, res, query, pathname } } = ctx;

      // Provide the `url` prop data in case a GraphQL query uses it
      rootMobxStores.routingStore.updateRoute({ query, pathname });

      const apollo = initApollo({}, () => parseCookies(req));

      ctx.ctx.apolloClient = apollo;

      let appProps = {};

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      // Run all graphql queries in the component tree
      // and extract the resulting data
      try {
        // Run all GraphQL queries
        await getDataFromTree( // eslint-disable-line
          <ApolloProvider client={apollo}>
            <App
              {...appProps}
              Component={Component}
              router={router}
            />
          </ApolloProvider>
        ); // eslint-disable-line
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        // eslint-disable-next-line no-console
        console.error("Error while running `getDataFromTree`", error);
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    constructor(props) {
      super(props);
      // `getDataFromTree` renders the component first, then the client is passed off as a property.
      // After that, rendering is done using Next's normal rendering pipeline
      this.apollo = initApollo(props.apolloState.data, parseCookies);

      // State must be initialized if getDerivedStateFromProps is used
      this.state = {};
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <App {...this.props} />
        </ApolloProvider>
      );
    }
  };
