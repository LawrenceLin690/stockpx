import axios from 'axios';
import history from '../history';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_CASH = 'UPDATE_CASH';

const defaultUser = {};

const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateCash = cash => ({ type: UPDATE_CASH, cash });

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method, name, cash) => async dispatch => {
  let res;

  try {
    res = await axios.post(`/auth/${method}`, { email, password, name, cash });
  } catch (authError) {
    console.log(authError);
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/account');
  } catch (error) {
    console.error(error);
  }
};

export const updateCashBalance = (newCash, userId) => async dispatch => {
  try {
    let res = await axios.put(`/auth/updateCash/${userId}`, {
      newCash,
    });
    let newCashBalance = res.data.cash;
    dispatch(updateCash(newCashBalance));
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case UPDATE_CASH:
      return { ...state, cash: action.cash };
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
