import { useLocation } from 'react-router-dom';

const titulos = {
  '/inicio': 'INICIO',
  '/table': 'TABLA DE DATOS',   
};

export const Navbar = () => {

  const { pathname } = useLocation();
  const titulo = titulos[pathname] ?? 'INICIO';

  const user = {
    firstName: 'Uriel',
    lastName: '',
    image: 'https://dummyjson.com/icon/uriel/128' 
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
            {user.firstName} {user.lastName}
          </span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Administrador</span>
        </div>
        <img 
          src={user.image} alt="Perfil" 
          style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #3b82f6' }} 
        />
      </div>
    </nav>
  );
};

