"use client";
import { useEffect, useState } from "react";
import { WelcomeCard, RoomsList } from './Components/index';

import {
  GridRow,
  GridColumn,
  Grid
} from "semantic-ui-react";
import { Sala } from "./Entities/Sala";
import FakeBl from './BusinessLogic/FakeBl';

export default function Home() {
  const [availableRooms, setAvailableRooms] = useState<Sala[]>([]);

  useEffect(() => {
    const availableRooms = FakeBl.getAvailableRooms();

    setAvailableRooms(availableRooms);
  }, [])

  const createRoom = (roomName: string) => {
    console.log('stanza creata :D ', roomName);
    const newRoom: Sala = { Id: 1, NomeSala: roomName }
    const updatedRooms = FakeBl.addRoom(newRoom);
    setAvailableRooms([...updatedRooms]);
  }

  return (
    <main>
      <Grid>
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

      </Grid>
    </main>
  );
}
