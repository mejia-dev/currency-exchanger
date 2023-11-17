import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRates from './services/ExchangeRates.js';

async function getExchangeData() {
  const response = await ExchangeRates.getValidCodes();
  if (response.supported_codes) {
    console.log(response.supported_codes);
  } 
  else {
    console.log("error");
  }
}

function handleSampleForm() {
  event.preventDefault();
  getExchangeData()
  // let currencies = {};
  // currencies = ExchangeRates.getValidCodesAsync();
  // console.log(currencies.data);
  // document.getElementById("outputDiv").innerText = null;
  // const pTag = document.createElement("p");
  // pTag.append(document.getElementById("text-input").value);
  // document.getElementById("outputDiv").append(pTag);
}

window.addEventListener("load", function() {
  document.getElementById("sample-form").addEventListener("submit", handleSampleForm);
});