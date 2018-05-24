import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import ButtonBase from "material-ui/ButtonBase";
import Grid from "material-ui/Grid";
import InputAdornment from "material-ui/Input/InputAdornment";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Minus from "mdi-material-ui/Minus";
import Plus from "mdi-material-ui/Plus";
import { inject, observer } from "mobx-react";
import Divider from "components/Divider";

const styles = (theme) => ({
  addToCartButton: {
    "padding": theme.spacing.unit,
    "backgroundColor": theme.palette.primary.light,
    "borderRadius": theme.palette.reaction.buttonBorderRadius,
    "minWidth": "66%",
    "&:hover": {
      borderColor: theme.palette.reaction.activeElementBorderColor
    },
    "&:focus": {
      outline: "auto 5px -webkit-focus-ring-color"
    }
  },
  addToCartText: {
    color: theme.palette.primary.contrastText,
    fontWeight: 600
  },
  incrementButton: {
    backgroundColor: theme.palette.reaction.black02,
    color: theme.palette.reaction.coolGray500,
    fontSize: "12px",
    padding: 6
  },
  quantityContainer: {
    padding: 0,
    border: `1px solid ${theme.palette.reaction.black15}`,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.palette.reaction.buttonBorderRadius
  },
  quantityGrid: {
    marginBottom: theme.spacing.unit * 3
  },
  quantityInput: {
    "color": theme.palette.reaction.coolGray500,
    "fontSize": "12px",
    "width": "40px",
    "textAlign": "center",
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    },
    "borderLeft": `1px solid ${theme.palette.reaction.black15}`,
    "borderRight": `1px solid ${theme.palette.reaction.black15}`
  },
  quantityTypography: {
    color: theme.palette.reaction.coolGray500,
    marginBottom: theme.spacing.unit * 2
  }
});


@withStyles(styles)
@inject("uiStore")
@observer
export default class ProductDetailAddToCart extends Component {
  static propTypes = {
    classes: PropTypes.object,
    variantId: PropTypes.string
  };

  static defaultProps = {
    classes: {}
  };

  state = {
    addToCartQuantity: 1
  };

  handleOnClick = () => {
    // This function currently does nothing. When our GraphQL endpoints are available, we'll use them to add the items to the cart.
    // To test that this is working, uncomment the following lines and check to see that the data is correct

    // const { variantId } = this.props;
    // const { addToCartQuantity } = this.state;

    // console.log("ID to add to cart: ", variantId);
    // console.log("Quantity to add to cart: ", addToCartQuantity);

    // Reset cart quantity to 1 after items are added to cart
    this.setState({ addToCartQuantity: 1 });
  }

  handleQuantityInputChange = (event) => {
    const { value } = event.target;

    const numericValue = Math.floor(Number(value));

    if (Number.isNaN(numericValue)) {
      return null;
    }

    return this.setState({ addToCartQuantity: numericValue });
  }

  handleIncrementButton = () => {
    const value = this.state.addToCartQuantity + 1;

    this.setState({ addToCartQuantity: value });
  }

  handleDecrementButton = () => {
    const value = this.state.addToCartQuantity - 1;

    if (value >= 1) {
      this.setState({ addToCartQuantity: value });
    }
  }

  render() {
    const {
      classes: {
        addToCartButton,
        addToCartText,
        incrementButton,
        quantityContainer,
        quantityGrid,
        quantityInput,
        quantityTypography
      }
    } = this.props;

    const { addToCartQuantity } = this.state;

    return (
      <Grid container>
        <Grid item xs={12} className={quantityGrid}>
          <Divider />
          <Typography component="span" className={quantityTypography}>Quantity</Typography>
          <TextField
            id="addToCartQuantityInput"
            value={addToCartQuantity}
            onChange={this.handleQuantityInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <ButtonBase
                    color="default"
                    variant="outlined"
                    onClick={this.handleDecrementButton}
                    className={incrementButton}
                  >
                    <Minus />
                  </ButtonBase>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment>
                  <ButtonBase
                    variant="outlined"
                    color="default"
                    onClick={this.handleIncrementButton}
                    className={incrementButton}
                  >
                    <Plus />
                  </ButtonBase>
                </InputAdornment>
              ),
              disableUnderline: true,
              classes: {
                root: quantityContainer,
                input: quantityInput
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonBase
            onClick={this.handleOnClick}
            className={addToCartButton}
          >
            <Typography className={addToCartText} component="span" variant="body1">
              Add to cart
            </Typography>
          </ButtonBase>
        </Grid>
      </Grid>
    );
  }
}
