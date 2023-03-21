import { User } from "firebase/auth";
import { createContext, useContext } from "react";
import { Context } from "vm";
import Account from "../types/Account";
import { AccountType } from "../types/AccountType";
import Transaction from "../types/Transaction";

export interface accContext {
    account: number; // account index
    accounts: Account[];
    setActiveAccount: (accountNumber: string) => void;
    createAccount: (name: string, type: AccountType, number: string) => void;
    setAccount: (acct: Account) => void;
    user: User | null | undefined,
}

const AccountContext = createContext<accContext>({} as accContext);

export default AccountContext;
