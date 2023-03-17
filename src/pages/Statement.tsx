import Transaction from "../types/Transaction";
import TransactionCard from "../components/TransactionCard";
import { useContext } from "react";
import AccountContext from "../contexts/accountContext";
import PrimaryButton from "../components/PrimayButton";
import { useNavigate } from "react-router-dom";

export function StatementPage() {
  const { account } = useContext(AccountContext);
  const history = useNavigate();

  return (
    <>
      <div className="container">
        {account.ledger
          .sort((x: Transaction, y: Transaction) => {
            return x.date.seconds - y.date.seconds;
          })
          .reverse()
          .map((x: Transaction) => (
            <TransactionCard transaction={x} />
          ))}
      </div>
      <div className="row">
        <PrimaryButton text="Go Back" action={() => history(-1)} />
      </div>
    </>
  );
}
