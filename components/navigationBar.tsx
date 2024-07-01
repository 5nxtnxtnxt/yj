import { MyData } from "@/utils/notion";

export default function NavigationBar({ data }: { data: MyData }) {
  const projects = Object.keys(data);

  return (
    <div className="fixed flex flex-col z-40 gap-14 p-5">
      <h1 className="text-2xl">예진으로부터</h1>
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
