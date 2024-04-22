import React, { useState } from 'react';
import { Button, TextField, Link, Grid, Box, Typography, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Sidebar from '../../components/Nav/Sidebar';

const defaultTheme = createTheme();

export default function SignUpScreen() {
    const [password, setPassword] = useState("");
    const [passVisi, setPassVisi] = useState(true);
    const [email, setEmail] = useState("");

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePassChange = (event) => setPassword(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Pseudo"
                                    autoFocus
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
                                    Vous avez déjà un compte ?
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link href="Login" variant="body2">
                                    {"Connectez vous !"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
