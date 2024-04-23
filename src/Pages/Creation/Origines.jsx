import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardActions, Typography, Button, IconButton, CardMedia, Box, Snackbar, TextField } from '@mui/material';
import Sidebar from "../../components/Nav/Sidebar";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


function Origine() {
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState('');
    const handleNomChange = (event) => setName(event.target.value);

    const [Origines, setOrigines] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedOrigine, setSelectedOrigine] = useState(null);

    const sousraceid = location.state ? location.state.sousraceid : null;
    const sousclasseid = location.state ? location.state.sousclasseid : null;


    const url = "https://zabalo.alwaysdata.net/sae401/api/origines";

    useEffect(() => {
        getOrigines();
    }, []);

    function getOrigines() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(data => setOrigines(data))
            .catch(error => console.log(error));
    }

    const toggleSelect = (itemId) => {
        setSelectedItem(itemId);
        const selected = Origines.find(Origine => Origine.id === itemId);
        setSelectedOrigine(selected);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userData');
        const accessToken = localStorage.getItem('userToken');
        if (name !== '') {
            const persoData = {
                sousraces_id: sousraceid,
                sousclasses_id: sousclasseid,
                origines_id: selectedItem,
                user_id: userId,
                nom: name
            };
            let newUrl = "https://zabalo.alwaysdata.net/sae401/api/personnages"
            AddPerso(newUrl, persoData, accessToken);
            navigate('/creation', { state: { nom: name }})
        }
    };

    function AddPerso(newUrl, persoData, accessToken) {
        const fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(persoData)
        };
        fetch(newUrl, fetchOptions)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, overflow: "auto", display: 'flex' }}>
                <Grid container spacing={2} sx={{ padding: 3 }}>

                    <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', }}>
                        <Card sx={{ padding: 2 }}>

                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                                {Origines.map((Origine) => {
                                    const isSelected = selectedItem === Origine.id;
                                    return (
                                        <Card key={Origine.id} sx={{ width: 120, m: 1 }}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={Origine.icone}
                                                alt={Origine.nom}
                                                sx={{ backgroundColor: "black" }}
                                            />
                                            <CardContent sx={{ p: 1 }}>
                                                <Typography variant="h6" sx={{ fontSize: 12, textAlign: 'center' }}>
                                                    {Origine.nom}
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
                                                    onClick={() => toggleSelect(Origine.id)}
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

                            {selectedOrigine && (
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="h4" sx={{ mb: 1 }}>{selectedOrigine.nom}</Typography>
                                    <Typography variant="body1">{selectedOrigine.description}</Typography>
                                </Box>
                            )}
                        </Card>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nom"
                            label="Nom d'utilisateur"
                            name="nom"
                            value={name}
                            onChange={handleNomChange}
                        />
                    </Grid>



                </Grid>
            </Box>
            {selectedItem !== null && (
                <Box sx={{ position: "absolute", bottom: 20, right: 20 }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#D0BCFF", borderRadius: 20, padding: "8px 24px" }}
                        onClick={handleSubmit}>
                        Suivant
                    </Button>
                </Box>
            )
            }
        </Box >
    );
}

export default Origine;
