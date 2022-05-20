import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../util.js';
import Login from './Login.js';

const HomePage = () => {
  let [showLogin, setShowLogin] = useState(true);
  let [loginData, setLoginData] = useState({ email: '', password: '', err: null });
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let is_logged_in = await isLoggedIn();
      setLoading(false);
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
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          {showLogin ? (
            <Login loginData={loginData} setLoginData={setLoginData} handleSubmit={handleLoginSubmit} />
          ) : (
            <Link to="/exercise">Exercise</Link>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
