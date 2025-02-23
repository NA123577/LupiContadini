import { Sala } from "../Entities/Sala";

export const fetchSalas = async ():Promise<Sala[]> => {
    const response = await fetch("/api/SupabaseFolder/Sala", { method: "GET" });
    if (!response.ok) throw new Error("Error fetching Salas");
    return response.json();
  };
  
  export const createSala = async (nomeSala: string, currentUserId:number) => {
    const response = await fetch("/api/SupabaseFolder/Sala", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomeSala, currentUserId }),
    });
    if (!response.ok) throw new Error("Error creating Sala");
    return response.json();
  };
  
  export const updateSala = async (id: number, newNomeSala: string) => {
    const response = await fetch("/api/SupabaseFolder/Sala", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, newNomeSala }),
    });
  
    if (!response.ok) throw new Error("Error updating Sala");
    return response.json();
  };
  
  export const deleteSala = async (id:number) => {
    console.log(id + '- salaService');
    const response = await fetch("/api/SupabaseFolder/Sala", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idSala : id }),
    });
  
    if (!response.ok) throw new Error("Error deleting Sala");
    return response.json();
  };
  