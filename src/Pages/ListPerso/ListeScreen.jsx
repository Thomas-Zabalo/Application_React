import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardActions, Button, Typography, Grid, Avatar } from "@mui/material";
import Personnage from "../../models/PersonnageController";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Sidebar from "../../components/Nav/Sidebar";
import Stack from '@mui/material/Stack';
import SearchBar from "../../components/Home/SearchBar";
import TextListe from "../../components/Home/TextList";
import { useNavigate } from 'react-router-dom';

export default function Liste() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let nom = searchParams.get('nom');

    const [lPerso, setLPerso] = useState([]);
    let url = "https://zabalo.alwaysdata.net/sae401/api/personnages";

    if (nom != null) {
        url += '?nom=' + nom
    }

    const getPersonnage = useCallback((url) => {
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
                        p.sousclasses,
                        p.sousraces,
                        p.origines
                    );
                    l.push(personnage);
                }
                setLPerso(l);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    console.log(lPerso)

    useEffect(() => {
        getPersonnage(url);
    }, [getPersonnage, url]);

    const handleDetail = (id) => {
        console.log(id)
        navigate(`/detail/${id}`);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Box sx={{ pt: { xs: 14, sm: 20 }, pb: { xs: 8, sm: 12 } }}>
                    <Stack>
                        <TextListe />
                        <SearchBar />
                    </Stack>
                </Box>

                <Grid container spacing={4}>
                    {lPerso.map((item, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} sx={{ paddingRight: 0, marginRight: 0 }}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Box sx={{ color: 'warning.main', p: 2, textAlign: 'center', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <Avatar src={item.sousclasses.icone} sx={{ backgroundColor: "black" }} />
                                        <Avatar src={item.sousraces.icone} sx={{ backgroundColor: "black" }} />
                                    </Box>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {item.user.name}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {item.nom}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {item.sousclasses.nom}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                <Button variant="contained" onClick={() => handleDetail(item.id)}>Details</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box >
    );
}
