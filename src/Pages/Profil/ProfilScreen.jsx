import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, Typography, Container, Avatar, TextField, Button } from '@mui/material';
import Sidebar from '../../components/Nav/Sidebar';
import PersoUser from '../../components/Utilisateur/PersoUser';


function ProfilScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const userId = localStorage.getItem('userData');

    useEffect(() => {
        const accessToken = localStorage.getItem('userToken');
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
                setImagePreviewUrl(dataJSON.icone)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (name && email ) {
            const NewUserData = {
                name: name,
                email: email
            };
            const accessToken = localStorage.getItem('userToken');
            console.log(accessToken);
            const url = `https://zabalo.alwaysdata.net/sae401/api/users/${userId}`;
            modifProfil(url, NewUserData, accessToken);
        }
    }

    function modifProfil(url, NewUserData, token) {
        const fetchOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(NewUserData)
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    };


    function ModifImage(url, formData, accessToken) {
        console.log(formData)
        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: formData
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                console.log(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
        const formData = new FormData();
        formData.append('image', file);
        const accessToken = localStorage.getItem('userToken');
        const url = `https://zabalo.alwaysdata.net/sae401/api/users/${userId}/icone`;

        ModifImage(url, formData, accessToken);
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
                                    {imagePreviewUrl && (
                                        <Avatar
                                            src={imagePreviewUrl}
                                            sx={{ width: 200, height: 200, mb: 2 }}
                                            variant="rounded"
                                        />
                                    )}
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        id="file-input"
                                    />
                                    <label htmlFor="file-input">
                                        <Button variant="contained" component="span">
                                            Ajouter une icône
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid item xs={2} sm={4} md={4}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        id="email"
                                        label="Adresse Email"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        id="name"
                                        label="Nom d'utilisateur"
                                    />
                                </Grid>
                                <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
                                    <Button variant="contained" onClick={handleSubmit}>
                                        Modifier mes informations
                                    </Button>
                                </Box>
                            </Grid>





                            <PersoUser />
                        </Box>
                    </Card>
                </Box>
            </Container >
        </Box >
    );
}

export default ProfilScreen;
