import React from "react";
import { render } from "@testing-library/react";
import FoodSearch from "./FoodSearch";

it("renders without crashing", function () {
  render(<FoodSearch />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<FoodSearch />);
  expect(asFragment()).toMatchSnapshot();
});
