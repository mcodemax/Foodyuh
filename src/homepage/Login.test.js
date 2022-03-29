import React from "react";
import { render } from "@testing-library/react";
import Login from './Login';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", function () {
  render(<Login />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});
