import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeScreen from './Pages/Home/HomeScreen';
import SignUpScreen from './Pages/Connexion/SignUpScreen';
import LoginScreen from './Pages/Connexion/LoginScreen';
import Liste from './Pages/ListPerso/ListeScreen';
import Detail from './Pages/ListPerso/Detail';
import ProfilScreen from './Pages/Profil/ProfilScreen';
import Race from './Pages/Creation/Races';
import SousRace from './Pages/Creation/SousRaces';
import ProtectedRoute from './components/Protected';
import Admin from './Pages/Admin/AdminScreen';
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

          <Route path="/Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/Detail/:idPerso" element={<Detail />} />

          <Route path="/Profil" element={
            <ProtectedRoute>
              <ProfilScreen />
            </ProtectedRoute>
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
