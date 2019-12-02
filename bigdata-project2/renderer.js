const currencyHelper = require("./helpers/currency");
const walletHelper = require("./helpers/wallet");
const userHelper = require("./helpers/user");

const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const login = document.getElementById("login");
const login_button = document.getElementById("login-button");

const transaction = document.getElementById("transaction");
sidebar.classList.add("hidden");
main.classList.add("hidden");
transaction.classList.add("hidden");

login_button.addEventListener("click", function() {
  const user_id = document.getElementById("user-id").value;
  if (userHelper.isUserExist(user_id)) {
    login.classList.add("hidden");
    sidebar.classList.remove("hidden");
    main.classList.remove("hidden");
    sidebar.innerHTML = currencyHelper.generateCurrencyList();
    document.querySelectorAll("button").forEach(b =>
      b.addEventListener("click", async function(event) {
        event.preventDefault();
        const currencyId = event.target.getAttribute("key");
        main.innerHTML = walletHelper.generateWalletList(currencyId, user_id);
        const wallets = document.querySelectorAll("#wallet button");
        wallets.forEach(w =>
          w.addEventListener("click", function() {
            event.preventDefault();
            transaction.classList.remove("hidden");
            document
              .getElementById("transfer-button")
              .addEventListener("click", function() {
                event.preventDefault();
                const toUserId = w.getAttribute("key");
                const fromUserId = user_id;
                const amount = document.getElementById("amount").value;
                transaction.classList.add("hidden");
                walletHelper.transfer(fromUserId, toUserId, currencyId, amount);
              });
          })
        );
      })
    );
  }
});
