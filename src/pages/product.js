import React, { Component } from "react";
import PropTypes from "prop-types";
import withCatalogItemProduct from "containers/catalog/withCatalogItemProduct";
import ProductDetail from "components/ProductDetail";
import trackProductViewed from "lib/tracking/trackProductViewed";

@withCatalogItemProduct
@trackProductViewed({ dispatchOnMount: true })
class ProductDetailPage extends Component {
  static propTypes = {
    /**
     * Catalog Product item
     */
    product: PropTypes.object.isRequired,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    })
  }

  render() {
    const currencyCode = this.props.shop.currency.code || "USD";

    return (
      <ProductDetail product={this.props.product} currencyCode={currencyCode} />
    );
  }
}

export default ProductDetailPage;
