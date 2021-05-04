import React from "react";
import {
  act,
  render,
  wait,
  fireEvent,
  screen
} from "@testing-library/react";
import FaultListContainer from "./containers/faultlistcontainer.jsx";

describe("Fault List container", () => {
  it('Display basic Fault List elements', async () => {
    
    const { component } = render(<FaultListContainer/>);

    expect(screen.getByText('Current Search:')).toBeInTheDocument();
    expect(screen.getByText('Make: ')).toBeInTheDocument();
    expect(screen.getByText('Model: ')).toBeInTheDocument();

  });
});