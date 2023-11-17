export default class ExchangeRates {
  static getValidCodes() {
    // https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          
          let jsonResponse;
          response.json().then((data) => jsonResponse = data);
          return jsonResponse;
        }
      })      
      .catch(function(error) {
        return error;
      });
  }

  static async getValidCodesAsync() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }

  static convertCurrency() {
    // https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/GBP
  }

  
}