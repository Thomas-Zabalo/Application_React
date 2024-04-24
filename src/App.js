import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Home Screen
import HomeScreen from './Pages/Home/HomeScreen';
import Liste from './Pages/ListPerso/ListeScreen';
import Detail from './Pages/ListPerso/Detail';

//Connexion / Inscription Screen
import SignUpScreen from './Pages/Connexion/SignUpScreen';
import LoginScreen from './Pages/Connexion/LoginScreen';

//Route protégé Screen
import { ProtectedRoute, ProtectedAdmin } from './components/Authentification/Protected';

//Admin
import Admin from './Pages/Admin/AdminScreen';
import Gestion from './Pages/Admin/Gestion';
import Ajout from './Pages/Admin/Ajout';
import Modification from './Pages/Admin/Modification';

//Creation Personnage Screen
import ProfilScreen from './Pages/Profil/ProfilScreen';
import Modifier from './Pages/Profil/Modifier';

//Creation Personnage Screen
import Race from './Pages/Creation/Races';
import SousRace from './Pages/Creation/SousRaces';
import Classe from './Pages/Creation/Classes';
import SousClasse from './Pages/Creation/SousClasses';
import Origine from './Pages/Creation/Origines';
import Creation from './Pages/Creation/Creation';

export default function App() {

  return (
    <Router>
      <div className="d-flex">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/SignUp" element={<SignUpScreen />} />
          <Route path="/Login" element={<LoginScreen />} />
          <Route path="/Liste" element={<Liste />} />

          <Route path="/Admin" element={
            <ProtectedAdmin>
              <Admin />
            </ProtectedAdmin>} />

          <Route path="/Gestion/:id" element={
            <ProtectedAdmin>
              <Gestion />
            </ProtectedAdmin>} />

          <Route path="/Ajout/:id" element={
            <ProtectedAdmin>
              <Ajout />
            </ProtectedAdmin>} />

          <Route path="/Detail/:idPerso" element={<Detail />} />

          <Route path="/Profil" element={
            <ProtectedRoute>
              <ProfilScreen />
            </ProtectedRoute>
          } />

          <Route path="/Modifier/:id" element={
            <ProtectedRoute>
              <Modifier />
            </ProtectedRoute>
          } />

          <Route path="/ModifAdmin/:id" element={
            <ProtectedAdmin>
              <Modification />
            </ProtectedAdmin>
          } />

          <Route path="/Nouveau" element={
            <ProtectedRoute>
              <Race />
            </ProtectedRoute>} />

          <Route path="/SousRace" element={
            <ProtectedRoute>
              <SousRace />
            </ProtectedRoute>} />

          <Route path="/Classe" element={
            <ProtectedRoute>
              <Classe />
            </ProtectedRoute>} />

          <Route path="/Sousclasse" element={
            <ProtectedRoute>
              <SousClasse />
            </ProtectedRoute>} />

          <Route path="/Origine" element={
            <ProtectedRoute>
              <Origine />
            </ProtectedRoute>} />

          <Route path="/Creation" element={
            <ProtectedRoute>
              <Creation />
            </ProtectedRoute>} />


        </Routes>
      </div>
    </Router>
  );
}
