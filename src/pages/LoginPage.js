import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  let [loginData, setLoginData] = useState({ email: '', password: '' });

  let handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        data: loginData,
      });
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form className="form-body" autoComplete="off" onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        id="email"
        value={loginData.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        id="password"
        value={loginData.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <input className="form-submit" type="submit" value="Login" />
    </form>
  );
};

export default LoginPage;
