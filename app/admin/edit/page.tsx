"use client";

import { useEffect, useState } from "react";
import { Project } from "@/firebase/firestoreTypes";
import { getProjectData } from "@/firebase/firestore";

export default function AdminPage() {
  const [projectData, setProjectData] = useState<Project[]>();
  //projectData === undefined 이면 로딩중
  useEffect(() => {
    const getData = async () => {
      setProjectData(await getProjectData());
    };
    getData();
  }, []);

  return <div></div>;
}
