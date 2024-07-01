import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const dynamic = "force-dynamic";
let cachedData: MyData | null = null;

interface MyType extends DatabaseObjectResponse {
  properties: {
    날짜: {
      date: {
        start: string | null;
        end: string | null;
      } | null;
    };
    썸네일: {
      files: {
        name: string;
        file: {
          url: string;
        };
      }[];
    };
    프로젝트: {
      select: {
        name: string;
      };
    };
    타이틀: {
      title: {
        plain_text: string;
      }[];
    };
    사진넓이: {
      number: number;
    };
    위치_top: {
      number: number;
    };
    위치_left: {
      number: number;
    };
    뎁스: {
      number: number;
    };
    [key: string]: any;
  };
}

export interface MyData {
  [project: string]: {
    date: string;
    thumbNailSrc: string;
    title: string;
    depth: number;
    top: number;
    left: number;
    width: number;
  }[];
}
export async function getDataFromNotion() {
  if (cachedData) {
    console.log("cached!!!");
    return cachedData;
  }
  console.log("fetching");
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const databaseId = process.env.NOTION_DB_ID as string;
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const res = response.results as MyType[];
  const data = res.map((e) => e.properties);
  const newData: MyData = {};
  data.forEach((e) => {
    const title = e.프로젝트.select.name ?? "undefined";
    if (!(title in newData)) {
      newData[title] = [];
    }
    newData[title].push({
      date: e.날짜.date?.end ?? e.날짜.date?.start ?? "2099-12-31",
      thumbNailSrc: e.썸네일.files[0]?.file.url ?? "none.png",
      title: e.타이틀.title[0]?.plain_text ?? "무제",
      width: e.사진넓이.number ?? 30,
      top: e.위치_top.number ?? 1,
      left: e.위치_left.number ?? 1,
      depth: e.뎁스.number ?? 3,
    });
  });
  cachedData = newData;
  return newData;
}
export async function getDataFromNotionForce() {
  console.log("force");
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const databaseId = process.env.NOTION_DB_ID as string;
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const res = response.results as MyType[];
  const data = res.map((e) => e.properties);
  const newData: MyData = {};
  data.forEach((e) => {
    const title = e.프로젝트.select.name ?? "undefined";
    if (!(title in newData)) {
      newData[title] = [];
    }
    newData[title].push({
      date: e.날짜.date?.end ?? e.날짜.date?.start ?? "2099-12-31",
      thumbNailSrc: e.썸네일.files[0]?.file.url ?? "none.png",
      title: e.타이틀.title[0]?.plain_text ?? "무제",
      width: e.사진넓이.number ?? 0.3,
      top: e.위치_top.number ?? 0,
      left: e.위치_left.number ?? 0,
      depth: e.뎁스.number ?? 3,
    });
  });
  cachedData = newData;
  console.log(newData);
  return newData;
}