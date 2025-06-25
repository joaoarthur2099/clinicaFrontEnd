import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Container, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';

const EditarMedico = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');                 
  const [crm, setCrm] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const response = await api.get(`/medicos/${id}`);
        const medico = response.data;
        setNome(medico.nome);
        setCpf(medico.cpf);                          
        setCrm(medico.crm);
        setEspecialidade(medico.especialidade);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar médico:', err);
        setError('Erro ao carregar os dados do médico. Tente novamente.');
        setLoading(false);
      }
    };

    fetchMedico();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put('/medicos', {
        id,
        nome,
        cpf,                                          
        crm,
        especialidade,
      });
      navigate('/medicos');
    } catch (err) {
      console.error('Erro ao atualizar médico:', err);
      setError('Erro ao atualizar o médico. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" variant="primary" />
        <p>Carregando dados...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={() => navigate('/medicos')} className="mb-3">
        Voltar para Lista de Médicos
      </Button>

      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Editar Médico</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do médico"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cpf">    
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="crm">
              <Form.Label>CRM</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o CRM"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="especialidade">
              <Form.Label>Especialidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a especialidade"
                value={especialidade}
                onChange={(e) => setEspecialidade(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditarMedico;
