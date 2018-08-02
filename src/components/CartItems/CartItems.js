import React, { Component } from "react";
import PropTypes from "prop-types";
import CartItemsList from "@reactioncommerce/components/CartItems/v1";

const components = {
  // TODO: Use QuantityInput component when MUI dependency is removed.
  QuantityInput: "div"
};

export default class CartItems extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      attributes: PropTypes.arrayOf(PropTypes.object),
      currencyQuantity: PropTypes.number,
      imageUrl: PropTypes.string,
      isLowInventoryQuantity: PropTypes.bool,
      price: PropTypes.shape({
        displayPrice: PropTypes.string,
        compareAtPrice: PropTypes.string
      }),
      productSlug: PropTypes.string,
      title: PropTypes.string,
      quantity: PropTypes.number
    })).isRequired,
    onChangeCartItemQuantity: PropTypes.func.isRequired,
    onRemoveItemFromCart: PropTypes.func.isRequired
  }

  handleItemQuantityChange = (quantity) => {
    const { onChangeCartItemQuantity } = this.props;

    onChangeCartItemQuantity(quantity);
  }

  handleRemoveItem = (_id) => {
    const { onRemoveItemFromCart } = this.props;

    onRemoveItemFromCart(_id);
  }

  render() {
    const { items } = this.props;

    return (
      <CartItemsList
        items={items}
        components={components}
        onChangeCartItemQuantity={this.handleItemQuantityChange}
        onRemoveItemFromCart={this.handleRemoveItem}
      />
    );
  }
}

