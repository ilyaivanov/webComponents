import { anim } from "./infra";
import { convertNumericStylesToPixels, Styles } from "./infra/style";

const s: Styles = {
  height: 100,
  minWidth: 100,
  position: "absolute",
  top: 200,
  left: 400,
  //@ts-ignore
  opacity: 0.5,
};

export const render = () => {
  const button = document.createElement("button");
  button.innerHTML = "42";
  Object.assign(button.style, convertNumericStylesToPixels(s));
  document.getElementById("root")?.appendChild(button);
  button.addEventListener("click", () => {
    button.innerHTML += "xYx";
    const frames: Styles[] = [
      { height: button.clientHeight, opacity: 0.5 },
      { height: 400, opacity: 1 },
      { height: 200, opacity: 1 },
      { height: 400, opacity: 1 },
      { height: button.clientHeight, opacity: 0.5 },
    ];
    anim
      .animate(button, frames, {
        duration: 1000,
      })
      .addEventListener("finish", () => {
        button.style.backgroundColor = "purple";
      });
  });
};
