import supabase from "../SupabaseClient";
import { NextResponse } from "next/server";

// DELETE handler to clean the database
export async function DELETE() {
  try {
    // First delete all rows from Giocatori table
    const { error: deleteGiocatoriError } = await supabase.from("Giocatore").delete().neq("Id", 0);
    console.log(deleteGiocatoriError);
    if (deleteGiocatoriError) {
      throw new Error("Failed to delete Giocatori: " + deleteGiocatoriError.message);
    }

    // Then delete all rows from Sala table
    const { error: deleteSalaError } = await supabase.from("Sala").delete().neq("Id", 0);
    if (deleteSalaError) {
      throw new Error("Failed to delete Sala: " + deleteSalaError.message);
    }

    return NextResponse.json({ message: "Database cleaned successfully!" });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json("Si è verificato un'errore cercando di ripulire il database", { status: 500 });
  }
}
