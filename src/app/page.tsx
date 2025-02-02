"use client";
import { useState } from "react";
import {
  GridRow,
  GridColumn,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Input,
} from "semantic-ui-react";
import { GameBl } from "../app/BusinessLogic/GameBL";

export default function Home() {
  const [test, setTest] = useState<string>("");

  return (
    <main>
      <Grid>
        <GridRow columns={1} className="main">
          <GridColumn textAlign="center">
            <Card className="basic-card">
              <CardHeader>
                <p style={{ fontSize: "2rem" }}>Benvenuto!</p>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Nome Sala"
                  onChange={(ev) => setTest(ev.target.value)}
                  size="big"
                ></Input>
              </CardContent>
              <CardContent extra>
                <button
                  style={{ marginTop: "1rem", marginRight: 0 }}
                  onClick={() => GameBl.creaSala(test)}
                  className="ui button green big"
                >
                  Crea
                </button>
                {/* <p style={{fontSize: '1.5rem'}}>sale disponibili:</p> */}
              </CardContent>
            </Card>
          </GridColumn>
        </GridRow>
        <GridRow columns={1} className="main">
          <GridColumn textAlign="center">
            <Card className="basic-card">
              <CardHeader>
                <p style={{ fontSize: "2rem" }}>sale disponibili:</p>
              </CardHeader>
              <CardContent>
                <div role="list" className="ui divided relaxed list">
                  <div role="listitem" className="item">
                    <div className="content">
                      <img src="/Personaggi/Belva.png" className="ui mini circular image aligned"/>
                      <a className="header">Semantic-Org/Semantic-UI</a>
                      <a className="description">Updated 10 mins ago</a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </GridColumn>
        </GridRow>
      </Grid>
    </main>
  );
}
