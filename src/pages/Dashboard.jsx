import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Table } from '../components/Table'; 

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: '#f5f5f5', 
      overflow: 'hidden', 
      margin: 0,
      padding: 0,
      position: 'relative' 
    }}>
      
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'absolute', 
            top: '15px', 
            left: '15px', 
            zIndex: 1000,
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none',
            borderRadius: '6px', 
            padding: '8px 12px', 
            cursor: 'pointer',
            fontSize: '1.2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          ☰
        </button>
      )}

      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)', 
            zIndex: 998 
          }}
        />
      )}

      <div style={{ 
        flexShrink: 0,
        position: isMobile ? 'absolute' : 'relative',
        zIndex: 999,
        transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
        height: '100vh'
      }}>
        <Sidebar />
      </div>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden' 
      }}>
        
        <Navbar />
        
        <main style={{ 
          flex: 1, 
        
          padding: isMobile ? '15px' : '40px', 
          overflowY: 'auto' 
        }}>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: isMobile ? '15px' : '30px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', 
            minHeight: '100%',
            overflowX: 'auto'
          }}>
            
            <Table />
            
          </div>
        </main>
      </div>
    </div>
  );
};