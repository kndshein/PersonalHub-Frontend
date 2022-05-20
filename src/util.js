import axios from 'axios';

const isLoggedIn = async () => {
  let token = localStorage.getItem('token');
  try {
    if (!token) throw new Error('Token not found in localStorage');
    let res = await query('POST', `${process.env.REACT_APP_BACKEND_URL}/user/verifyToken`, { token: token });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err); //TODO: Log
    return false;
  }
};

const query = async (method, url, data) => {
  try {
    let res = await axios({
      method: method,
      url: url,
      data: data,
    });
    return res.data.err ? res.data.err : res.data.result;
  } catch (err) {
    return err;
  }
};

export { isLoggedIn, query };
