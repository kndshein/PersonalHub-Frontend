import React from 'react';

const Login = ({ loginData, setLoginData, handleSubmit }) => {
  let handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  return (
    <div>
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
          type="password"
          name="password"
          id="password"
          value={loginData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input className="form-submit" type="submit" value="Login" />
      </form>
      {loginData.err && <p>{loginData.err}</p>}
    </div>
  );
};

export default Login;
