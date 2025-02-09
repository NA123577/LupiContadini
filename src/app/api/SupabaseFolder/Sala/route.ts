import supabase from "../SupabaseClient";

// Handling Sala CRUD operations
// GET request handler for Sala (fetch all rooms)
export async function GET() {
  console.log("GET request received");
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


