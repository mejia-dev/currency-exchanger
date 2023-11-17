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
    printError("error");
  }
}


// UI Logic
function addConversionOptions(array){
  const currencyFrom = document.getElementById("currencyFrom");
  const currencyTo = document.getElementById("currencyTo");
  for(let i = 0; i < array.length; i++) {
    let newFromOption = document.createElement("option");
    let newToOption = document.createElement("option");
    newFromOption.append(array[i]);
    newToOption.append(array[i]);
    currencyFrom.append(newFromOption);
    currencyTo.append(newToOption);
  }
}

function printError(error) {
  document.getElementById("errorMsgHolder").innerText = "";
  document.getElementById("errorMsgHolder").innerText = error;
}

function handleSampleForm() {
  event.preventDefault();

}

window.addEventListener("load", function() {
  getConversionOptions();
  document.getElementById("conversion-form").addEventListener("submit", handleSampleForm);
});