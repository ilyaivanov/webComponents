export const ids = {} as const;

export const cls = {
  box: "box",
  svgCanvas: "svg-canvas",
  none: "",
} as const;

export const zIndexes = {};

export type ClassName = valueof<typeof cls>;
