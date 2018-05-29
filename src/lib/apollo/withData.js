import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import Head from "next/head";
import jsHttpCookie from "cookie";
import rootMobxStores from "lib/stores";
import initApolloServer from "./initApolloServer";
import initApolloBrowser from "./initApolloBrowser";

/**
 * Get the display name of a component
 * @name getComponentDisplayName
 * @param {React.Component} Component Reactio component
 * @returns {String} Component display name
 */
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || "Unknown";
}

export default (ComposedComponent) =>
  class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`;
    static propTypes = {
      serverState: PropTypes.object.isRequired,
      url: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps) {
      const { url: { pathname, query } } = nextProps;

      // Update routing store with pathname and query after route change
      rootMobxStores.routingStore.updateRoute({ pathname, query });
    }


    static async getInitialProps(ctx) {
      let serverState = {
        apollo: {
          data: {}
        }
      };

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const { req } = ctx;
        let token;

        // Grab cookies form the request headers
        if (req && req.headers) {
          const cookies = req.headers.cookie;

          if (typeof cookies === "string") {
            ({ token } = jsHttpCookie.parse(cookies));
          }

          if (typeof token !== "string" || token.length === 0) token = undefined;
        }

        // Provide the `url` prop data in case a GraphQL query uses it
        const url = { query: ctx.query, pathname: ctx.pathname };

        rootMobxStores.routingStore.updateRoute(url);

        const apollo = initApolloServer(undefined, { token });
        try {
          // Run all GraphQL queries
          await getDataFromTree( // eslint-disable-line
            <ApolloProvider client={apollo}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          ); // eslint-disable-line
        } catch (error) {
          // TODO: handle the error
          console.log("apollo client error", error); // eslint-disable-line
        }
        Head.rewind();
        serverState = {
          token,
          apollo: {
            data: apollo.cache.extract()
          }
        };
      }

      return {
        serverState,
        ...composedInitialProps
      };
    }

    constructor(props) {
      super(props);
      this.state = {};
      const { apollo, token } = this.props.serverState;

      this.apollo = initApolloBrowser(apollo.data, { token });

      rootMobxStores.routingStore.updateRoute(props.url);
    }

    static getDerivedStateFromProps(nextProps) {
      rootMobxStores.routingStore.updateRoute(nextProps.url);

      return null;
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
