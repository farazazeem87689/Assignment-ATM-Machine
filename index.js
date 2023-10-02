import inquirer from "inquirer";
let account = {
    accountNumber: "PAK2023",
    pin: "1234",
    balance: 1000,
    transaction: [],
};
function isValidPin(pin) {
    return pin === account.pin;
}
async function login() {
    let userDetails = await inquirer.prompt([{
            name: "accountNumber",
            type: "string",
            message: "enter your account number",
        },
        {
            name: "pin",
            type: "password",
            message: "enter your pin",
            mask: "*",
        },
    ]);
    if (userDetails.accountNumber === account.accountNumber && isValidPin(userDetails.pin)) {
        console.log("Login Successfully");
        performAction();
    }
    else {
        console.log("login Error");
    }
}
// check balance
async function checkBalance() {
    console.log(`Acoount Balance: ${account.balance}`);
    performAction();
}
// withdraw login
async function withdraw() {
    let withdrawDetails = await inquirer.prompt([{
            name: "amount",
            type: "number",
            message: "Enter the Amount want to withdraw",
            validate: (input) => (input > 0 && input < account.balance) ||
                "Sufficient Balance",
        },]);
    let amount = withdrawDetails.amount;
    account.balance = account.balance - amount;
    account.transaction.push(`withdraw : ${amount}`);
    console.log(`withdraw Amount:${amount} Remianing Balance:${account.balance}`);
    performAction();
}
// View transcation logic
async function viewTransaction() {
    if (account.transaction.length > 0) {
        console.log("previous Transaction");
        account.transaction.forEach((transaction, index) => {
            console.log(`${index + 1}.${transaction}`);
        });
    }
    else {
        console.log("no previous transaction");
    }
    performAction();
}
// logout logic
function Logout() {
    console.log("Sesscufull logout");
}
async function performAction() {
    let transactionPrompt = await inquirer.prompt([{
            name: "action",
            type: "list",
            message: "what would you like",
            choices: ["check Balance", "withdraw", "view Transaction", "logout"]
        },
    ]);
    let choice = transactionPrompt.action;
    switch (choice) {
        case "check Balance":
            await checkBalance();
            break;
        case "withdraw":
            await withdraw();
            break;
        case "view Transaction":
            await viewTransaction();
            break;
        case "logout":
            await Logout();
            break;
        default:
            performAction();
            break;
    }
}
login();
