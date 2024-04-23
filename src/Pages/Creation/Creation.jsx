import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/Nav/Sidebar";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Dashboard from "../../components/CreaCard";
import Personnage from "../../models/PersonnageController";
import { useLocation } from 'react-router-dom';


function Creation() {
    const location = useLocation();
    console.log(location)

    const { idPerso } = useParams();
    const [dPerso, setdPerso] = useState(null);

    useEffect(() => {
        const fetchPersoDetail = () => {
            fetch(
                `https://zabalo.alwaysdata.net/sae401/api/personnages/4`
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
                <div>
                    {dPerso && (
                        <>
                            <Typography
                                variant="h1"
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    fontSize: 'clamp(1rem,3vw, 4rem)',
                                }}
                            >
                                <h3>Personnage de {dPerso.user.name}</h3>
                            </Typography>
                            <h2>{dPerso.nom}</h2>
                            <Dashboard dPerso={dPerso} />
                        </>
                    )}
                </div>
            </Container >
        </Box >
    )
}

export default Creation