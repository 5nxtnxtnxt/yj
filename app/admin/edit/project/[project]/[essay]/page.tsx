"use client";

import {
  getProjectData,
  updateProject,
  uploadImageToFireStroage,
} from "@/firebase/firestore";
import { Project, YJData } from "@/firebase/firestoreTypes";
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
  text: z.string(),
  firstImage: z.string().min(1, "사진을 선택해 주세요"),
});

export default function CreateProjectPage({
  params,
}: {
  params: { project: string; essay: string };
}) {
  const projectIndex = parseInt(params.project);
  const essayIndex = parseInt(params.essay);
  const [YJData, setYJData] = useState<YJData>();
  const [onMain, setOnMain] = useState(true);
  const [nowPage, setNowPage] = useState(1);
  const [thumbnail, setThumbnail] = useState("");
  const [url, setUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [depth, setDepth] = useState(0);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zod.zodResolver(ProjectSchema),
    defaultValues: {
      layout: 0,
      thumbnail: "",
      onMain: true,
      top: 0,
      left: 0,
      depth: 0,
      width: 0,
      link: "",
      firstImage: "",
    },
  });
  useEffect(() => {
    const loadNowData = async () => {
      const data = await getProjectData();
      const target = data.projects[projectIndex].essays[essayIndex];
      if (target === undefined) {
        router.push("/admin");
      }
      form.reset({ ...target });
      setThumbnail(target.thumbnail);
      setOnMain(target.onMain);
      setTop(target.top);
      setLeft(target.left);
      setUrl(target.firstImage);
      setDepth(target.depth);
      setWidth(target.width);
      setYJData(data);
      form.trigger();
    };
    loadNowData();
  }, []);

  const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
    const origin: Project[] = JSON.parse(JSON.stringify(YJData?.projects));
    origin[projectIndex].essays[essayIndex] = { ...values };
    const result = await updateProject(origin);

    if (result) {
      router.push("/admin");
    }
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    setUploading(true);
    const file = e.target.files[0];
    const uploadedUrl = await uploadImageToFireStroage(file);
    setUploading(false);
    return uploadedUrl;
  };

  if (YJData === undefined) return <div>loading...</div>;

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
          프로젝트 [{YJData?.projects[projectIndex].title}] 에세이 추가
        </h1>
        <div className="flex flex-col">
          <h2 className="text-xl ">layout</h2>
          <div className="flex gap-3 ">
            <div className="flex gap-1">
              <input
                type="radio"
                value={0}
                name="test"
                defaultChecked={
                  YJData.projects[projectIndex].essays[essayIndex].layout === 0
                }
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
                defaultChecked={
                  YJData.projects[projectIndex].essays[essayIndex].layout === 1
                }
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
                <h2>상하 {top}</h2>
                <input
                  type="range"
                  {...form.register("top", {
                    valueAsNumber: true,
                  })}
                  onChange={(e) => setTop(parseInt(e.target.value))}
                />

                <h2>좌우 {left}</h2>
                <input
                  type="range"
                  {...form.register("left", {
                    valueAsNumber: true,
                  })}
                  onChange={(e) => setLeft(parseInt(e.target.value))}
                />
                <h2>크기 {width}</h2>
                <input
                  type="range"
                  {...form.register("width", {
                    valueAsNumber: true,
                  })}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                />
                <h4>depth {depth}</h4>
                <input
                  type="range"
                  max={4}
                  {...form.register("depth", {
                    valueAsNumber: true,
                  })}
                  onChange={(e) => setDepth(parseInt(e.target.value))}
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
            onChange={async (e) => {
              const url = (await uploadImage(e)) || "";
              form.setValue("thumbnail", url);
              setThumbnail(url);
            }}
          />
        </div>
        <div>
          <h3>date</h3>
          <input type="date" {...form.register("date")} />
        </div>
        <label htmlFor="link">본문 링크</label>
        <input type="text" id="link" {...form.register("link")} />
        <h5 className="text-red-500">{form.formState.errors.link?.message}</h5>

        <h3 className="text-2xl font-bold">본문</h3>

        <div>
          <h3>Image</h3>
          {url !== "" && <img className="w-1/2" src={url}></img>}
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const url = (await uploadImage(e)) || "";
              form.setValue("firstImage", url);
              setUrl(url);
            }}
          />
        </div>

        <textarea {...form.register("text")}></textarea>
        <h5 className="text-red-500">{form.formState.errors.text?.message}</h5>

        <button>완료</button>
      </form>
    </div>
  );
}
