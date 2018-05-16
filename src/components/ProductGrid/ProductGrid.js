import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import ProductItem from "components/ProductItem";
import PageStepper from "components/PageStepper";

const styles = () => ({
  productGridContainer: {
    maxWidth: "1440px",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

@withStyles(styles)
export default class ProductGrid extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    pageInfo: PropTypes.shape({
      startCursor: PropTypes.string,
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool,
      loadNextPage: PropTypes.func,
      loadPreviousPage: PropTypes.func
    })
  };

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
    const { catalogItems, classes, pageInfo } = this.props;

    if (!catalogItems) return null;

    return (
      <section className={classes.productGridContainer}>
        <Grid container spacing={24}>
          {(catalogItems && catalogItems.length) ? catalogItems.map(this.renderProduct) : null}
        </Grid>

        { pageInfo && <PageStepper pageInfo={pageInfo} /> }
      </section>
    );
  }
}
