import Board, { viewBoard } from "./board";
import Header from "./header";
import { cls, css } from "./infra";

class Page extends HTMLElement {
  connectedCallback() {
    this.classList.add(cls.page);
    this.style.backgroundPositionX = "0%";
    this.appendChild(document.createElement("slapstuk-header"));
    this.appendChild(
      viewBoard({
        onScroll: (e) => syncBackgroundXPositionWithScroll(this, e),
      })
    );
  }
}

const syncBackgroundXPositionWithScroll = (
  board: HTMLElement,
  scrollEvent: Event
) => {
  if (!board) return;
  const elem = scrollEvent.currentTarget as HTMLElement;
  const currentPercent = board.style.backgroundPositionX;
  const maxScrollLeft = elem.scrollWidth - elem.offsetWidth;
  const newPercent = ((elem.scrollLeft / maxScrollLeft) * 100).toFixed(2) + "%";
  if (newPercent != currentPercent)
    board.style.backgroundPositionX = newPercent;
};

css.class(cls.page, {
  width: "100vw",
  height: "100vh",
  display: "grid",
  overflow: "hidden",
  gridTemplateRows: "auto 1fr",
  // gridTemplateRows: "auto 1fr auto",
  gridTemplateColumns: "1fr auto",
  gridTemplateAreas: `
      "header header"
      "board rightSidebar"
    `,

  background:
    "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/8226b6654c1221c5cdba81ab4db86760/photo-1612701943975-7814268fab1f.jpg)",
  backgroundSize: "cover",
  backgroundPositionY: "center",
});

css.tag("body", {
  margin: 0,
  overflow: "hidden",
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif`,
});

customElements.define("slapstuk-header", Header);
customElements.define("slapstuk-page", Page);
customElements.define("slapstuk-board", Board);

export const view = () => {
  document.body.appendChild(document.createElement("slapstuk-page"));
};
