import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { EssaySchema } from "./page";
import { useEffect, useState } from "react";
import { EssayContent } from "@/firebase/firestoreTypes";

export default function WriteArea({
  layout,
  form,
}: {
  layout: number;
  form: UseFormReturn<z.infer<typeof EssaySchema>>;
}) {
  const [nowPage, setNowPage] = useState(1);
  const [editable, setEditable] = useState<boolean[]>([true]);
  useEffect(() => {
    if (editable.length < nowPage) {
      setEditable([...editable, true]);
    }
  }, [nowPage]);

  const saveClick = (index: number) => {
    const edit = [...editable];
    edit[index] = !edit[index];
    const newContents = form.getValues("contents");
    if (layout === 2) {
      newContents[index + 1];
    }

    setEditable(edit);
  };
  const deletePage = () => {
    const newEdit = [...editable];
    newEdit.pop();
    setEditable(newEdit);
    setNowPage(nowPage - 1);
  };
  if (layout === 2)
    return (
      <div>
        <label htmlFor="info">project description</label>
        <textarea
          className="w-full"
          name="info"
          onChange={(e) => {
            const origin = form.getValues("contents");
            if (origin[0].type === "text")
              origin[0].text = e.currentTarget.value.split("\n");
            form.setValue("contents", origin);
          }}
        />
        {Array.from({ length: nowPage }).map((_, index) => {
          return (
            <div
              key={index}
              className={`py-6 border-b  border-black flex flex-col gap-3 ${
                editable[index] === false && "pointer-events-none opacity-50"
              }`}
            >
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
                <button
                  className=" "
                  onClick={() => {
                    saveClick(index);
                  }}
                >
                  {editable[index] ? "추가" : "수정"}
                </button>
              </div>
            </div>
          );
        })}

        {/* <button type="button" onClick={() => setNowPage(nowPage + 1)}>
          +
        </button>
        <button
          type="button"
          onClick={() => {
            deletePage();
          }}
        >
          -
        </button> */}
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
