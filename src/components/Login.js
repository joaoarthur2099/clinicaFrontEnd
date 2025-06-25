import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Cadastro from './Cadastro'; 

const Login = ({ login }) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showCadastro, setShowCadastro] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { userName, password });
      const token = response.data.token;

      login(token);
      navigate('/dashboard');
    } catch (err) {
      console.error("Erro durante o login:", err);
      setError('Usuário ou senha inválidos. Por favor, tente novamente.');
    }
  };

  const toggleCadastro = () => {
    setShowCadastro(!showCadastro);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        margin: 0,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {showCadastro ? (
        <Cadastro voltarParaLogin={toggleCadastro} />
      ) : (
        <Container
          className="login-container"
          style={{
            background: 'white',
            padding: '2rem 3rem',
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            width: '320px',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          <h2>Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                type="text"
                placeholder="Usuário"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Entrar
            </Button>
          </Form>
          <Button variant="link" onClick={toggleCadastro}>
            Não tem uma conta? Cadastre-se
          </Button>
        </Container>
      )}
    </div>
  );
};

export default Login;
