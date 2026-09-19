import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StudentList from './pages/StudentList';
import Edit from './pages/Edit';
import Register from './pages/Register';

const App = () => {
  return (
    <div>
      <nav style={{ padding: '15px 30px', backgroundColor: '#333', color: '#fff', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          Student List
        </Link>
        <Link to="/register" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          Register Student
        </Link>
      </nav>

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;