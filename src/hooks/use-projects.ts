import { useEffect, useState } from "react";
import { getProjects, subscribeProjects, type Project } from "@/lib/projectsStore";

export const useProjects = (): Project[] => {
    const [projects, setProjects] = useState<Project[]>(() => getProjects());

    useEffect(() => {
        return subscribeProjects(() => setProjects(getProjects()));
    }, []);

    return projects;
};
