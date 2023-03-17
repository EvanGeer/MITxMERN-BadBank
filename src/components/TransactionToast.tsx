import { useContext, useEffect, useState } from "react";
import { Toast, ToastBody, ToastContainer } from "react-bootstrap";
import AccountContext from "../contexts/accountContext";
import currencyFormat from "../modules/currencyFormat";
import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";

const toastDuration = 1000;

export default function TransactionToast() {
  const [newTransactions, setNewTransactions] = useState<Transaction[]>([]);

  const { account } = useContext(AccountContext);

  useEffect(() => {
    console.log("ledger updated");
    if (!(account?.ledger?.length > 0)) return;
    console.log("new transaction");

    const timeToHideToast = new Date(new Date().getTime() - toastDuration);
    const lastTrans = account.ledger.at(-1);
    if (lastTrans && lastTrans.date.toDate() > timeToHideToast) {
      const updatedTransactions = [...newTransactions, lastTrans];
      setNewTransactions(updatedTransactions);
    }
  }, [account.ledger]);

  return (
    <ToastContainer position="top-end" className="mt-4 pt-5 opacity-75">
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
      <Toast.Header className="bg-secondary text-light bg-opacity-25">
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
      <Toast.Body>
        <small className="text-light">
         new balance {currencyFormat.format(transaction.newTotal)}</small>
      </Toast.Body>
    </Toast>
  );
}
