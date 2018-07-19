import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ProductItem from "components/ProductItem";
import PageStepper from "components/PageStepper";
import PageSizeSelector from "components/PageSizeSelector";
import SortBySelector from "components/SortBySelector";
import ProductGridEmptyMessage from "./ProductGridEmptyMessage";

const styles = (theme) => ({
  filters: {
    justifyContent: "flex-end",
    marginBottom: theme.spacing.unit * 2
  }
});

@withStyles(styles)
export default class ProductGrid extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    pageInfo: PropTypes.shape({
      startCursor: PropTypes.string,
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool,
      loadNextPage: PropTypes.func,
      loadPreviousPage: PropTypes.func
    }),
    pageSize: PropTypes.number.isRequired,
    setPageSize: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired
  };

  renderProduct = (edge) => {
    const { node: { product } } = edge;
    const { currencyCode } = this.props;
    const { _id } = product;
    const gridItemProps = {
      key: _id,
      xs: 12,
      sm: 4,
      md: 3
    };

    return (
      <Grid item {...gridItemProps}>
        <ProductItem product={product} currencyCode={currencyCode} />
      </Grid>
    );
  }

  renderFilters() {
    const { classes, pageSize, setPageSize, setSortBy, sortBy } = this.props;

    return (
      <Grid container spacing={8} className={classes.filters}>
        <Grid item>
          <PageSizeSelector pageSize={pageSize} onChange={setPageSize} />
        </Grid>
        <Grid item>
          <SortBySelector sortBy={sortBy} onChange={setSortBy} />
        </Grid>
      </Grid>
    );
  }

  render() {
    const { catalogItems, pageInfo } = this.props;

    if (!catalogItems || !catalogItems.length) return <ProductGridEmptyMessage />;

    return (
      <Fragment>
        {this.renderFilters()}
        <Grid container spacing={24}>
          {(catalogItems && catalogItems.length) ? catalogItems.map(this.renderProduct) : null}
        </Grid>

        { pageInfo && <PageStepper pageInfo={pageInfo} /> }
      </Fragment>
    );
  }
}
