import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Tips from './pages/Tips';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
