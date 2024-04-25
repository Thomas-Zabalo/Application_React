import React, { useState, useEffect } from 'react';
import { Container, Box, Stack, Card, Typography, Grid, CardContent, CardActions, Button, Avatar } from "@mui/material";
import { useParams } from 'react-router-dom'; //
import Sidebar from "../../components/Nav/Sidebar";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Gestion() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('userToken');

    const handleNavigate = () => {
        navigate(`/Admin`);
    };

    let url = `https://zabalo.alwaysdata.net/sae401/api/${id}`;

    useEffect(() => {
        detail(url, accessToken);
    }, [url, accessToken]);


    function detail(url, accessToken) {
        const fetchOptions = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: "GET"
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                // console.log(dataJSON)
                setData(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    }


    const handleSuppression = (itemid) => {
        console.log(itemid)
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer : ${id} ?`)) {
            supprimerPersonnage(itemid)
        }
    };

    function supprimerPersonnage(itemid) {
        const accessToken = localStorage.getItem('userToken');
        const url = `https://zabalo.alwaysdata.net/sae401/api/${id}/${itemid}`;
        console.log(url)

        const fetchOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                console.log(dataJSON)
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />

            <Container>
                <Button variant="contained" sx={{ mt: 5 }} onClick={handleNavigate}>
                    <ArrowBackIosIcon />
                    Retour
                </Button>
                <Stack>

                    <Typography variant="h2" fontWeight="medium" sx={{ pt: { xs: 4, sm: 4 } }}>
                        Gestion des {id}
                    </Typography>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        {data.map(item => (
                            <Grid item xs={12} sm={6} md={3} key={item.id}>
                                <Card sx={{ width: '100%', m: 1 }}>
                                    <CardContent>
                                        <Typography>{item.nom ? item.nom : item.name}</Typography>
                                    </CardContent>
                                    <Avatar
                                        src={item.icone}
                                        sx={{ width: 200, height: 200, mb: 2, backgroundColor: "black" }}
                                        variant="rounded"
                                    />
                                    <CardActions>
                                        <Button variant="contained" sx={{
                                            backgroundColor: 'orange',
                                            '&:hover': {
                                                backgroundColor: '#E59C03'
                                            }
                                        }} onClick={() => navigate(`/ModifAdmin/` + item.id, { state: { info: id } })}> Modifier</Button>

                                        <Button variant="contained" color="error" onClick={() => handleSuppression(item.id)}>
                                            Supprimer
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Container>
        </Box >
    );
}

export default Gestion