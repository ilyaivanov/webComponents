import { cls, DivDefinition, dom } from "../infra";
import { cssTag, styles, cssClass } from "../infra/style";

cssTag("body", {
  margin: "0",
  backgroundColor: "#181818",
});

const boxAnimationSpeed = 800; //pixels per second
const width = "33%";
const getExpandedHeight = (box: HTMLElement) => box.clientWidth;
const isInitiallyVisible = false;

cssClass(cls.box, {
  position: "relative",
  width: width,
  marginTop: "20px",
  color: "white",
  fontSize: "calc(10px + 5vw)",
  overflow: "hidden",
  backgroundColor: "#373754",
  transformOrigin: "bottom",
});
let isBoxVisible = isInitiallyVisible;

export const init = () => {
  dom.findById("root").appendChild(
    dom.fragment([
      createBox(),
      {
        style: {
          color: "white",
        },
        children: "some text",
      },
      {
        type: "button",
        style: {
          position: "absolute",
          top: "200px",
          right: "100px",
          width: "75px",
        },
        children: "first",
        onClick: () => {
          isBoxVisible = !isBoxVisible;
          animateBox(dom.findById("box1"));
        },
      },
    ])
  );
};

const createBox = (): DivDefinition => ({
  id: "box1",
  style: {
    paddingBottom: isInitiallyVisible ? width : "0",
  },
  className: cls.box,
  children: {
    style: {
      ...styles.overlay,
      ...styles.flexCenter,
      textAlign: "center",
    },
    children: "Box with some text",
  },
});

const animateBox = (elem: HTMLElement) => {
  const expandBox = () => animateHeight(elem, 0, getExpandedHeight(elem));
  const collapseBox = () => animateHeight(elem, getExpandedHeight(elem), 0);

  elem.style.paddingBottom = "0";
  const currentAnimation = elem.getAnimations();

  const onAnimationDone = () => {
    if (isBoxVisible) elem.style.paddingBottom = width;
  };

  if (currentAnimation.length > 0) {
    currentAnimation[0].reverse();
  } else {
    const animation = isBoxVisible ? expandBox() : collapseBox();
    animation.addEventListener("finish", onAnimationDone);
  }
};

const animateHeight = (elem: HTMLElement, from: number, to: number) => {
  return elem.animate(
    [
      {
        height: from + "px",
      },
      { height: to + "px" },
    ],
    {
      duration: getDuration(from, to),
      easing: from < to ? "ease-in" : "ease-out",
    }
  );
};

const getDuration = (from: number, to: number) => {
  const distance = Math.abs(to - from);
  return (distance / boxAnimationSpeed) * 1000;
};
