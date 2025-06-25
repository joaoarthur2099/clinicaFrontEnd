import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import SecretariaRow from './SecretariaRow';

const ListaSecretarias = () => {
  const [secretarias, setSecretarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSecretarias = async () => {
      try {
        const response = await api.get('/secretarias/');
        setSecretarias(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar secretárias:', err);
        setError('Erro ao buscar secretárias. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchSecretarias();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Carregando secretárias...</p>
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
        <h2 className="mb-0">Lista de Secretárias</h2>
        <Link to="/secretarias/cadastro" className="btn btn-success">
          Cadastrar Secretária
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {secretarias.map((secretaria) => (
            <SecretariaRow key={secretaria.id} secretaria={secretaria} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaSecretarias;
