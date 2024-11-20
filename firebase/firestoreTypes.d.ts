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
  visible: boolean;
  essays: Essay[];
}

export type Essay = {
  layout: 0 | 1;
  category: string;
  title: string;
  date: string;
  thumbnail: string;
  top: number;
  left: number;
  depth: number;
  width: number;
  onMain: boolean;
  firstImage: string;
  text: string;
  link: string;
};

export type Series = {
  title: string;
  infoTitle: string;
  infoContent: string;
  visible: boolean;
  seriesProjects: SeriesProject[];
};

export type SeriesProject = {
  thumbnail: string;
  title: string;
  date: string;
  description: string;

  seriesContents: {
    top: number;
    left: number;
    depth: number;
    width: number;
    onMain: boolean;
    image: string;
    title: string;
    date: string;
    text: string;
    link: string;
  }[];
};
