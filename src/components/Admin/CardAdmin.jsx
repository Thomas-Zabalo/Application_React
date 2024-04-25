import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar, Divider, CardActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const CardStats = ({ icon, category, title, description, id }) => {
    const navigate = useNavigate();

    const handleDetail = () => {
        navigate(`/gestion/${id}`);
    };
    const handleAjout = () => {
        navigate(`/Ajout/${id}`);
    };

    return (
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <StyledCard sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ color: 'warning.main', p: 2, textAlign: 'center' }}>
                        <Avatar src={icon} sx={{ backgroundColor: "black" }} />
                    </Box>
                    <div>
                        <Typography variant="subtitle2" color="textSecondary">
                            {category}
                        </Typography>
                        <Typography variant="h5">{title}</Typography>
                    </div>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Typography variant="subtitle2">
                        {description}
                    </Typography>
                </CardActions>
                <CardActions>
                    <Button variant="contained" onClick={handleDetail}>Liste</Button>
                    <Button variant="contained" sx={{
                        backgroundColor: "#82E600", '&:hover': {
                            backgroundColor: '#22E500'
                        }
                    }} onClick={handleAjout}>Ajouter</Button>
                </CardActions>
            </StyledCard>
        </Grid>
    );
};

function AdminCard() {
    return (
        <Grid container spacing={2} sx={{ p: 2, alignItems: 'stretch' }}>
            <CardStats
                icon=""
                category="Race"
                title="Gestion des races"
                description="Vous pouvez modifier supprimer et ajouter une race"
                id="races"
            />
            <CardStats
                icon=""
                category="Sous Race"
                title="Gestion des sous races"
                description="Vous pouvez modifier supprimer et ajouter une race"
                id="sousraces"
            />
            <CardStats
                icon=""
                category="Classe"
                title="Gestion des classe"
                description="Vous pouvez modifier supprimer et ajouter une race"
                id="classes"
            />
            <CardStats
                icon=""
                category="Sous Classe"
                title="Gestion des sous classe"
                description="Vous pouvez modifier supprimer et ajouter une race"
                id="sousclasses"
            />
            <CardStats
                icon=""
                category="Origine"
                title="Gestion des origine"
                description="Vous pouvez modifier supprimer et ajouter une race"
                id="origines"
            />

<CardStats
                icon=""
                category="Utilisateurs"
                title="Gestion des Utilisateurs"
                description="Vous pouvez modifier supprimer et ajouter les Utilisateurs"
                id="users"
            />
        </Grid>
    );
}

export default AdminCard;
