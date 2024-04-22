import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container'; // Importez Container depuis @mui/material
import Sidebar from '../../components/Nav/Sidebar';
import ListeHome from '../../components/Home/ListeHomeScreen';
import Search from '../../components/Home/Presentation';
const defaultTheme = createTheme();

export default function LandingPage() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex', mb:5}}>
                <Sidebar />
                <Container>
                    <CssBaseline />
                    <Search />
                    <Box sx={{ bgcolor: 'background.default' }}>
                        <ListeHome />
                    </Box>
                </Container>
            </Box >
        </ThemeProvider >
    );
}
