export type Essay = {
  layout: 0 | 1;
  title: string;
  order: number;
  date: { seconds: number; nanoseconds: number };
  thumbnail: string;
  top: number;
  left: number;
  depth: number;
  width: number;
  onMain: boolean;
  description: string[];
  contents: EssayContent[];
  backgroundURL: string;
  link: string;

  linkText: string;
};
export type EssayContent =
  | { type: "image"; imageURL: string }
  | { type: "text"; text: string[] }
  | Series;
export type Series = {
  type: "series";
  imageURL: string;
  title: string;
  date: { seconds: number };
  order: number;
  text: string[];
  link: string;
};
export interface Project {
  isSeries: boolean;
  title: string;
  infoTitle: string;
  infoContent: string[];
  categoryOpened: boolean;
  order: number;
  visible: true;
  essays: Essay[];
}
