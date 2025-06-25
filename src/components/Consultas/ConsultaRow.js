import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ConsultaRow = ({ consulta }) => {
  const navigate = useNavigate();  

  const handleEdit = () => {
    navigate(`/consultas/editar/${consulta.id}`);  
  };

  return (
    <tr>
      <td>{consulta.id}</td>
      <td>{consulta.pacienteNome}</td>
      <td>{consulta.medicoNome}</td>
      <td>{new Date(consulta.dataHora).toLocaleString()}</td>
      <td>{consulta.status}</td>
      <td>
        <Button variant="outline-primary" size="sm" onClick={handleEdit}>
          Editar
        </Button>{' '}
        <Button variant="outline-danger" size="sm">
          Excluir
        </Button>
      </td>
    </tr>
  );
};

export default ConsultaRow;
