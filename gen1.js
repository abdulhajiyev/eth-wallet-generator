const bip39 = require('bip39');
const ethers = require('ethers');
const desiredPrefix = '0x1002'; // replace with your desired prefix

let found = false;
let counter = 0;

while (!found) {
    const mnemonic = bip39.generateMnemonic(256);
    const wallet = ethers.Wallet.fromPhrase(mnemonic);

    if (wallet.address.toLowerCase().startsWith(desiredPrefix.toLowerCase())) {
        found = true;
        console.log("Found vanity address!");
        console.log("Phrase: ", mnemonic);
        console.log("Wallet: ", wallet);
        console.log("Private: ", wallet.privateKey);
        console.log("Public: ", wallet.publicKey);
        console.log("Address: ", wallet.address);
    }

    counter++;
    if (counter % 1000 === 0) {
        console.log(`Checked ${counter} addresses so far...`);
    }
}