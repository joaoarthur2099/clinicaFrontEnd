import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import PacienteRow from './PacienteRow';

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get('/pacientes/');
        setPacientes(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
        setError('Erro ao buscar pacientes. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const handleDelete = (id) => {
    setPacientes(pacientes.filter((paciente) => paciente.id !== id));
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Carregando pacientes...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Voltar
        </Button>
        <h2 className="mb-0">Lista de Pacientes</h2>
        <Link to="/pacientes/cadastro" className="btn btn-success">
          Cadastrar Paciente
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Convênio</th>
            <th>Residência</th>
            <th>Nascimento</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <PacienteRow key={paciente.id} paciente={paciente} onDelete={handleDelete} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaPacientes;
