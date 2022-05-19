import axios from 'axios';

const isLoggedIn = async () => {
  let token = localStorage.getItem('token');
  try {
    if (!token) throw new Error('Token not found in localStorage');
    let res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_URL}/user/verifyToken`,
      data: { token: token },
    });
    return res.data.result;
  } catch (err) {
    console.log(err); //TODO: Log
    return false;
  }
};

export { isLoggedIn };
