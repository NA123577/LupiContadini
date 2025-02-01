"use client";
import { GridRow, GridColumn, Grid, Image } from 'semantic-ui-react';

export default function Header() {
    return (
        <Grid padded>
            <GridRow className='header-nav' key={'red'} columns={2}>
                <GridColumn textAlign='left' verticalAlign='middle'>
                    <Image className='logo' src='Logo.png'/>
                </GridColumn>
                <GridColumn textAlign='right' verticalAlign='middle'>Lupi Contadini!</GridColumn>
            </GridRow>
        </Grid>
    )
}