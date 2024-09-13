/*
  Project
  - Essay
    - EssayContent
  Series
  - SeriesProject
    - SeriesEssay
 */

export interface YJData {
  projects: Project[];
  series: Series[];
}

export interface Project {
  title: string;
  infoTitle: string;
  infoContent: string;
  visible: true;
  essays: Essay[];
}

export type Essay = {
  layout: 0 | 1;
  title: string;
  date: string;
  thumbnail: string;
  top: number;
  left: number;
  depth: number;
  width: number;
  onMain: boolean;
  contents: EssayContent[];
  link: string;
};

export type EssayContent = { type: "image" | "text"; data: string };

export type Series = {
  title: string;
  infoTitle: string;
  infoContent: string;
  visible: true;
  seriesProjects: SeriesProject[];
};

export type SeriesProject = {
  thumbnail: string;
  title: string;
  date: string;
  description: string;
  top: number;
  left: number;
  depth: number;
  width: number;
  onMain: boolean;
  seriesContents: {
    image: string;
    title: string;
    date: string;
    text: string;
    link: string;
  }[];
};
