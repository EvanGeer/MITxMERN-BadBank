import { createContext, useContext } from "react";
import { Context } from "vm";
import Account from "../types/Account";
import Transaction from "../types/Transaction";

export interface accContext {
    currentAccount: number; // account index
    accounts: Account[];
    setCurrentAccount: (accountNumber: string) => void;
    transact: (accountIndex: number, transaction: Transaction) => void;
}

const AccountContext = createContext<accContext>({} as accContext);

export default AccountContext;
