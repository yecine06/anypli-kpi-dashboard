import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import EmployeeAnalysis from './pages/EmployeeAnalysis';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="employees" element={<EmployeeAnalysis />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
