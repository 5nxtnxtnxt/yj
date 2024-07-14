import { MyData } from "@/utils/notion";
import Link from "next/link";

interface NavProps extends React.ImgHTMLAttributes<HTMLDivElement> {
  data: MyData;
}

export default function NavigationBar({ data, ...props }: NavProps) {
  const projects = Object.keys(data);

  return (
    <div className={`flex flex-col z-40 gap-14 p-5 ${props.className}`}>
      <Link href={"/"}>
        <h1 className="text-2xl">예진으로부터</h1>
      </Link>
      <div className="">
        {projects.map((project, index) => (
          <div key={index}>
            <h2 className="text-base">{project}</h2>
            {/* <ul>
              {data[project].map((e, index) => (
                <li key={index} className="text-sm">
                  {e.title}
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </div>
    </div>
  );
}
