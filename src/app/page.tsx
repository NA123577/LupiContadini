"use client";
import { GridRow, GridColumn, Grid, Card, CardHeader, CardContent, Input, Button } from 'semantic-ui-react';

export default function Home() {
  return (
    <main>
      <Grid>
        <GridRow columns={1} className='main'>
          <GridColumn textAlign='center'>
            <Card className='basic-card'>
              <CardHeader>
                <p style={{fontSize: '2rem'}}>Benvenuto!</p>
              </CardHeader>
              <CardContent>
                <Input  placeholder="Nome Sala" size='big'></Input>
                <button style={{marginTop: '1rem', marginRight: 0}} className="ui button green big">Crea</button>
              </CardContent>
              <CardContent extra>
                <p style={{fontSize: '1.5rem'}}>sale disponibili:</p>
              </CardContent>
            </Card>
          </GridColumn>
        </GridRow>
      </Grid>

    </main>
  );
}
