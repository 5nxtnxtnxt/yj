import Link from "next/link";
import { Project } from "@/firebase/firestoreTypes.d";

export default function NavigationBar({ data }: { data: Project[] }) {
  return (
    <div className="w-80 h-screen border-r border-black fixed">
      <Link href={"/"}>
        <div className="flex flex-col items-center border-b border-black h-40 justify-center">
          <h1 className="text-4xl">예진으로부터</h1>
          <h3 className="text-2xl">fromfor.hyunye</h3>
        </div>
      </Link>
      <div className="flex flex-col p-10 gap-10">
        {data.map((project, index) => {
          return (
            <div key={index}>
              <h2 className="text-xl">{project.title}</h2>
              {project.essays.map((essay) => {
                return (
                  <h3
                    key={`${project.title}${index}`}
                    className="text-base ml-10"
                  >
                    {essay.title}
                  </h3>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
