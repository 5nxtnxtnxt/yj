"use client";

import { Essay } from "@/firebase/firestoreTypes";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "@/hook/useMediaQuery";

const EssayView = ({ data }: { data: Essay }) => {
  const layout = [Layout0, Layout1];
  const NowLayout = layout[data.layout];
  return <NowLayout data={data} />;
};
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

//책레이아웃
const Layout0 = ({ data }: { data: Essay }) => {
  // if (data.contents.length / 2 <= page) redirect("/error");

  const [isLoading, setIsLoading] = useState(true);
  const [nowPage, setNowPage] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const first = useRef<HTMLDivElement>(null);
  const test = useRef<HTMLDivElement>(null);
  const text = data.text;
  const [texts, setTexts] = useState<string[]>([]);
  useEffect(() => {
    if (test.current === null) return;

    const spliteText = (
      text: string,
      firstArea: HTMLElement,
      area: HTMLElement
    ) => {
      const newTexts: string[] = [];
      const splitedText = text.replaceAll("\n", " \n ").split(" ");

      let nowText = "";
      splitedText.forEach((word, index) => {
        let target = area;
        if (newTexts.length === 0) {
          target = firstArea;
        }
        target.innerText = nowText + " " + word;

        if (target.scrollHeight > target.clientHeight) {
          console.log(
            target.scrollHeight,
            target.clientHeight,
            target.innerText,
            "-------------------------"
          );
          newTexts.push(nowText);
          nowText = word;

          return;
        }
        if (splitedText.length === index + 1) newTexts.push(nowText + word);
        nowText += " " + word;
      });

      //area.innerText = newTexts[0];
      console.log(newTexts);
      setIsLoading(false);
      return newTexts;
    };
    const handleResize = debounce(() => {
      if (test.current === null || first.current === null) return;
      setTexts(spliteText(text, first.current, test.current));
    }, 100); // 100ms의 지연 시간 설정

    handleResize();
    window.addEventListener("resize", handleResize);

    window.addEventListener("resize", () => {
      setIsLoading(true);
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", () => {
        setIsLoading(true);
      });
    };
  }, []);

  useEffect(() => {
    console.log("nowPage", nowPage, " newTexts", texts.length);
    // if (nowPage > texts.length / 2 - 1) {
    //   setNowPage(Math.floor(texts.length / 2) - 1);
    // }
  }, [texts]);
  console.log("!!", texts);
  console.log(isLoading);

  return (
    <>
      {isLoading ? (
        <div className="size-full bg-bg-white absolute z-50 flex items-center justify-center">
          <h1 className="text-3xl animate-bounce">loading...</h1>
        </div>
      ) : null}

      {isMobile ? (
        <div className="size-full relative flex flex-col border-r-[0.5px] border-border-black whitespace-pre-line px-14">
          <div className=" size-full relative overflow-hidden">
            {nowPage > 0 ? (
              <div className="flex flex-col size-full gap-10 pt-20 pb-[9.375rem]">
                {nowPage === 1 ? (
                  <h1 className="text-[2.5rem] break-keep">{data.title}</h1>
                ) : null}
                <h4 className="size-full overflow-hidden">
                  {texts[nowPage - 1]}
                </h4>
                {data.link !== "" ? (
                  <a
                    className="text-center absolute bottom-20 inline-block w-full"
                    href={data.link}
                    target="_blank"
                  >
                    전문 구매하기 {">"}
                  </a>
                ) : null}
              </div>
            ) : (
              <Image
                width={1000}
                height={1000}
                src={data.firstImage}
                alt="image"
                className="size-full object-contain"
              ></Image>
            )}

            {/* 텍스트 자르기 계산용 */}
            <div className="absolute size-full top-0 opacity-0 ">
              <div className="flex flex-col size-full gap-10 pt-20 pb-[9.375rem] bg-white">
                <h1 className="text-[2.5rem] break-keep border border-red-400">
                  {data.title}
                </h1>
                <div
                  className=" flex-grow overflow-hidden border border-red-400"
                  ref={first}
                ></div>
              </div>
              <div
                className="size-full max-h-full absolute pt-20 pb-[9.375rem] top-0 left-0  overflow-hidden"
                ref={test}
              ></div>
            </div>
          </div>
          {nowPage > 0 ? (
            <button
              onClick={() => setNowPage(nowPage - 1)}
              className="absolute left-2 top-1/2 size-8 bg-opacity-50 bg-white shadow rounded-full flex items-center justify-center"
            >
              <Image
                className="w-2"
                width={0}
                height={0}
                src="/left.svg"
                alt="leftPage"
              ></Image>
            </button>
          ) : null}
          {texts.length > nowPage ? (
            <button
              onClick={() => setNowPage(nowPage + 1)}
              className="absolute right-2 top-1/2 size-8 bg-opacity-50 bg-white shadow rounded-full flex items-center justify-center"
            >
              <Image
                className="w-2"
                width={0}
                height={0}
                src="/right.svg"
                alt="rightPage"
              ></Image>
            </button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-2 grid-rows-1 h-full px-36 whitespace-pre-line ">
          {/* 왼쪽화면 */}
          <div className="size-full relative flex flex-col border-r-[0.5px] border-border-black pr-12">
            <div className=" size-full my-[12.5rem] relative overflow-hidden">
              {nowPage > 0 ? (
                <h4 className=" size-full">{texts[nowPage * 2 - 1]}</h4>
              ) : (
                <Image
                  width={1000}
                  height={1000}
                  src={data.firstImage}
                  alt="image"
                  className="size-full object-contain"
                ></Image>
              )}

              {/* 텍스트 자르기 계산용 */}
              <div className="absolute size-full top-0 opacity-0">
                <div className="flex flex-col size-full gap-20 ">
                  <h1 className="text-[2.5rem] break-keep">{data.title}</h1>
                  <div className=" flex-grow overflow-hidden" ref={first}></div>
                </div>
                <div
                  className="size-full max-h-full absolute top-0 left-0  overflow-hidden"
                  ref={test}
                ></div>
              </div>
            </div>
          </div>
          {/* 오른쪽화면 */}
          <div className="size-full relative  flex flex-col pl-12 border-l-[0.5px]">
            <div className=" size-full my-[12.5rem] overflow-y-hidden">
              {nowPage > 0 ? (
                <h4 className=" size-full">{texts[nowPage * 2]}</h4>
              ) : (
                <div className="size-full flex gap-20 flex-col">
                  <h1 className="text-[2.5rem] break-keep">{data.title}</h1>
                  <h4>{texts[nowPage * 2]}</h4>
                </div>
              )}
            </div>
            {data.link !== "" && (texts.length + 1) / 2 - 1 <= nowPage ? (
              <a
                className="text-center absolute bottom-32 block w-full"
                href={data.link}
                target="_blank"
              >
                전문 구매하기 {">"}
              </a>
            ) : null}
          </div>
          {nowPage > 0 ? (
            <button
              onClick={() => setNowPage(nowPage - 1)}
              className="absolute left-2 top-1/2 size-8 bg-opacity-50 bg-white shadow rounded-full flex items-center justify-center"
            >
              <Image
                className="w-2"
                width={0}
                height={0}
                src="/left.svg"
                alt="leftPage"
              ></Image>
            </button>
          ) : null}
          {(texts.length + 1) / 2 - 1 > nowPage && (
            <button
              onClick={() => setNowPage(nowPage + 1)}
              className="absolute right-2 top-1/2 size-8 bg-opacity-50 bg-white shadow rounded-full flex items-center justify-center"
            >
              <Image
                className="w-2"
                width={0}
                height={0}
                src="/right.svg"
                alt="rightPage"
              ></Image>
            </button>
          )}
        </div>
      )}
    </>
  );
};

const Layout1 = ({ data }: { data: Essay }) => {
  const router = useRouter();
  if (data.layout !== 1) redirect("/error");
  const imagesrc = data.firstImage;
  const text = data.text;
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
          <div className="bg-bg-white flex flex-col p-[3.125rem] gap-20 min-h-full">
            <h1 className="text-[2.5rem]">{data.title}</h1>
            <h5 className=" whitespace-pre-line text-lg leading-8">{text}</h5>
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
