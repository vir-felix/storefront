import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "lib/theme/reactionTheme";
import SortBySelector from "./SortBySelector";

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <SortBySelector
        sortBy={20}
        onChange={() => true}
      />
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
