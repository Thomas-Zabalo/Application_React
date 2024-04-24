import React from "react";
import { Container, Box, Stack } from "@mui/material";
import Sidebar from "../../components/Nav/Sidebar";
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
