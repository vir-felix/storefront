import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import Helmet from "react-helmet";
import { inject, observer } from "mobx-react";

import ProductItem from "components/ProductItem";

// TODO: get real products from server
import { tempProducts } from "./tempProducts";

@inject("shop")
@observer
class ProductGrid extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object)
  };

  renderHelmet() {
    const { shop } = this.props;

    // If we are on the default Product Grid, use default shop info
    return (
      <Helmet>
        <title>{shop.name}</title>
        <meta name="description" content={shop.description} />
      </Helmet>
    );
  }

  renderProduct(edge) {
    const { node: { product, positions } } = edge;
    const weight = (positions.length) ? positions[0].displayWeight : 0;
    const { _id } = product;

    const gridItemSize = {
      0: {
        xs: 12,
        sm: 4,
        md: 3
      },
      1: {
        xs: 12,
        sm: 8,
        md: 6
      },
      2: {
        xs: 12,
        sm: 12,
        md: 9
      }
    };
    const gridItemProps = {
      key: _id,
      ...gridItemSize[weight]
    };
    return (
      <Grid item {...gridItemProps}>
        <ProductItem product={product} />
      </Grid>
    );
  }

  render() {
    const { catalogItems } = this.props;

    return (
      <section>
        {this.renderHelmet()}
        <Grid container spacing={24}>
          {(catalogItems && catalogItems.length) ? catalogItems.map(this.renderProduct) : null }
        </Grid>
      </section>
    );
  }
}

export default ProductGrid;
