import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar, Divider, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const CardStats = ({ icon, category, title, description }) => {
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
            </StyledCard>
        </Grid>
    );
};

function UserCard(Perso) {
    console.log(Perso.Perso)
    return (
        <Grid container spacing={2} sx={{ p: 2, alignItems: 'stretch' }}>
            <CardStats
                icon={Perso.Perso.sousraces.races.icone}
                category="Race"
                title={Perso.Perso.sousraces.races.nom}
                description={Perso.Perso.sousraces.races.description}
            />
            {Perso.Perso.sousraces.races.nom !== Perso.Perso.sousraces.nom && (
                <CardStats
                    icon={Perso.Perso.sousraces.icone}
                    category="Sous Race"
                    title={Perso.Perso.sousraces.nom}
                    description={Perso.Perso.sousraces.description}
                />
            )}
            <CardStats
                icon={Perso.Perso.sousclasses.classes.icone}
                category="Classe"
                title={Perso.Perso.sousclasses.classes.nom}
                description={Perso.Perso.sousclasses.classes.description}
            />
            <CardStats
                icon={Perso.Perso.sousclasses.icone}
                category="Sous Classe"
                title={Perso.Perso.sousclasses.nom}
                description={Perso.Perso.sousclasses.description}
            />
            <CardStats
                icon={Perso.Perso.origines.icone}
                category="Origine"
                title={Perso.Perso.origines.nom}
                description={Perso.Perso.origines.description}
            />
        </Grid>
    );
}

export default UserCard;
