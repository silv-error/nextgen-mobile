// src/api/fetchBusinessProfile.ts
import supabase from "../../lib/supabase";

export async function fetchBusinessProfile() {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log("HELLO FIRST");

    if (authError || !user) {
      console.log("Auth error:", authError);
      return { error: "Unauthorized", profile: null };
    }

    console.log("HELLO SECOND");
    const { data: profile, error: profileError } = await supabase
      .from("business_profiles")
      .select(
        `
    id,
    business_name,
    business_address,
    approval_status,
    approval_date,
    rejection_reason,
    approval_notes,
    created_at,
    updated_at
  `
      )
      .eq("id", user.id) // ✅ match business_profiles.id with auth.users.id
      .maybeSingle();

    if (profileError) {
      console.log("Profile error:", profileError);
      return { error: "Failed to fetch business profile", profile: null };
    }

    console.log("I'M WORKING HERE", profile);

    return { profile };
  } catch (error) {
    console.error("Server error:", error);
    return { error: "Internal server error", profile: null };
  }
}
