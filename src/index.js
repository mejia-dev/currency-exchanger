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
    processHTMLErrors(response.toString());
  }
}

async function doConversion(amount, currencyFrom, currencyTo) {
  const response = await ExchangeRates.convertCurrency(amount, currencyFrom, currencyTo);
  if (response.result === "success") {
    printResults(response.conversion_result, response.conversion_rate, response.base_code, response.target_code);
  } else {
    processHTMLErrors(response.toString());
  }
}


// UI Logic
function addConversionOptions(array) {
  const currencyFrom = document.getElementById("currencyFrom");
  const currencyTo = document.getElementById("currencyTo");
  for (let i = 0; i < array.length; i++) {
    let newFromOption = document.createElement("option");
    let newToOption = document.createElement("option");
    newFromOption.append(array[i]);
    newToOption.append(array[i]);
    currencyFrom.append(newFromOption);
    currencyTo.append(newToOption);
  }
}

function printResults(amount, rate, currencyFrom, currencyTo) {
  document.getElementById("outputDiv").removeAttribute("class");
  document.getElementById("resultAmount").innerText = `${amount} ${currencyTo}`;
  document.getElementById("conversionRate").innerText = `1 ${currencyFrom} = ${rate} ${currencyTo}`;
}

function processHTMLErrors(errorInput) {
  let errorOutput = "";
  if (errorInput.includes("403")) {
    errorOutput = "Error 403 Forbidden: Check to confirm that the API key is active and is entered correctly into the .env file.";
  } else if (errorInput.includes("404")) {
    errorOutput = "Error 404 Not Found: Check to confirm that the API request was formatted correctly and try again.";
  } else if (errorInput.includes("5")) {
    errorOutput = "Error 5xx Server Error: The API returned a server error. Please try again later.";
  } else if (errorInput.includes("Failed to fetch")) {
    errorOutput = "Error 404 Not Found: Check to confirm that the API request was formatted correctly and try again.";
  } else {
    errorOutput = `Undefined ${errorInput}`;
  }
  printError(errorOutput);
}

function printError(error) {
  document.getElementById("errorMsgHolder").innerText = "";
  document.getElementById("errorMsgHolder").innerText = `${error}`;
}

function handleConversionForm() {
  event.preventDefault();
  const amount = parseInt(document.getElementById("amount-input").value);
  const currencyFrom = (document.getElementById("currencyFrom").value).substring(0, 3);
  const currencyTo = (document.getElementById("currencyTo").value).substring(0, 3);
  if ((currencyFrom === "-Se") || (currencyTo === "-Se")) {
    printError('Please enter a valid currency');
    return;
  } else if (currencyFrom === currencyTo) {
    printResults(amount, 1, currencyFrom, currencyTo);
    return;
  }
  doConversion(amount, currencyFrom, currencyTo);
  printError('');
}

window.addEventListener("load", function () {
  getConversionOptions();
  document.getElementById("conversion-form").addEventListener("submit", handleConversionForm);
});