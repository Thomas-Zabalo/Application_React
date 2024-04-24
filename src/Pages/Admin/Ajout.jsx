import React, { useState, useEffect } from 'react';
import { Container, Box, Stack, Card, Typography, Grid, FormControlLabel, RadioGroup, Radio, Button, TextField, Avatar } from "@mui/material";
import { useParams } from 'react-router-dom'; //
import Sidebar from "../../components/Nav/Sidebar";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Ajout() {
    const navigate = useNavigate();
    const { id } = useParams();


    const [data, setData] = useState([]);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nom || !description || !selectedItem || !image) {
            alert("Please ensure all fields are filled and a file is selected.");
            return;
        }

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('description', description);
        formData.append('image', image);

        if (id === "sousraces") {
            formData.append("races_id",selectedItem);
        } else if (id === "sousclasses") {
            formData.append("classes_id", selectedItem);
        }

        const accessToken = localStorage.getItem('userToken');
        const url = `https://zabalo.alwaysdata.net/sae401/api/${id}`;

        add(url, formData, accessToken);
     
    }

    function add(url, formData, token) {
        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    };



    useEffect(() => {
        let apiUrl;
        if (id === "sousraces") {
            apiUrl = "https://zabalo.alwaysdata.net/sae401/api/races";
            Races(apiUrl);
        } else if (id === "sousclasses") {
            apiUrl = "https://zabalo.alwaysdata.net/sae401/api/classes";
            Classes(apiUrl);
        }
    }, [id]);


    function Races(url) {
        const fetchOptions = {
            method: "GET"
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                setData(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function Classes(url) {
        const fetchOptions = {
            method: "GET"
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                setData(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSelectionChange = (event) => {
        setSelectedItem(event.target.value);
    };


    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Button variant="contained" sx={{ mt: 5 }} onClick={() => navigate(`/Admin`)}>
                    <ArrowBackIosIcon /> Retour
                </Button>
                <Stack>
                    <Typography variant="h2" fontWeight="medium" sx={{ pt: { xs: 4, sm: 4 } }}>
                        Ajout d'un/une {id}
                    </Typography>
                    <Box m={12}>
                        <Card>
                            <Box p={2}>
                                <Grid container spacing={3}>
                                    <Grid item
                                        xs={12}
                                        md={6}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        {imagePreviewUrl && (
                                            <Avatar
                                                src={imagePreviewUrl}
                                                sx={{ width: 200, height: 200, mb: 2 }}
                                                variant="rounded"
                                            />
                                        )}
                                        <input
                                            accept="image/*"
                                            type="file"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                            id="file-input"
                                        />
                                        <label htmlFor="file-input">
                                            <Button variant="contained" component="span">
                                                Ajouter une icône
                                            </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Nom"
                                            value={nom}
                                            onChange={e => setNom(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Description"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                        {(id === "sousraces" || id === "sousclasses") && (
                                            <RadioGroup
                                                name="itemSelection"
                                                value={selectedItem}
                                                onChange={handleSelectionChange}
                                            >
                                                <Grid container spacing={2}>
                                                    {data.map(item => (
                                                        <Grid item xs={6} key={item.id}>
                                                            <FormControlLabel
                                                                control={<Radio />}
                                                                label={item.nom}
                                                                value={item.id.toString()}
                                                            />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </RadioGroup>
                                        )}
                                    </Grid>
                                </Grid>
                                <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
                                    <Button variant="contained" onClick={handleSubmit}>
                                        Ajouter
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </Stack >
            </Container >
        </Box >
    );
}

export default Ajout;