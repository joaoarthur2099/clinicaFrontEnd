import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Documentacao = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Voltar ao Dashboard
        </Button>
        <h2 className="mb-0" style={{ color: '#2575fc' }}>Documentação da API - Clínica Médica</h2>
      </div>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Descrição Geral</Card.Title>
          <Card.Text>
            Esta API permite gerenciar médicos, pacientes, secretárias e consultas da Clínica Médica.
            Através dela, é possível realizar operações de cadastro, listagem, edição e exclusão de registros.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Endpoints Disponíveis</Card.Title>
          <ul>
            <li><strong>GET /pacientes/</strong> - Listar todos os pacientes</li>
            <li><strong>POST /pacientes</strong> - Cadastrar novo paciente</li>
            <li><strong>PUT /pacientes</strong> - Atualizar paciente</li>
            <li><strong>DELETE /pacientes/{'{id}'}</strong> - Deletar paciente</li>
            <li><strong>GET /medicos/</strong> - Listar todos os médicos</li>
            <li><strong>POST /medicos</strong> - Cadastrar novo médico</li>
            <li><strong>GET /secretarias/</strong> - Listar todas as secretárias</li>
            <li><strong>POST /secretarias</strong> - Cadastrar nova secretária</li>
            <li><strong>GET /consultas/</strong> - Listar todas as consultas</li>
            <li><strong>POST /consultas</strong> - Cadastrar nova consulta</li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Acessar Swagger</Card.Title>
          <Card.Text>
            Para visualizar a documentação interativa e testar os endpoints, acesse o Swagger UI.
          </Card.Text>
          <Button
            variant="primary"
            href="http://localhost:8000/clinica/api/swagger-ui/index.html"
            target="_blank"
          >
            Abrir Swagger UI
          </Button>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Exemplos de Requisições</Card.Title>
          <Card.Text>
            Para realizar um <strong>GET</strong>:
            <pre style={{ background: '#f8f9fa', padding: '10px' }}>
              GET http://localhost:8000/clinica/api/pacientes/
            </pre>
            Para realizar um <strong>POST</strong>:
            <pre style={{ background: '#f8f9fa', padding: '10px' }}>
              POST http://localhost:8000/clinica/api/pacientes
              {'\n'}
              {'{'}
              {'\n  "nome": "João Silva",'}
              {'\n  "cpf": "12345678901",'}
              {'\n  "convenio": "Unimed",'}
              {'\n  "residencia": "Rua A, 123",'}
              {'\n  "nascimento": "1990-01-01",'}
              {'\n  "telefone": "999999999"'}
              {'\n}'}
            </pre>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Documentacao;
