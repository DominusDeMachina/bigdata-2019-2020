const fs = require('fs');

function submitHash() {
    const hash = document.querySelector("#wallet-email");
    checkHash(hash);
}

function checkHash(inputHash) {
    const dir = './my-wallet';
    const file = 'wallet.json';
    const filePath = dir + "/" + file;

    const hashString = fs.readFileSync(filePath);
    const hashObject = JSON.parse(hashString);
    debugger
    if (inputHash === hashObject.walletId) {
        console.log("Logged in");
    } else {
        console.log("Error wallet hash");
    }
}