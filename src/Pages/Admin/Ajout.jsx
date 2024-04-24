import React, { useState, useEffect } from 'react';
import { Container, Box, Stack, Card, Typography, Grid, CardContent, Avatar, CardActions, Button, TextField } from "@mui/material";
import { useParams } from 'react-router-dom'; //
import Sidebar from "../../components/Nav/Sidebar";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Ajout() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/Admin`);
    };

    let url = `https://zabalo.alwaysdata.net/sae401/api/${id}`;

    useEffect(() => {
        if (id === "sousraces") {
            fetchRaces();
        } else if (id === "sousclasses") {
            fetchClasses();
        }
    }, []);


    function fetchRaces() {
        const fetchOptions = {
            method: "GET"
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                // console.log(dataJSON)
                setData(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function fetchClasses() {
        const fetchOptions = {
            method: "GET"
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                // console.log(dataJSON)
                setData(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Button variant="contained" sx={{ mt: 5 }} onClick={handleNavigate}>
                    <ArrowBackIosIcon />
                    Retour
                </Button>
                <Stack>
                    <Typography variant="h2" fontWeight="medium" sx={{ pt: { xs: 4, sm: 4 } }}>
                        Ajout d'un/une {id}
                    </Typography>
                    <Box m={12}>
                        <Card>
                            <Box p={2}>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar
                                            sx={{ width: 300, height: 300, margin: 2 }}
                                            variant="rounded"
                                        />
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={4}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Nom"
                                            value={nom}
                                            onChange={e => setNom(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Description"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                        if (id = sousraces){
                                            afficher cherckbox de toute les races 
}
                                        if (id = sousclasses){
                                            afficher checkbox ou autre de toutes les classes
}
                                    </Grid>

                                </Grid>
                                <Button variant="contained" component="span">
                                    Ajouter
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}

export default Ajout;