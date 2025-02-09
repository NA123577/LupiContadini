"use client";
import { useEffect, useRef, useState } from "react";
import { WelcomeCard, RoomsList, LoginCard, GenericErrorMessage } from './Components/index';

import {
  GridRow,
  GridColumn,
  Grid
} from "semantic-ui-react";
import { Sala } from "./Entities/Sala";
import FakeBl from './BusinessLogic/FakeBl';
import { Giocatore } from "./Entities/Giocatore";
import Mappings from "./Mappings/Mappings";

export default function Home() {
  const [availableRooms, setAvailableRooms] = useState<Sala[]>([]);
  const [currentUser, setCurrentUser] = useState<Giocatore | undefined>(undefined);
  const [hasEnterClicked, setHasEnterClicked] = useState<boolean>(false);
  const [errorMessageHeader, setErrorMessageHeader] = useState<string>('');
  const [errorMessageContent, setErrorMessagContent] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const errorModalDimmer = useRef<HTMLDivElement | null>(null);
  const errorModalCard = useRef<HTMLDivElement | null>(null);

  const fakeAdminPass = "ciao";

  useEffect(() => {
    const availableRooms = FakeBl.getAvailableRooms();

    setAvailableRooms(availableRooms);
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

  const createRoom = (roomName: string) => {
    console.log('stanza creata :D ', roomName);
    const newRoom: Sala = { Id: 1, NomeSala: roomName }
    const updatedRooms = FakeBl.addRoom(newRoom);
    setAvailableRooms([...updatedRooms]);
  }

  const onEnterClick = (email: string, password?: string) => {
    if (email.indexOf('@') !== -1 && email.indexOf('.') !== -1) {
      if (email.toLowerCase() === Mappings.adminEmail) {
        if (password && password === fakeAdminPass) {
          setCurrentUser({ Email: email, Password: password });
          setHasEnterClicked(true);
        }
        else {
          setErrorMessageHeader('non è quella la password 🥲');
          setErrorMessagContent('se non te la ricordi, scrivi a tua sorella 🤣');
          setShowErrorMessage(true);
        }
      }
      else {
        setCurrentUser({ Email: email });
        setHasEnterClicked(true);
      }
    }
    else {
      setErrorMessageHeader('Si... ma almeno una "@" e un "." 👀');
      setErrorMessagContent('🫶');
      setShowErrorMessage(true);
    }
  }

  return (
    <main>
      <Grid>
        {hasEnterClicked && currentUser?.Email ?
          <>
            <GridRow columns={1} className="main">
              <GridColumn textAlign="center">
                <WelcomeCard createRoom={createRoom} />
              </GridColumn>
            </GridRow>

            <GridRow columns={1} className="main">
              <GridColumn textAlign="center">
                <RoomsList roomsList={availableRooms} />
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