import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert, Form, Spinner, Modal } from 'react-bootstrap';

const ListaConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [medicos, setMedicos] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConsultas, setFilteredConsultas] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [consultaToDelete, setConsultaToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const consultasResponse = await api.get('/consultas/');
        const medicosResponse = await api.get('/medicos/');
        
        setConsultas(consultasResponse.data);
        setMedicos(medicosResponse.data); // Guardando os médicos

        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Erro ao buscar dados. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredConsultas(consultas);
      return;
    }

    const filtered = consultas.filter((consulta) => {
      return String(consulta.idMedicoResponsavel).includes(searchTerm);
    });
    setFilteredConsultas(filtered);
  }, [consultas, searchTerm]);

  // Função para formatar a data
  const formatDate = (dia) => {
    if (!dia) return 'Data inválida';
    try {
      const formattedDate = new Date(dia);
      return formattedDate.toLocaleDateString('pt-BR'); // Exibindo no formato DD/MM/YYYY
    } catch (error) {
      return 'Data inválida';
    }
  };

  // Função para formatar a hora
const formatTime = (hora) => {
  if (!hora) return 'Hora inválida';

  let horaString = hora.toString().trim();

  // Se vier como "14,35", troca vírgula por dois pontos
  if (horaString.includes(',')) {
    return horaString.replace(',', ':');
  }

  // Se vier como "1435", formata para "14:35"
  if (horaString.length === 4 && !horaString.includes(':')) {
    return `${horaString.slice(0, 2)}:${horaString.slice(2)}`;
  }

  // Se já estiver no formato correto "14:35", retorna direto
  if (horaString.length === 5 && horaString.includes(':')) {
    return horaString;
  }

  return 'Hora inválida';
};



  // Função para buscar o nome do médico pelo ID
  const getMedicoNameById = (id) => {
    const medico = medicos.find((medico) => medico.id === id);
    return medico ? medico.nome : 'Médico não encontrado';
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (consulta) => {
    setConsultaToDelete(consulta);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!consultaToDelete) return;

    setActionLoading(true);
    try {
      await api.delete(`/consultas/${consultaToDelete.id}`);
      setConsultas((prev) => prev.filter((c) => c.id !== consultaToDelete.id));
      setShowDeleteModal(false);
      setConsultaToDelete(null);
    } catch (error) {
      alert('Erro ao excluir a consulta. Tente novamente.');
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/consultas/editar/${id}`);
  };

  const handleBack = () => {
    navigate('/dashboard');
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
        <div className="d-flex align-items-center">
          <Button variant="secondary" className="me-3" onClick={handleBack}>
            Voltar
          </Button>
          <h2 className="mb-0">Lista de Consultas</h2>
        </div>
        <Link to="/consultas/cadastro" className="btn btn-success">
          + Nova Consulta
        </Link>
      </div>

      <Form.Group className="mb-3" controlId="searchMedico">
        <Form.Label>Filtrar por ID do médico responsável:</Form.Label>
        <Form.Control
          type="search"
          placeholder="Digite o ID do médico"
          value={searchTerm}
          onChange={handleSearchChange}
          autoComplete="off"
        />
      </Form.Group>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Preço (R$)</th>
            <th>Médico Responsável</th>
            <th style={{ minWidth: 140 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsultas.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                Nenhuma consulta encontrada.
              </td>
            </tr>
          ) : (
            filteredConsultas.map((consulta) => (
              <tr key={consulta.id}>
                <td>{consulta.id}</td>
                {/* Exibindo data e hora separadas em colunas diferentes */}
                <td>{formatDate(consulta.dia)}</td>
                <td>{formatTime(consulta.hora)}</td>
                <td>{consulta.preco?.toFixed(2) ?? '0.00'}</td>
                {/* Exibindo nome do médico em vez do ID */}
                <td>{getMedicoNameById(consulta.idMedicoResponsavel)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditClick(consulta.id)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteClick(consulta)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal Confirmar Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a consulta ID <b>{consultaToDelete?.id}</b>?
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

export default ListaConsultas;
