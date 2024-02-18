const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
// console.log(inboxPath);
const source = fs.readFileSync(inboxPath, "utf-8");

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        },
        evmVersion: "london"
    }
};
// console.log(JSON.parse(solc.compile(JSON.stringify(input))));
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts["Inbox.sol"]);
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts["Inbox.sol"].Inbox);
const output = solc.compile(JSON.stringify(input));
const artifact = JSON.parse(output).contracts["Inbox.sol"].Inbox;
const bytecode = artifact.evm.bytecode.object;
const abi = artifact.abi;
require("dotenv").config();

module.exports = { abi, bytecode }
