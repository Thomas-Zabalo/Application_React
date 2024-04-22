import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

function SearchBar() {
    const [nom, setNom] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate("/Liste?nom=" + nom);
        window.location.reload()
        setNom('');
    };

    return (
        <TextField
            autoComplete="off"
            id="outlined-basic"
            hiddenLabel
            size="small"
            variant="outlined"
            placeholder="Rechercher un personnage"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
    )
}

export default SearchBar