import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const CadastroConsulta = () => {
  const [medicoId, setMedicoId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [preco, setPreco] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicos = async () => {
      setLoading(true);
      try {
        const response = await api.get('/medicos/');
        setMedicos(response.data);
        setError('');
      } catch (err) {
        console.error('Erro ao buscar médicos:', err);
        setError('Erro ao buscar médicos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/consultas', {
        idMedicoResponsavel: medicoId,  
        dia: data,                        
        hora: hora,                        
        preco: preco,                      
        idPrescricaoMedica: 1,            
      });
      
      setSuccess('Consulta cadastrada com sucesso!');
      setMedicoId('');
      setData('');
      setHora('');
      setPreco('');
      navigate('/consultas');
    } catch (err) {
      console.error('Erro ao cadastrar consulta:', err);
      setError('Erro ao cadastrar consulta. Verifique os campos e tente novamente.');
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Carregando dados...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Cadastro de Consulta</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formMedico">
          <Form.Label>Médico</Form.Label>
          <Form.Control
            as="select"
            value={medicoId}
            onChange={(e) => setMedicoId(e.target.value)}
            required
          >
            <option value="">Selecione um médico</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nome} (ID: {medico.id})
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formData">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHora">
          <Form.Label>Hora</Form.Label>
          <Form.Control
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPreco">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
        <Link to="/consultas" className="btn btn-secondary ms-2">Cancelar</Link>
      </Form>
    </Container>
  );
};

export default CadastroConsulta;
