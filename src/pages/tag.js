import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import withData from "lib/apollo/withData";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import ProductGrid from "components/ProductGrid";
import { FacebookSocial, TwitterSocial } from "components/Social";

@withData
@withShop
@withCatalogItems
@withRoot
@inject("shop")
@inject("routingStore")
@inject("uiStore")
@observer
export default class TagShop extends Component {
  static propTypes = {
    catalogItems: PropTypes.array.isRequired,
    routingStore: PropTypes.object,
    shop: PropTypes.object
  };

  renderHelmet() {
    const { shop, routingStore } = this.props;
    const title = routingStore.query.slug || shop.name;
    const pageTitle = title[0].toUpperCase() + title.slice(1);

    return (
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={shop.description} />
      </Helmet>
    );
  }

  render() {
    const { shop } = this.props;
    const meta = {
      description: shop.description,
      siteName: shop.name,
      title: shop.name
    }

    return (
      <Layout title="Reaction Shop">
        {this.renderHelmet()}
        <FacebookSocial settings={meta} />
        <TwitterSocial settings={meta} />
        <ProductGrid catalogItems={this.props.catalogItems} />
      </Layout>
    );
  }
}
