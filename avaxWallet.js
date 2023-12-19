// avaxWallet.js
import { Avalanche, Mnemonic, Buffer } from "@avalabs/avalanchejs"
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


export function generateAvaxWallet(answers) {
  const avalanche = new Avalanche();
  const xchain = avalanche.XChain()
  const keychain = xchain.keyChain()
  const keypair = keychain.makeKey()
  const address = keypair.getAddressString()
  const privateKey = keypair.getPrivateKeyString()

  const output = {
    Private: privateKey,
    Address: address,
  };

  console.log(chalk.green("Private: "), chalk.yellow(output.Private));
  console.log(chalk.green("Address: "), chalk.yellow(output.Address));

  if (answers.saveToFile) {
    const filePath = path.join(answers.filePath, 'avax_wallet.json');
    fs.writeFileSync(filePath, JSON.stringify(output, null, 4));
    console.log(chalk.green(`Output saved to ${filePath}`));
  }
}