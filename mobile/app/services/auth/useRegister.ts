import supabase from "../../lib/supabase";

export async function registerUser({ username, email, password, userType, businessData, travelerData }: any) {
  try {
    // Input validation
    if (!username || !email || !password || !userType) {
      throw new Error("Missing required fields");
    }

    if (userType === "business" && (!businessData?.businessName || !businessData?.businessAddress)) {
      throw new Error("Business name and address are required");
    }

    if (userType === "traveler" && !travelerData?.fullName) {
      throw new Error("Full name is required for travelers");
    }

    // Sign up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          user_type: userType,
          role: userType === "business" ? "business" : "traveler",
          ...(userType === "business"
            ? {
                business_name: businessData.businessName,
                business_address: businessData.businessAddress,
              }
            : {
                full_name: travelerData.fullName,
              }),
        },
      },
    });

    if (authError) {
      console.error("Supabase auth error:", authError.message);
      throw new Error(authError.message);
    }

    // Insert profile row (optional, only if RLS allows it)
    if (authData.user) {
      if (userType === "business") {
        const { error: businessError } = await supabase.from("business_profiles").insert({
          id: authData.user.id,
          business_name: businessData.businessName,
          business_address: businessData.businessAddress,
          approval_status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (businessError) {
          console.error("Business profile error:", businessError.message);
        }
      }

      if (userType === "traveler") {
        const { error: travelerError } = await supabase.from("traveler_profiles").insert({
          id: authData.user.id,
          full_name: travelerData.fullName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (travelerError) {
          console.error("Traveler profile error:", travelerError.message);
        }
      }
    }

    return {
      message: "Registration successful",
      user: authData.user,
    };
  } catch (err: any) {
    console.error("Registration error:", err.message);
    throw err;
  }
}
