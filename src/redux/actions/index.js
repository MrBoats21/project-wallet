import getCurrencies from '../../helpers/getCurrencies';

export const USER_EMAIL = 'USER_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const IS_FETCHING = 'IS_FETCHING';

export const sendEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const saveCoins = (payload) => ({
  type: SAVE_CURRENCIES,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const currencies = await getCurrencies();
    const currsWithoutUSDT = Object.keys(currencies)
      .filter((currency) => currency !== 'USDT');
    dispatch(saveCoins(currsWithoutUSDT));
  } catch (error) {
    return error;
  }
};
