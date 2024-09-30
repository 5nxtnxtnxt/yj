"use client";

import { Essay, EssayContent } from "@/firebase/firestoreTypes";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const EssayView = ({ data, page }: { data: Essay; page: number }) => {
  const layout = [Layout0, Layout1];
  const NowLayout = layout[data.layout];
  return <NowLayout data={data} page={page} />;
};
const Layout0 = ({ data, page }: { data: Essay; page: number }) => {
  if (data.contents.length / 2 <= page) redirect("/error");
  const [nowPage, setNowPage] = useState(page * 2);
  const leftSide = data.contents[page * 2];
  const rightSide =
    data.contents.length > page * 2 + 1
      ? data.contents[page * 2 + 1]
      : undefined;
  const TextPage = ({ index }: { index: number }) => {
    return (
      <div className="size-full flex flex-col md:gap-20 gap-10 ">
        {data.contents.findIndex((e) => e.type === "text") === index && (
          <h1 className="text-4xl ">{data.title}</h1>
        )}

        {data.contents[index].type == "text" && (
          <div className="w-full flex-grow  md:pr-[3.125rem] p-2 overflow-y-auto">
            <h5 className=" whitespace-pre-line">
              {data.contents[index].data}
            </h5>
          </div>
        )}
      </div>
    );
  };
  const ImagePage = ({ index }: { index: number }) => {
    return (
      <div className="size-full ">
        {data.contents[index].type === "image" && (
          <Image
            src={data.contents[index].data}
            alt="tt"
            className="size-full object-contain"
            width={1000}
            height={1000}
          />
        )}
      </div>
    );
  };
  const EmptyPage = () => {
    return <div></div>;
  };

  return (
    <>
      <div className="md:hidden bg-bg-white z-[60] p-10 pb-20 relative size-full">
        {nowPage > 0 && (
          <button
            onClick={() => setNowPage(nowPage - 1)}
            className="absolute text-sm left-2 top-1/2 size-6 bg-opacity-50 bg-white shadow rounded-full text-center content-center"
          >
            {"<"}
          </button>
        )}

        <div className="size-full relative ">
          {data.contents[nowPage].type === "image" ? (
            <ImagePage index={nowPage} />
          ) : (
            <TextPage index={nowPage} />
          )}
        </div>
        <div className=" text-center w-full h-20 absolute left-0 bottom-0 flex items-center justify-center">
          <h6 className="text-lg">{nowPage + 1}</h6>
        </div>
        {nowPage + 1 < data.contents.length && (
          <button
            onClick={() => setNowPage(nowPage + 1)}
            className="absolute text-sm right-2 top-1/2 size-6 bg-opacity-50 bg-white shadow rounded-full text-center content-center"
          >
            {">"}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 grid-rows-1 h-full max-md:hidden  ">
        {leftSide.type === "image" ? (
          <div className="size-full relative py-[12.5rem] px-[3.125rem] flex flex-col border-r border-black ">
            <ImagePage index={page * 2} />
            <h6 className="text-center absolute bottom-[3.125rem] content-center w-full left-0">
              {page * 2 + 1}
            </h6>
          </div>
        ) : (
          <div className="size-full relative py-[12.5rem] pl-36 flex flex-col border-r border-black ">
            <TextPage index={page * 2} />
            <h6 className="text-center absolute bottom-[3.125rem] content-center w-full left-0">
              {page * 2 + 1}
            </h6>
          </div>
        )}

        {rightSide === undefined ? (
          <EmptyPage />
        ) : rightSide.type === "image" ? (
          <div className="size-full relative py-[12.5rem] px-[3.125rem] flex flex-col ">
            <ImagePage index={page * 2 + 1} />
            {rightSide && (
              <h6 className="text-center absolute bottom-[3.125rem] content-center w-full left-0">
                {page * 2 + 2}
              </h6>
            )}
          </div>
        ) : (
          <div className="size-full  relative py-[12.5rem] pr-[6.25rem] pl-[3.125rem] flex flex-col">
            <TextPage index={page * 2 + 1} />
            {rightSide && (
              <h6 className="text-center absolute bottom-[3.125rem] content-center w-full left-0">
                {page * 2 + 2}
              </h6>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const Layout1 = ({ data, page }: { data: Essay; page: number }) => {
  const router = useRouter();
  if (page !== 0 || data.layout !== 1) redirect("/error");
  const imagesrc = data.contents.find((e) => e.type === "image")?.data;
  const text = data.contents.find((e) => e.type === "text")?.data;
  if (imagesrc === undefined || text === undefined) {
    router.push("/404");
    return <div></div>;
  }
  return (
    <div className="size-full relative">
      <Image
        className="object-cover size-full absolute top-0 left-0"
        src={imagesrc}
        alt=""
        width={1000}
        height={1000}
      ></Image>
      <div className="pt-16 flex flex-col gap-[3.125rem] md:py-32 px-5 md:px-[20rem] size-full absolute top-0 left-0 p-10">
        <div className="px-4 relative size-full overflow-y-auto">
          <div className="bg-white flex flex-col p-[3.125rem] gap-20 min-h-full">
            <h1 className="text-[2.5rem]">{data.title}</h1>
            <h5 className=" whitespace-pre-line">{text}</h5>
          </div>
        </div>
        <a
          className="text-white text-center block"
          href={data.link}
          target="_blank"
        >
          전문 구매하기 {">"}
        </a>
      </div>
    </div>
  );
};
export default EssayView;
