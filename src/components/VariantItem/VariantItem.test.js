import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "material-ui/styles";

import theme from "lib/theme/reactionTheme";
import variant from "./__mocks__/variant.mock";
import VariantItem from "./VariantItem";

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <VariantItem
        active={true}
        handleClick={() => true}
        variant={variant}
      />
    </MuiThemeProvider>));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
