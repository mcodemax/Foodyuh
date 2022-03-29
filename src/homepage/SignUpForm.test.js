import React from "react";
import { render } from "@testing-library/react";
import SignUpForm from "./SignUpForm";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", function () {
  render(<SignUpForm />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<SignUpForm />);
  expect(asFragment()).toMatchSnapshot();
});
