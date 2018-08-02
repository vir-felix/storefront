import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MiniCartComponent from "@reactioncommerce/components/MiniCart/v1";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "mdi-material-ui/Cart";
import { Router } from "routes";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";

const components = {
  // TODO: Use QuantityInput component when MUI dependency is removed.
  QuantityInput: "div"
};

const checkout = {
  summary: {
    itemTotal: {
      displayAmount: "$25.00"
    },
    taxTotal: {
      displayAmount: "$2.50"
    }
  }
};

const items = [
  {
    _id: "123",
    attributes: [{ label: "Color", value: "Red" }, { label: "Size", value: "Medium" }],
    compareAtPrice: {
      displayAmount: "$45.00"
    },
    currentQuantity: 3,
    imageURLs: {
      small: "//placehold.it/100",
      thumbnail: "//placehold.it/100"
    },
    isLowQuantity: true,
    price: {
      displayAmount: "$20.00"
    },
    productSlug: "/product-slug",
    productVendor: "Patagonia",
    title: "Undefeated",
    quantity: 2
  },
  {
    _id: "456",
    attributes: [{ label: "Color", value: "Black" }, { label: "Size", value: "10" }],
    currentQuantity: 500,
    imageURLs: {
      small: "//placehold.it/100",
      thumbnail: "//placehold.it/100"
    },
    isLowQuantity: false,
    price: {
      displayAmount: "$78.00"
    },
    productSlug: "/product-slug",
    productVendor: "Patagonia",
    title: "Ticket to Anywhere",
    quantity: 1
  }];

const styles = ({ palette, zIndex }) => ({
  popper: {
    marginTop: "0.5rem",
    marginRight: "1rem",
    zIndex: zIndex.modal
  },
  cart: {
    backgroundColor: palette.common.white
  }
});

const closePopper = {
  anchorElement: null,
  open: false
};

@withStyles(styles, { withTheme: true })
export default class MiniCart extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = {
    open: false,
    anchorElement: null,
    enteredPopper: false
  };

  handlePopperOpen = (event) => {
    const { currentTarget } = event;
    this.setState({
      anchorElement: currentTarget,
      open: true
    });
  }

  handlePopperClose = () => {
    const { enteredPopper } = this.state;

    setTimeout(() => {
      if (!enteredPopper) {
        this.setState(closePopper);
      }
    }, 500);
  }

  handleEnterPopper = () => {
    this.setState({ enteredPopper: true });
  }

  handleLeavePopper = () => {
    this.setState(closePopper);
  }

  handleClickAway = () => {
    this.setState(closePopper);
  }

  handleOnClick = () => {
    this.setState(closePopper, () => Router.pushRoute("cart"));
  }

  render() {
    const { classes } = this.props;
    const { anchorElement, open } = this.state;
    const id = open ? "simple-popper" : null;

    return (
      <Fragment>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <IconButton color="inherit"
            onMouseEnter={this.handlePopperOpen}
            onMouseLeave={this.handlePopperClose}
            onClick={this.handleOnClick}
          >
            <CartIcon />
          </IconButton>
        </ClickAwayListener>

        <Popper
          className={classes.popper}
          id={id}
          open={open}
          anchorEl={anchorElement}
          transition
          onMouseEnter={this.handleEnterPopper}
          onMouseLeave={this.handleLeavePopper}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <div className={classes.cart}>
                <MiniCartComponent cart={{ checkout, items }} components={components} />
              </div>
            </Fade>
          )}
        </Popper>
      </Fragment>
    );
  }
}
