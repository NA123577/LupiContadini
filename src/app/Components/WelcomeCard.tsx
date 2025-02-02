'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, Input } from "semantic-ui-react";

interface WelcomeCardProps {
    createRoom: (roomName:string) => void;
}
export default function WelcomeCard(props: WelcomeCardProps) {
    const [roomName, setRoomName] = useState<string>('');


    const createRoom = () => {
        if(roomName) {
            props.createRoom(roomName);
            setRoomName('');
        }
    }
    return (
        <Card className="basic-card">
            <CardHeader>
                <p style={{ fontSize: "2rem" }}>Benvenuto!</p>
            </CardHeader>
            <CardContent>
                <Input
                    placeholder="Nome Sala"
                    value={roomName}
                    size="big"
                    onChange={(ev) => setRoomName(ev.target.value)}
                ></Input>
            </CardContent>
            <CardContent extra>
                <button
                    style={{ marginRight: 0 }}
                    className="ui button green big"
                    onClick={createRoom}
                >
                    Crea
                </button>
                {/* <p style={{fontSize: '1.5rem'}}>sale disponibili:</p> */}
            </CardContent>
        </Card>
    )
}