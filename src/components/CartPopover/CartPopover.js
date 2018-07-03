import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CartCheckoutButton from "@reactioncommerce/components/CartCheckoutButton/v1";
import Button from "@reactioncommerce/components/Button/v1";
import Link from "components/Link";

// import ButtonBase from "@material-ui/core/ButtonBase";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
// import Minus from "mdi-material-ui/Minus";
// import Plus from "mdi-material-ui/Plus";
// import { inject, observer } from "mobx-react";
// import Divider from "components/Divider";


const styles = (theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#ff0000"
  },
  addedToCartItemQuantity: {
    color: theme.palette.primary.dark,
    display: "inline",
    fontWeight: 600,
    marginRight: "7px"
  },
  addedToCartItemName: {
    color: theme.palette.primary.dark,
    display: "inline",
    fontWeight: 600,
    marginRight: "7px"
  },
  addedToCartText: {
    color: theme.palette.primary.dark,
    display: "inline",
    fontWeight: 100
  }
});

const cartItem = {
  _id: "abcdefghijklmnop",
  attributes: [
    {
      label: "Color",
      value: "Red"
    },
    {
      label: "Season",
      value: "Summer"
    }
  ],
  currentQuantity: 10,
  imageUrl: "http://localhost:3000/assets/files/Media/nbYKLrZST5DSF87md/thumbnail/chuttersnap-265339-unsplash.png",
  isLowInventoryQuantity: false,
  price: {
    compareAtPrice: "19.99",
    displayPrice: "18.99"
  },
  productSlug: "product-slug",
  title: "Item Title",
  quantity: 10
};

@withStyles(styles, { withTheme: true })
class CartPopover extends Component {
  static propTypes = {
    /**
     * CartItem data
     */
    cartItem: PropTypes.shape({
      /**
       * The cart item ID
       */
      _id: PropTypes.string,
      /**
       * Array of additional attributes of the chosen item.
       */
      attributes: PropTypes.arrayOf(PropTypes.shape({
        /**
           * Attribute label (i.e. "Color").
           */
        label: PropTypes.string,
        /**
           *  Attribute value (i.e. "Red").
           */
        value: PropTypes.string
      })),
      /**
       * Current stock quantity of item
       */
      currentQuantity: PropTypes.number,
      /**
       * Image url of chosen item
       */
      imageUrl: PropTypes.string,
      /**
       * Is the chosen item have a low quantity
       */
      isLowInventoryQuantity: PropTypes.bool,
      /**
       * Price object of chosen item
       */
      price: PropTypes.shape({
        /**
         * Chosen items compare at price
         */
        compareAtPrice: PropTypes.string,
        /**
         * Chosen items display price
         */
        displayPrice: PropTypes.string
      }),
      /**
       * Chosen items slug
       */
      productSlug: PropTypes.string,
      /**
       * Chosen items title
       */
      title: PropTypes.string,
      /**
       * Quantity of chosen item in cart
       */
      quantity: PropTypes.number
    }).isRequired,
    classes: PropTypes.object,
    theme: PropTypes.object
  }




  handleOnClick = () => {
    console.log("go to checkout");
  }

  render() {
    // When cartItem is available as a prop, we will pass it in. For now, we are using a static object.
    // const { cartItem, classes: { addToCartButton, container, breadcrumbLink } } = this.props;
    const { classes: { addedToCartItemName, addedToCartItemQuantity, addedToCartText, container }, theme } = this.props;


    return (
      <div className={container}>
        <Grid container className={container} spacing={theme.spacing.unit * 3}>
          <Grid item xs={12}>
            <img src={cartItem.imageUrl} alt={cartItem.title} />
            <Typography className={addedToCartItemQuantity} component="span">
              {cartItem.quantity}
            </Typography>
            <Typography className={addedToCartItemName} component="span">
              "{cartItem.title}"
            </Typography>
            <Typography className={addedToCartText} component="span">
              added to cart
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CartCheckoutButton
              components={{ Button }}
              isDisabled={false}
              onClick={this.handleOnClick}
            />
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default CartPopover;
