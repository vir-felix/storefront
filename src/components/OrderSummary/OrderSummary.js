import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import styled from "styled-components";

// Use styled components to adjust the styling of the
// cart summary component to fit inside a bordered box
const OrderSummaryContainer = styled.div`
  table td {
    padding-left: 1rem;
    padding-right: 1rem;
    border-bottom: none;
  }
`;

const styles = (theme) => ({
  summary: {
    border: theme.palette.borders.default
  },
  header: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  title: {
    flex: "1 0 auto"
  },
  paymentMethod: {
    flex: "2 0 auto"
  }
});

@withStyles(styles)
class OrderSummary extends Component {
  static propTypes = {
    classes: PropTypes.object,
    order: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  }

  renderSummary() {
    const { order: cart } = this.props;

    if (cart && cart.checkout && cart.checkout.summary) {
      const {
        fulfillmentTotal,
        itemTotal,
        total
      } = cart.checkout.summary;

      return (
        <OrderSummaryContainer>
          <CartSummary
            isDense
            displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
            displaySubtotal={itemTotal && itemTotal.displayAmount}
            displayTotal={total && total.displayAmount}
            itemsQuantity={cart.totalItemQuantity}
          />
        </OrderSummaryContainer>
      );
    }

    return null;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.summary}>
        <div className={classes.header}>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Typography variant="subheading">{"Payment Method"}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">{"Visa ending in 1111"}</Typography>
            </Grid>
          </Grid>
        </div>
        <Divider />
        {this.renderSummary()}
      </div>
    );
  }
}

export default OrderSummary;
