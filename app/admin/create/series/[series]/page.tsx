"use client";

import {
  getProjectData,
  updateProject,
  updateSeries,
  uploadImageToFireStroage,
} from "@/firebase/firestore";
import {
  EssayContent,
  Project,
  Series,
  YJData,
} from "@/firebase/firestoreTypes";
import * as zod from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ProjectSchema = z.object({
  title: z.string().min(2),
  date: z.string().min(8),
  thumbnail: z.string().min(1, "썸네일을 선택해주세요"),
  description: z.string().min(1),
  onMain: z.boolean(),
  top: z.number(),
  left: z.number(),
  depth: z.number(),
  width: z.number(),
});

export default function CreateProjectPage({
  params,
}: {
  params: { series: string };
}) {
  const seriesTitle = decodeURIComponent(params.series);
  const [YJData, setYJData] = useState<YJData>();
  const [nowData, setNowData] = useState<number>();
  const [onMain, setOnMain] = useState(true);
  const [thumbnail, setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zod.zodResolver(ProjectSchema),
    defaultValues: {
      thumbnail: "",
      onMain: true,
      top: 50,
      left: 50,
      depth: 2,
      width: 50,
    },
  });
  useEffect(() => {
    const loadNowData = async () => {
      const data = await getProjectData();
      setYJData(data);
      const nowSeries = data.series.findIndex((e) => e.title === seriesTitle);
      if (nowSeries < 0) {
        router.push("/admin");
      }
      setNowData(nowSeries);
    };
    loadNowData();
  }, []);

  const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
    if (nowData === undefined) return;
    console.log(values);
    const origin: Series[] = JSON.parse(JSON.stringify(YJData?.series));
    origin[nowData].seriesProjects.push({
      ...values,
      seriesContents: [],
    });
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
    form.setValue("thumbnail", uploadedUrl);
    form.trigger("thumbnail");

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
          시리즈 [{YJData?.series[nowData].title}] 프로젝트 추가
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="title">title</label>
          <input
            className="bg-bg-white border rounded-md border-black border-dashed"
            type="text"
            id="title"
            {...form.register("title")}
          />
          <h5 className="text-red-500">
            {form.formState.errors.title?.message}
          </h5>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description">description</label>
          <input
            className="bg-bg-white border rounded-md border-black border-dashed"
            type="text"
            id="description"
            {...form.register("description")}
          />
          <h5 className="text-red-500">
            {form.formState.errors.description?.message}
          </h5>
        </div>

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
        <div>
          <h3>thumbnail</h3>
          {thumbnail !== "" && <img className="w-1/2" src={thumbnail}></img>}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e)}
          />
          <h5 className="text-red-500">
            {form.formState.errors.thumbnail?.message}
          </h5>
        </div>
        <div>
          <h3>date</h3>
          <input
            className="bg-bg-white border rounded-md border-black border-dashed"
            type="date"
            {...form.register("date")}
          />
        </div>
        <button>완료</button>
      </form>
    </div>
  );
}
