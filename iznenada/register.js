const fs = require('fs');
const crypto = require('crypto');

function submitRegister() {
    const email = document.querySelector("#wallet-email");
    const password = document.querySelector("#wallet-password");
    const walletHash = generateHash(email, password);
    console.log(email, password);
    writeWallet(walletHash);   
}

function generateHash(email, password) {
    const hash = crypto.createHash('sha256').update(email + password).digest('hex');
    return hash;
}

function writeWallet(walletHash) {
    const dir = './my-wallet';
    const file = 'wallet.json';
    const walletHashObject = {
        walletId: walletHash
    }
    const walletHashString = JSON.stringify(walletHashObject);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const filePath = dir + "/" + file;
    fs.writeFileSync(filePath, walletHashString);
}




