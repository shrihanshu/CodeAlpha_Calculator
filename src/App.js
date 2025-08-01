import React from 'react';
import './App.css';
import Calculator from './Calculator';

function App() {
  return (
    <div className="App">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        padding: '20px'
      }}>
        <Calculator/>
      </div>
    </div>
  );
}

export default App;
