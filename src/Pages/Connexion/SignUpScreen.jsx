import React, { useState } from 'react';
import {
    Button, TextField, Grid, Box, Typography, Container, CssBaseline, Snackbar, IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Sidebar from '../../components/Nav/Sidebar';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function SignUpScreen() {
    const url = `https://zabalo.alwaysdata.net/sae401/api/users`;

    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [password, setPassword] = useState("");
    const [passVisi, setPassVisi] = useState(true);
    const [email, setEmail] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");


    const handleNomChange = (event) => setNom(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePassChange = (event) => setPassword(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email !== '' && password !== '' && nom !== '') {
            const userData = {
                name: nom,
                email: email,
                password: password
            };
            console.log(userData)
            getUtilisateur(userData);
        }
        else {
            setSnackbarMessage('Veuillez remplir tous les champs.');
            setOpenSnackbar(true);
            const timer = setTimeout(() => {
                setOpenSnackbar(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    };

    function getUtilisateur(userData) {
        const fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        };

        fetch(url, fetchOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la création du compte');
                }
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                setSnackbarMessage("Compte créé avec succès !");
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/Login');
                }, 1500);
            })
            .catch((error) => {
                console.error('Error:', error);
                setSnackbarMessage(error.message);
                setOpenSnackbar(true);
            });
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleNavigate = () => {
        navigate('/Login');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Sidebar />
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <VpnKeyRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Inscription
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nom"
                                    label="Nom d'utilisateur"
                                    name="nom"
                                    autoComplete="nom"
                                    value={nom}
                                    onChange={handleNomChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adresse Email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mot de passe"
                                    type={passVisi ? 'password' : 'text'}
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={handlePassChange}
                                    InputProps={{
                                        endAdornment: (
                                            <Button onClick={() => setPassVisi(!passVisi)}>
                                                {passVisi ? <RemoveRedEyeRoundedIcon /> : <VisibilityOffRoundedIcon />}
                                            </Button>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            S'inscrire
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Typography>
                                    Vous avez déjà un compte?
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" onClick={handleNavigate} sx={{ color: 'blue' }} style={{ cursor: 'pointer' }}>
                                    Connectez-vous
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </Container>
        </ThemeProvider>
    );
}
