import { projects as defaultProjects } from "@/data/portfolio";

export type Project = (typeof defaultProjects)[number];

const STORAGE_KEY = "ag_projects_v1";
const EVENT_NAME = "ag:projects-changed";

const isProject = (value: unknown): value is Project => {
    if (!value || typeof value !== "object") return false;
    const v = value as Record<string, unknown>;
    return (
        typeof v.id === "number" &&
        typeof v.title === "string" &&
        typeof v.description === "string" &&
        typeof v.image === "string" &&
        Array.isArray(v.tags) &&
        typeof v.link === "string"
    );
};

export const getProjects = (): Project[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultProjects;
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) return defaultProjects;
        const cleaned = parsed.filter(isProject);
        return cleaned.length ? cleaned : [];
    } catch {
        return defaultProjects;
    }
};

export const saveProjects = (projects: Project[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    notifyProjectsChanged();
};

export const clearProjectsOverride = () => {
    localStorage.removeItem(STORAGE_KEY);
    notifyProjectsChanged();
};

export const notifyProjectsChanged = () => {
    window.dispatchEvent(new Event(EVENT_NAME));
};

export const subscribeProjects = (listener: () => void) => {
    const onCustom = () => listener();
    const onStorage = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) listener();
    };

    window.addEventListener(EVENT_NAME, onCustom);
    window.addEventListener("storage", onStorage);
    return () => {
        window.removeEventListener(EVENT_NAME, onCustom);
        window.removeEventListener("storage", onStorage);
    };
};

export const getDefaultProjects = () => defaultProjects;
