import axios from 'axios';

const GET_HOLDINGS = 'GET_HOLDINGS';
const GET_GROUPED_HOLDINGS = 'GET_GROUPED_HOLDINGS';
const ADD_HOLDING = 'ADD_HOLDING';

const defaultHoldings = [];

export const getHoldings = holdings => ({ type: GET_HOLDINGS, holdings });
export const addHolding = holding => ({ type: ADD_HOLDING, holding });

export const fetchHoldings = id => async dispatch => {
  const response = await axios.get(`api/purchases/${id}`);
  const holdings = response.data;
  dispatch(getHoldings(holdings));
};

export const fetchGroupedHoldings = id => async dispatch => {
  const response = await axios.get(`api/purchases/grouped/${id}`);
  const holdings = response.data;
  dispatch(getHoldings(holdings));
};

export const makePurchase = (
  ticker,
  name,
  price,
  quantity,
  userId
) => async dispatch => {
  try {
    let res = await axios.post(`/api/purchases/${userId}`, {
      ticker,
      name,
      quantity,
      price,
      userId,
    });
    let holding = res.data;
    dispatch(addHolding(holding));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = defaultHoldings, action) {
  switch (action.type) {
    case GET_HOLDINGS:
      return action.holdings;
    case GET_GROUPED_HOLDINGS:
      return action.holdings;
    case ADD_HOLDING:
      return [...state, action.holding];
    default:
      return state;
  }
}
