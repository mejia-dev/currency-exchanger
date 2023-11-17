export default class ExchangeRates {
  static async getValidCodes() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
      const jsonResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonResponse;
    } 
    catch(error) {
      return error;
    }
  }

  static convertCurrency(amount,currencyFrom,currencyTo) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currencyFrom}/${currencyTo}`;
      xhr.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([amount * response.conversion_rate]);
        } else {
          reject([this, response, amount]);
        }
      });
      xhr.open("GET", url, true);
      xhr.send();
    });
  }

  
}