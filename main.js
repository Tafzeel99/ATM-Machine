import inquirer from "inquirer";
import chalk from "chalk";
//initialize balance & pin code 
let myBalance = 10000;
const myPin = 1234;
//Print welcom message
console.log(chalk.underline("\nWelcome To Tafzeel - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("Enter your 4 digit pin code?"),
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log("Login succesfully correct pin code");
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "please select option below",
            type: "list",
            choices: ["Balance inquiry", "Withdraw"],
        }
    ]);
    //.........................Withdraw....................................................//
    if (operationAns.operation === "Withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawmethod",
                message: "Select a withdrawal Method",
                type: "list",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        //.................withdraw_Fast_Cash..............................................//
        if (withdrawAns.withdrawmethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2500, 5000, 10000, 20000, 25000],
                }
            ]);
            if (fastCashAns.fastcash > myBalance) {
                console.log(chalk.red("Insufficient Balance!"));
            }
            else {
                myBalance -= fastCashAns.fastcash;
                console.log(`${fastCashAns.fastcash} "Withdraw Successfully"`);
                console.log(`"Your Remaining Balance is" ${myBalance}`);
            }
        }
        //.............withdraw_Enter_Amount..........................................//
        else if (withdrawAns.withdrawmethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance!"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} "Withdraw Successfully"`);
                console.log(`"Your Remaining Balance is"${myBalance}`);
            }
        }
    }
    //.........................Balance_inquiry.....................................................//
    else if (operationAns.operation === "Balance inquiry") {
        console.log(`"Your currently balance is" ${myBalance}`);
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try again!"));
}
;
