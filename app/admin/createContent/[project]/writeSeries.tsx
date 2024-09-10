import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { EssaySchema } from "./page";
import { useEffect, useState } from "react";

export default function WriteArea({
  form,
}: {
  form: UseFormReturn<z.infer<typeof EssaySchema>>;
}) {
  return (
    <div className={`py-6 border-b  border-black flex flex-col gap-3 `}>
      <div className="flex w-full gap-2">
        <h3>title:</h3> <input className="w-full" type="text" />
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
        <button className=" " onClick={() => {}}></button>
      </div>
    </div>
  );
}
