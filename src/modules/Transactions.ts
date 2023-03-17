import { Timestamp } from "firebase/firestore";
import Account from "../types/Account";
import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";
import currencyFormat from "./currencyFormat";

namespace Transactions {
  export function withdrawal(account: Account, amount: number): Account {
    const trans = getWithdrawal(account, amount);

    return transact(account, trans);
  }

  export function deposit(account: Account, amount: number): Account {
    const trans = getDeposit(account, amount);

    return transact(account, trans);
  }

  export function transfer(
    from: Account,
    to: Account,
    amount: number
  ): { to: Account; from: Account } {
    const xferFrom = getWithdrawal(from, amount);
    const xferTo = getDeposit(to, amount);

    const newTo = transact(to, xferTo);
    const newFrom = transact(to, xferFrom);

    return {
      to: newTo,
      from: newFrom,
    };
  }


  function transact(account: Account, trans: Transaction): Account {
    const newLedger = [...account.ledger, trans];
    const updatedAccount = {
      ...account,
      balance: trans.newTotal,
      ledger: newLedger,
    };

    return updatedAccount;
  }

  function getWithdrawal(
    account: Account,
    amount: number,
    description: string | null = null
  ): Transaction {
    const newTotal = account.balance - amount;
    const newDescription =
      description ?? `Withdrawal: ${currencyFormat.format(amount)} from ${account.name}`;
    const trans = {
      date: Timestamp.now(),
      amount,
      newTotal,
      type: TransactionType.WITHDRAWAL,
      description: newDescription,
    };

    console.log(newDescription);
    return trans;
  }



  function getDeposit(
    account: Account,
    amount: number,
    description: string | null = null
  ): Transaction {
    console.log(amount);
    console.log(account);
    const newTotal = account.balance + amount;
    const newDescription =
      description ?? `Deposit: ${currencyFormat.format(amount)} to ${account.name}`;
    const trans = {
      date: Timestamp.now(),
      amount,
      newTotal,
      type: TransactionType.DEPOSIT,
      description: newDescription,
    };
    console.log(newDescription);
    console.log(trans);
    return trans;
  }
}
export default Transactions;
