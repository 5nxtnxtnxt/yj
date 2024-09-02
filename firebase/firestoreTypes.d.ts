interface EssayBase {
  layout: 0 | 1 | 2;
  title: string;
  order: number;
  date: { seconds: number; nanoseconds: number };
  thumbnail: string;
  top: number;
  left: number;
  depth: number;
  width: number;
  onMain: boolean;
  contents: EssayContent[];
}
export type EssayContent =
  | { type: "image"; imageURL: string }
  | { type: "text"; text: string[] };
interface EssayLayout0 extends EssayBase {
  layout: 0;
}
interface EssayLayout1 extends EssayBase {
  layout: 1;
  backgroundURL: string;
  link: string;
  linkText: string;
}
export type Essay = EssayLayout0 | EssayLayout1;
export interface Project {
  title: string;
  infoTitle: string;
  infoContent: string[];
  categoryOpened: boolean;
  order: number;
  visible: true;
  essays: Essay[];
}
