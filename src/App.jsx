import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Table } from './components/Table';

// Layout temporal que agrupa los componentes visuales para probar sin Login
const TempDashboard = () => (
  <div style={{ display: 'flex', height: '100vh', width: '100vw', margin: 0, overflow: 'hidden' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Navbar />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Table />
      </main>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter basename="/t3_act8_eq08">
      <Routes>
        {/* Redirige automáticamente a la tabla al abrir la app */}
        <Route path="/" element={<Navigate to="/tabla" replace />} />
        
        {/* Ruta pública temporal para probar tu desarrollo */}
        <Route path="/tabla" element={<TempDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;