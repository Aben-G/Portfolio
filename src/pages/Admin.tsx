import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminSignIn, adminSignOut, isAdminAuthed } from "@/lib/adminAuth";
import {
    clearProjectsOverride,
    getDefaultProjects,
    getProjects,
    saveProjects,
    type Project,
} from "@/lib/projectsStore";

const Admin = () => {
    const [authed, setAuthed] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formImage, setFormImage] = useState("");
    const [formTags, setFormTags] = useState("");
    const [formLink, setFormLink] = useState("");
    const [saveError, setSaveError] = useState<string | null>(null);

    useEffect(() => {
        setAuthed(isAdminAuthed());
    }, []);

    useEffect(() => {
        if (!authed) return;
        setProjects(getProjects());
    }, [authed]);

    const title = useMemo(() => (authed ? "Admin" : "Admin Sign In"), [authed]);

    const resetForm = () => {
        setEditingId(null);
        setFormTitle("");
        setFormDescription("");
        setFormImage("");
        setFormTags("");
        setFormLink("");
        setSaveError(null);
    };

    const startEdit = (project: Project) => {
        setEditingId(project.id);
        setFormTitle(project.title);
        setFormDescription(project.description);
        setFormImage(project.image);
        setFormTags(project.tags.join(", "));
        setFormLink(project.link);
        setSaveError(null);
    };

    const parseTags = (value: string) => {
        return value
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
    };

    const handleSaveProject = (e: React.FormEvent) => {
        e.preventDefault();
        setSaveError(null);

        const nextTitle = formTitle.trim();
        const nextDescription = formDescription.trim();
        const nextImage = formImage.trim();
        const nextLink = formLink.trim() || "#";
        const nextTags = parseTags(formTags);

        if (!nextTitle) return setSaveError("Title is required.");
        if (!nextDescription) return setSaveError("Description is required.");
        if (!nextImage) return setSaveError("Image path/URL is required.");

        const current = getProjects();
        const maxId = current.reduce((m, p) => Math.max(m, p.id), 0);
        const id = editingId ?? maxId + 1;

        const nextProject: Project = {
            id,
            title: nextTitle,
            description: nextDescription,
            image: nextImage,
            tags: nextTags,
            link: nextLink,
        };

        const updated = editingId
            ? current.map((p) => (p.id === editingId ? nextProject : p))
            : [nextProject, ...current];

        saveProjects(updated);
        setProjects(updated);
        resetForm();
    };

    const handleDeleteProject = (id: number) => {
        const current = getProjects();
        const updated = current.filter((p) => p.id !== id);
        saveProjects(updated);
        setProjects(updated);
        if (editingId === id) resetForm();
    };

    const handleResetProjects = () => {
        clearProjectsOverride();
        const defaults = getDefaultProjects();
        setProjects(defaults);
        resetForm();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const result = await adminSignIn({ username, password });
            if (!result.ok) {
                setError(result.message ?? "Sign in failed.");
                return;
            }
            setAuthed(true);
            setPassword("");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSignOut = () => {
        adminSignOut();
        setAuthed(false);
        setUsername("");
        setPassword("");
        setError(null);
        setProjects([]);
        resetForm();
    };

    return (
        <div className="min-h-screen bg-muted">
            <div
                className={
                    authed
                        ? "mx-auto w-full max-w-6xl p-6"
                        : "mx-auto flex min-h-screen w-full max-w-lg items-center justify-center p-6"
                }
            >
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>
                            {authed
                                ? "You are signed in."
                                : "Front-end only sign-in (no backend)."}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {!authed ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="admin-username">Username</Label>
                                    <Input
                                        id="admin-username"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="admin"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="admin-password">Password</Label>
                                    <Input
                                        id="admin-password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>

                                {error ? (
                                    <p className="text-sm text-destructive">{error}</p>
                                ) : null}

                                <Button type="submit" className="w-full" disabled={submitting}>
                                    {submitting ? "Signing in…" : "Sign in"}
                                </Button>

                                <p className="text-xs text-muted-foreground">
                                    Default credentials are `admin` / `admin123` (can be overridden via
                                    `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD`).
                                </p>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="rounded-md border bg-background p-4 w-full">
                                        <p className="text-sm text-muted-foreground">Admin panel</p>
                                        <p className="mt-1 text-sm">
                                            Manage projects shown on the website.
                                        </p>
                                    </div>
                                    <div className="flex gap-2 sm:justify-end">
                                        <Button
                                            variant="outline"
                                            onClick={() => (window.location.href = "/")}
                                            type="button"
                                        >
                                            Go to site
                                        </Button>
                                        <Button variant="destructive" onClick={handleSignOut} type="button">
                                            Sign out
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Projects</CardTitle>
                                            <CardDescription>
                                                These are saved in your browser via localStorage.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex gap-2">
                                                <Button type="button" variant="outline" onClick={resetForm}>
                                                    New project
                                                </Button>
                                                <Button type="button" variant="outline" onClick={handleResetProjects}>
                                                    Reset to defaults
                                                </Button>
                                            </div>

                                            <div className="space-y-2">
                                                {projects.map((p) => (
                                                    <div
                                                        key={p.id}
                                                        className="flex items-start justify-between gap-3 rounded-md border bg-background p-3"
                                                    >
                                                        <div className="min-w-0">
                                                            <p className="font-medium truncate">{p.title}</p>
                                                            <p className="text-xs text-muted-foreground truncate">
                                                                {p.link}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => startEdit(p)}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                onClick={() => handleDeleteProject(p.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {projects.length === 0 ? (
                                                    <p className="text-sm text-muted-foreground">
                                                        No projects yet. Create one on the right.
                                                    </p>
                                                ) : null}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{editingId ? "Edit project" : "Add project"}</CardTitle>
                                            <CardDescription>
                                                Tags are comma-separated.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleSaveProject} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="p-title">Title</Label>
                                                    <Input
                                                        id="p-title"
                                                        value={formTitle}
                                                        onChange={(e) => setFormTitle(e.target.value)}
                                                        placeholder="Project title"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="p-description">Description</Label>
                                                    <Textarea
                                                        id="p-description"
                                                        value={formDescription}
                                                        onChange={(e) => setFormDescription(e.target.value)}
                                                        placeholder="What is this project about?"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="p-image">Image</Label>
                                                    <Input
                                                        id="p-image"
                                                        value={formImage}
                                                        onChange={(e) => setFormImage(e.target.value)}
                                                        placeholder="/my-image.webp or https://..."
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="p-tags">Tags</Label>
                                                    <Input
                                                        id="p-tags"
                                                        value={formTags}
                                                        onChange={(e) => setFormTags(e.target.value)}
                                                        placeholder="React, TypeScript, API"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="p-link">Link</Label>
                                                    <Input
                                                        id="p-link"
                                                        value={formLink}
                                                        onChange={(e) => setFormLink(e.target.value)}
                                                        placeholder="https://... or #"
                                                    />
                                                </div>

                                                {saveError ? (
                                                    <p className="text-sm text-destructive">{saveError}</p>
                                                ) : null}

                                                <div className="flex gap-2">
                                                    <Button type="submit">
                                                        {editingId ? "Save changes" : "Add project"}
                                                    </Button>
                                                    {editingId ? (
                                                        <Button type="button" variant="outline" onClick={resetForm}>
                                                            Cancel
                                                        </Button>
                                                    ) : null}
                                                </div>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Admin;
