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
});

export default function CreateProjectPage({
  params,
}: {
  params: { series: string };
}) {
  const seriesTitle = decodeURIComponent(params.series);
  const [YJData, setYJData] = useState<YJData>();
  const [nowData, setNowData] = useState<number>();
  const [thumbnail, setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zod.zodResolver(ProjectSchema),
    defaultValues: {
      thumbnail: "",
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
            className="bg-bg-white border rounded-md border-border-black border-dashed"
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
          <textarea
            className="bg-bg-white border rounded-md border-border-black border-dashed"
            id="description"
            {...form.register("description")}
          />
          <h5 className="text-red-500">
            {form.formState.errors.description?.message}
          </h5>
        </div>

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
            className="bg-bg-white border rounded-md border-border-black border-dashed"
            type="date"
            {...form.register("date")}
          />
        </div>
        <button>완료</button>
      </form>
    </div>
  );
}
