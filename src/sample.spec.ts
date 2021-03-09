import "@testing-library/jest-dom";
import { screen, fireEvent, prettyDOM } from "@testing-library/dom";
import { view } from "./page";

xdescribe("App with a board", () => {
  beforeEach(() => view());

  it("by default should not have a drag avata", () => {
    expect(screen.queryByTestId("drag-avatar")).not.toBeInTheDocument();
  });

  describe("when pressing down on an item ", () => {
    beforeEach(() =>
      fireEvent.mouseDown(screen.getByTestId("vid1"), {
        screenX: 100,
        screenY: 100,
      })
    );
    describe("and dragging for 5 pixels", () => {
      beforeEach(() =>
        fireEvent.mouseMove(document, {
          screenX: 105,
          screenY: 100,
        })
      );
      it("drag avatar should not appear", () => {
        expect(screen.queryByTestId("drag-avatar")).not.toBeInTheDocument();
      });

      describe("dragging for 1 more pixel", () => {
        beforeEach(() =>
          fireEvent.mouseMove(document, {
            screenX: 105,
            screenY: 101,
          })
        );
        it("drag avatar should appear", () => {
          expect(screen.queryByTestId("drag-avatar")).toBeInTheDocument();
        });
      });
    });
  });
});
