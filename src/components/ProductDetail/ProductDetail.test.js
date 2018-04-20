import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ProductDetail from "./ProductDetail";
import sampleData from "./sampleData";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<ProductDetail catalogProduct={sampleData} />).get(0));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
