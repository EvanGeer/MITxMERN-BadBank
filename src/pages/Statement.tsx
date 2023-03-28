import Transaction from "../types/Transaction";
import TransactionCard from "../components/TransactionCard";
import { useContext } from "react";
import AccountContext from "../contexts/accountContext";
import PrimaryButton from "../components/PrimayButton";
import { useNavigate } from "react-router-dom";

export function StatementPage() {
  const { account, accounts } = useContext(AccountContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        {accounts[account].ledger
          .sort((x: Transaction, y: Transaction) => {
            return x.date.seconds - y.date.seconds;
          })
          .reverse()
          .map((x: Transaction) => (
            <TransactionCard transaction={x} />
          ))}
      </div>
      <div className="row">
        <PrimaryButton text="Home" action={() => navigate("/")} />
      </div>
    </>
  );
}
