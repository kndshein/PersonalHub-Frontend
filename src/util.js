import axios from 'axios';

const isLoggedIn = async () => {
  let token = localStorage.getItem('token');
  try {
    if (!token) throw new Error('Token not found in localStorage');
    let res = await query('POST', `${process.env.REACT_APP_BACKEND_URL}/user/verifyToken`, false, {
      token: token,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err); //TODO: Log
    return false;
  }
};

const query = async (method, url, isTokenized, data) => {
  let query_data = { method: method, url: url, data: data };
  if (isTokenized) query_data.headers = { token: localStorage.getItem('token') };

  try {
    let res = await axios(query_data);
    return res.data.err ? res.data.err : res.data.result;
  } catch (err) {
    return err.response.data;
  }
};

export { isLoggedIn, query };
