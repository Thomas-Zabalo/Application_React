import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/Nav/Sidebar";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Dashboard from "../../components/Home/Card";
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
                )
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
                                    fontWeight: 'bold'
                                }}
                            >
                                Personnage de {dPerso.user.name}
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