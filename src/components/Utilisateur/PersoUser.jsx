import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from "@mui/material";
import Personnage from "../../models/PersonnageController";
import { Link } from "react-router-dom";

function PersoUser() {
    
    const [lPerso, setLPerso] = useState([]);

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
                    p.sousclasses
                ));
                setLPerso(personnages);
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
            });
    }

    const handleSuppression = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce personnage ?")) {
            console.log("cooncon")
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
                                <Typography variant="h5" component="div">{item.nom}</Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">{item.sousclasses.nom}</Typography>
                                <Typography variant="body2">"a benevolent smile"</Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" component={Link} to={"/detail/" + item.id}>Details</Button>
                                <Button variant="contained" sx={{
                                    backgroundColor: 'orange', // Use the theme's error color
                                    '&:hover': {
                                        backgroundColor: '#e65100' // Use a darker version of the error color on hover
                                    }
                                }} component={Link} to={"/modifier/" + item.id}>Modifier</Button>

                                <Button variant="contained" sx={{
                                    backgroundColor: 'error.main', // Use the theme's error color
                                    '&:hover': {
                                        backgroundColor: 'error.dark' // Use a darker version of the error color on hover
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
