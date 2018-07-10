import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import theme from "lib/theme/reactionTheme";
import CartPopover from "./CartPopover";

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

const uiStore = {
  isCartPopoverOpen: true
};

const uiStoreFalse = {
  isCartPopoverOpen: false
};

test("show cartpopover", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <CartPopover cartItem={cartItem} uiStore={uiStore} />
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("do not show cartpopover", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <CartPopover cartItem={cartItem} uiStore={uiStoreFalse} />
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

