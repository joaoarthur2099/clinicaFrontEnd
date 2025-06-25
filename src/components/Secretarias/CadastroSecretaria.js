import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const CadastroSecretaria = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [setor, setSetor] = useState('');   
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const cpfSemMascara = cpf.replace(/\D/g, '');
    if (cpfSemMascara.length !== 11) {
      setError('CPF inválido. Certifique-se de que tem 11 dígitos.');
      return;
    }

    if (setor.trim() === '') {
      setError('Por favor, informe o setor.');
      return;
    }

    try {
      await api.post('/secretarias', {
        nome,
        cpf: cpfSemMascara,
        email,
        telefone,
        setor,
      });
      setSuccess('Secretária cadastrada com sucesso!');
      setNome('');
      setCpf('');
      setEmail('');
      setTelefone('');
      setSetor('');
      navigate('/secretarias');
    } catch (err) {
      console.error('Erro ao cadastrar secretária:', err);
      setError('Erro ao cadastrar secretária. Verifique os campos e tente novamente.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Cadastro de Secretária</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            maxLength="14"
            placeholder="Somente números"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSetor">
          <Form.Label>Setor</Form.Label>
          <Form.Control
            type="text"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            required
            placeholder="Informe o setor"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
        <Link to="/secretarias" className="btn btn-secondary ms-2">Cancelar</Link>
      </Form>
    </Container>
  );
};

export default CadastroSecretaria;
