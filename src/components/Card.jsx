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
        <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
                <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
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

function Dashboard(lPerso) {
    console.log(lPerso.lPerso)
    return (
        <Grid container spacing={2} sx={{ p: 2, justifyContent: 'center', alignItems: 'center' }}>
            <CardStats
                icon={lPerso.lPerso.sousraces.races.icone}
                category="Race"
                title={lPerso.lPerso.sousraces.races.nom}
                description={lPerso.lPerso.sousraces.races.description}
            />
            <CardStats
                icon={lPerso.lPerso.sousclasses.classes.icone}
                category="Classe"
                title={lPerso.lPerso.sousclasses.classes.nom}
                description={lPerso.lPerso.sousraces.races.description}
            />
            <CardStats
                icon={lPerso.lPerso.origines.icone}
                category="Origine"
                title={lPerso.lPerso.origines.nom}
                description={lPerso.lPerso.sousraces.races.description}
            />
        </Grid>
    );
}

export default Dashboard;
