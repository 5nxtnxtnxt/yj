"use client";

import {
  getProjectData,
  updateProject,
  uploadImageToFireStroage,
} from "@/firebase/firestore";
import { EssayContent, Project, YJData } from "@/firebase/firestoreTypes";
import * as zod from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ProjectSchema = z.object({
  layout: z.union([z.literal(0), z.literal(1)]),
  title: z.string().min(2),
  date: z.string().min(8),
  thumbnail: z.string().min(1, "썸네일을 선택해주세요"),
  onMain: z.boolean(),
  top: z.number(),
  left: z.number(),
  depth: z.number(),
  width: z.number(),
  link: z.string(),
  contents: z.array(
    z.object({
      type: z.union([z.literal("image"), z.literal("text")]),
      data: z.string().min(1),
    })
  ),
});

export default function CreateProjectPage({
  params,
}: {
  params: { project: string };
}) {
  const projectTitle = decodeURIComponent(params.project);
  const [YJData, setYJData] = useState<YJData>();
  const [nowData, setNowData] = useState<number>();
  const [onMain, setOnMain] = useState(true);
  const [nowPage, setNowPage] = useState(1);
  const [thumbnail, setThumbnail] = useState("");
  const [isText, setIsText] = useState<boolean[]>([true]);
  const [url, setUrl] = useState<string[]>([""]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zod.zodResolver(ProjectSchema),
    defaultValues: {
      layout: 0,
      thumbnail: "",
      onMain: true,
      top: 10,
      left: 0,
      depth: 0,
      width: 10,
      link: "",
      contents: [{ type: "text", data: "" }],
    },
  });
  useEffect(() => {
    const loadNowData = async () => {
      const data = await getProjectData();
      setYJData(data);
      const nowProject = data.projects.findIndex(
        (e) => e.title === projectTitle
      );
      if (nowProject === undefined) {
        router.push("/admin");
      }
      setNowData(nowProject);
    };
    loadNowData();
  }, []);

  const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
    if (nowData === undefined) return;
    if (values.layout === 1) {
      if (values.contents.find((e) => e.type === "image") === undefined) {
        form.setError("contents", {
          message: "적어도 한개의 이미지가 필요합니다.",
        });
        return;
      }
      if (values.contents.find((e) => e.type === "text") === undefined) {
        form.setError("contents", {
          message: "적어도 한개의 텍스트가 필요합니다.",
        });
        return;
      }
    } else {
      if (values.contents.length < 1) {
        form.setError("contents", {
          message: "적어도 한개의 콘텐츠가 필요합니다.",
        });
        return;
      }
    }
    const origin: Project[] = JSON.parse(JSON.stringify(YJData?.projects));
    origin[nowData].essays.push(values);
    const result = await updateProject(origin);

    if (result) {
      router.push("/admin");
    }
  };

  const addContents = () => {
    const newContents = form.getValues("contents");
    newContents.push({ type: "text", data: "" });
    form.setValue("contents", newContents);
    setIsText([...isText, true]);
    setNowPage(newContents.length);
    setUrl([...url, ""]);
  };

  const removeContents = () => {
    const newContents = form.getValues("contents");
    newContents.pop();
    form.setValue("contents", newContents);
    setIsText([...isText].slice(0, -1));
    setNowPage(newContents.length);
    setUrl([...url].slice(0, -1));
  };

  const uploadImage = async (
    e: ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    if (e.target.files === null) return;
    setUploading(true);
    const file = e.target.files[0];
    const uploadedUrl = await uploadImageToFireStroage(file);

    if (index !== undefined) {
      const newUrl = [...url];
      newUrl[index] = uploadedUrl;
      setUrl(newUrl);
      form.setValue(`contents.${index}.data`, uploadedUrl);
    } else {
      setThumbnail(uploadedUrl);
      form.setValue("thumbnail", uploadedUrl);
    }
    setUploading(false);
  };

  if (nowData === undefined) return <div>loading...</div>;

  return (
    <div className="size-full">
      {uploading && (
        <div className="size-full z-50 pointer-events-none bg-white bg-opacity-50 fixed flex justify-center items-center">
          <h3 className="animate-pulse">이미지 업로드 중입니다...</h3>
        </div>
      )}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-10"
      >
        <h1 className="text-2xl">
          프로젝트 [{YJData?.projects[nowData].title}] 에세이 추가
        </h1>
        <div className="flex flex-col">
          <h2 className="text-xl ">layout</h2>
          <div className="flex gap-3 ">
            <div className="flex gap-1">
              <input
                type="radio"
                value={0}
                name="test"
                defaultChecked
                onClick={() => {
                  form.setValue("layout", 0);
                }}
              />
              <h2>BookType</h2>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                value={1}
                name="test"
                onClick={() => form.setValue("layout", 1)}
              />
              <h2>BackgroundImageType</h2>
            </div>
          </div>
        </div>
        <div className="">
          <label htmlFor="onMain" className="text-xl ">
            메인에 표시
          </label>

          <input
            type="checkbox"
            id="onMain"
            {...form.register("onMain")}
            onChange={(e) => setOnMain(e.target.checked)}
          />

          {onMain ? (
            <div>
              <div>
                <h2>상하</h2>
                <input
                  type="range"
                  {...form.register("top", {
                    valueAsNumber: true,
                  })}
                />
                <h2>좌우</h2>
                <input
                  type="range"
                  {...form.register("left", {
                    valueAsNumber: true,
                  })}
                />
                <h2>크기</h2>
                <input
                  type="range"
                  {...form.register("width", {
                    valueAsNumber: true,
                  })}
                />
                <h4>depth</h4>
                <input
                  type="range"
                  max={4}
                  {...form.register("depth", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
          ) : null}
        </div>
        <label htmlFor="title">title</label>
        <input type="text" id="title" {...form.register("title")} />
        <h5 className="text-red-500">{form.formState.errors.title?.message}</h5>
        <div>
          <h3>thumbnail</h3>
          {thumbnail !== "" && <img className="w-1/2" src={thumbnail}></img>}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e)}
          />
        </div>
        <div>
          <h3>date</h3>
          <input type="date" {...form.register("date")} />
        </div>
        <label htmlFor="link">본문 링크</label>
        <input type="text" id="link" {...form.register("link")} />
        <h5 className="text-red-500">{form.formState.errors.link?.message}</h5>

        <h3 className="text-2xl font-bold">contents</h3>
        <h5 className="text-red-500">
          {form.formState.errors.contents?.message}
        </h5>
        {Array.from({ length: nowPage }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col border-b border-border-black border-dotted pb-6 gap-3"
          >
            <h1 className="w-full text-lg font-semibold">{index + 1} page</h1>
            <div>
              <div className="flex gap-3">
                <div className="flex gap-1">
                  <input
                    type="radio"
                    name={"contents" + index}
                    defaultChecked
                    onClick={() => {
                      form.setValue(`contents.${index}.type`, "text");
                      form.setValue(`contents.${index}.data`, "");
                      const newIsText = [...isText];
                      newIsText[index] = true;
                      const newUrl = [...url];
                      newUrl[index] = "";
                      setIsText(newIsText);
                      setUrl(newUrl);
                    }}
                  />
                  <h6>text</h6>
                </div>
                <div className="flex gap-1">
                  <input
                    type="radio"
                    name={"contents" + index}
                    onClick={() => {
                      form.setValue(`contents.${index}.type`, "image");
                      form.setValue(`contents.${index}.data`, "");
                      const newIsText = [...isText];
                      newIsText[index] = false;
                      setIsText(newIsText);
                      const newUrl = [...url];
                      newUrl[index] = "";
                      setUrl(newUrl);
                    }}
                  />
                  <h6>image</h6>
                </div>
              </div>
            </div>
            {isText[index] ? (
              <textarea
                className="h-56 bg-bg-white border rounded border-border-black border-dashed"
                {...form.register(`contents.${index}.data`)}
              ></textarea>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadImage(e, index)}
                />
                {url[index] !== "" && (
                  <img className="w-1/2" src={url[index]}></img>
                )}
              </div>
            )}
          </div>
        ))}
        <button type="button" onClick={addContents}>
          +
        </button>
        {nowPage > 1 && (
          <button type="button" onClick={removeContents}>
            -
          </button>
        )}
        <button>완료</button>
      </form>
    </div>
  );
}
