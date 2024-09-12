import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { EssaySchema } from "./page";
import React, { useEffect, useState } from "react";
import { EssayContent } from "@/firebase/firestoreTypes";
import WriteSeries from "./writeSeries";

export default function WriteArea({
  layout,
  form,
}: {
  layout: number;
  form: UseFormReturn<z.infer<typeof EssaySchema>>;
}) {
  const [nowPage, setNowPage] = useState(0);
  const [pageElements, setPageElements] = useState<JSX.Element[]>([]);
  console.log("render", pageElements);

  const deletePage = () => {
    setNowPage(nowPage - 1);
    const newPageElements = [...pageElements];
    newPageElements.pop();
    setPageElements(newPageElements);
  };
  const addPage = () => {
    setNowPage(nowPage + 1);
    const newPageElements = [...pageElements];
    if (newPageElements.length < nowPage + 1) {
      newPageElements.push(<WriteSeries index={nowPage} form={form} />);
    }
    setPageElements(newPageElements);
  };

  if (layout === 2)
    return (
      <div>
        <label htmlFor="info">project description</label>
        <textarea
          className="w-full"
          name="info"
          onChange={(e) => {
            form.setValue("description", e.currentTarget.value.split("\n"));
          }}
        />
        <h3 className="text-red-500">
          {form.formState.errors.description?.message}
        </h3>

        <h3>contents</h3>
        <h3 className="text-red-500">
          {form.formState.errors.contents?.message}
        </h3>
        {pageElements.map((addSeriesDiv, index) => (
          <div key={index} className="border-t border-black p-5">
            {addSeriesDiv}
          </div>
        ))}
        <button
          type="button"
          onClick={addPage}
          className="text-3xl border rounded-md border-black h-10 w-full border-dashed"
        >
          +
        </button>
        <button onClick={() => deletePage()}>삭제</button>
      </div>
    );

  return (
    <div>
      {Array.from({ length: nowPage }).map((_, index) => {
        return <div key={index}>{index}</div>;
      })}

      <button type="button" onClick={() => setNowPage(nowPage + 1)}>
        +
      </button>
    </div>
  );
}
