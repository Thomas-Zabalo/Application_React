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

function Detail() {

    const { idPerso } = useParams();
    const [dPerso, setdPerso] = useState(null);

    useEffect(() => {
        const url = `https://zabalo.alwaysdata.net/sae401/api/personnages/${idPerso}`
        PersoDetail(url);
    }, [idPerso]);

    function PersoDetail(url) {
        const fetchOptions = {
            method: "GET",
        }
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON)
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

export default Detail