import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, Typography, Container, Avatar, TextField, Button } from '@mui/material';
import { green } from '@mui/material/colors';
import Sidebar from '../../components/Nav/Sidebar';
import PersoUser from '../../components/Utilisateur/PersoUser';


function ProfilScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const accessToken = localStorage.getItem('userToken');
        console.log(accessToken)
        const userId = localStorage.getItem('userData');
        if (accessToken && userId) {
            const url = `https://zabalo.alwaysdata.net/sae401/api/users/${userId}`;
            getUser(url, accessToken);
        }
    }, []);



    function getUser(url, token) {
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                setName(dataJSON.name);
                setEmail(dataJSON.email);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Box m={12}>
                    <Card>
                        <Box pt={2} px={2}>
                            <Typography variant="h2" fontWeight="medium">
                                Mon compte :
                            </Typography>
                        </Box>
                        <Box p={2}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: green[500], width: 80, height: 80, margin: 2 }} variant="rounded" src={
                                        "https://images.unsplash.com/photo-1665174271625-178021f8b1a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                                    } />
                                    <Button variant="contained">Modifier</Button>
                                </Grid>
                                <Grid item xs={2} sm={4} md={4}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={email}
                                        id="email"
                                        label="Adresse Email"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={4} md={4}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={name}
                                        id="name"
                                        label="Nom d'utilisateur"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>
                            <PersoUser />
                        </Box>

                    </Card>

                </Box>


            </Container>
        </Box>
    );
}

export default ProfilScreen;
