import { ItalicOutlined } from "@ant-design/icons";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ColorDot from '../colordot';

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

it("renders red dot", () => {
    act(()=>{
        render(<ColorDot color="red" />, container);
    })

    const dotStyle = document.querySelector("[data-testid=dot]").style;
    expect(dotStyle.width).toBe("15px");
    expect(dotStyle.height).toBe("15px");
    expect(dotStyle.background).toBe("red");
});