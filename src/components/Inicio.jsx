export const Inicio = () => {
  const styles = {
    container: {
      backgroundColor: '#020617', color: 'white', minHeight: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', padding: '20px'
    },
    title: { fontSize: '24px', letterSpacing: '1px', marginBottom: '30px' },
    subtitle: { fontSize: '15px', marginBottom: '20px', color: '#e2e8f0' },
    btn: {
      backgroundColor: '#3b82f6', color: 'white', border: 'none',
      padding: '10px 25px', borderRadius: '20px', marginBottom: '30px',
      cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
      display: 'flex', alignItems: 'center', gap: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bienvenido a la plataforma de ALPHA FITNESS GYM</h2>
      
      <p style={styles.subtitle}>Administra a los nuevos clientes</p>
      <button style={styles.btn}>👤 Clientes</button>
      
      <p style={styles.subtitle}>Agenda nuevas citas de entrenamiento</p>
      <button style={styles.btn}>📅 Citas</button>
    </div>
  );
};