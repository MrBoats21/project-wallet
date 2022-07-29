async function getCurrencies() {
  const API = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getCurrencies;
