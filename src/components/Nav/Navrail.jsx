import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Box } from '@mui/material';
import { MdMenu, MdAttachFile, MdMail, MdFavorite, MdMap, MdMessage, MdSettings } from 'react-icons/md';

function NavigationComponent() {
    return (
        <Box sx={{ width: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: '12px', borderRadius: 'extra-large', bgcolor: 'surface-container', py: '16px', color: 'on-surface', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', gap: '12px' }}>
                {/* Top icons */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <ListItem button component={Link} to="/menu" sx={{ height: '56px', borderRadius: '50%', px: '16px', '&:hover': { bgcolor: 'surface-container-highest' } }}>
                            <ListItemIcon><MdMenu /></ListItemIcon>
                        </ListItem>
                    </Box>
                </Box>

                {/* Center icons */}
                <List sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', gap: '8px', py: '16px' }}>
                    <ListItem button component={Link} to="/" sx={{ height: '32px', borderRadius: '50%', px: '16px', '&:hover': { bgcolor: 'surface-container-highest' } }}>
                        <ListItemIcon><MdAttachFile /></ListItemIcon>
                        <ListItemText primary="Files" sx={{ pb: '6px', pt: '4px', fontSize: 'label-medium', textAlign: 'center' }} />
                    </ListItem>
                    {/* More items */}
                </List>

            </Box>
        </Box>
    );
}

export default NavigationComponent;
