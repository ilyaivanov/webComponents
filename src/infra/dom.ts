import { ClassName } from "./keys";

interface DivProps {
  className?: ClassName;
}
export const div = (
  props: DivProps,
  ...children: (string | HTMLElement)[]
): HTMLElement => {
  const elem = document.createElement("div");
  if (props.className) elem.classList.add(props.className);
  children.forEach((c) => {
    if (typeof c === "string") elem.append(c);
    else elem.appendChild(c);
  });
  return elem;
};

interface DivProps {
  className?: ClassName;
}
export const span = (props: DivProps, text: string): HTMLElement => {
  const elem = document.createElement("span");
  if (props.className) elem.classList.add(props.className);
  elem.textContent = text;
  return elem;
};

interface ImgProps {
  className?: ClassName;
  src: string;
}
export const img = (props: ImgProps): HTMLElement => {
  const elem = document.createElement("img");
  if (props.className) elem.classList.add(props.className);
  elem.src = props.src;
  return elem;
};

export const fragment = (nodes: HTMLElement[]) => {
  const fragment = document.createDocumentFragment();
  nodes.forEach((node) => fragment.appendChild(node));
  return fragment;
};
