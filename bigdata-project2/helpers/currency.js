const fs = require("fs");

const getCurrencyListFromFile = function() {
  const file = "cryptos.json";
  const currenciesFile = fs.readFileSync(file);
  return JSON.parse(currenciesFile);
};

const generateCurrencyList = function() {
  let currencyView = "<ul id='currencies'>";
  getCurrencyListFromFile().forEach(
    c => (currencyView += `<li><button key="${c.id}">${c.name}</button></li>`)
  );
  currencyView += "</ul>";
  return currencyView;
};

module.exports = { getCurrencyListFromFile, generateCurrencyList };
