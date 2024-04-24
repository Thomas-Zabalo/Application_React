import React, { useState, useEffect } from 'react';
import { Container, Box, Stack, Card, Typography, Grid, FormControlLabel, RadioGroup, Radio, Button, TextField } from "@mui/material";
import { useParams } from 'react-router-dom'; //
import Sidebar from "../../components/Nav/Sidebar";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Modifier() {
    const [dPerso, setdPerso] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const [nom, setNom] = useState('');
    const [races, setRaces] = useState([]);
    const [sousraces, setSousRaces] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sousclasses, setSousClasses] = useState([]);
    const [origines, setOrigines] = useState([]);

    const [selectedRaceId, setSelectedRaceId] = useState('');
    const [selectedSousRaceId, setSelectedSousRaceId] = useState('');
    const [selectedClasseId, setSelectedClasseId] = useState('');
    const [selectedSousClasseId, setSelectedSousClasseId] = useState('');
    const [selectedOrigineId, setSelectedOrigineId] = useState('');


    //Affichage des informations du personnages

    useEffect(() => {
        const url = `https://zabalo.alwaysdata.net/sae401/api/personnages/${id}`;
        PersoUser(url);
    }, [id]);


    function PersoUser(url) {
        const fetchOptions = {
            method: "GET"
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON)
                setNom(dataJSON.nom)
                setdPerso(dataJSON);
                setSelectedRaceId(dataJSON.sousraces.races_id);
                setSelectedSousRaceId(dataJSON.sousraces_id);
                setSelectedClasseId(dataJSON.sousclasses.classes_id);
                setSelectedSousClasseId(dataJSON.sousclasses_id);
                setSelectedOrigineId(dataJSON.origines_id)
            })
            .catch((error) => {
                console.error(error);
            });
    }


    //Changement de la race

    const handleChangeRace = (event) => {
        setSelectedRaceId(event.target.value);
    };

    useEffect(() => {
        const urlR = "https://zabalo.alwaysdata.net/sae401/api/races";
        getRaces(urlR);
    }, []);

    function getRaces(urlR) {
        const fetchOptions = {
            method: "GET"
        };
        fetch(urlR, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                setRaces(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    }


    //Changement de la sous race
    const handleChangeSousRace = (event) => {
        setSelectedSousRaceId(event.target.value);
    };

    useEffect(() => {
        const urlSR = `https://zabalo.alwaysdata.net/sae401/api/races/${selectedRaceId}`;
        getSousRaces(urlSR);
    }, [selectedRaceId]);

    function getSousRaces(urlSR) {
        const fetchOptions = { method: "GET" };
        fetch(urlSR, fetchOptions)
            .then(response => {
                return response.json();
            })
            .then(dataJSON => {
                setSousRaces(dataJSON.sousraces);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }




    //Changement de la classe
    const handleChangeClasse = (event) => {
        setSelectedClasseId(event.target.value);
    };

    useEffect(() => {
        const urlC = `https://zabalo.alwaysdata.net/sae401/api/classes`;
        getClasses(urlC);
    }, []);

    function getClasses(urlC) {
        const fetchOptions = { method: "GET" };
        fetch(urlC, fetchOptions)
            .then(response => {
                return response.json();
            })
            .then(dataJSON => {
                setClasses(dataJSON);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }



    //Changement de la sous classes
    const handleChangeSousClasse = (event) => {
        setSelectedSousClasseId(event.target.value);
    };

    useEffect(() => {
        const urlSC = `https://zabalo.alwaysdata.net/sae401/api/classes/${selectedClasseId}`;
        getSousClasses(urlSC);
    }, [selectedClasseId]);

    function getSousClasses(urlSC) {
        const fetchOptions = { method: "GET" };
        fetch(urlSC, fetchOptions)
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



    //Changement de l'origine
    const handleChangeOrigine = (event) => {
        setSelectedOrigineId(event.target.value);
    };


    useEffect(() => {
        const urlO = `https://zabalo.alwaysdata.net/sae401/api/origines`;
        getOrigines(urlO);
    }, [selectedOrigineId]);

    function getOrigines(urlO) {
        const fetchOptions = { method: "GET" };
        fetch(urlO, fetchOptions)
            .then(response => {
                return response.json();
            })
            .then(dataJSON => {
                setOrigines(dataJSON);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    //Modification personnage
    const handleSubmit = (event) => {
        event.preventDefault();

        const accessToken = localStorage.getItem('userToken');
        if (nom !== '') {
            const persoData = {
                sousraces_id: selectedSousRaceId,
                origines_id: selectedOrigineId,
                sousclasses_id: selectedSousClasseId,
                id: id,
                nom: nom
            };
            console.log(persoData)
            const url = `https://zabalo.alwaysdata.net/sae401/api/personnages/${id}`;
            ModifPerso(url, persoData, accessToken);
            navigate('/profil')
        }
    };

    function ModifPerso(url, persoData, accessToken) {
        console.log(url, persoData, accessToken)
        const fetchOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(persoData)
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                console.log(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Button variant="contained" sx={{ mt: 5 }} onClick={() => navigate(`/Profil`)}>
                    <ArrowBackIosIcon /> Retour
                </Button>
                <Stack>
                    <Typography variant="h2" fontWeight="medium" sx={{ pt: { xs: 4, sm: 4 } }}>
                        Modification de votre personnage
                    </Typography>
                    <Box m={12}>
                        <Card>
                            <Box p={2}>
                                <Grid container spacing={3}>
                                    {dPerso && (

                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                label="Nom"
                                                value={nom}
                                                onChange={e => setNom(e.target.value)}
                                            />

                                            <h3>Race</h3>


                                            {races && (
                                                <RadioGroup
                                                    name="raceSelection"
                                                    value={selectedRaceId}
                                                    onChange={handleChangeRace}
                                                >
                                                    <Grid container spacing={2}>
                                                        {races.map(item => (
                                                            <Grid item xs={6} key={item.id}>
                                                                <FormControlLabel
                                                                    control={<Radio />}
                                                                    label={item.nom}
                                                                    value={item.id.toString()}
                                                                />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </RadioGroup>
                                            )}



                                            <h3>Sous Race</h3>


                                            {sousraces && (
                                                <RadioGroup
                                                    name="itemSelection"
                                                    value={selectedSousRaceId}
                                                    onChange={handleChangeSousRace}
                                                >
                                                    <Grid container spacing={2}>
                                                        {sousraces.map(item => (
                                                            <Grid item xs={6} key={item.id}>
                                                                <FormControlLabel
                                                                    control={<Radio />}
                                                                    label={item.nom}
                                                                    value={item.id.toString()}
                                                                />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </RadioGroup>
                                            )}


                                            <h3>Classes</h3>

                                            {classes && (
                                                <RadioGroup
                                                    name="itemSelection"
                                                    value={selectedClasseId}
                                                    onChange={handleChangeClasse}
                                                >
                                                    <Grid container spacing={2}>
                                                        {classes.map(item => (
                                                            <Grid item xs={6} key={item.id}>
                                                                <FormControlLabel
                                                                    control={<Radio />}
                                                                    label={item.nom}
                                                                    value={item.id.toString()}
                                                                />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </RadioGroup>
                                            )}



                                            <h3>Sous Classes</h3>


                                            {sousclasses && (
                                                <RadioGroup
                                                    name="itemSelection"
                                                    value={selectedSousClasseId}
                                                    onChange={handleChangeSousClasse}
                                                >
                                                    <Grid container spacing={2}>
                                                        {sousclasses.map(item => (
                                                            <Grid item xs={6} key={item.id}>
                                                                <FormControlLabel
                                                                    control={<Radio />}
                                                                    label={item.nom}
                                                                    value={item.id.toString()}
                                                                />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </RadioGroup>
                                            )}

                                            <h3>Origines</h3>


                                            {origines && (
                                                <RadioGroup
                                                    name="itemSelection"
                                                    value={selectedOrigineId}
                                                    onChange={handleChangeOrigine}
                                                >
                                                    <Grid container spacing={2}>
                                                        {origines.map(item => (
                                                            <Grid item xs={6} key={item.id}>
                                                                <FormControlLabel
                                                                    control={<Radio />}
                                                                    label={item.nom}
                                                                    value={item.id.toString()}
                                                                />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </RadioGroup>
                                            )}
                                        </Grid>

                                    )}
                                </Grid>
                                <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
                                    <Button variant="contained" onClick={handleSubmit}>
                                        Modifier
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </Stack >
            </Container >
        </Box >
    );
}

export default Modifier;