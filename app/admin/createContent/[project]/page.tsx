"use client";

import EssayView from "@/components/essay";
import ImageSection from "@/components/imageSection";
import { getProjectData } from "@/firebase/firestore";
import { Essay, Project } from "@/firebase/firestoreTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import WriteArea from "./writeArea";

// EssayContent 스키마 정의
export const EssayContentSchema = z.union([
  z.object({
    type: z.literal("image"),
    imageURL: z.string(),
  }),
  z.object({
    type: z.literal("text"),
    text: z.array(z.string()),
  }),
  z.object({
    type: z.literal("series"),
    imageURL: z.string().min(1, "이미지를 선택해주세요"),
    title: z.string().min(1, "제목을 입력해주세요"),
    date: z.string().min(1, "날짜를 입력해주세요"),
    order: z.number(),
    text: z.array(z.string()),
    link: z.string(),
  }),
]);
// EssayBase 스키마 정의
export const EssaySchema = z.object({
  layout: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  title: z.string().min(1),
  order: z.number(),
  date: z.string().min(1),
  thumbnail: z.instanceof(File, { message: "썸네일파일을 선택해주세요" }),
  top: z.number(),
  left: z.number(),
  depth: z.number(),
  width: z.number(),
  onMain: z.boolean(),
  description: z.array(z.string()),
  contents: z
    .array(EssayContentSchema)
    .min(1, { message: "하나이상 작성해주세요" }),
  backgroundURL: z.string(),
  link: z.string(),
  linkText: z.string(),
});

export default function CreateContent({
  params,
}: {
  params: { project: string };
}) {
  const [nowLayout, setNowLayout] = useState(0);
  const [onMain, setOnMain] = useState(false);
  const [projectData, setProjectData] = useState<Project>();
  useEffect(() => {
    const loadData = async () => {
      const projectTitle = decodeURIComponent(params.project);
      const projects = await getProjectData();
      const nowProject = projects.find(
        (project) => project.title === projectTitle
      );
      setProjectData(nowProject);
    };
    loadData();
  }, []);
  const form = useForm<z.infer<typeof EssaySchema>>({
    resolver: zodResolver(EssaySchema),
    defaultValues: {
      layout: 0,
      order: 0,
      top: 0,
      left: 0,
      depth: 0,
      width: 0,
      onMain: false,
      contents: [],
    },
  });
  useEffect(() => {}, [projectData]);
  const onSubmit = (values: z.infer<typeof EssaySchema>) => {
    console.log("SUBMIT!!");
    console.log(values);
  };

  if (projectData === undefined) return <div>loading...</div>;
  return (
    <div>
      <div className="w-full flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[800px] flex flex-col gap-2"
        >
          <h1 className="text-xl">{projectData?.title} 콘텐츠 추가</h1>
          {
            <div className="flex gap-3">
              <button
                type="button"
                className={`${nowLayout !== 0 && "text-gray-400"}`}
                onClick={() => {
                  setNowLayout(0);
                  form.setValue("layout", 0);
                  form.trigger("layout");
                }}
              >
                type A
              </button>
              <button
                type="button"
                className={`${nowLayout !== 1 && "text-gray-400"}`}
                onClick={() => {
                  setNowLayout(1);
                  form.setValue("layout", 1);
                  form.trigger("layout");
                }}
              >
                type B
              </button>
            </div>
          }
          <label htmlFor="title">title</label>
          <input type="text" id="title" {...form.register("title")} />
          <h3 className="text-red-500">
            {form.formState.errors.title?.message}
          </h3>
          <label htmlFor="date">date</label>
          <input type="date" {...form.register("date")} />
          <h3 className="text-red-500">
            {form.formState.errors.date?.message}
          </h3>
          <label htmlFor="thumbnail">thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const nowSelected = e.target.files?.item(0);
              if (!nowSelected) return;
              form.setValue("thumbnail", nowSelected);
              form.trigger("thumbnail");
            }}
          />
          <h3 className="text-red-500">
            {form.formState.errors.thumbnail?.message}
          </h3>
          <div>
            <label htmlFor="onMain">onMain</label>
            <input
              type="checkBox"
              {...form.register("onMain")}
              onChange={(e) => {
                setOnMain(e.currentTarget.checked);
              }}
            />
          </div>
          <div className={`${!onMain && "opacity-50 pointer-events-none"}`}>
            <label htmlFor="top">top</label>
            <input
              type="range"
              {...form.register("top", { valueAsNumber: true })}
            />
            <label htmlFor="left">left</label>
            <input
              type="range"
              {...form.register("left", { valueAsNumber: true })}
            />
            <label htmlFor="width">width</label>
            <input
              type="range"
              {...form.register("width", { valueAsNumber: true })}
            />
            <label htmlFor="depth">depth</label>
            <input
              type="number"
              min={0}
              max={4}
              {...form.register("depth", { valueAsNumber: true })}
            />
          </div>
          <div>
            <WriteArea layout={nowLayout} form={form}></WriteArea>
          </div>
          {/* <ImageSection data={data}></ImageSection> */}
          {/* <EssayView></EssayView> */}

          <div className="flex justify-center">
            <button
              type="submit"
              className="border border-black rounded-lg px-3 border-dashed"
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
