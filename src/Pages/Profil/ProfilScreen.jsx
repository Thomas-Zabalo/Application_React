import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'


import Sidebar from '../../components/Nav/Sidebar'


function ProfilScreen() {

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');

    // useEffect(() => {
    //     retrieveData();
    // }, []);

    // const retrieveData = async () => {
    //     try {
    //         const accessToken = await AsyncStorage.getItem('@UserData:accessToken');
    //         const user_id = await AsyncStorage.getItem('@UserData:user_id');
    //         if (accessToken !== null && user_id !== null) {
    //             const newUrl = `https://zabalo.alwaysdata.net/sae401/api/users/` + user_id;
    //             getUser(newUrl, accessToken);
    //         } else {
    //             setUser(null);
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors de la récupération des données:', error);
    //         setUser(null);
    //     }
    // };

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
            .then((dataJSON) => {
                setName(dataJSON.name);
                setEmail(dataJSON.email);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Box m={12}>
                    <Card>
                        <Box pt={2} px={2}>
                            <Box mb={0.5}>
                                <Typography variant="h2" fontWeight="medium">
                                    Mon compte :
                                </Typography>
                            </Box>
                        </Box>
                        <Box p={2}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: green[500], width: 80, height: 80, margin: 2 }} variant="rounded">
                                        <AssignmentIcon />
                                    </Avatar>
                                    <Button variant="contained">Modifier</Button>
                                </Grid>

                                <Grid item xs={2} sm={4} md={4} >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={Email}
                                        onChangeText={setEmail}
                                        id="email"
                                        label="Addresse Email"
                                        contentEditable={false}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Nom d'utilisateur"
                                        value={Name}
                                        onChangeText={setName}
                                        contentEditable={false}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </Box>
    )
}

export default ProfilScreen