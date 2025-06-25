import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';

const Dashboard = ({ logout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      setUserName(user.fullName);
      setUserEmail(user.email);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const dicas = [
    "Mantenha-se hidratado, beba pelo menos 2 litros de água por dia.",
    "Faça exercícios físicos regularmente, ao menos 3 vezes por semana.",
    "Alimente-se de forma equilibrada e evite alimentos processados.",
    "Não deixe de fazer seus exames periódicos.",
    "Durma bem, garantindo pelo menos 7 horas de sono por noite.",
  ];

  const noticias = [
    { titulo: "Campanha de vacinação contra gripe começa em maio", descricao: "Procure a clínica para se vacinar e proteger sua saúde neste inverno." },
    { titulo: "Novos horários de atendimento aos sábados", descricao: "Agora estamos atendendo das 8h às 12h aos sábados para sua comodidade." },
    { titulo: "Consulta online disponível para pacientes cadastrados", descricao: "Agende sua teleconsulta com nossos médicos sem sair de casa." },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f7fa', userSelect: 'none' }}>
      <nav
        style={{
          width: sidebarOpen ? 220 : 60,
          backgroundColor: '#2575fc',
          color: 'white',
          transition: 'width 0.3s ease',
          paddingTop: '1rem',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: sidebarOpen ? 'flex-end' : 'center',
            padding: '10px',
          }}
        >
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
            style={{
              background: 'none',
              border: 'none',
              color: 'red',
              fontSize: '1.8rem',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              outline: 'none',
              userSelect: 'none',
            }}
            onMouseDown={e => e.preventDefault()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M1.5 12.5a.5.5 0 010-1h13a.5.5 0 010 1h-13zm0-4a.5.5 0 010-1h13a.5.5 0 010 1h-13zm0-4a.5.5 0 010-1h13a.5.5 0 010 1h-13z"
              />
            </svg>
          </button>
        </div>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            marginTop: '2rem',
            flexGrow: 1,
          }}
        >
          {[
            { to: "/medicos", icon: "bi-person-badge", label: "Médicos" },
            { to: "/pacientes", icon: "bi-people", label: "Pacientes" },
            { to: "/secretarias", icon: "bi-person-lines-fill", label: "Secretárias" },
            { to: "/consultas", icon: "bi-calendar-check", label: "Consultas" },
            { to: "/documentacao", icon: "bi-journal-code", label: "Documentação" },
          ].map(({ to, icon, label }) => (
            <li key={to} style={{ padding: '15px 20px' }}>
              <Link
                to={to}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: sidebarOpen ? 10 : 0,
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                }}
                title={label}
              >
                <i className={`bi ${icon}`} style={{ fontSize: '1.5rem' }}></i>
                {sidebarOpen && label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ padding: '15px 20px' }}>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem('user');
              logout();
            }}
            style={{ width: '100%', fontWeight: '600' }}
          >
            {sidebarOpen ? 'Logout' : <i className="bi bi-box-arrow-right"></i>}
          </Button>
        </div>
      </nav>

      <main
        style={{
          flexGrow: 1,
          padding: '2rem',
          backgroundColor: '#e9f5f9',
          minHeight: '100vh',
          color: '#333',
          userSelect: 'text',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <h2 style={{ color: '#2575fc' }}>
            Olá, {userName ? userName : 'Usuário'}! Seja bem-vindo à Clínica Médica.
          </h2>

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {userName || 'Usuário'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.ItemText>
                <strong>Usuário:</strong> {userName || 'Usuário'}
              </Dropdown.ItemText>
              <Dropdown.ItemText>
                <strong>Email:</strong> {userEmail || 'email@exemplo.com'}
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => {
                localStorage.removeItem('user');
                logout();
              }}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <section style={{ marginBottom: '3rem' }}>
          <h4 style={{ borderBottom: '3px solid #2575fc', paddingBottom: '0.3rem' }}>
            Dicas para uma vida saudável
          </h4>
          <ul style={{ marginTop: '1rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
            {dicas.map((dica, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>
                <i className="bi bi-check-circle-fill" style={{ color: '#2575fc', marginRight: '8px' }}></i>
                {dica}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 style={{ borderBottom: '3px solid #2575fc', paddingBottom: '0.3rem', marginBottom: '1rem' }}>
            Notícias da Clínica
          </h4>
          {noticias.map((noticia, i) => (
            <Card key={i} style={{ marginBottom: '1rem', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
              <Card.Body>
                <Card.Title style={{ color: '#2575fc' }}>{noticia.titulo}</Card.Title>
                <Card.Text>{noticia.descricao}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
