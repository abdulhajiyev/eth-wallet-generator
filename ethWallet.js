// ethWallet.js

import { Wallet, randomBytes, Mnemonic } from 'ethers';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export function generateEthWallet(answers) {

  const wallet = Wallet.fromPhrase(Mnemonic.entropyToPhrase(randomBytes(32)))
  const privateKey = wallet.privateKey;
  const address = wallet.address;

  const output = {
    Private: privateKey,
    Address: address,
  };

  console.log(chalk.green("Private: "), chalk.yellow(privateKey));
  console.log(chalk.green("WalletAddress: "), chalk.yellow(address));

  if (answers.saveToFile) {
    const filePath = path.join(answers.filePath, 'eth_wallet.json');
    fs.writeFileSync(filePath, JSON.stringify(output, null, 4));
    console.log(chalk.green(`Output saved to ${filePath}`));
  }
}