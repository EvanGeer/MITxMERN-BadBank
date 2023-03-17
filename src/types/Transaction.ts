import { Timestamp } from "firebase/firestore";
import TransactionType from "./TransactionType";

interface Transaction {
    date: Timestamp;
    amount: number;
    newTotal: number;
    type: TransactionType;
    description: string;
};export default Transaction;

