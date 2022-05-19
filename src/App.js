import React, { useState, useEffect } from 'react';
import { isLoggedIn } from './util.js';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  let [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    (async () => {
      let is_logged_in = await isLoggedIn();
      setShowLogin(!is_logged_in);
    })();
  }, []);

  return <div className="App">{showLogin && <LoginPage />}</div>;
}

export default App;
