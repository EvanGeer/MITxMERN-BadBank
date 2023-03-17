import { AccountType } from "../types/AccountType";
import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";
import Transactions from "./Transactions";

const startingTestAccount = {
    number:'123',
    name:'Checking',
    type:AccountType.CHECKING,
    balance:100,
    ledger:new Array<Transaction>(),
}

it('should withdraw $20, then $30', () => {
    // arrange 
    const account = { ... startingTestAccount };

    // act
    const afterOne = Transactions.withdrawal(account, 20);
    const actual = Transactions.deposit(afterOne, 30);

    // assert
    const expected = {
        accountNumber:'123',
        accountName:'Checking',
        accountType:AccountType.CHECKING,
        balance:110,
        ledger:[{
            amount: 20,
            newTotal: 80,
            type: TransactionType.WITHDRAWAL,
        },{
            amount: 30,
            newTotal: 110,
            type: TransactionType.DEPOSIT,
        }],
    }

    expect(actual).toMatchObject(expected);

});