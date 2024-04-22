import React, { useEffect, useState, useParams } from "react";
import { Card, CardContent, CardActions, Button, Typography, Grid } from "@mui/material";
import Personnage from "../../models/PersonnageController";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Sidebar from "../../components/Nav/Sidebar";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function Liste() {
    const [lPerso, setLPerso] = useState([]);
    const url = "https://zabalo.alwaysdata.net/sae401/api/personnages";

    const { nom } = useParams()
    if (nom) {
        url += `?nom=${nom}`;
    }

    useEffect(() => {
        getPersonnage();
    }, []);

    function getPersonnage() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((dataJSON) => {
                let personnages = dataJSON;
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
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Box sx={{ pt: { xs: 14, sm: 20 }, pb: { xs: 8, sm: 12 } }}>
                    <Stack>
                        <TextField
                            id="outlined-basic"
                            hiddenLabel
                            size="small"
                            variant="outlined"
                            aria-label="Enter your email address"
                            placeholder="Rechercher un personnage"
                            inputProps={{
                                autocomplete: 'off',
                                ariaLabel: 'Enter your email address',
                            }}
                        />
                    </Stack>
                </Box>
                <Grid container spacing={4}>
                    {lPerso.map((item, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} sx={{ paddingRight: 0, marginRight: 0 }}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {item.user.name}
                                    </Typography>
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

            </Container>
        </Box >
    );
}
