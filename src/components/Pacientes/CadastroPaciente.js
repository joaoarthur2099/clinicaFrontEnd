import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate, Link } from 'react-router-dom'; 
import { Container, Form, Button, Alert } from 'react-bootstrap';


const CadastroPaciente = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [convenio, setConvenio] = useState('');
  const [residencia, setResidencia] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/pacientes', {
        nome,
        cpf,
        convenio,
        residencia,
        nascimento,
        telefone,
      });
      setSuccess('Paciente cadastrado com sucesso!');
      setNome('');
      setCpf('');
      setConvenio('');
      setResidencia('');
      setNascimento('');
      setTelefone('');
    } catch (err) {
      console.error('Erro ao cadastrar paciente:', err);
      setError('Erro ao cadastrar paciente. Verifique os campos e tente novamente.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Cadastro de Paciente</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConvenio">
          <Form.Label>Convênio</Form.Label>
          <Form.Control type="text" value={convenio} onChange={(e) => setConvenio(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formResidencia">
          <Form.Label>Residência</Form.Label>
          <Form.Control type="text" value={residencia} onChange={(e) => setResidencia(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNascimento">
          <Form.Label>Nascimento</Form.Label>
          <Form.Control type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
        <Link to="/pacientes" className="btn btn-secondary ms-2">Cancelar</Link>
      </Form>
    </Container>
  );
};

export default CadastroPaciente;
