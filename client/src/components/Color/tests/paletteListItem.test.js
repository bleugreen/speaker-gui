import { ItalicOutlined } from "@ant-design/icons";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import PaletteListItem from '../paletteListItem';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

it("renders name and colors", () => {
    
    act(()=>{
        const colors = ["red", "blue", "green"];
        render(<PaletteListItem name="TestItem" colors={colors}/>, container);
    })
    const text = document.querySelector("[data-testid=name]");
    expect(text.textContent).toBe("TestItem");
    const colorRow = document.querySelector("[data-testid=colors]");
    expect(colorRow.childElementCount).toBe(3);

    act(()=>{
        const nocolor = [];
        render(<PaletteListItem name="TestItem" colors={nocolor}/>, container);
    });
    const colorRow2 = document.querySelector("[data-testid=colors]");
    expect(colorRow2).toBe(null);
    
});