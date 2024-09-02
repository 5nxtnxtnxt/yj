import { Essay, EssayContent } from "@/firebase/firestoreTypes";
import { redirect } from "next/navigation";
import Image from "next/image";

const EssayView = ({ data, page }: { data: Essay; page: number }) => {
  const layout = [layout0];
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
      <div className="size-full overflow-y-scroll">
        {data.contents[index].type == "text" && data.contents[index].text}
      </div>
    );
  };
  const ImagePage = ({ index }: { index: number }) => {
    return (
      <div className="size-full">
        {data.contents[index].type == "image" && (
          <Image
            src={data.contents[index].imageURL}
            alt=""
            className="object-contain size-full "
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
      <div className="size-full relative border-r border-black p-10">
        {leftSide.type === "image" ? (
          <ImagePage index={page * 2} />
        ) : (
          <TextPage index={page * 2} />
        )}
      </div>
      <div className="size-full relative p-10">
        {rightSide === undefined ? (
          <EmptyPage />
        ) : rightSide.type === "image" ? (
          <ImagePage index={page * 2 + 1} />
        ) : (
          <TextPage index={page * 2 + 1} />
        )}
      </div>
    </div>
  );
};
export default EssayView;
