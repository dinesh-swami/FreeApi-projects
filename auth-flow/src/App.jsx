import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'register', 'profile'

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-container">
          <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
          {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
          {currentPage === 'profile' && <Profile setCurrentPage={setCurrentPage} />}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;