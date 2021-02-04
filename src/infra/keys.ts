export const ids = {} as const;

export const cls = { box: "box", svgCanvas: "canvas", none: "" } as const;

export const zIndexes = {
  leftSidebarMenu: 200,
  rightSidebarMenu: 200,
  dragAvatar: 400,
  dragDestinationIndicator: 350,
  topMenu: 300,
  player: 300,
};

export type ClassName = valueof<typeof cls>;
