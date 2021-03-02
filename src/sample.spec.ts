import "@testing-library/jest-dom";
import { screen, fireEvent, prettyDOM } from "@testing-library/dom";
import { view } from "./page";

it("passing ok", () => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
  view();
  const counter = screen.getAllByTestId("counter")[0];
  expect(counter).toHaveTextContent("1");
  fireEvent.click(counter);
  expect(counter).toHaveTextContent("2");
});
