import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardActions, Typography, Button, IconButton, CardMedia, Box, Snackbar } from '@mui/material';
import Sidebar from "../../components/Nav/Sidebar";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

function SousClasse() {
    const navigate = useNavigate();
    const location = useLocation();

    const [SousClasses, setSousClasses] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSousClasse, setSelectedSousClasse] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const sousraceid = location.state ? location.state.sousraceid : null;
    const classeid = location.state ? location.state.classeid : null;
    const raceid = location.state ? location.state.raceid : null;


    const url = `https://zabalo.alwaysdata.net/sae401/api/classes/${classeid}`;

    useEffect(() => {
        getSousClasses();
    }, []);

    useEffect(() => {
        if (sousraceid && classeid) {
            getSousClasses();
        } else if (!classeid && sousraceid) {
            setSnackbarMessage("Veuillez selectionner une classe !");
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/Classe')
            }, 2000);
        }
        else {
            setSnackbarMessage("Veuillez selectionner une race !");
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/Nouveau')
            }, 2000);
        }
    }, []);

    function getSousClasses() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then(response => {
                return response.json();
            })
            .then(dataJSON => {
                setSousClasses(dataJSON.sousclasses);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    const toggleSelect = (itemId) => {
        setSelectedItem(itemId);
        const selected = SousClasses.find(SousClasse => SousClasse.id === itemId);
        setSelectedSousClasse(selected);
    };

    const handleCloseSnackbar = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, overflow: "auto", display: 'flex' }}>
                <Grid container spacing={2} sx={{ padding: 3 }}>

                    <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', }}>
                        <Card sx={{ padding: 2 }}>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                                {SousClasses.map((classe) => {
                                    const isSelected = selectedItem === classe.id;
                                    return (
                                        <Card key={classe.id} sx={{ width: 120, m: 1 }}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={classe.icone}
                                                alt={classe.nom}
                                                sx={{ backgroundColor: "black" }}
                                            />
                                            <CardContent sx={{ p: 1 }}>
                                                <Typography variant="h6" sx={{ fontSize: 12, textAlign: 'center' }}>
                                                    {classe.nom}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'center' }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        borderRadius: 20,
                                                        borderColor: isSelected ? "primary.main" : "inherit",
                                                        backgroundColor: isSelected ? "primary.main" : "inherit",
                                                        color: isSelected ? "white" : "primary.main",
                                                        fontSize: 10,
                                                        p: 0.5
                                                    }}
                                                    onClick={() => toggleSelect(classe.id)}
                                                >
                                                    {isSelected ? "✓" : "Choisir"}
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    );
                                })}
                            </div>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <Card sx={{ height: '500px', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                            {selectedSousClasse && (
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="h4" sx={{ mb: 1 }}>{selectedSousClasse.nom}</Typography>
                                    <Typography variant="body1">{selectedSousClasse.description}</Typography>
                                </Box>
                            )}
                        </Card>
                    </Grid>

                </Grid>
            </Box>


            {selectedItem !== null && (
                <Box sx={{ position: "absolute", bottom: 20, right: 20 }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#D0BCFF", borderRadius: 20, padding: "8px 24px" }}
                        onClick={() => navigate('/origine', { state: { raceid: raceid, sousraceid: sousraceid, classeid: classeid, sousclasseid: selectedItem } })}
                    >
                        Suivant
                    </Button>
                </Box>
            )}
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
        </Box>
    );
}

export default SousClasse;
