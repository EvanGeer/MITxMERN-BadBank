import { AccountType } from "./AccountType";
import Transaction from "./Transaction";

type Account = {
    number:string;
    name:string;
    type:AccountType
    balance:number;
    ledger:Transaction[];
}

export default Account;