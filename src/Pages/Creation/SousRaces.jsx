import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardActions, Typography, Button, CardMedia, Box } from '@mui/material';
import Sidebar from "../../components/Nav/Sidebar";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function SousRace() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sousRaces, setSousRaces] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSousRace, setSelectedSousRace] = useState(null);

    // Extract raceId from location state
    const raceId = location.state ? location.state.raceId : null;

    // Construct the API URL with the raceId
    const url = `https://zabalo.alwaysdata.net/sae401/api/races/${raceId}`;

    useEffect(() => {
        if (raceId) {
            getSousRaces();
        } else {
            console.error('No raceId provided');
        }
    }, [raceId]); 

    function getSousRaces() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSousRaces(data.sousraces); 
            })
            .catch(error => {
                console.error('Error fetching sous races:', error);
            });
    }
    

    const toggleSelect = (itemId) => {
        setSelectedItem(itemId);
        const selected = sousRaces.find(sousRace => sousRace.id === itemId);
        setSelectedSousRace(selected);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, overflow: "auto", backgroundColor: '#f4f6f8', display: 'flex' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', minWidth: '300px', maxWidth: '500px' }}>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {sousRaces.map((race) => {
                                const isSelected = selectedItem === race.id;
                                return (
                                    <Card key={race.id} sx={{ width: 120, m: 1 }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={race.icone}
                                            alt={race.nom}
                                            sx={{ backgroundColor: "black" }}
                                        />
                                        <CardContent sx={{ p: 1 }}>
                                            <Typography variant="h6" sx={{ fontSize: 12, textAlign: 'center' }}>
                                                {race.nom}
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
                                                onClick={() => toggleSelect(race.id)}
                                            >
                                                {isSelected ? "✓" : "Choisir"}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                );
                            })}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', minWidth: '300px', maxWidth: '500px' }}>
                        {selectedSousRace && (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h4" sx={{ mb: 1 }}>{selectedSousRace.nom}</Typography>
                                <Typography variant="body1">{selectedSousRace.description}</Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
            {selectedItem !== null && (
                <Box sx={{ position: "absolute", bottom: 20, right: 20 }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#D0BCFF", borderRadius: 20, padding: "8px 24px" }}
                        onClick={() => navigate('/sousrace', { state: { raceId: selectedItem } })}
                    >
                        Suivant
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default SousRace;
