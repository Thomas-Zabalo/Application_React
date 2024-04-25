import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Grid, Box, Avatar, } from "@mui/material";
import Personnage from "../../models/PersonnageController";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function PersoUser() {

    const [lPerso, setLPerso] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('userToken');
        const userId = localStorage.getItem('userData');
        if (accessToken && userId) {
            const url = `https://zabalo.alwaysdata.net/sae401/api/users/${userId}`;
            getPersonnage(url, accessToken);
        }
    }, []);

    function getPersonnage(url, token) {
        const fetchOptions = {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        };
        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(dataJSON => {
                const personnages = dataJSON.personnages.map(p => new Personnage(
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
                ));
                setLPerso(personnages);
                console.log(personnages)
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
            });
    }

    const handleSuppression = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce personnage ?")) {
            supprimerPersonnage(id)
        }
        // supprimerPersonnage(id)
    };

    function supprimerPersonnage(id) {
        const accessToken = localStorage.getItem('userToken');
        const url = `https://zabalo.alwaysdata.net/sae401/api/personnages/${id}`;

        const fetchOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                console.log(dataJSON)
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    }




    return (
        <Box sx={{ flex: 1, paddingTop: 4 }}>
            <Grid container spacing={4}>
                {lPerso.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Box sx={{ color: 'warning.main', p: 2, textAlign: 'center', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <Avatar src={item.sousclasses.icone} sx={{ backgroundColor: "black" }} />
                                    <Avatar src={item.sousraces.icone} sx={{ backgroundColor: "black" }} />
                                </Box>
                                <Typography variant="h5" component="div">{item.nom}</Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">{item.sousclasses.nom}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" component={Link} to={"/detail/" + item.id}>
                                    Details
                                </Button>
                                <Button variant="contained" sx={{
                                    backgroundColor: 'orange',
                                    '&:hover': {
                                        backgroundColor: '#E59C03'
                                    }
                                }} component={Link} to={"/Modifier/" + item.id}>Modifier</Button>

                                <Button variant="contained" sx={{
                                    backgroundColor: 'error.main',
                                    '&:hover': {
                                        backgroundColor: 'error.dark'
                                    }
                                }} onClick={() => handleSuppression(item.id)}>Supprimer</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default PersoUser;
