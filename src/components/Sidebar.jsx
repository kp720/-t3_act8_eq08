import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const styles = {
    container: {
      width: '260px', backgroundColor: '#0b1325', height: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      borderRight: '1px solid #1e293b'
    },
    menuItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 24px',
      margin: '8px 16px', backgroundColor: active ? '#3b82f6' : 'transparent',
      color: active ? 'white' : '#94a3b8', borderRadius: '8px', textDecoration: 'none',
      fontWeight: '600', fontSize: '14px'
    }),
    btnExit: {
      display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 24px',
      margin: '16px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px',
      cursor: 'pointer', fontWeight: 'bold', border: 'none'
    }
  };

return (
    <aside style={styles.container}>
      <div style={{ marginTop: '20px' }}>
        <Link to="/inicio" style={styles.menuItem(isActive('/inicio'))}>
          🏠 INICIO
        </Link>
        <Link to="/tabla" style={styles.menuItem(isActive('/tabla'))}>
          🗄️ TABLA DE DATOS
        </Link>
      </div>
      <button style={styles.btnExit} onClick={() => console.log('Cerrar sesión')}>
        🚪 EXIT
      </button>
    </aside>
  );
};