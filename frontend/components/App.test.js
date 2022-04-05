import React from "react";
import { render, screen } from "@testing-library/react";
import AppFunctional from "./AppFunctional";

test('renders the component', () => {
  render(<AppFunctional />);
  expect(screen.getByText('Welcome to the GRID')).toBeInTheDocument();
});