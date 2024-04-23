import React from 'react';
import { Grid, Card, CardContent, CardActions, Typography, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const CardStats = ({ icon, category, title, footerIcon, footerText }) => {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
                <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ color: 'warning.main', p: 2, textAlign: 'center' }}>
                        <Icon>{icon}</Icon>
                    </Box>
                    <div>
                        <Typography variant="subtitle1" color="textSecondary">
                            {category}
                        </Typography>
                        <Typography variant="h5">{title}</Typography>
                    </div>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Icon>{footerIcon}</Icon>
                    <Typography variant="subtitle2">
                        {footerText}
                    </Typography>
                </CardActions>
            </StyledCard>
        </Grid>
    );
};

function Dashboard() {
    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <CardStats
                icon="nc-icon nc-globe"
                category="Capacity"
                title="150GB"
                footerIcon="fas fa-sync-alt"
                footerText="Update Now"
            />
            <CardStats
                icon="nc-icon nc-money-coins"
                category="Revenue"
                title="$1,345"
                footerIcon="far fa-calendar"
                footerText="Last day"
            />
            <CardStats
                icon="nc-icon nc-vector"
                category="Errors"
                title="23"
                footerIcon="far fa-clock"
                footerText="In the last hour"
            />
            <CardStats
                icon="nc-icon nc-favourite-28"
                category="Followers"
                title="+45K"
                footerIcon="fas fa-sync-alt"
                footerText="Update now"
            />
        </Grid>
    );
}

export default Dashboard;
