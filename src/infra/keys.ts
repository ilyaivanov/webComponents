export const cls = {
  page: "page",
  board: "board",
  header: "header",
  column: "column",
  columnTitle: "column-title",
  card: "card",
  cardText: "card-text",
  cardImage: "card-image",
  boardSpacing: "board-spacing",
  none: "",
} as const;

export const ids = {
  root: "root",
} as const;

export const tIds = {};

export const zIndexes = {
  dragAvatar: 200,
  header: 300,
  rightSidebar: 250,
};

type valueof<T> = T[keyof T];

export type ClassPropertyName = keyof typeof cls;
export type ClassName = valueof<typeof cls>;
export type ClassMap = Partial<Record<ClassName, boolean>>;
