import { createContext, useContext } from "react";
import { Context } from "vm";
import Account from "../types/Account";

export interface accContext {
    account: Account
    setAccount: React.Dispatch<React.SetStateAction<Account>>
}

const AccountContext = createContext<any>(null);

export default AccountContext;
