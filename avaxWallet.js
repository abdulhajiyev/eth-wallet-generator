// avaxWallet.js

import bip39 from 'bip39'
import { ethers } from 'ethers';
import { Avalanche, BinTools, BN, Buffer } from '@avalabs/avalanchejs';
import { KeyChain as AVMKeyChain } from '@avalabs/avalanchejs/dist/apis/avm/index.js';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export function generateAvaxWallet(answers) {
  const strength = answers.phraseLength === '12' ? 128 : 256;
  const mnemonic = bip39.generateMnemonic(strength);
  const wallet = ethers.Wallet.fromPhrase(mnemonic);
  const keychain = new AVMKeyChain();
  const keypair = keychain.importKey(wallet.privateKey);
  const address = keypair.getAddressString();

  const output = {
    Phrase: mnemonic,
    Private: wallet.privateKey,
    Public: wallet.publicKey,
    Address: address,
  };

  console.log(chalk.green("Phrase: "), chalk.yellow(mnemonic));
  console.log(chalk.green("Private: "), chalk.yellow(wallet.privateKey));
  console.log(chalk.green("Public: "), chalk.yellow(wallet.publicKey));
  console.log(chalk.green("Address: "), chalk.yellow(address));

  if (answers.saveToFile) {
    const filePath = path.join(answers.filePath, 'avax_wallet.json');
    fs.writeFileSync(filePath, JSON.stringify(output, null, 4));
    console.log(chalk.green(`Output saved to ${filePath}`));
  }
}