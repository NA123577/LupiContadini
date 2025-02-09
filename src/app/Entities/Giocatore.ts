import { RuoloGiocatore } from "./Enums";

export interface Giocatore {
    Id?: number;
    IdSala?: number;
    Nome?: string;
    Email?:string;
    Password?: string;
    Ruolo?: RuoloGiocatore;
    CartaAssegnata?: string;  // Carta scelta può essere opzionale
  }