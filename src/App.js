import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ExercisePage from './pages/ExercisePage/ExercisePage';
import EntryPage from './pages/EntryPage/EntryPage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/entries" element={<EntryPage />} />
      </Routes>
    </div>
  );
}

export default App;
