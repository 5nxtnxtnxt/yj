"use client";

import {
  getProjectData,
  updateSeries,
  uploadImageToFireStroage,
} from "@/firebase/firestore";
import { Series, YJData } from "@/firebase/firestoreTypes";
import * as zod from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ProjectSchema = z.object({
  title: z.string().min(2),
  date: z.string().min(8),
  image: z.string().min(1, "썸네일을 선택해주세요"),
  text: z.string().min(1),
  link: z.string().min(1),
  onMain: z.boolean(),
  top: z.number(),
  left: z.number(),
  depth: z.number(),
  width: z.number(),
});

export default function CreateProjectPage({
  params,
}: {
  params: { series: string; project: string; essay: string };
}) {
  const seriesIndex = parseInt(params.series);
  const projectIndex = parseInt(params.project);
  const essayIndex = parseInt(params.essay);
  const [YJData, setYJData] = useState<YJData>();
  const [onMain, setOnMain] = useState(true);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [depth, setDepth] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zod.zodResolver(ProjectSchema),
    defaultValues: {
      image: "",
      onMain: true,
      top: 0,
      left: 0,
      depth: 0,
      width: 0,
    },
  });
  useEffect(() => {
    const loadNowData = async () => {
      const data = await getProjectData();
      const target =
        data.series[seriesIndex].seriesProjects[projectIndex].seriesContents[
          essayIndex
        ];
      if (target === undefined) {
        router.push("/admin");
      }
      form.reset({ ...target });
      setThumbnail(target.image);
      setOnMain(target.onMain);
      setTop(target.top);
      setLeft(target.left);
      setDepth(target.depth);
      setWidth(target.width);
      setYJData(data);
    };
    loadNowData();
  }, [router]);

  const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
    if (YJData?.series[seriesIndex].seriesProjects[projectIndex] === undefined)
      return;
    const origin: Series[] = JSON.parse(JSON.stringify(YJData?.series));
    origin[seriesIndex].seriesProjects[projectIndex].seriesContents[
      essayIndex
    ] = {
      ...values,
    };
    const result = await updateSeries(origin);

    if (result) {
      router.push("/admin");
    }
  };

  const uploadImage = async (
    e: ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    if (e.target.files === null) return;
    setUploading(true);
    const file = e.target.files[0];
    const uploadedUrl = await uploadImageToFireStroage(file);

    setThumbnail(uploadedUrl);
    form.setValue("image", uploadedUrl);

    setUploading(false);
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
          [{YJData?.series[seriesIndex].title}]{">"}[
          {YJData?.series[seriesIndex].seriesProjects[projectIndex].title}]{">"}
          [
          {
            YJData?.series[seriesIndex].seriesProjects[projectIndex]
              .seriesContents[essayIndex].title
          }
          ] 에세이 수정
        </h1>

        <label htmlFor="title">title</label>
        <input type="text" id="title" {...form.register("title")} />
        <h5 className="text-red-500">{form.formState.errors.title?.message}</h5>
        <div>
          <label htmlFor="onMain" className="text-xl ">
            메인에 표시
          </label>
          <input
            type="checkbox"
            id="onMain"
            {...form.register("onMain")}
            onChange={(e) => setOnMain(e.target.checked)}
          />
        </div>

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

        <label htmlFor="text">text</label>
        <textarea id="text" {...form.register("text")} />
        <h5 className="text-red-500">{form.formState.errors.text?.message}</h5>

        <label htmlFor="link">link</label>
        <input type="text" id="link" {...form.register("link")} />
        <h5 className="text-red-500">{form.formState.errors.link?.message}</h5>
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

        <button>완료</button>
      </form>
    </div>
  );
}
