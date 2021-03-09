interface Board {
  name: string;
  columns: Column[];
}

interface Column {
  id: string;
  name: string;
  items: Item[];
}

type Item = YoutubeVideoItem | YoutubePlaylist;

interface YoutubeVideoItem {
  id: string;
  type: "video";
  name: string;
  videoId: string;
}
interface YoutubePlaylist {
  id: string;
  type: "playlist";
  name: string;
  image: string;
  playlistId: string;
  children?: YoutubeVideoItem[];
}

type Point = {
  x: number;
  y: number;
};

type valueof<T> = T[keyof T];

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;
