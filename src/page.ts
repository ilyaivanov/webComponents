import Board, { viewBoard } from "./board";
import Header from "./header";
import { cls, css, div } from "./infra";

interface Dragging {
  type: "dragging";
}

interface MouseDownNoDrag {
  type: "mouseDownNoDrag";
  item: Item;
  card: HTMLElement;
  point: Point;
}

type DragState = Dragging | MouseDownNoDrag;
class DragAvatar extends HTMLElement {
  dragState: DragState | undefined;
  avatar: HTMLElement | undefined;
  avatarX: number = 0;
  avatarY: number = 0;

  static instance: DragAvatar;

  constructor(){
    super();
  }
  connectedCallback() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  disconnectedCallback() {
    document.removeEventListener("mousemove", this.onMouseMove);
  }

  onMouseMove = (e: MouseEvent) => {
    if (this.dragState && this.avatar) {
      this.avatarX += e.movementX;
      this.avatarY += e.movementY;
      this.avatar.style.top = this.avatarY + "px";
      this.avatar.style.left = this.avatarX + "px";
    }
  };

  onMouseUp = (e: MouseEvent) => {
    this.dragState = undefined;
    this.avatar?.remove();
    this.avatar = undefined;
    document.body.style.removeProperty("cursor");
  };

  onCardMouseDown = (item: Item, card: HTMLElement, point: Point) => {
    this.dragState = { type: "mouseDownNoDrag", point, item, card };
    this.avatar = div({}, card.cloneNode(true) as HTMLElement);
    this.avatar.style.transform = "rotate(4deg)";

    const rect = card.getBoundingClientRect();
    this.avatarX = rect.left;
    this.avatarY = rect.top;
    this.avatar.style.height = rect.height + "px";
    this.avatar.style.width = rect.width + "px";
    this.avatar.style.top = this.avatarY + "px";
    this.avatar.style.left = this.avatarX + "px";
    this.avatar.style.position = "fixed";
    this.appendChild(this.avatar);
    document.body.style.cursor = "grabbing";
    card.style.opacity = "0";
  };
}

class Page extends HTMLElement {
  dragAvatar!: DragAvatar;

  connectedCallback() {
    this.classList.add(cls.page);
    this.style.backgroundPositionX = "0%";
    this.appendChild(document.createElement("slapstuk-header"));
    const board = viewBoard();
    board.addEventListener("scroll", this.syncBackgroundXPositionWithScroll);
    //@ts-expect-error TODO: thinking how to type this
    board.addEventListener("card-mousedown", (e: CustomEvent) => {
      this.dragAvatar.onCardMouseDown(
        e.detail.item,
        e.detail.card,
        e.detail.point
      );
    });
    this.appendChild(board);
    this.dragAvatar = document.createElement(
      "slapstuk-drag-avatar"
    ) as DragAvatar;
    this.appendChild(this.dragAvatar);
  }

  syncBackgroundXPositionWithScroll = (scrollEvent: Event) => {
    const elem = scrollEvent.currentTarget as HTMLElement;
    const currentPercent = this.style.backgroundPositionX;
    const maxScrollLeft = elem.scrollWidth - elem.offsetWidth;
    const newPercent =
      ((elem.scrollLeft / maxScrollLeft) * 100).toFixed(2) + "%";
    if (newPercent != currentPercent)
      this.style.backgroundPositionX = newPercent;
  };
}
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
customElements.define("slapstuk-drag-avatar", DragAvatar);

export const view = () => {
  document.body.appendChild(document.createElement("slapstuk-page"));
};
