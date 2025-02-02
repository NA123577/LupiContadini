import  supabase  from '../SupabaseFolder/SupabaseClient'; // Assicurati che 'supabaseClient' sia configurato correttamente
import { Sala } from '../Entities/Sala';
import { Giocatore } from '../Entities/Giocatore';
import { RuoloGiocatore } from '../Entities/Enums';

export class GameBl{
//#region  CRUD
//#region Create
// Crea una nuova sala
 static creaSala = async (nomeSala: string): Promise<Sala | null> => {
  const { data, error } = await supabase
    .from('Sala')
    .insert([{ NomeSala: nomeSala }])
    .select();

  if (error) {
    console.error("Errore nella creazione della sala:", error.message);
    return null;
  }

  return data ? data[0] : null; // Restituisce la sala appena creata
};


// Crea un nuovo giocatore
static creaGiocatore = async (
  idSala: number,
  nome: string,
  ruolo: RuoloGiocatore,
  cartaScelta?: string
): Promise<Giocatore | null> => {
  const { data, error } = await supabase
    .from('Giocatore')
    .insert([{ id_sala: idSala, nome, ruolo, carta_scelta: cartaScelta }])
    .select();

  if (error) {
    console.error("Errore nella creazione del giocatore:", error.message);
    return null;
  }

  return data ? data[0] : null; // Restituisce il giocatore appena creato
};
//#endregion

//#region Read
// Leggi tutte le sale
static ottieniTutteLeSale = async (): Promise<Sala[]> => {
  const { data, error } = await supabase
    .from('Sala')
    .select();

  if (error) {
    console.error("Errore nel recupero delle sale:", error.message);
    return [];
  }

  return data || [];
};

// Leggi tutti i giocatori di una sala
static ottieniGiocatoriDiSala = async (idSala: number): Promise<Giocatore[]> => {
  const { data, error } = await supabase
    .from('Giocatore')
    .select()
    .eq('IdSala', idSala);

  if (error) {
    console.error(`Errore nel recupero dei giocatori per la sala ${idSala}:`, error.message);
    return [];
  }

  return data || [];
};
//#endregion

//#region Update
// Aggiorna il nome di una sala
static aggiornaNomeSala = async (idSala: number, nuovoNome: string): Promise<Sala | null> => {
  const { data, error } = await supabase
    .from('Sala')
    .update({ NomeSala: nuovoNome })
    .eq('Id', idSala)
    .select();

  if (error) {
    console.error(`Errore nell'aggiornamento del nome della sala ${idSala}:`, error.message);
    return null;
  }

  return data ? data[0] : null;
};

// Aggiorna un giocatore (ad esempio, cambia il ruolo o la carta)
static aggiornaGiocatore = async (
  idGiocatore: number,
  nuovoRuolo: string,
  nuovaCartaScelta?: string
): Promise<Giocatore | null> => {
  const { data, error } = await supabase
    .from('Giocatore')
    .update({ ruolo: nuovoRuolo, carta_scelta: nuovaCartaScelta })
    .eq('Id', idGiocatore)
    .select();

  if (error) {
    console.error(`Errore nell'aggiornamento del giocatore ${idGiocatore}:`, error.message);
    return null;
  }

  return data ? data[0] : null;
};
//#endregion

//#region Delete
// Elimina un giocatore
static eliminaGiocatore = async (idGiocatore: number): Promise<boolean> => {
  const { error } = await supabase
    .from('Giocatore')
    .delete()
    .eq('Id', idGiocatore);

  if (error) {
    console.error(`Errore nell'eliminazione del giocatore ${idGiocatore}:`, error.message);
    return false;
  }

  return true; // Ritorna true se il giocatore è stato eliminato con successo
};

// Elimina una sala e tutti i giocatori associati
static eliminaSala = async (idSala: number): Promise<boolean> => {
  // Prima elimina i giocatori
  const { error: errorGiocatori } = await supabase
    .from('Giocatore')
    .delete()
    .eq('IdSala', idSala);

  if (errorGiocatori) {
    console.error(`Errore nell'eliminazione dei giocatori della sala ${idSala}:`, errorGiocatori.message);
    return false;
  }

  // Poi elimina la sala
  const { error: errorSala } = await supabase
    .from('Sala')
    .delete()
    .eq('Id', idSala);

  if (errorSala) {
    console.error(`Errore nell'eliminazione della sala ${idSala}:`, errorSala.message);
    return false;
  }

  return true; // Ritorna true se tutto è stato eliminato con successo
};
//#endregion

//#endregion

//#region Altri metodi
// Funzione per finire il gioco e pulire tutto
static finisciGioco = async (idSala: number): Promise<boolean> => {
  const successo = await GameBl.eliminaSala(idSala);
  if (successo) {
    console.log("Gioco finito, sala e giocatori eliminati!");
  } else {
    console.error("Errore durante la conclusione del gioco.");
  }
  return successo;
};
//#endregion
}
