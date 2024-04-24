import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../../components/Nav/Sidebar';
import { useAuth } from '../../components/Authentification/AuthContext';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function LoginScreen() {

    const url = "https://zabalo.alwaysdata.net/sae401/api/login";

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passVisi, setPassVisi] = useState(true);
    const { login } = useAuth();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePassChange = (event) => setPassword(event.target.value);

    const handleLogin = (event) => {
        event.preventDefault();
        if (email !== '' && password !== '') {
            const userData = {
                email: email,
                password: password
            };
            loginUser(userData);
        }
    };



    function loginUser(userData) {
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
                    throw new Error('Erreur lors de la connexion');
                }
                return response.json();
            })
            .then((dataJSON) => {
                const accessToken = dataJSON.accessToken;
                const delimiterIndex = accessToken.indexOf('|');

                if (delimiterIndex !== -1) {
                    const partAfterDelimiter = accessToken.substring(delimiterIndex + 1);
                    login(partAfterDelimiter, dataJSON.user_id, dataJSON.admin);
                }
                navigate('/Profil');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const id = localStorage.getItem('userData');
        const admin = localStorage.getItem('userAdmin');

    }, []);

    return (
        <Box sx={{ display: 'flex', mb: 5 }}>

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
                            Connexion
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Addresse Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <TextField
                                margin="normal"
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleLogin}
                                href="Profil">
                                Se connecter
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Typography>
                                        Vous n'avez pas encore de compte ?
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link href="SignUp" variant="body2">
                                        {"Créez un compte !"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Box>
    );
}
