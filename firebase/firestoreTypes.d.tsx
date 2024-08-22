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
}
interface EssayLayout0 extends EssayBase {
  layout: 0;
  contents:
    | { page: number; type: "image"; imageURL: string }
    | { page: number; type: "text"; text: string }[];
}
interface EssayLayout1 extends EssayBase {
  layout: 1;
  backgroundURL: string;
  contents: string;
  link: string;
  linkText: string;
}
type Essay = EssayLayout0 | EssayLayout1;
export interface Project {
  title: string;
  infoTitle: string;
  infoContent: string;
  categoryOpened: boolean;
  order: number;
  visible: true;
  essays: Essay[];
}
