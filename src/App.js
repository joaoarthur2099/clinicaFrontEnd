import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

import ListaPacientes from './components/Pacientes/ListaPacientes';
import CadastroPaciente from './components/Pacientes/CadastroPaciente';
import EditarPaciente from './components/Pacientes/EditarPaciente';

import ListaMedicos from './components/Medicos/ListaMedicos';
import CadastroMedico from './components/Medicos/CadastroMedico';
import EditarMedico from './components/Medicos/EditarMedico'; 

import ListaSecretarias from './components/Secretarias/ListaSecretarias';
import CadastroSecretaria from './components/Secretarias/CadastroSecretaria';
import EditarSecretaria from './components/Secretarias/EditarSecretaria';

import ListaConsultas from './components/Consultas/ListaConsultas';
import CadastroConsulta from './components/Consultas/CadastroConsulta';
import EditarConsulta from './components/Consultas/EditarConsulta';


import Documentacao from './components/Documentacao';

import { AuthProvider } from './auth/AuthProvider';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  function login(newToken) {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem('token');
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token]);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login login={login} />} />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={token ? <Dashboard logout={logout} /> : <Navigate to="/login" />} />

          {/* Pacientes */}
          <Route path="/pacientes" element={token ? <ListaPacientes /> : <Navigate to="/login" />} />
          <Route path="/pacientes/cadastro" element={token ? <CadastroPaciente /> : <Navigate to="/login" />} />
          <Route path="/pacientes/editar/:id" element={token ? <EditarPaciente /> : <Navigate to="/login" />} />

          {/* Médicos */}
          <Route path="/medicos" element={token ? <ListaMedicos /> : <Navigate to="/login" />} />
          <Route path="/medicos/cadastro" element={token ? <CadastroMedico /> : <Navigate to="/login" />} />
          <Route path="/medicos/editar/:id" element={token ? <EditarMedico /> : <Navigate to="/login" />} />  {/* Rota adicionada */}

          {/* Secretarias */}
          <Route path="/secretarias" element={token ? <ListaSecretarias /> : <Navigate to="/login" />} />
          <Route path="/secretarias/cadastro" element={token ? <CadastroSecretaria /> : <Navigate to="/login" />} />
          <Route path="/secretarias/editar/:id" element={token ? <EditarSecretaria /> : <Navigate to="/login" />} />

          {/* Consultas */}
          <Route path="/consultas" element={token ? <ListaConsultas /> : <Navigate to="/login" />} />
          <Route path="/consultas/cadastro" element={token ? <CadastroConsulta /> : <Navigate to="/login" />} />
          <Route path="/consultas/editar/:idConsulta" element={<EditarConsulta />} />

          {/* Documentação */}
          <Route path="/documentacao" element={token ? <Documentacao /> : <Navigate to="/login" />} />

          {/* rediriciona para o dashboard princiapl */}
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
