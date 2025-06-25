import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert, Spinner, Modal, Form } from 'react-bootstrap';

const ListaMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [medicoToDelete, setMedicoToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedicos, setFilteredMedicos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await api.get('/medicos/');
        setMedicos(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar médicos:', err);
        setError('Erro ao buscar médicos. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchMedicos();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMedicos(medicos);
      return;
    }

    const filtered = medicos.filter((medico) =>
      medico.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicos(filtered);
  }, [medicos, searchTerm]);

  const handleDeleteClick = (medico) => {
    setMedicoToDelete(medico);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!medicoToDelete) return;

    setActionLoading(true);
    try {
      await api.delete(`/medicos/${medicoToDelete.id}`);
      setMedicos((prev) => prev.filter((m) => m.id !== medicoToDelete.id));
      setShowDeleteModal(false);
      setMedicoToDelete(null);
    } catch (error) {
      alert('Erro ao excluir o médico. Tente novamente.');
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/medicos/editar/${id}`);
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" variant="primary" />
        <p>Carregando dados...</p>
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
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Voltar ao Dashboard
        </Button>
        <h2 className="mb-0">Lista de Médicos</h2>
        <Link to="/medicos/cadastro" className="btn btn-success">
          + Novo Médico
        </Link>
      </div>

      <Form.Group className="mb-3" controlId="searchMedico">
        <Form.Label>Buscar por Nome:</Form.Label>
        <Form.Control
          type="search"
          placeholder="Digite o nome do médico"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
      </Form.Group>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CRM</th>
            <th>Especialidade</th>
            <th style={{ minWidth: 140 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicos.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                Nenhum médico encontrado.
              </td>
            </tr>
          ) : (
            filteredMedicos.map((medico) => (
              <tr key={medico.id}>
                <td>{medico.id}</td>
                <td>{medico.nome}</td>
                <td>{medico.crm}</td>
                <td>{medico.especialidade}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditClick(medico.id)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteClick(medico)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o médico <b>{medicoToDelete?.nome}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={actionLoading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={actionLoading}>
            {actionLoading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListaMedicos;
