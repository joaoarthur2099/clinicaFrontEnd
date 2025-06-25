import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const EditarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [convenio, setConvenio] = useState('');
  const [residencia, setResidencia] = useState('');
  const [nascimento, setNascimento] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await api.get(`/pacientes/${id}`);
        const paciente = response.data;
        setNome(paciente.nome);
        setCpf(paciente.cpf);
        setTelefone(paciente.telefone);
        setConvenio(paciente.convenio);
        setResidencia(paciente.residencia);
        setNascimento(paciente.nascimento);
      } catch (err) {
        console.error('Erro ao buscar paciente:', err);
        setError('Erro ao carregar os dados do paciente.');
      }
    };

    fetchPaciente();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const cpfSemMascara = cpf.replace(/\D/g, '');
    if (cpfSemMascara.length !== 11) {
      setError('CPF inválido. Certifique-se de que tem 11 dígitos.');
      return;
    }

    try {
      await api.put(`/pacientes/${id}`, {
        nome,
        cpf: cpfSemMascara,
        telefone,
        convenio,
        residencia,
        nascimento,
      });
      setSuccess('Paciente atualizado com sucesso!');
      setTimeout(() => {
        navigate('/pacientes');
      }, 1500);
    } catch (err) {
      console.error('Erro ao atualizar paciente:', err);
      setError('Erro ao atualizar paciente. Verifique os campos e tente novamente.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Editar Paciente</h2>
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

        <Form.Group className="mb-3" controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConvenio">
          <Form.Label>Convênio</Form.Label>
          <Form.Control type="text" value={convenio} onChange={(e) => setConvenio(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formResidencia">
          <Form.Label>Residência</Form.Label>
          <Form.Control type="text" value={residencia} onChange={(e) => setResidencia(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNascimento">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Salvar Alterações
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate('/pacientes')}>
          Cancelar
        </Button>
      </Form>
    </Container>
  );
};

export default EditarPaciente;
