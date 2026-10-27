import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import Login from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute'; 


const Layout = ({ children }) => (
  <div style={{ display: 'flex', height: '100vh', width: '100vw', margin: 0, overflow: 'hidden', boxSizing: 'border-box' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Navbar />
      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#020617' }}>
        {children}
      </main>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter basename="/-t3_act8_eq08">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;