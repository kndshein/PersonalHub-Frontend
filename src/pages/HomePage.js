import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isLoggedIn } from '../util.js';
import Login from '../components/Login.js';

const HomePage = () => {
  let [showLogin, setShowLogin] = useState(true);
  let [loginData, setLoginData] = useState({ email: '', password: '', err: null });

  useEffect(() => {
    (async () => {
      let is_logged_in = await isLoggedIn();
      setShowLogin(!is_logged_in);
    })();
  }, [showLogin]);

  let handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        data: { email: loginData.email, password: loginData.password },
      });
      localStorage.setItem('token', res.data.result.token);
      if (loginData.err) setLoginData({ ...loginData, err: null });
      setShowLogin(false);
    } catch (err) {
      setLoginData({ ...loginData, err: err.response.data.message });
    }
  };
  return (
    <>
      {showLogin && (
        <Login loginData={loginData} setLoginData={setLoginData} handleSubmit={handleLoginSubmit} />
      )}
    </>
  );
};

export default HomePage;
