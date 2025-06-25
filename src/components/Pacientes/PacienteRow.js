import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const PacienteRow = ({ paciente, onDelete }) => {
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate(`/pacientes/editar/${paciente.id}`);
  };

  const handleExcluir = async () => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await api.delete(`/pacientes/${paciente.id}`);
        onDelete(paciente.id); 
      } catch (error) {
        console.error('Erro ao excluir paciente:', error);
        alert('Erro ao excluir paciente. Tente novamente.');
      }
    }
  };

  return (
    <tr>
      <td>{paciente.id}</td>
      <td>{paciente.nome}</td>
      <td>{paciente.cpf}</td>
      <td>{paciente.convenio}</td>
      <td>{paciente.residencia}</td>
      <td>{new Date(paciente.nascimento).toLocaleDateString()}</td>
      <td>{paciente.telefone}</td>
      <td>
        <Button variant="outline-primary" size="sm" onClick={handleEditar}>Editar</Button>{' '}
        <Button variant="outline-danger" size="sm" onClick={handleExcluir}>Excluir</Button>
      </td>
    </tr>
  );
};

export default PacienteRow;
