import React, { useState } from 'react';
import api from '../api/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Cadastro = ({ voltarParaLogin }) => {
  const [fullName, setNome] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/auth/register', { fullName, userName, password });
      setSuccess('Usuário cadastrado com sucesso! Faça login para continuar.');
      setNome('');
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error("Erro durante o cadastro:", err.response);
      if (err.response && err.response.status === 400 && err.response.data.message === "Nome de usuário já existe") {
        setError('Nome de usuário indisponível!');
      } else if (err.response && err.response.status === 500) {
        setError('Erro interno do servidor. Por favor, tente novamente mais tarde.');
      } else {
        setError('Erro ao cadastrar usuário. Por favor, tente novamente.');
      }
    }
  };

  return (
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
      <h2>Cadastro</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicNome">
          <Form.Control
            type="text"
            placeholder="Nome"
            value={fullName}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Email"
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
          Cadastrar
        </Button>

        <Button variant="secondary" className="w-100" onClick={voltarParaLogin}>
          Voltar para o Login
        </Button>
      </Form>
    </Container>
  );
};

export default Cadastro;
