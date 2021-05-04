import React from "react";
import {
  act,
  render,
  wait,
  fireEvent,
  screen
} from "@testing-library/react";
import WelcomeContainer from "./containers/welcomecontainer.jsx";

describe("App", () => {
  it('Welcome container should load', async () => {
    const { container } = render(<WelcomeContainer />);

    expect(screen.getByText('Welcome to Leak Seeker')).toBeInTheDocument();
    expect(screen.getByText('Search Faults')).toBeInTheDocument();
    expect(screen.getByText('Register Fault')).toBeInTheDocument();
    expect(screen.getByAltText('brand logo')).toBeInTheDocument();
  });
});
