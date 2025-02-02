//import supabase from "../SupabaseFolder/SubapaseClient";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);


// Handling Sala CRUD operations

// GET request handler for Sala (fetch all rooms)
export async function GET() {
  return await GetSala();
}

// POST request handler for inserting a new Sala (create a new room)
export async function POST(request: Request) {
  return await InsertSala(request);
}

// PUT request handler for updating an existing Sala (update a room)
export async function PUT(request: Request) {
  return await UpdateSala(request);
}

// DELETE request handler for deleting a Sala (delete a room)
export async function DELETE(request: Request) {
  return await DeleteSala(request);
}

// **Talkative Functions** for Sala operations

// Fetch all Sala
async function GetSala() {
  try {
    const { data, error } = await supabase.from("Sala").select("*");

    if (error) {
      return new Response("Error fetching Sala: " + error.message, {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new Response("Error fetching Sala: " + err.message, {
        status: 500,
      });
    }
    return new Response("Unknown error occurred while fetching Sala", {
      status: 500,
    });
  }
}

// Insert a new Sala

async function InsertSala(request: Request) {
    try {
      const body = await request.json();
  
      if (!body.nomeSala) {
        return new Response("Missing nomeSala", { status: 400 });
      }
  
      const { data, error } = await supabase.from("Sala").insert([{ NomeSala: body.nomeSala }]);
  
      if (error) {
        console.error("Supabase error:", error);
        return new Response("Error inserting Sala: " + error.message, { status: 500 });
      }
  
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (err) {
      console.error("Unexpected error:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  

// Update an existing Sala
async function UpdateSala(request: Request) {
  try {
    const { idSala, nomeSala } = await request.json();
    const { data, error } = await supabase
      .from("Sala")
      .update({ nomeSala })
      .eq("id", idSala);

    if (error) {
      return new Response("Error updating Sala: " + error.message, {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
        return new Response("Error updating Sala: " + err.message, { status: 500 });
      }
      return new Response('Unknown error occurred while updating Sala', { status: 500 });
    
  }
}

// Delete a Sala and all associated Giocatore entries
async function DeleteSala(request: Request) {
  try {
    const { idSala } = await request.json();

    // First delete Giocatori associated with the Sala
    const { error: deletePlayersError } = await supabase
      .from("Giocatore")
      .delete()
      .eq("IdSala", idSala);

    if (deletePlayersError) {
      return new Response(
        "Error deleting Giocatori: " + deletePlayersError.message,
        { status: 500 }
      );
    }

    // Now delete the Sala itself
    const { data, error } = await supabase
      .from("Sala")
      .delete()
      .eq("id", idSala);

    if (error) {
      return new Response("Error deleting Sala: " + error.message, {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
        return new Response("Error deleting Sala: " + err.message, { status: 500 });
      }
      return new Response('Unknown error occurred while deleting Sala', { status: 500 });
    
  }
}

// Handling Giocatore CRUD operations

// POST request handler for inserting a Giocatore (player) into a Sala
export async function POST_Giocatore(request: Request) {
  return await InsertGiocatore(request);
}

// PUT request handler for updating a Giocatore (update player)
export async function PUT_Giocatore(request: Request) {
  return await UpdateGiocatore(request);
}

// DELETE request handler for deleting a Giocatore (delete player)
export async function DELETE_Giocatore(request: Request) {
  return await DeleteGiocatore(request);
}

// **Talkative Functions** for Giocatore operations

// Insert a new Giocatore
async function InsertGiocatore(request: Request) {
  try {
    const { idSala, nomeGiocatore, ruolo, cartaAssegnata } =
      await request.json();
    const { data, error } = await supabase
      .from("Giocatore")
      .insert([
        {
          IdSala: idSala,
          NomeGiocatore: nomeGiocatore,
          Ruolo: ruolo,
          CartaAssegnata: cartaAssegnata,
        },
      ]);

    if (error) {
      return new Response("Error inserting Giocatore: " + error.message, {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
        return new Response("Error creating Giocatore: " + err.message, {
            status: 500,
          });
      }
      return new Response('Unknown error occurred while creating Giocatore', { status: 500 });
    
  }
}

// Update an existing Giocatore
async function UpdateGiocatore(request: Request) {
  try {
    const { idGiocatore, nomeGiocatore, ruolo, cartaAssegnata } =
      await request.json();
    const { data, error } = await supabase
      .from("Giocatore")
      .update({
        NomeGiocatore: nomeGiocatore,
        Ruolo: ruolo,
        CartaAssegnata: cartaAssegnata,
      })
      .eq("id", idGiocatore);

    if (error) {
      return new Response("Error updating Giocatore: " + error.message, {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
        return new Response("Error updating Giocatore: " + err.message, {
            status: 500,
          });
      }
      return new Response('Unknown error occurred while updating Giocatore', { status: 500 });
    
  }
}

// Delete a Giocatore
async function DeleteGiocatore(request: Request) {
  try {
    const { idGiocatore } = await request.json();
    const { data, error } = await supabase
      .from("Giocatore")
      .delete()
      .eq("id", idGiocatore);

    if (error) {
      return new Response("Error deleting Giocatore: " + error.message, {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
        return new Response("Error deleting Giocatore: " + err.message, {
            status: 500,
          });
      }
      return new Response('Unknown error occurred while deleting Giocatore', { status: 500 });
  }
}
