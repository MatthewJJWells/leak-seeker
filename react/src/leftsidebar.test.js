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
    
    
    const setIntroPage = jest.fn();
    

    render(<LeftSidebar setIntroPage={setIntroPage} />);
    const getByTextHome = screen.getByText("Home");
    console.log('get by tst home: ', getByTextHome);
    
    fireEvent.click(screen.getByText("Home"));  
    
    expect(setIntroPage).toHaveBeenCalledWith(true);
  });
}); 