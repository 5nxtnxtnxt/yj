"use client";

import { updateProject, getProjectData } from "@/firebase/firestore";
import { Project, YJData } from "@/firebase/firestoreTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ProjectSchema = z.object({
  title: z.string().min(2, "두글자 이상 작성해주세요"),
  infoTitle: z.string().min(2, "두글자 이상 작성해주세요"),
  infoContent: z.string().min(2, "두글자 이상 작성해주세요"),
  visible: z.boolean(),
});

export default function CreateProjectPage() {
  const [nowData, setNowData] = useState<YJData>();
  const router = useRouter();
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      visible: true,
    },
  });
  useEffect(() => {
    const loadNowData = async () => {
      const data = await getProjectData();
      setNowData(data);
    };
    loadNowData();
  }, []);

  const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
    console.log(values);
    const origin: Project[] = JSON.parse(JSON.stringify(nowData?.projects));
    origin.push({ ...values, essays: [] });
    const result = await updateProject(origin);
    // console.log(result, "!!!!!!!!!");
    if (result) {
      router.push("/admin");
    }
  };
  return (
    <div className="size-full">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col p-10 gap-3"
      >
        <h1 className="text-2xl">새 프로젝트 추가</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="title">title</label>
          <input
            className="bg-bg-white border border-black rounded-md border-dashed"
            type="text"
            id="title"
            {...form.register("title")}
          />
          <h5 className="text-red-500">
            {form.formState.errors.title?.message}
          </h5>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="infoTitle">infoTitle</label>
          <input
            className="bg-bg-white border border-black rounded-md border-dashed"
            type="text"
            id="infoTitle"
            {...form.register("infoTitle")}
          />
          <h5 className="text-red-500">
            {form.formState.errors.infoTitle?.message}
          </h5>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="infoContent">infoContent</label>
          <textarea
            id="infoContent"
            className="bg-bg-white border border-black rounded-md border-dashed h-56"
            {...form.register("infoContent")}
          />
          <h5 className="text-red-500">
            {form.formState.errors.infoContent?.message}
          </h5>
        </div>
        <button>완료</button>
      </form>
    </div>
  );
}
