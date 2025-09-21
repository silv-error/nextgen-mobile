// services/auth.ts
import supabase from "../../lib/supabase";
import { clearSession } from "../storage"; // where you store session

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    // Clear secure storage
    await clearSession();

    return { success: true };
  } catch (err: any) {
    console.error("Logout error:", err.message);
    throw new Error(err.message || "Failed to logout");
  }
}
