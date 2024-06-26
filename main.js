#! /usr/bin/env node
import inquirer from 'inquirer';
class BankAccount {
    balance;
    constructor(initialBalance) {
        this.balance = initialBalance;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
        }
        else {
            this.balance -= amount;
        }
    }
    getBalance() {
        return this.balance;
    }
}
const account = new BankAccount(50000);
async function main() {
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Deposit', 'Withdraw', 'Check Balance', 'Exit'],
            },
        ]);
        switch (action) {
            case 'Deposit':
                const { depositAmount } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'depositAmount',
                        message: 'Enter the amount to deposit:',
                    },
                ]);
                account.deposit(depositAmount);
                console.log(`New balance: ${account.getBalance()}`);
                break;
            case 'Withdraw':
                const { withdrawAmount } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'withdrawAmount',
                        message: 'Enter the amount to withdraw:',
                    },
                ]);
                account.withdraw(withdrawAmount);
                console.log(`New balance: ${account.getBalance()}`);
                break;
            case 'Check Balance':
                console.log(`Current balance: ${account.getBalance()}`);
                break;
            case 'Exit':
                console.log('Goodbye!');
                return;
            default:
                console.log('Invalid choice');
                break;
        }
    }
}
main();
