import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardActions, Button, Typography, Grid } from "@mui/material";
import Personnage from "../../models/PersonnageController";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Sidebar from "../../components/Nav/Sidebar";
import Stack from '@mui/material/Stack';
import SearchBar from "../../components/Home/SearchBar";
import TextAdmin from "../../components/Admin/TextAdmin";
import AdminCard from "../../components/Admin/CardAdmin";

export default function Admin() {

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Box sx={{ pt: { xs: 14, sm: 20 }, pb: { xs: 8, sm: 12 } }}>
                    <Stack>
                        <TextAdmin />
                        <AdminCard />
                    </Stack>
                </Box>
            </Container>
        </Box >
    );
}
