import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRates from './services/ExchangeRates.js';


// Business Logic
async function getConversionOptions() {
  const response = await ExchangeRates.getValidCodes();
  if (response.supported_codes) {
    addConversionOptions(response.supported_codes);
  } 
  else {
    console.log("error");
  }
}


// UI Logic

function addConversionOptions(array){
  const currencyFrom = document.getElementById("currencyFrom");
  // const currencyTo = document.getElementById("currencyTo");
  for(let i = 0; i < array.length; i++) {
    console.log("test");
    let newOption = document.createElement("option");
    newOption.append(array[i]);
    currencyFrom.append(newOption);
    // currencyTo.append(newOption);
  }
}

function handleSampleForm() {
  event.preventDefault();
  getConversionOptions();
  // let currencies = {};
  // currencies = ExchangeRates.getValidCodesAsync();
  // console.log(currencies.data);
  // document.getElementById("outputDiv").innerText = null;
  // const pTag = document.createElement("p");
  // pTag.append(document.getElementById("text-input").value);
  // document.getElementById("outputDiv").append(pTag);
}

window.addEventListener("load", function() {
  getConversionOptions();
  document.getElementById("conversion-form").addEventListener("submit", handleSampleForm);
});