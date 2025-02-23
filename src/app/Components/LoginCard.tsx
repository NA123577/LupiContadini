'use client';
import { Card, CardHeader, CardContent } from "semantic-ui-react";
import { Giocatore } from "../Entities/Giocatore";
import Mappings from "../Mappings/Mappings";
import { useState } from "react";

interface LoginCardProps {
    currentUser: Giocatore | undefined;
    onEnterClick: (email:string, password?:string) => void;
}

export default function LoginCard(props:LoginCardProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPasword] = useState<string>('');
    
    return (
        <Card className="basic-card">
            <CardHeader>
                <p style={{ fontSize: "2rem" }}>Entra/Crea giocatore</p>
            </CardHeader>
            <CardContent>
                <div className="ui big left icon input" style={{ marginBottom: '0.5rem', width: '100%' }}>
                    <div className="ui label label right corner">
                        <i aria-hidden="true" className="asterisk icon">
                        </i>
                    </div>
                    <input type="text" placeholder="user name..." onChange={(ev) => setEmail(ev.target.value)} />
                    <i aria-hidden="true" className="users icon">
                    </i>
                </div>
                {(email.toLowerCase() === Mappings.adminEmail) &&
                    < div className="ui big input" style={{ width: '100%' }}>
                        <input type='password' placeholder="password (admin)" onChange={(ev) => setPasword(ev.target.value)} />
                    </div>
                }
            </CardContent>
            <CardContent extra>
                <button
                    style={{ marginRight: 0 }}
                    className="ui button green big"
                    onClick={() => props.onEnterClick(email, password)}
                >
                    Entra
                </button>
            </CardContent>
        </Card>
    )
}