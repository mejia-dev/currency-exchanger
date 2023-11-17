import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRates from './services/ExchangeRates.js';

function handleSampleForm() {
  event.preventDefault();
  let currencies = ExchangeRates.getValidCodes();
    console.log(currencies);
  // document.getElementById("outputDiv").innerText = null;
  // const pTag = document.createElement("p");
  // pTag.append(document.getElementById("text-input").value);
  // document.getElementById("outputDiv").append(pTag);
}

window.addEventListener("load", function() {
  document.getElementById("sample-form").addEventListener("submit", handleSampleForm);
});