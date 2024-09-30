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
});

export default function CreateProjectPage({
  params,
}: {
  params: { series: string; project: string };
}) {
  const seriesTitle = decodeURIComponent(params.series);
  const projectTitle = decodeURIComponent(params.project);
  const [YJData, setYJData] = useState<YJData>();
  const [nowSeriesIndex, setNowSeriesIndex] = useState<number>();
  const [nowProjectIndex, setNowProjectIndex] = useState<number>();
  const [onMain, setOnMain] = useState(true);
  const [thumbnail, setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zod.zodResolver(ProjectSchema),
    defaultValues: {
      image: "",
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
      const nowProject = data.series[nowSeries].seriesProjects.findIndex(
        (e) => e.title === projectTitle
      );
      setNowSeriesIndex(nowSeries);
      setNowProjectIndex(nowProject);
    };
    loadNowData();
  }, [seriesTitle, projectTitle, router]);

  const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
    if (nowSeriesIndex === undefined || nowProjectIndex === undefined) return;
    console.log(values);
    const origin: Series[] = JSON.parse(JSON.stringify(YJData?.series));
    origin[nowSeriesIndex].seriesProjects[nowProjectIndex].seriesContents.push({
      ...values,
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
    form.setValue("image", uploadedUrl);

    setUploading(false);
  };

  if (nowProjectIndex === undefined || nowSeriesIndex === undefined)
    return <div>loading...</div>;

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
          시리즈 프로젝트 [
          {YJData?.series[nowSeriesIndex].seriesProjects[nowProjectIndex].title}
          ] 에세이 추가
        </h1>

        <label htmlFor="title">title</label>
        <input type="text" id="title" {...form.register("title")} />
        <h5 className="text-red-500">{form.formState.errors.title?.message}</h5>
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
