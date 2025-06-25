import React from 'react';
import { Button } from 'react-bootstrap';

const MedicoRow = ({ medico }) => {
  return (
    <tr>
      <td>{medico.id}</td>
      <td>{medico.nome}</td>
      <td>{medico.especialidade}</td>
      <td>{medico.crm}</td>
      <td>{medico.telefone}</td>
      <td>
        <Button variant="outline-primary" size="sm">Editar</Button>{' '}
        <Button variant="outline-danger" size="sm">Excluir</Button>
      </td>
    </tr>
  );
};

export default MedicoRow;
