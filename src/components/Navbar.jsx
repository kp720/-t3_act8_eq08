import { useLocation, useNavigate } from 'react-router-dom';

const titulos = {
  '/inicio': 'INICIO',
  '/table': 'TABLA DE DATOS',   
};

export const Navbar = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const titulo = titulos[pathname] ?? 'INICIO';

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const nombre = user.firstName ? `${user.firstName} ${user.lastName ?? ''}` : user.username;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <nav style={{
      height: '80px', backgroundColor: '#020617', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center', padding: '0 40px',
      borderBottom: '1px solid #1e293b'
    }}>
      <h2 style={{ color: 'white', margin: 0, fontSize: '18px', letterSpacing: '2px' }}>
        {titulo}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#f8fafc' }}>
            {nombre}
          </span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Administrador</span>
        </div>
        <img 
          src={user.image} alt="Perfil" 
          style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #3b82f6' }} 
        />
        <button onClick={handleLogout} style={{
          backgroundColor: '#3b82f6', color: 'white', border: 'none',
          padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
        }}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

