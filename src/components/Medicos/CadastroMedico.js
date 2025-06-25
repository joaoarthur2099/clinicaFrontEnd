import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Alert, Card, Row, Col, Spinner } from 'react-bootstrap';
import InputMask from 'react-input-mask'; 
import api from '../../api/api';


const CadastroMedico = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState(''); 
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');
  const [telefone, setTelefone] = useState('');
  
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setCarregando(true);

    try {
      await api.post('/medicos', {
        nome,
        cpf, 
        especialidade,
        crm,
        telefone,
      });

      setSucesso('Médico cadastrado com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate('/medicos'); 
      }, 2000);

    } catch (err) {
      console.error('Erro ao cadastrar médico:', err);
      setErro('Erro ao cadastrar médico. Verifique os dados e tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  if (sucesso) {
    return (
      <div className="auth-container">
        <Alert variant="success" className="w-50 text-center">{sucesso}</Alert>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="auth-card">
              <Card.Header className="text-center">
                <h3 className="mb-0">Cadastro de Profissional</h3>
                <p className="text-white-50 mb-0">Área Administrativa</p>
              </Card.Header>
              <Card.Body className="p-4">
                <Form noValidate onSubmit={handleSubmit}>
                  {erro && <Alert variant="danger">{erro}</Alert>}

                  <Form.Floating className="mb-3">
                    <Form.Control id="nome" type="text" placeholder="Nome completo do médico" value={nome} onChange={(e) => setNome(e.target.value)} required disabled={carregando} />
                    <label htmlFor="nome">Nome Completo</label>
                  </Form.Floating>
                  
                  {/*bota a mascara no cpf*/}
                  <Form.Floating className="mb-3">
                     <InputMask
                        mask="999.999.999-99"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        disabled={carregando}
                      >
                        {/* bota os parametros de entrada */}
                        {(inputProps) => <Form.Control {...inputProps} type="text" id="cpf" placeholder="CPF do médico" required />}
                     </InputMask>
                     <label htmlFor="cpf">CPF</label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control id="especialidade" type="text" placeholder="Ex: Cardiologia" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} required disabled={carregando} />
                    <label htmlFor="especialidade">Especialidade</label>
                  </Form.Floating>

                  <Row>
                    <Col md={6}>
                      <Form.Floating className="mb-3">
                        <Form.Control id="crm" type="text" placeholder="CRM" value={crm} onChange={(e) => setCrm(e.target.value)} required disabled={carregando} />
                        <label htmlFor="crm">CRM</label>
                      </Form.Floating>
                    </Col>
                    <Col md={6}>
                       <Form.Floating className="mb-3">
                          <InputMask
                             mask="(99) 99999-9999"
                             value={telefone}
                             onChange={(e) => setTelefone(e.target.value)}
                             disabled={carregando}
                          >
                             {(inputProps) => <Form.Control {...inputProps} type="tel" id="telefone" placeholder="Telefone" required />}
                          </InputMask>
                          <label htmlFor="telefone">Telefone</label>
                       </Form.Floating>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-end mt-4">
                     <Link to="/medicos" className="btn btn-secondary">Cancelar</Link>
                     <Button variant="primary" type="submit" disabled={carregando}>
                        {carregando ? <Spinner as="span" animation="border" size="sm" /> : 'Cadastrar Médico'}
                     </Button>
                  </div>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CadastroMedico;