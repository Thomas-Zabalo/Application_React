import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/Nav/Sidebar";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Dashboard from "../../components/Card";
import Personnage from "../../models/PersonnageController";

// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Collapse from "@mui/material/Collapse";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import StarBorder from "@mui/icons-material/StarBorder";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";



function Detail() {

    const { idPerso } = useParams();
    const [dPerso, setdPerso] = useState(null);

    useEffect(() => {
        const fetchPersoDetail = () => {
            fetch(
                `https://zabalo.alwaysdata.net/sae401/api/personnages/${idPerso}`
            )
                .then((response) => {
                    return response.json();
                })
                .then((dataJSON) => {
                    let personnage = new Personnage(
                        dataJSON.sousraces_id,
                        dataJSON.origines_id,
                        dataJSON.sousclasses_id,
                        dataJSON.users_id,
                        dataJSON.nom,
                        dataJSON.id,
                        dataJSON.user,
                        dataJSON.sousclasses,
                        dataJSON.sousraces,
                        dataJSON.origines
                    );
                    console.log(dataJSON)
                    console.log(personnage)
                    setdPerso(personnage);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        fetchPersoDetail();
    }, [idPerso]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Dashboard />



                <div>
                    {dPerso && (
                        <>
                            <h2>Personnage de {dPerso.user.name}</h2>
                            <Box mt={5} mb={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} xl={4}>
                                        <h2>Origine</h2>
                                        <div>
                                            <h3>{dPerso.origines.nom}</h3> 
                                            <Avatar
                                                alt="Origine du personnage"
                                                src={dPerso.origines.icone}
                                                sx={{ width: 56, height: 56, backgroundColor: 'black' }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} xl={4}>
                                        <h2>Race</h2>
                                        <div>
                                            <h4>{dPerso.sousraces.races.nom}</h4>
                                            <Avatar
                                                alt="Race du personnage"
                                                src={dPerso.sousraces.races.icone}
                                                sx={{ width: 56, height: 56, backgroundColor: 'black' }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} xl={4}>
                                        <h2>Classe</h2>
                                        <div>
                                            <h3>{dPerso.sousclasses.classes.nom}</h3>
                                            <Avatar
                                                alt="Classes du personnage"
                                                src={dPerso.sousclasses.classes.icone}
                                                sx={{ width: 56, height: 56, backgroundColor: 'black' }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box mb={3}>
                                <Card>
                                    <Box pt={2} px={2}>
                                        <Box mb={0.5}>
                                            <Typography variant="h6" fontWeight="medium">
                                                Nom du personnage : {dPerso.nom}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        </>
                    )}
                </div>
            </Container >
        </Box >
    )
}

export default Detail