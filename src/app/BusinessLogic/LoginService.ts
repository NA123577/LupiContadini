export const signIn = async (email: string, password?: string) => {
    const response = await fetch("/api/SupabaseFolder/auth/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) throw new Error("Login Failed");
    return response.json();
  };