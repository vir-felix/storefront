import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Helmet from "react-helmet";

// PDP Components
import ProductDetailTitle from "components/ProductDetailTitle";
import ProductDetailInfo from "components/ProductDetailInfo";
import MediaGallery from "components/MediaGallery";

const styles = () => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1
  },
  pdpContainer: {
    maxWidth: 1440
  }
});

/**
 * Product detail component
 * @name ProductDetail
 * @param {Object} props Component props
 * @returns {React.Component} React component node that represents a product detail view
 */
@withStyles(styles, { withTheme: true })
class ProductDetail extends Component {
  static propTypes = {
    catalogProduct: PropTypes.object,
    classes: PropTypes.object,
    theme: PropTypes.object
  }

  render() {
    const { classes, theme, catalogProduct } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>{catalogProduct.title}</title>
          <meta name="description" content={catalogProduct.description} />
        </Helmet>
        <Grid container className={classes.pdpContainer} spacing={theme.spacing.unit * 3}>
          <Grid item xs={12} sm={6}>
            <MediaGallery mediaItems={catalogProduct.media} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ProductDetailTitle
              pageTitle={catalogProduct.pageTitle}
              title={catalogProduct.title}
            />
            <ProductDetailInfo
              priceRange={catalogProduct.price.range}
              description={catalogProduct.description}
              vendor={catalogProduct.vendor}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProductDetail;
