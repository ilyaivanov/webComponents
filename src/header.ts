import { cls, css } from "./infra";

class Header extends HTMLElement {
  connectedCallback() {
    this.classList.add(cls.header);
  }
}

css.class(cls.header, {
  height: 49,
  backgroundColor: "rgba(0,0,0,0.32)",
  gridArea: "header",
});

export default Header;
