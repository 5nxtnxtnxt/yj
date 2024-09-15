import { Essay, EssayContent } from "@/firebase/firestoreTypes";
import { redirect } from "next/navigation";
import Image from "next/image";

const EssayView = ({ data, page }: { data: Essay; page: number }) => {
  const layout = [layout0, layout1];
  const NowLayout = layout[data.layout];
  return <NowLayout data={data} page={page} />;
};
const layout0 = ({ data, page }: { data: Essay; page: number }) => {
  if (data.contents.length / 2 <= page) redirect("/error");
  const leftSide = data.contents[page * 2];
  const rightSide =
    data.contents.length > page * 2 + 1
      ? data.contents[page * 2 + 1]
      : undefined;
  const TextPage = ({ index }: { index: number }) => {
    return (
      <div className="size-full overflow-y-scroll flex flex-col gap-10">
        {data.contents.findIndex((e) => e.type === "text") === index && (
          <h1 className="text-2xl ">{data.title}</h1>
        )}

        {data.contents[index].type == "text" && (
          <h5 className=" whitespace-pre-line">{data.contents[index].data}</h5>
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
    return <div>empty</div>;
  };
  return (
    <div className="grid grid-cols-2 grid-rows-1 h-full">
      <div className="size-full relative p-10 pb-20 flex flex-col border-r border-black">
        {leftSide.type === "image" ? (
          <ImagePage index={page * 2} />
        ) : (
          <TextPage index={page * 2} />
        )}
        <h6 className="text-center h-20 absolute bottom-0 content-center w-full left-0">
          {page * 2 + 1}
        </h6>
      </div>
      <div className="size-full relative p-10 pb-20 flex flex-coㅣ">
        {rightSide === undefined ? (
          <EmptyPage />
        ) : rightSide.type === "image" ? (
          <ImagePage index={page * 2 + 1} />
        ) : (
          <TextPage index={page * 2 + 1} />
        )}
        {rightSide && (
          <h6 className="text-center h-20 absolute bottom-0 content-center w-full left-0">
            {page * 2 + 2}
          </h6>
        )}
      </div>
    </div>
  );
};

const layout1 = ({ data, page }: { data: Essay; page: number }) => {
  if (page !== 0 || data.layout !== 1) redirect("/error");
  return (
    <div className="size-full relative">
      <Image
        className="object-cover size-full absolute top-0 left-0"
        src={data.contents[0].data}
        alt=""
        width={1000}
        height={1000}
      ></Image>
      <div className="py-40 px-20 md:px-72 size-full absolute top-0 left-0">
        <div className="size-full bg-white flex flex-col p-10 gap-14 overflow-y-scroll">
          <h1 className="text-3xl">{data.title}</h1>
          <h5 className=" whitespace-pre-line">{data.contents[1].data}</h5>
        </div>

        <a
          className="text-white text-center block"
          href={data.link}
          target="_blank"
        >
          전문 보러가기
        </a>
      </div>
    </div>
  );
};
export default EssayView;
