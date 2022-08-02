import getCurrencies from '../../helpers/getCurrencies';

export const USER_EMAIL = 'USER_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const sendEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const saveCoins = (payload) => ({
  type: SAVE_CURRENCIES,
  payload,
});

export const saveExpense = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  const currencies = await getCurrencies();
  try {
    const dataWithoutUSDT = Object.entries(currencies)
      .filter((elem) => elem[0] !== 'USDT');
    const newData = Object.fromEntries(dataWithoutUSDT);
    dispatch(saveCoins(Object.keys(newData)));
  } catch (error) {
    return error;
  }
};

export const expense = (info) => async (dispatch) => {
  try {
    const currencies = await getCurrencies();
    dispatch(saveExpense({
      ...info,
      exchangeRates: currencies,
    }));
  } catch (error) {
    return error;
  }
};
