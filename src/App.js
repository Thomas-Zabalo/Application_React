import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeScreen from './Pages/Home/HomeScreen';
import SignUpScreen from './Pages/Connexion/SignUpScreen';
import LoginScreen from './Pages/Connexion/LoginScreen';
import Liste from './Pages/ListPerso/ListeScreen';
import Detail from './Pages/ListPerso/Detail';
import ProfilScreen from './Pages/Profil/ProfilScreen';
import Creation from './Pages/Creation/CreationScreen';

export default function App() {
  // Fonction pour récupérer des données
  const retrieveData = async () => {
    try {
      const accessToken = await localStorage.getItem('@UserData:accessToken');
      const user_id = await localStorage.getItem('@UserData:user_id');
      if (accessToken !== null && user_id !== null) {
        console.log(accessToken, user_id);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <Router>
      <div className="d-flex">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/SignIn" element={<SignUpScreen />} />
          <Route path="/Login" element={<LoginScreen />} />
          <Route path="/Liste" element={<Liste />} />
          <Route path="/Detail/:idPerso" element={<Detail />} />
          <Route path="/Profil" element={<ProfilScreen />} />
          <Route path="/Nouveau" element={<Creation />} />
        </Routes>
      </div>
    </Router>
  );
}
