import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardActions, Typography, Button, CardMedia, Box } from '@mui/material';
import Sidebar from "../../components/Nav/Sidebar";

function Creation() {
    const [SousClasses, setSousClasses] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSousClasse, setSelectedSousClasse] = useState(null);

    const url = "https://zabalo.alwaysdata.net/sae401/api/sousclasses";

    useEffect(() => {
        getSousClasses();
    }, []);

    function getSousClasses() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(data => setSousClasses(data))
            .catch(error => console.log(error));
    }

    const toggleSelect = (itemId) => {
        setSelectedItem(itemId);
        const selected = SousClasses.find(SousClasse => SousClasse.id === itemId);
        setSelectedSousClasse(selected);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <CardContent sx={{ flexGrow: 1, overflow: "auto", backgroundColor: '#f4f6f8' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {SousClasses.map((SousClasse) => {
                                const isSelected = selectedItem === SousClasse.id;
                                return (
                                    <Card key={SousClasse.id} sx={{ width: 120, m: 1 }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={SousClasse.icone}
                                            alt={SousClasse.nom}
                                            sx={{ backgroundColor: "black" }}
                                        />
                                        <CardContent sx={{ p: 1 }}>
                                            <Typography variant="h6" sx={{ fontSize: 12, textAlign: 'center' }}>
                                                {SousClasse.nom}
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
                                                onClick={() => toggleSelect(SousClasse.id)}
                                            >
                                                {isSelected ? "✓" : "Choisir"}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                );
                            })}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {selectedSousClasse && (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h4" sx={{ mb: 1 }}>{selectedSousClasse.nom}</Typography>
                                <Typography variant="body1">{selectedSousClasse.description}</Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
            {selectedItem !== null && (
                <Box sx={{ position: "absolute", bottom: 20, right: 20 }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#D0BCFF", borderRadius: 20, padding: "8px 24px" }}
                    >
                        Suivant
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default Creation;
