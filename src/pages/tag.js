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

@withData
@withRoot
@withShop
@withCatalogItems
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
    const pageTitle = title[0].toUpperCase() + title.slice(1); // TODO: rethink capitalization of tag

    return (
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={shop && shop.description} />
      </Helmet>
    );
  }

  render() {
    const { catalogItems } = this.props;

    return (
      <Layout title="Reaction Shop">
        {this.renderHelmet()}
        <ProductGrid catalogItems={catalogItems} />
      </Layout>
    );
  }
}
