const bip39 = require('bip39');
const ethers = require('ethers');
const fs = require('fs');

let wallets = [];

for (let i = 0; i < 100; i++) {
    const mnemonic = bip39.generateMnemonic(256);
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey;
    const address = wallet.address;

    wallets.push({
        secretPhrase: mnemonic,
        privateKey: privateKey,
        publicKey: publicKey,
        address: address
    });
}

const json = JSON.stringify(wallets, null, 2);
fs.writeFileSync('wallets.json', json);