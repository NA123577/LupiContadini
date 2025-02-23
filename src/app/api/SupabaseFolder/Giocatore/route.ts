import supabase from "../SupabaseClient";

// Handling Giocatore CRUD operations

// POST request handler for inserting a Giocatore (player) into a Sala
export async function POST(request: Request) {
  return await InsertGiocatore(request);
}

// PUT request handler for updating a Giocatore (update player)
export async function PUT(request: Request) {
  return await UpdateGiocatore(request);
}

// DELETE request handler for deleting a Giocatore (delete player)
export async function DELETE(request: Request) {
  return await DeleteGiocatore(request);
}

// **Talkative Functions** for Giocatore operations

// Insert a new Giocatore
async function InsertGiocatore(request: Request) {
  try {
    // const { idSala, nomeGiocatore, ruolo, cartaAssegnata } =
    const body = await request.json();
    const { data, error } = await supabase.rpc("insertgiocatore", { _nomegiocatore: body.nomeGiocatore });
    console.log(data);
    // .from("Giocatore")
    // .insert([
    //   {
    //     IdSala: idSala,
    //     NomeGiocatore: nomeGiocatore,
    //     Ruolo: ruolo,
    //     CartaAssegnata: cartaAssegnata,
    //   },
    // ]);

    if (error) {
      console.log(error);
      return new Response("Error inserting Giocatore: " + error.message, {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    console.log(err);
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