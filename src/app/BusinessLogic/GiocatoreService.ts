import { Giocatore } from "../Entities/Giocatore";

export const createGiocatore = async (nomeGiocatore:string):Promise<Giocatore[]> => {
    const response = await fetch("/api/SupabaseFolder/Giocatore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomeGiocatore}),
    });
    console.log(response);
    if (!response.ok) throw new Error("Error creating giocatore");
    return response.json();
  };