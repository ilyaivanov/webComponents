export const ids = {} as const;

export const cls = {
  svgCanvas: "svg-canvas",
  none: "",
} as const;

export const zIndexes = {};

export type ClassName = valueof<typeof cls>;
