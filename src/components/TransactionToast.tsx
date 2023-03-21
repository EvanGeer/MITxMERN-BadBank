import { useContext, useEffect, useState } from "react";
import { Toast, ToastBody, ToastContainer } from "react-bootstrap";
import AccountContext from "../contexts/accountContext";
import currencyFormat from "../modules/currencyFormat";
import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";

const toastDuration = 1500;

export default function TransactionToast() {
  const [newTransactions, setNewTransactions] = useState<Transaction[]>([]);

  const { account, accounts } = useContext(AccountContext);
  const [ledgerLength, setLedgerLength] = useState(accounts[account]?.ledger.length)

  // useEffect(() => {
  //   console.log("ledger updated");
  //   if (!(accounts[account]?.ledger?.length > 0) || accounts[account].ledger.length === ledgerLength) return;
  //   setLedgerLength(accounts[account].ledger.length); // this prevents double toasts resulting from the Firestore onSnapshot updates firing
  //   console.log("new transaction");

  //   const timeToHideToast = new Date(new Date().getTime() - toastDuration);
  //   const lastTrans = accounts[account].ledger.at(-1);
  //   if (lastTrans && lastTrans.date.toDate() > timeToHideToast) {
  //     const updatedTransactions = [...newTransactions, lastTrans];
  //     setNewTransactions(updatedTransactions);
  //   }
  // }, [accounts[account].ledger]);

  return (
    <ToastContainer position="top-end" className="mt-4 pt-5 opacity-100">
      {newTransactions.map((x) => {
        return <TransToast transaction={x} />;
      })}
    </ToastContainer>
  );
}

function TransToast({ transaction }: { transaction: Transaction }) {
  const [show, setShow] = useState(true);

  return (
    <Toast
      bg="dark"
      className="me-2"
      delay={toastDuration}
      show={show}
      autohide={true}
      onClose={() => setShow(false)}
    >
      <Toast.Header className="bg-success text-light bg-opacity-25">
        <strong 
                      className={
                        transaction.type === TransactionType.DEPOSIT
                          ? "text-success me-auto"
                          : "text-warning text-opacity-75 me-auto"
                      }>{transaction?.type} {currencyFormat.format(transaction.amount)}</strong>
        <small className="text-light text-opacity-50">
          {transaction?.date.toDate().toLocaleTimeString()}
        </small>
      </Toast.Header>
      <Toast.Body className="bg-success">
        <small className="text-light">
         new balance {currencyFormat.format(transaction.newTotal)}</small>
      </Toast.Body>
    </Toast>
  );
}
