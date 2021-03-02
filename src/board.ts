import { cls, css, div, img, span, fragment } from "./infra";

class Board extends HTMLElement {
  getCardImageSrc = (videoId: string): string =>
    `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;

  renderCard = () =>
    div(
      { className: cls.card },
      img({
        src: this.getCardImageSrc("9D2R69gVyZ0"),
        className: cls.cardImage,
      }),
      span({ className: cls.cardText }, "TOOL - 7empest (Audio)")
    );

  renderColumn = () => {
    const column = div(
      { className: cls.column },
      div({ className: cls.columnTitle }, "Column 12"),
      this.renderCard(),
      this.renderCard(),
      this.renderCard(),
      this.renderCard(),
      this.renderCard()
    );
    return column;
  };
  connectedCallback() {
    this.classList.add(cls.board);

    const columns = fragment([
      this.renderColumn(),
      this.renderColumn(),
      this.renderColumn(),
      this.renderColumn(),
      this.renderColumn(),
      this.renderColumn(),
      this.renderColumn(),
    ]);

    this.appendChild(columns);
    this.appendChild(div({ className: cls.boardSpacing }));
  }
}

export const viewBoard = ({ onScroll }: { onScroll: (e: Event) => void }) => {
  const board = document.createElement("slapstuk-board");
  board.addEventListener("scroll", onScroll);
  return board;
};
const COLUMN_SPACING = 20;
css.class(cls.board, {
  display: "flex",
  flexDirection: "row",
  gridArea: "board",
  overflowX: "auto",
  marginBottom: 5,
});

css.selector(`.${cls.board}::-webkit-scrollbar`, {
  height: 10,
});
css.selector(`.${cls.board}::-webkit-scrollbar-thumb`, {
  background: "rgba(255,255,255,0.5)",
  borderRadius: 4,
});
css.selector(`.${cls.board}::-webkit-scrollbar-track-piece`, {
  marginLeft: 10,
  marginRight: 10,
});
css.class(cls.column, {
  display: "flex",
  flexDirection: "column",
  width: 280,
  minWidth: 280,
  marginTop: 10,
  paddingLeft: COLUMN_SPACING,
  paddingRight: COLUMN_SPACING,
  borderRight: "1px solid rgba(255,255,255,0.5)",
});

css.class(cls.columnTitle, {
  marginBottom: 10,
  fontWeight: 700,
  color: "rgb(42, 49, 53)",
  fontSize: 26,
});

//CARD
const CARD_HEIGHT = 40;
const CARD_VERTICAL_DISTANCE = 15;
const CARD_TEXT_FONT_SIZE = 14;
css.class(cls.card, {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: CARD_VERTICAL_DISTANCE,
  backgroundColor: "white",
  height: CARD_HEIGHT,
  borderRadius: 4,
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: "0 1px 1px rgb(9 30 66 / 25%)",
  transition: "box-shadow 200ms, background-color 200ms",
  userSelect: "none",
});

css.hover(cls.card, {
  backgroundColor: "#F8F9FA",
  boxShadow: "1px 2px 5px 0 rgb(0 0 0 / 53%)",
});

css.active(cls.card, {
  boxShadow: "1px 2px 3px hsla(0, 0%, 0%, 0.2)",
});

css.class(cls.cardImage, {
  objectFit: "cover",
  height: CARD_HEIGHT,
  //(320 / 180)
  width: CARD_HEIGHT * 1.4,
});
css.class(cls.cardText, {
  paddingLeft: 5,
  paddingRight: 5,
  fontSize: CARD_TEXT_FONT_SIZE,
});
export default Board;
