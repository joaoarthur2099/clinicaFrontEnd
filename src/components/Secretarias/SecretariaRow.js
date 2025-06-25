import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const SecretariaRow = ({ secretaria, onDelete }) => {
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate(`/secretarias/editar/${secretaria.id}`);
  };

  const handleExcluir = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta secretária?')) {
      try {
        await api.delete(`/secretarias/${secretaria.id}`);
        onDelete(secretaria.id);
      } catch (err) {
        console.error('Erro ao excluir secretária:', err);
        alert('Erro ao excluir secretária. Tente novamente.');
      }
    }
  };

  return (
    <tr>
      <td>{secretaria.id}</td>
      <td>{secretaria.nome}</td>
      <td>{secretaria.email}</td>
      <td>{secretaria.telefone}</td>
      <td>
        <Button variant="outline-primary" size="sm" onClick={handleEditar}>Editar</Button>{' '}
        <Button variant="outline-danger" size="sm" onClick={handleExcluir}>Excluir</Button>
      </td>
    </tr>
  );
};

export default SecretariaRow;
