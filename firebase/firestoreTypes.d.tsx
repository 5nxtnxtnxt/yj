import { Timestamp } from "firebase/firestore";

interface EssayBase {
  layout: 0 | 1 | 2;
  title: string;
  order: number;
  date: Timestamp;
  thumbnail: string;
  marginTop: number;
  marginLeft: number;
  depth: number;
  width: number;
}
interface EssayLayout0 {
  layout: 0;
  contents:
    | { page: number; type: "image"; imageURL: string }
    | { page: number; type: "text"; text: string }[];
}
interface EssayLayout1 {
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
