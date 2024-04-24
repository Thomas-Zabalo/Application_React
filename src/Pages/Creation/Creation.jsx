import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/Nav/Sidebar";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import UserCard from "../../components/Utilisateur/CreaCard";
import Button from "@mui/material/Button";
import Personnage from "../../models/PersonnageController";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Creation() {
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(location)
    const [Perso, setPerso] = useState(null);
    const nom = location.state ? location.state.nom : null;


    useEffect(() => {
        const url = `https://zabalo.alwaysdata.net/sae401/api/personnages?nom=${nom}`;
        PersoDetail(url);
    }, []);

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
                setPerso(dataJSON[0]);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    console.log(Perso)



    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <div>

                    {Perso && (
                        <>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 20,

                                    fontSize: 10,
                                    p: 0.5
                                }}
                                onClick={() => navigate('/')}
                            >
                                Accueil
                            </Button>
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
                                <h3>Personnage de {Perso.user.name}</h3>
                            </Typography>
                            <h2>{Perso.nom}</h2>
                            <UserCard Perso={Perso} />
                        </>
                    )}
                </div>
            </Container >
        </Box >
    )
}

export default Creation