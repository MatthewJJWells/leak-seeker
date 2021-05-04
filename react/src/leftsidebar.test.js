import React from "react";
import {
  act,
  render,
  wait,
  fireEvent,
  screen
} from "@testing-library/react";
import LeftSidebar from "./components/faultpage/leftsidebar.jsx";

describe("Left Side Bar", () => {
  it('Should Change once home clicked', async () => {
    
    
    const onClick = jest.fn();
    console.log('jest4231: ', onClick);

    render(<LeftSidebar onClick={onClick} query='' />);

    fireEvent.change(screen.getByText("Home"), {target: {value: "searching for something"}});  });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith("searching for something", expect.anything());
});