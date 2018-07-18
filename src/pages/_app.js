import NextApp, { Container } from "next/app";
import React from "react";
import track from "lib/tracking/track";
import dispatch from "lib/tracking/dispatch";
import withApolloClient from "lib/apollo/withApolloClient";
import withTheme from "lib/theme/withTheme";
import withShop from "containers/shop/withShop";
import withTags from "containers/tags/withTags";
import Layout from "components/Layout";
import withMobX from "lib/stores/withMobX";
import rootMobXStores from "lib/stores";

@withApolloClient
@withShop
@withTags
@withMobX
@withTheme
@track({}, { dispatch })
export default class App extends NextApp {
  componentDidMount() {
    // Fetch and update auth token in auth store
    rootMobXStores.authStore.setTokenFromLocalStorage();
    rootMobXStores.cartStore.setAnonymousCartCredentialsFromLocalStorage();
    rootMobXStores.keycloakAuthStore.setTokenFromLocalStorage();
  }

  render() {
    const { Component, ...rest } = this.props;

    return (
      <Container>
        <Layout>
          <Component {...rest} />
        </Layout>
      </Container>
    );
  }
}
