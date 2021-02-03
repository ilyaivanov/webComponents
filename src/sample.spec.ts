import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/dom";
import { dom } from "./infra";
import * as sampleButton from "./sampleButton";

it("passing ok", () => {
  document.body.appendChild(dom.div({ id: "root" }));

  const el = document.createElement("div");

  el.constructor.prototype.animate = () => {
    console.log("fooo");
  };

  sampleButton.render();

  const myButton = dom.findById("my-button");
  expect(myButton.innerHTML).toBe("42");

  fireEvent.click(myButton);

  expect(myButton.innerHTML).toBe("42xYx");
});
