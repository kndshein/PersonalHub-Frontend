import axios from 'axios';

const getCurrDate = () => {
  const curr_time = new Date();
  let curr_year = curr_time.getFullYear();
  let curr_month = curr_time.getMonth() + 1;
  curr_month = curr_month < 10 ? `0${curr_month}` : curr_month;
  let curr_date = curr_time.getDate();
  curr_date = curr_date < 10 ? `0${curr_date}` : curr_date;
  return `${curr_year}-${curr_month}-${curr_date}`;
};

const isLoggedIn = async () => {
  let token = localStorage.getItem('token');
  try {
    if (!token) throw new Error('Token not found in localStorage');
    let res = await query('POST', `${process.env.REACT_APP_BACKEND_URL}/user/verifyToken`, false, {
      token: token,
    });
    if (res.status !== 200) throw new Error(res.data.message);
    return res.data.result;
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
    return res;
  } catch (err) {
    console.log(err); //TODO: Log
    return err.response;
  }
};

export { getCurrDate, isLoggedIn, query };
