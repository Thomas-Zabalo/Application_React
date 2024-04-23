import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardActions, Typography, Button, CardMedia, Box } from '@mui/material';
import Sidebar from "../../components/Nav/Sidebar";

function Competence() {
    const [Competences, setCompetences] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCompetence, setSelectedCompetence] = useState(null);

    const url = "https://zabalo.alwaysdata.net/sae401/api/competences";

    useEffect(() => {
        getCompetences();
    }, []);

    function getCompetences() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(data => setCompetences(data))
            .catch(error => console.log(error));
    }

    const toggleSelect = (itemId) => {
        setSelectedItem(itemId);
        const selected = Competences.find(Competence => Competence.id === itemId);
        setSelectedCompetence(selected);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, overflow: "auto", display: 'flex' }}>
                <Grid container spacing={2} sx={{ padding: 3 }}>

                    <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', }}>
                        <Card sx={{ padding: 2 }}>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                                {Competences.map((Competence) => {
                                    const isSelected = selectedItem === Competence.id;
                                    return (
                                        <Card key={Competence.id} sx={{ width: 120, m: 1 }}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={Competence.icone}
                                                alt={Competence.nom}
                                                sx={{ backgroundColor: "black" }}
                                            />
                                            <CardContent sx={{ p: 1 }}>
                                                <Typography variant="h6" sx={{ fontSize: 12, textAlign: 'center' }}>
                                                    {Competence.nom}
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
                                                    onClick={() => toggleSelect(Competence.id)}
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
                            {selectedCompetence && (
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="h4" sx={{ mb: 1 }}>{selectedCompetence.nom}</Typography>
                                    <Typography variant="body1">{selectedCompetence.description}</Typography>
                                </Box>
                            )}
                        </Card>
                    </Grid>

                </Grid>
            </Box>

            {
                selectedItem !== null && (
                    <Box sx={{ position: "absolute", bottom: 20, right: 20 }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#D0BCFF", borderRadius: 20, padding: "8px 24px" }}
                        >
                            Suivant
                        </Button>
                    </Box>
                )
            }
        </Box >
    );
}

export default Competence;
