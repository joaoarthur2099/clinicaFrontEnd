import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';

const EditarSecretaria = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [setor, setSetor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSecretaria = async () => {
      try {
        const response = await api.get(`/secretarias/${id}`);
        const { nome, cpf, email, telefone, setor } = response.data;
        setNome(nome);
        setCpf(cpf);
        setEmail(email);
        setTelefone(telefone);
        setSetor(setor);
      } catch (err) {
        setError('Erro ao buscar secretária. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchSecretaria();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const cpfSemMascara = cpf.replace(/\D/g, '');
    if (cpfSemMascara.length !== 11) {
      setError('CPF inválido. Deve conter 11 dígitos.');
      return;
    }

    setSaving(true);

    try {
      await api.put(`/secretarias/${id}`, {
        nome,
        cpf: cpfSemMascara,
        email,
        telefone,
        setor,
      });
      setSuccess('Secretária atualizada com sucesso!');
      setTimeout(() => navigate('/secretarias'), 1500);
    } catch (err) {
      setError('Erro ao atualizar secretária. Verifique os campos e tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Carregando dados...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Editar Secretária</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            maxLength={14}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSetor">
          <Form.Label>Setor</Form.Label>
          <Form.Control
            type="text"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar'}
        </Button>
        <Link to="/secretarias" className="btn btn-secondary ms-2">Cancelar</Link>
      </Form>
    </Container>
  );
};

export default EditarSecretaria;
