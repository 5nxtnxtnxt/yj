import { Controller, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { EssaySchema } from "./page";
import { useEffect, useState } from "react";

export default function WriteSeries({
  form,
  index,
}: {
  form: UseFormReturn<z.infer<typeof EssaySchema>>;
  index: number;
}) {
  useEffect(() => {
    const origin = [...form.getValues("contents")];
    if (origin.length > index) return;
    origin.push({
      type: "series",
      title: "",
      order: index,
      imageURL: "",
      text: [""],
      link: "",
      date: "",
    });
    form.setValue("contents", origin);
  }, []);
  return (
    <div className={`py-6 flex flex-col gap-3 `}>
      <div className="flex w-full gap-2">
        <h3>title:</h3>
        <h4>{}</h4>
      </div>
      <div className="flex w-full gap-2">
        <h3>date:</h3> <input className="w-full" type="date" />
        <h3>link:</h3> <input className="w-full" type="text" />
      </div>
      <div>
        image: <input type="file" name="" id="" />
      </div>
      본문 <textarea className="w-full h-48" />
      <div className="flex justify-evenly pointer-events-auto">
        <button
          className=" "
          onClick={() => {
            console.log(form.formState.errors.contents?.[index]);
          }}
        >
          waer
        </button>{" "}
      </div>
    </div>
  );
}
