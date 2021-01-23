import { animate, SpeedBasedTween } from "../animations/app";
import { cls, cssClass, cssText, dom } from "../infra";
import { cssTag } from "../infra/style";

cssTag("body", {
  margin: "0",
});

cssClass(cls.svgCanvas, {
  backgroundColor: "pink",
  height: "100vh",
  width: "100vw",
  display: "block",
});

type Point = {
  x: number;
  y: number;
};

const multiply = (point: Point, factor: number): Point => ({
  x: point.x * factor,
  y: point.y * factor,
});

const divide = (point: Point, factor: number): Point => ({
  x: point.x / factor,
  y: point.y / factor,
});

const difference = (point1: Point, point2: Point): Point => ({
  x: point1.x - point2.x,
  y: point1.y - point2.y,
});

const add = (point1: Point, point2: Point): Point => ({
  x: point1.x + point2.x,
  y: point1.y + point2.y,
});

let size: Point = {
  x: window.innerWidth,
  y: window.innerHeight,
};

let position: Point = {
  x: 0,
  y: 0,
};

let scale = 1;

const getSvgViewbox = () => {
  const scaledWindowDimensions = divide(size, scale);
  return `${position.x} ${position.y} ${scaledWindowDimensions.x} ${scaledWindowDimensions.y}`;
};

let svgElem: HTMLElement;
const onResize = () => {
  size = {
    x: window.innerWidth,
    y: window.innerHeight,
  };
  svgElem.setAttribute("viewBox", getSvgViewbox());
};
const onMouseWheel = (event: Event) => {
  const e = event as WheelEvent;
  //regular delta is 100 or -100, so our step is always 10%
  // other apps do not do this like that.
  // They probably scale "scale factor" not always by 10%
  // Checkout Figma for example
  const nextScale = scale + scale * 0.1 * (-e.deltaY / 100);
  const mousePosition: Point = {
    x: e.clientX,
    y: e.clientY,
  };
  const currentMouseWorldPosition = add(
    position,
    multiply(mousePosition, 1 / scale)
  );
  const nextMouseWorldPosition = add(
    position,
    multiply(mousePosition, 1 / nextScale)
  );
  const diff = difference(currentMouseWorldPosition, nextMouseWorldPosition);
  const nextCameraPosition = add(position, diff);

  scale = nextScale;
  position = nextCameraPosition;
  svgElem.setAttribute("viewBox", getSvgViewbox());
};

const onMouseMove = (e: MouseEvent) => {
  if (e.buttons == 1) {
    const shift: Point = {
      x: -e.movementX / scale,
      y: -e.movementY / scale,
    };
    position = add(position, shift);
  }
  svgElem.setAttribute("viewBox", getSvgViewbox());
};
let greenAnimation: SpeedBasedTween;
let redAnimation: SpeedBasedTween;
let blueAnimation: SpeedBasedTween;

export const init = () => {
  const page = dom.findById("root");

  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mousewheel", onMouseWheel);
  svgElem = dom.div({
    type: "svg",
    className: cls.svgCanvas,
    attributes: { viewBox: getSvgViewbox() },
    children: [
      {
        type: "circle",
        attributes: {
          cx: "150",
          cy: "300",
          r: "50",
          fill: "red",
        },
        on: {
          click: (e) => {
            const target = e.currentTarget as HTMLElement;
            if (redAnimation) {
              if (redAnimation.state == "running") redAnimation.pause();
              else redAnimation.resume();
            } else
              redAnimation = animate({
                duration: 1000,
                from: 50,
                to: 100,
                onStep: (val) => {
                  target.setAttribute("r", val.toFixed());
                },
                animationType: "ping-pong",
              });
          },
        },
      },
      {
        type: "circle",
        attributes: {
          cx: "650",
          cy: "200",
          r: "150",
          fill: "green",
        },
        on: {
          click: (e) => {
            const target = e.currentTarget as HTMLElement;
            if (greenAnimation) {
              if (greenAnimation.state == "running") greenAnimation.pause();
              else greenAnimation.resume();
            } else
              greenAnimation = animate({
                duration: 2000,
                from: 150,
                to: 2,
                onStep: (val) => {
                  target.setAttribute("r", val.toFixed());
                },
              });
          },
        },
      },
      {
        type: "circle",
        attributes: {
          cx: "250",
          cy: "200",
          r: "20",
          fill: "blue",
        },
        on: {
          click: (e) => {
            const target = e.currentTarget as HTMLElement;
            if (blueAnimation) {
              if (blueAnimation.state == "running") blueAnimation.pause();
              else blueAnimation.resume();
            } else
              blueAnimation = animate({
                duration: 400,
                from: 20,
                to: 10,
                onStep: (val) => {
                  target.setAttribute("r", val.toFixed());
                },
                animationType: "ping-pong",
              });
          },
        },
      },
    ],
  });
  page.appendChild(svgElem);
};
