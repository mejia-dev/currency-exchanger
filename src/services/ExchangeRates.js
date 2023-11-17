export default class ExchangeRates {
  static getValidCodes() {
    // https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          console.log(response.json());
          return response.json();
        }
      })      
      .catch(function(error) {
        return error;
      });
  }

  static convertCurrency() {
    // https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/GBP
  }

  
}