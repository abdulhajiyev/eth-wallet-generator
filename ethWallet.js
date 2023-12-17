// ethWallet.js

import bip39 from 'bip39'
import { ethers } from 'ethers';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export function generateEthWallet(answers) {
  const strength = answers.phraseLength === '12' ? 128 : 256;
  const mnemonic = bip39.generateMnemonic(strength);
  const wallet = ethers.Wallet.fromPhrase(mnemonic);
  const privateKey = wallet.privateKey;
  const publicKey = wallet.publicKey;
  const address = wallet.address;

  const output = {
    Phrase: mnemonic,
    Private: privateKey,
    Public: publicKey,
    Address: address,
  };

  console.log(chalk.green("Phrase: "), chalk.yellow(mnemonic));
  console.log(chalk.green("Private: "), chalk.yellow(privateKey));
  console.log(chalk.green("Public: "), chalk.yellow(publicKey));
  console.log(chalk.green("Address: "), chalk.yellow(address));

  if (answers.saveToFile) {
    const filePath = path.join(answers.filePath, 'eth_wallet.json');
    fs.writeFileSync(filePath, JSON.stringify(output, null, 4));
    console.log(chalk.green(`Output saved to ${filePath}`));
  }
}