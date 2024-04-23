import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import FaceIcon from '@mui/icons-material/Face';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useAuth } from '../../components/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
    const { userAdmin, userToken, logout } = useAuth();
    const url = "https://zabalo.alwaysdata.net/sae401/api/logout";

    const accessToken = userToken;
    // console.log(userToken)


    function deconnexion() {

        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };

        fetch(url, fetchOptions)
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Erreur lors de la déconnexion');
                }
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                logout();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <Box sx={{ width: 250, flexShrink: 0 }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 250,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                    },
                }}
                anchor="left"
            >
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem disablePadding component={Link} to="/" sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon sx={{ minWidth: 0 }} />
                                </ListItemIcon>
                                <ListItemText primary="Accueil" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding component={Link} to="/Liste" sx={{ color: 'black' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Liste" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding component={Link} to="/Nouveau" sx={{ color: 'black' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AddCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Nouveau" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding component={Link} to="/Profil" sx={{ color: 'black' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FaceIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profil" />
                            </ListItemButton>
                        </ListItem>

                        {userAdmin === 'admin' && (
                            <ListItem disablePadding component={Link} to="/Admin" sx={{ color: 'black' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SupervisorAccountIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Admin" />
                                </ListItemButton>
                            </ListItem>
                        )}
                        {userToken && (
                            <ListItem disablePadding component={Link} to="/" sx={{ color: 'black' }} >
                                <ListItemButton onClick={deconnexion}>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Se déconnecter" />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default Sidebar;
