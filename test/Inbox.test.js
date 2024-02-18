const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const { abi, bytecode } = require("../compile")
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

let accounts;
let inbox;
const INITIAL_STRING = "Hi there!";
beforeEach(async () => {
    //get a list of accounts
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[1], gas: '1000000', gasPrice: 1000000000 });
})

describe('Inbox', () => {
    it("it deploys a contract", () => {
        // console.log(inbox);
        //checks if the deployment is done correctly
        assert.ok(inbox.options.address)
    })
    it("has a default message", async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    })
    it("can change the message", async () => {
        const newMsg = "bye";
        await inbox.methods.setMessage(newMsg).send({ from: accounts[0], gas: '1000000', gasPrice: 1000000000 });

        const msg = await inbox.methods.message().call();
        assert.strictEqual(msg, newMsg);
    })
})