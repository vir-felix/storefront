import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckoutActions from "@reactioncommerce/components/CheckoutActions/v1";
import CheckoutEmailAddress from "@reactioncommerce/components/CheckoutEmailAddress/v1";
import CheckoutTopHat from "@reactioncommerce/components/CheckoutTopHat/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import StripePaymentCheckoutAction from "@reactioncommerce/components/StripePaymentCheckoutAction/v1";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import CartIcon from "mdi-material-ui/Cart";
import LockIcon from "mdi-material-ui/Lock";
import withCart from "containers/cart/withCart";
import Link from "components/Link";
import CheckoutSummary from "components/CheckoutSummary";

const styles = (theme) => ({
  checkoutActions: {
    width: "100%",
    maxWidth: "600px",
    alignSelf: "flex-end",
    [theme.breakpoints.up("md")]: {
      paddingRight: "2rem"
    }
  },
  cartSummary: {
    maxWidth: "400px",
    alignSelf: "flex-start",
    [theme.breakpoints.up("md")]: {
      paddingRight: "2rem"
    }
  },
  checkoutContent: {
    flex: "1",
    maxWidth: theme.layout.mainContentMaxWidth,
    padding: "1rem"
  },
  checkoutContentContainer: {
    display: "flex",
    justifyContent: "center"
  },
  checkoutTitleContainer: {
    alignSelf: "flex-end",
    width: "8rem",
    [theme.breakpoints.up("md")]: {
      width: "10rem"
    }
  },
  checkoutTitle: {
    fontSize: "1.125rem",
    color: theme.palette.reaction.black35,
    display: "inline",
    marginLeft: "0.3rem"
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column"
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem"
  },
  logo: {
    color: theme.palette.reaction.reactionBlue,
    marginRight: theme.spacing.unit,
    borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
  }
});

const fulfillmentGroups = [{
  _id: 1,
  type: "shipping",
  data: {
    shippingAddress: null
  }
}];

const paymentMethods = [{
  _id: 1,
  name: "reactionstripe",
  data: {
    billingAddress: null,
    displayName: null
  }
}];

/**
 * Determines if a shipping method has been set for the "Shipping Information"
 * checkout action. The return value of either complete or incomplete will
 * be used to render status of the checkout action.
 *
 * @returns {String} complete or incomplete
 */
function getShippingStatus() {
  const groupWithoutAddress = fulfillmentGroups.find((group) => {
    const shippingGroup = group.type === "shipping";
    return shippingGroup && !group.data.shippingAddress;
  });

  return (groupWithoutAddress) ? "incomplete" : "complete";
}

/**
 * Determines if a payment method has been set for the "Payment Information"
 * checkout action. The return value of either complete or incomplete will
 * be used to render status of the checkout action.
 *
 * @returns {String} complete or incomplete
 */
function getPaymentStatus() {
  const paymentWithoutData = paymentMethods.find((payment) => !payment.data.displayName);

  return (paymentWithoutData) ? "incomplete" : "complete";
}

@withCart
@observer
@withStyles(styles, { withTheme: true })
class Checkout extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      account: PropTypes.object,
      checkout: PropTypes.object,
      email: PropTypes.string,
      items: PropTypes.array
    }),
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    theme: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps({ cart }) {
    if (cart && cart.account === null && !cart.email) Router.pushRoute("login", "", { customProp: "please next" });
    return null;
  }

  state = {}

  setShippingAddress = (data) =>
    // eslint-disable-next-line promise/avoid-new
    new Promise((resolve) => {
      setTimeout(() => {
        fulfillmentGroups[0].data.shippingAddress = data;
        // TODO: this.forceUpdate() will be removed once state is tracked by MobX
        this.forceUpdate();
        resolve(data);
      }, 1000, { data });
    })


  setPaymentMethod = (data) => {
    const { billingAddress, token: { card } } = data;
    const payment = {
      billingAddress,
      displayName: `${card.brand} ending in ${card.last4}`
    };

    // eslint-disable-next-line promise/avoid-new
    return new Promise((resolve) => {
      setTimeout(() => {
        paymentMethods[0].data = payment;
        // TODO: this.forceUpdate() will be removed once state is tracked by MobX
        this.forceUpdate();
        resolve(payment);
      }, 1000, { payment });
    });
  }

  renderCheckout() {
    const {
      classes,
      cart,
      hasMoreCartItems,
      loadMoreCartItems,
      onRemoveCartItems,
      onChangeCartItemsQuantity
    } = this.props;

    if (!cart) return null;

    const actions = [
      {
        label: "Shipping Information",
        status: getShippingStatus(),
        component: ShippingAddressCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          fulfillmentGroup: fulfillmentGroups[0]
        }
      },
      {
        label: "Payment Information",
        status: getPaymentStatus(),
        component: StripePaymentCheckoutAction,
        onSubmit: this.setPaymentMethod,
        props: {
          payment: paymentMethods[0]
        }
      }
    ];

    const hasAccount = !!cart.account;
    const displayEmail = hasAccount ? cart.account.emailRecords[0].address : cart.email;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={7}>
          <div className={classes.flexContainer}>
            <div className={classes.checkoutActions}>
              {
                displayEmail ?
                  <CheckoutEmailAddress emailAddress={displayEmail} isAccountEmail={hasAccount} />
                  : null
              }
              <CheckoutActions actions={actions} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className={classes.flexContainer}>
            <div className={classes.cartSummary}>
              <CheckoutSummary
                cart={cart}
                hasMoreCartItems={hasMoreCartItems}
                onRemoveCartItems={onRemoveCartItems}
                onChangeCartItemsQuantity={onChangeCartItemsQuantity}
                onLoadMoreCartItems={loadMoreCartItems}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes, shop, theme } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{shop && shop.name} | Checkout</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <CheckoutTopHat checkoutMessage="Free Shipping + Free Returns" />
        <section className={classes.checkoutContentContainer}>
          <div className={classes.checkoutContent}>
            <div className={classes.headerContainer}>
              <Link route="home">
                <div className={classes.logo}>
                  <ShopLogo shopName={shop.name} />
                </div>
              </Link>
              <div className={classes.checkoutTitleContainer}>
                <LockIcon
                  style={{
                    fontSize: 14,
                    color: theme.palette.reaction.black35
                  }}
                />
                <Typography className={classes.checkoutTitle}>Checkout</Typography>
              </div>
              <Link route="cart">
                <CartIcon />
              </Link>
            </div>
            {this.renderCheckout()}
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Checkout;
