import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

interface BlockType {
  paragraph: {
    plain_text: string;
  };
}

let cd: null | MyData = null;

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
    내용: {
      rich_text: { plain_text: string }[];
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
    des: string;
    data: (
      | { type: "image"; url: string }
      | { type: "text"; text: string[] }
      | undefined
    )[];
  }[];
}
export async function getDataFromNotion(forceUpdate: boolean = false) {
  if (cd && !forceUpdate) {
    console.log("cached");
    return cd;
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
  const getTextRes = res.map(async (e) => {
    const res = await notion.blocks.children.list({
      block_id: e.id,
    });
    const paragraphs = res.results.map((e) => {
      if (!("type" in e)) {
        return;
      }
      const data = e as BlockObjectResponse;
      if (data.type === "paragraph") {
        return {
          type: "text" as const,
          text: data.paragraph.rich_text.map((e) => e.plain_text),
        };
      }
      if (data.type === "image" && data.image.type === "file") {
        return { type: "image" as const, url: data.image.file.url };
      }
    });
    return paragraphs ? paragraphs : [];
  });
  const BlockData = await Promise.all(getTextRes);
  data.forEach((e, index) => {
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
      des: `${e.내용.rich_text[0].plain_text}`,
      data: BlockData[index],
    });
  });
  cd = newData;
  return newData;
}
