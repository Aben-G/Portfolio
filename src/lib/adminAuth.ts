const STORAGE_KEY = "ag_admin_session_v1";

type AdminSession = {
    signedInAt: number;
};

const getExpectedCredentials = () => {
    const username = (import.meta.env.VITE_ADMIN_USERNAME as string | undefined) ?? "admin";
    const password = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? "admin123";
    return { username, password };
};

export const isAdminAuthed = (): boolean => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const parsed = JSON.parse(raw) as AdminSession;
        return typeof parsed?.signedInAt === "number";
    } catch {
        return false;
    }
};

export const adminSignIn = async (params: {
    username: string;
    password: string;
}): Promise<{ ok: boolean; message?: string }> => {
    const expected = getExpectedCredentials();
    const username = params.username.trim();

    if (!username || !params.password) {
        return { ok: false, message: "Enter username and password." };
    }

    if (username !== expected.username || params.password !== expected.password) {
        return { ok: false, message: "Invalid credentials." };
    }

    const session: AdminSession = { signedInAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return { ok: true };
};

export const adminSignOut = () => {
    localStorage.removeItem(STORAGE_KEY);
};
