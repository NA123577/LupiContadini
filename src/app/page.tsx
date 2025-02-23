"use client";
import { useEffect, useRef, useState } from "react";
import { WelcomeCard, RoomsList, LoginCard, GenericErrorMessage } from './Components/index';

import {
  GridRow,
  GridColumn,
  Grid
} from "semantic-ui-react";
import { Sala } from "./Entities/Sala";
import { Giocatore } from "./Entities/Giocatore";
import Mappings from "./Mappings/Mappings";
import { createSala, fetchSalas, deleteSala } from './BusinessLogic/SalaService';
import { signIn } from './BusinessLogic/LoginService';
import { createGiocatore } from './BusinessLogic/GiocatoreService';

export default function Home() {
  const [availableRooms, setAvailableRooms] = useState<Sala[]>([]);
  const [currentUser, setCurrentUser] = useState<Giocatore | undefined>(undefined);
  const [hasEnterClicked, setHasEnterClicked] = useState<boolean>(false);
  const [errorMessageHeader, setErrorMessageHeader] = useState<string>('');
  const [errorMessageContent, setErrorMessagContent] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [currentUserSala, setCurrentUserSala] = useState<Sala | undefined>()
  const errorModalDimmer = useRef<HTMLDivElement | null>(null);
  const errorModalCard = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentUserName:string | undefined | null = localStorage.getItem('currentUser');
    const currentUserId:string | null = localStorage.getItem('currentUserId');

    if(currentUserName && currentUserId) {
      setCurrentUser({...currentUser, Nome: currentUserName, Id: Number.parseInt(currentUserId)});
    }
    else {
      setCurrentUser(undefined);
      localStorage.clear();
    }

    const fetchRooms = async () => {
      try {
        const availableRooms = await fetchSalas();
        return availableRooms;
      }
      catch (ex) {
        console.error(ex);
      }
    }


    fetchRooms().then((rooms) => {
      setAvailableRooms(rooms && rooms.length > 0 ? rooms : []);
    })
      .catch((ex) => {
        console.error(ex);
      })
  }, [])

  useEffect(() => {
    if (showErrorMessage) {
      if (errorModalCard.current && errorModalDimmer.current) {
        errorModalCard.current.classList.add("vidible", "active");
        errorModalDimmer.current.classList.add("vidible", "active");
        errorModalCard.current.classList.remove("hidden");
        errorModalDimmer.current.classList.remove("hidden");
      }
    }
    else {
      if (errorModalCard.current && errorModalDimmer.current) {
        errorModalCard.current.classList.remove("vidible", "active");
        errorModalDimmer.current.classList.remove("vidible", "active");
        errorModalCard.current.classList.add("hidden");
        errorModalDimmer.current.classList.add("hidden");
      }
    }
  }, [showErrorMessage]);

  const createRoom = async (roomName: string) => {

    if (roomName) {
      console.log('stanza creata :D ', roomName);
      console.log(currentUser);
      const idSalaNuova = await createSala(roomName, currentUser?.Id!);
      const updatedSalas: Sala[] = await fetchSalas();

      setAvailableRooms([...updatedSalas]);
      setCurrentUser({...currentUser, IdSala: idSalaNuova});
    }
  }

  const onEnterClick = async (userName: string, password?: string) => {
    if (userName.trim()) {

      if (userName.toLowerCase() === Mappings.adminEmail) {
        if (password && password.trim()) {
          const user: Giocatore = await signIn(userName, password);

          if (user?.Email) {
            setCurrentUser({ Nome: userName, Password: password });
          }
          else {
            setErrorMessageHeader('non è quella la password 🥲');
            setErrorMessagContent('se non te la ricordi, scrivi a tua sorella 🤣');
            setShowErrorMessage(true);
          }

        }
        else {
          setErrorMessageHeader('inserisci la password 🥲');
          setErrorMessagContent('');
          setShowErrorMessage(true);
        }

      }
      else {
        const user : any = await createGiocatore(userName);
        console.log(user[0]);
        if(user[0]?.id) {
          localStorage.setItem('currentUser', userName);
          localStorage.setItem('currentUserId', user[0].id);
          setCurrentUser({ Nome: userName, Id: user[0].id});
          setHasEnterClicked(true);
        }
        else {
          setErrorMessageHeader('Qualcosa è andato storto');
          setErrorMessagContent('ops... 🥲');
          setShowErrorMessage(true);
        }
      }
    }
    else {
      setErrorMessageHeader('👀 ??');
      setErrorMessagContent('🫶');
      setShowErrorMessage(true);
    }
  }

  const setUserCurrentSala = (sala: Sala) => {
    setCurrentUser({ ...currentUser, IdSala: sala.Id });
    setCurrentUserSala(sala);
  }

  const eliminaSala = async (idSala?:number) => {
    if(idSala) {
      await deleteSala(idSala);
      const updatedSalas: Sala[] = await fetchSalas();
      setAvailableRooms([...updatedSalas]);
    }
  }

  return (
    <main>
      <Grid>
        {(hasEnterClicked && currentUser?.Nome) || (currentUser?.Nome) ?

          currentUser.IdSala ?
            <p>schermata sala {currentUserSala?.NomeSala}</p>
            :
            <>
              <GridRow columns={1} className="main">
                <GridColumn textAlign="center">
                  <WelcomeCard createRoom={createRoom} />
                </GridColumn>
              </GridRow>
              <GridRow columns={1} className="main">
                <GridColumn textAlign="center">
                  <RoomsList deleteSala={eliminaSala} setUserCurrentSala={setUserCurrentSala} roomsList={availableRooms} />
                </GridColumn>
              </GridRow>
            </>
          :
          <GridRow columns={1} className="main">
            <GridColumn textAlign="center">
              <LoginCard onEnterClick={onEnterClick} currentUser={currentUser} />
            </GridColumn>
          </GridRow>
        }
      </Grid>
      <GenericErrorMessage
        errorModalCard={errorModalCard}
        errorModalDimmer={errorModalDimmer}
        onModalClose={() => setShowErrorMessage(false)}
        errorMessageContent={errorMessageContent}
        errorMessageHeader={errorMessageHeader}
      />
    </main >
  );
}