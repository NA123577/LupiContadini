import { NextResponse } from "next/server";
import supabase from "../../SupabaseClient";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Call Supabase Auth API
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user, session: data.session });
  } catch (error) {
    if(error instanceof Error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    else {
        return NextResponse.json({ error: "Unknown error occurred while logging in" }, { status: 500});
    }
  }
}
