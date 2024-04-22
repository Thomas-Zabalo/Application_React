import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Search() {
    const [nom, setNom] = useState('');

    const handleSearch = () => {
        <link rel="stylesheet" href={"/liste/" + { nom }} />
        setNom('')
    };


    return (
        <Box>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 10 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        Baldur Gate &nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(3rem, 10vw, 4rem)',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                            }}
                        >
                            3
                        </Typography>
                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        Personnalisez votre propre héros ou héroïne dans Baldur's Gate 3 grâce à notre application. Choisissez parmi une large gamme de races, de classes et de compétences pour créer des personnages uniques et sur mesure.
                    </Typography>

                    <TextField
                        id="outlined-basic"
                        hiddenLabel
                        size="small"
                        variant="outlined"
                        placeholder="Rechercher un personnage"
                        onChange={(e) => setNom(e.target.value)}
                        value={nom}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </Stack>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignSelf="center"
                    spacing={1}
                    useFlexGap
                    sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                >
                    <Button variant="contained" href="/" style={{ top: 0, right: 0, margin: 4 }}>
                        Créez mon personnage
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}