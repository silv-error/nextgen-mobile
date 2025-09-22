import supabase from "../../lib/supabase";

export async function registerUser({
  username,
  email,
  password,
  confirmPassword,
  userType,
  businessData,
  travelerData,
  fullName,
}: any) {
  try {
    // Input validation
    if (!username || !email || !password || !confirmPassword || !userType) {
      throw new Error("Missing required fields");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (userType === "business" && (!businessData?.businessName || !businessData?.businessAddress)) {
      throw new Error("Business name and address are required");
    }

    if (userType === "traveler" && !fullName) {
      throw new Error("Full name is required for travelers");
    }

    // Sign up in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName,
          user_type: userType,
          role: userType === "business" ? "business" : "traveler",
          ...(userType === "business"
            ? {
                business_name: businessData.businessName,
                business_address: businessData.businessAddress,
              }
            : {
                full_name: fullName,
              }),
        },
      },
    });

    if (authError) throw new Error(authError.message);

    // Insert profile row
    if (authData.user) {
      if (userType === "business") {
        await supabase.from("business_profiles").insert({
          id: authData.user.id,
          business_name: businessData.businessName,
          business_address: businessData.businessAddress,
          approval_status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }

      if (userType === "traveler") {
        await supabase.from("traveler_profiles").insert({
          id: authData.user.id,
          full_name: fullName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    }

    return { message: "Registration successful", user: authData.user };
  } catch (err: any) {
    console.error("Registration error:", err.message);
    throw err;
  }
}
