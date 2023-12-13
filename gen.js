const bip39 = require('bip39');
const ethers = require('ethers');
const fs = require('fs');

let wallets = [];


    const mnemonic = bip39.generateMnemonic(256);
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey;
    const address = wallet.address;

  
console.log("Phrase: ", JSON.stringify(mnemonic, null, 4));
console.log("Wallet: ", JSON.stringify(wallet, null, 4));
console.log("Private: ", JSON.stringify(privateKey, null, 4));
console.log("Public: ", JSON.stringify(publicKey, null, 4));
console.log("Address: ", JSON.stringify(address, null, 4));