import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Grid, Avatar } from "@mui/material";
import Personnage from "../../models/PersonnageController";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

export default function ListeHome() {
    const navigate = useNavigate();
    const [lPerso, setLPerso] = useState([]);
    const url = "https://zabalo.alwaysdata.net/sae401/api/personnages";

    useEffect(() => {
        getPersonnage();
    }, []);

    function getPersonnage() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((dataJSON) => {
                let personnages = dataJSON.slice(0, 4);
                let l = [];
                for (let p of personnages) {
                    let personnage = new Personnage(
                        p.sousraces_id,
                        p.origines_id,
                        p.sousclasses_id,
                        p.users_id,
                        p.nom,
                        p.id,
                        p.user,
                        p.sousclasses,
                        p.sousraces
                    );
                    l.push(personnage);
                }
                setLPerso(l);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleNavigate = () => {
        navigate('/Liste'); 
    };

    const handleDetail = (id) => {
        console.log(id)
        navigate(`/detail/${id}`); 
    };

    return (
        <div style={{ position: "relative" }}>
            <Box style={{ display: 'flex', flexDirection: 'row-reverse', padding: 0, margin: 0 }}>
                <Button variant="contained" onClick={handleNavigate} style={{ top: 0, right: 0, marginBottom: 12 }} >
                    Voir plus
                </Button>
            </Box>
            <Grid container spacing={4}>
                {lPerso.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Box sx={{ color: 'warning.main', p: 2, textAlign: 'center', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <Avatar src={item.sousclasses.icone} sx={{ backgroundColor: "black" }} />
                                    <Avatar src={item.sousraces.icone} sx={{ backgroundColor: "black" }} />
                                </Box>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {item.user.name}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {item.nom}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {item.sousclasses.nom}
                                </Typography>
                                <Typography variant="body2">
                                    {item.sousraces.nom}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={() => handleDetail(item.id)}>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
