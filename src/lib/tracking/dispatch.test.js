import analyticsProviders from "analytics";
import dispatch from "./dispatch";

jest.mock("analytics", () => ([
  { dispatch: jest.fn(), renderScript: jest.fn() },
  { dispatch: jest.fn(), renderScript: jest.fn() }
]));

const analyticsData = {
  action: "test"
};

test("dispatch analyticsData to providers", () => {
  dispatch(analyticsData);
  expect(analyticsProviders[0].dispatch).toHaveBeenCalledWith(analyticsData);
  expect(analyticsProviders[1].dispatch).toHaveBeenCalledWith(analyticsData);
});
