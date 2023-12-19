#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateEthWallet } from './ethWallet.js';
import { generateAvaxWallet } from './avaxWallet.js';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const questions = [
    {
        type: 'list',
        name: 'wallet',
        message: 'Choose the wallet you want to create',
        choices: ['ETH', 'AVAX-X'],
    },
    {
        type: 'list',
        name: 'phraseLength',
        message: 'Choose the length of the secret phrase',
        choices: ['12', '24'],
        when: (answers) => answers.wallet === 'ETH',
    },
    {
        type: 'confirm',
        name: 'saveToFile',
        message: 'Do you want to save the output to a JSON file?',
        default: false,
    },
    {
        type: 'input',
        name: 'filePath',
        message: 'Enter the path where you want to save the file (default is the script path)',
        when: (answers) => answers.saveToFile,
        default: __dirname,
    },
    {
        type: 'input',
        name: 'walletCount',
        message: 'How many wallets do you want to create?',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number
    }
];

inquirer.prompt(questions).then((answers) => {
    if (answers.wallet === 'ETH') {
        generateEthWallet(answers);
    } else if (answers.wallet === 'AVAX-X') {
        generateAvaxWallet(answers);
    } else {
        console.log(chalk.red('Unsupported wallet type'));
    }
});