const fs = require('fs');

function submitHash() {
    const hash = document.querySelector("#wallet-email");
    checkHash(hash);
}

function checkHash(inputHash) {
    const dir = './my-wallet';
    const file = 'wallet.json';
    const filePath = dir + "/" + file;
    const status = document.querySelector("#status");

    const hashString = fs.readFileSync(filePath);
    const hashObject = JSON.parse(hashString);
    debugger
    if (inputHash === hashObject.walletId) {
        status.innerHTML = "Logged in";
    } else {
        status.innerHTML ="Error wallet hash";
    }
}