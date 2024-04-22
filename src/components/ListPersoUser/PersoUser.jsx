import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Grid } from "@mui/material";
import Personnage from "../../models/PersonnageController";
import Box from '@mui/material/Box';


function PersoUser() {

    const [lPerso, setLPerso] = useState([]);
    useEffect(() => {
        const accessToken = localStorage.getItem('userToken');
        console.log(accessToken)
        const userId = localStorage.getItem('userData');
        if (accessToken && userId) {
            const url = `https://zabalo.alwaysdata.net/sae401/api/users/${userId}`;
            getPersonnage(url, accessToken);
        }
    }, []);

    function getPersonnage(url, token) {
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((dataJSON) => {
                let personnages = dataJSON.personnages;
                let l = [];
                for (let p of personnages) {
                    let personnage = new Personnage(
                        p.sousraces_id,
                        p.origines_id,
                        p.sousclasses_id,
                        p.users_id,
                        p.nom,
                        p.id,
                        p.user,
                        p.sousclasses
                    );
                    l.push(personnage);
                }
                setLPerso(l);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Box sx={{ display: 'flex', }}>
            
                <Grid container spacing={4}>
                    {lPerso.map((item, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} sx={{ paddingRight: 0, marginRight: 0 }}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {item.nom}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {item.sousclasses.nom}
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" href={"/detail/" + item.id}>Details</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
        </Box >
    );

}

export default PersoUser