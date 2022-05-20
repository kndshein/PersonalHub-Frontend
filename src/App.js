import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.js';
import ExercisePage from './pages/ExercisePage/ExercisePage.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercise" element={<ExercisePage />} />
      </Routes>
    </div>
  );
}

export default App;
