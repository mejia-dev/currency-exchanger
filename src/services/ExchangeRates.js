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
    } catch(error) {
      return error;
    }
  }

  static convertCurrency() {
    // https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/GBP
  }

  
}