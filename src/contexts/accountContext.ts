import { createContext, useContext } from "react";
import { Context } from "vm";
import Account from "../types/Account";

export interface accContext {
    account: Account
    setAccount: (acct:Account) => void
}

const AccountContext = createContext<accContext>({} as accContext);

export default AccountContext;
