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

function Dashboard(dPerso) {
    return (
        <Grid container spacing={2} sx={{ p: 2, alignItems: 'stretch' }}>
            <CardStats
                icon={dPerso.dPerso.sousraces.races.icone}
                category="Race"
                title={dPerso.dPerso.sousraces.races.nom}
                description={dPerso.dPerso.sousraces.races.description}
            />
            {dPerso.dPerso.sousraces.races.nom !== dPerso.dPerso.sousraces.nom && (
                <CardStats
                    icon={dPerso.dPerso.sousraces.icone}
                    category="Sous Race"
                    title={dPerso.dPerso.sousraces.nom}
                    description={dPerso.dPerso.sousraces.description}
                />
            )}
            <CardStats
                icon={dPerso.dPerso.sousclasses.classes.icone}
                category="Classe"
                title={dPerso.dPerso.sousclasses.classes.nom}
                description={dPerso.dPerso.sousclasses.classes.description}
            />
            <CardStats
                icon={dPerso.dPerso.sousclasses.icone}
                category="Sous Classe"
                title={dPerso.dPerso.sousclasses.nom}
                description={dPerso.dPerso.sousclasses.description}
            />
            <CardStats
                icon={dPerso.dPerso.origines.icone}
                category="Origine"
                title={dPerso.dPerso.origines.nom}
                description={dPerso.dPerso.origines.description}
            />
        </Grid>
    );
}

export default Dashboard;
