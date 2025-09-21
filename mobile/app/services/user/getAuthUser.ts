import supabase from "../../lib/supabase";
import { getSession } from "../storage";

export async function fetchUserProfile() {
  try {
    // 1. Get current session
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    // 2. Get user object
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const userType = user.user_metadata?.user_type;
    const userRole = user.user_metadata?.role;

    let profile = null;

    if (userRole === "superadmin") {
      profile = {
        id: user.id,
        full_name: user.user_metadata?.full_name || "Superadmin",
        email: user.email,
        created_at: user.created_at,
      };
    } else if (userType === "business") {
      const { data, error } = await supabase.from("business_profiles").select("*").eq("id", user.id).maybeSingle();

      if (error) throw error;
      profile = data;
    } else {
      const { data, error } = await supabase.from("traveler_profiles").select("*").eq("id", user.id).maybeSingle();

      if (error) throw error;
      profile = data;
    }

    return { profile, userType, userRole };
  } catch (err: any) {
    console.error("Fetch profile error:", err.message);
    throw err;
  }
}
