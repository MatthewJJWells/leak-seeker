import React from "react";
import {
  act,
  render,
  wait,
  fireEvent,
  screen
} from "@testing-library/react";
import MainFaultPageContainer from "./containers/mainfaultpage.jsx";
import { getFaultsByReg } from "./service/service-api.js";

describe("Main Fault Page", () => {
  it('Should get faults by reg once', async () => {
    
    const searchedReg = jest.fn();
    const setSearchedReg = jest.fn();
    const setIntroPage = jest.fn();


    render(<MainFaultPageContainer searchedReg={searchedReg} setSearchedReg={setSearchedReg} setIntroPage={setIntroPage}/>);

    expect(getFaultsByReg).toHaveBeenCalledTimes(1);
  });
});