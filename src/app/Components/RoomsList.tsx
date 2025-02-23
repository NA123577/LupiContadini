'use client';
import { Card, CardContent, CardHeader } from "semantic-ui-react";
import { Sala } from "../Entities/Sala";

interface RoomsListProps {
    roomsList: Sala[];
    setUserCurrentSala: (sala:Sala) => void;
    deleteSala: (idSala?:number) => void;
}

export default function RoomsList(props: RoomsListProps) {
    // const setUserCurrentSala = (sala:Sala) => {
    //     props.setUserCurrentSala(sala);
    // }

    const deleteSala = (idSala?:number) => {
        props.deleteSala(idSala)
    }
    return (
        <Card className="basic-card">
            <CardHeader>
                <p style={{ fontSize: "2rem" }}>sale disponibili:</p>
            </CardHeader>
            <CardContent>
                {props.roomsList && props.roomsList.length > 0 ?
                    <div role="list" className="ui animated divided middle aligned list big">
                        {props.roomsList.map((room: Sala, index) => {

                            return (
                                <div key={index} role="listitem" className="item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <img src="/Personaggi/Belva.png" className="ui avatar image" />
                                    <div className="content">
                                        <div className="header">
                                            {room.NomeSala}
                                        </div>
                                    </div>
                                    <i style={{ marginLeft: 'auto' }} aria-hidden="true" onClick={() => deleteSala(room.Id)} className="trash alternate outline red icon large"></i>
                                </div>
                            )
                        })}

                    </div>
                    :
                    <p> non ci sono stanze :( </p>
                }
            </CardContent>
        </Card>
    )
}