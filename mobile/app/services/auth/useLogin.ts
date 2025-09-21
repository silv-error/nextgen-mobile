import supabase from "../../lib/supabase";
import { saveSession } from "../storage";
import { getSession, clearSession } from "../storage";

export async function loginUser(email: string, password: string) {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !session) {
      throw new Error(error?.message || "Authentication failed");
    }

    // 👤 Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, email, user_type, role")
      .eq("id", session.user.id)
      .single();

    if (profileError || !profile) {
      throw new Error("Profile not found");
    }

    // 🔐 Save tokens
    await saveSession(session);

    return { user: session.user, session, profile };
  } catch (err: any) {
    console.error("Login error:", err.message);
    throw err;
  }
}

export async function restoreSession() {
  const { accessToken, refreshToken } = await getSession();

  if (!accessToken || !refreshToken) return null;

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    console.error("Session restore error:", error.message);
    await clearSession();
    return null;
  }

  return data.session;
}
