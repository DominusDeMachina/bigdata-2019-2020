const fs = require("fs");

const getWalletByUserId = function(userId) {
  return JSON.parse(fs.readFileSync(`./users/${userId}/wallet.json`));
};

const getWalletListFromFile = function(currencyId, currentUser) {
  const res = [];
  let userList = fs.readdirSync("./users");
  userList.forEach(u => {
    let wallet = getWalletByUserId(u);
    if (wallet.find(e => e.currencyId == currencyId) && u !== currentUser) {
      res.push({ wallet, userId: u });
    }
  });
  return res;
};

const generateWalletList = function(currencyId, currentUser) {
  let walletListView = "<ul id='wallet'>";
  getWalletListFromFile(currencyId, currentUser).forEach(
    w =>
      (walletListView += `<li><button key="${w.userId}">${w.userId}</button></li>`)
  );
  walletListView += "</ul>";
  return walletListView;
};

const saveWalletByUserId = function(userId, wallet) {
  fs.writeFileSync(`./users/${userId}/wallet.json`, JSON.stringify(wallet));
};

const transfer = function(fromUserId, toUserId, currencyId, amount) {
  const fromUserWallet = getWalletByUserId(fromUserId);
  const toUserWallet = getWalletByUserId(toUserId);
  const fromCurrencyIndex = fromUserWallet.findIndex(
    c => c.currencyId.toString() === currencyId.toString()
  );
  const toCurrencyIndex = toUserWallet.findIndex(
    c => c.currencyId.toString() === currencyId.toString()
  );
  if (fromCurrencyIndex === -1 || fromUserWallet[fromCurrencyIndex].amount < amount) {
    alert("You have no enough currency");
    return;
  }
  fromUserWallet[fromCurrencyIndex].amount -= Number.parseInt(amount, 10);
  toUserWallet[toCurrencyIndex].amount += Number.parseInt(amount, 10);
  saveWalletByUserId(fromUserId, fromUserWallet);
  saveWalletByUserId(toUserId, toUserWallet);
  alert("Transaction successful");
};

module.exports = { generateWalletList, generateWalletList, transfer };
