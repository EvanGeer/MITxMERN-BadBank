import React from "react";
import { useContext } from "react";
import { Card, Container } from "react-bootstrap";
import QuickCashButton from "../components/QuickCashButton";
import { TransactForm } from "../components/TransactForm";
import AccountContext from "../contexts/accountContext";
import Transactions from "../modules/Transactions";
import { Validation } from "../modules/Validation";
import TransactionType from "../types/TransactionType";

export function Withdrawal() {
  const { account, accounts } = useContext(AccountContext);

  return (
    <>
    <Card bg="dark" className="w-100 mb-4 text-center p-2 shadow">
      <Container>


      Choose a Dollar Amount
      <div className="row">
        <QuickCashButton amount={20} />
        <QuickCashButton amount={80} />
      </div>
      <div className="row">
        <QuickCashButton amount={40} />
        <QuickCashButton amount={100} />
      </div>
      <div className="row">
        <QuickCashButton amount={60} />
        <QuickCashButton amount={200} />
      </div>
      <div>Custom Amount</div>
      <small>... in multiples of $20</small>
      </Container>
    </Card>
      <TransactForm
        validations={[
          (x) => Validation.wontOverdraft(x, accounts[account].balance),
          Validation.isGreaterThenZero,
          Validation.isIncrementOfTwenty,
        ]}
        transaction={Transactions.withdrawal}
        transactionType={TransactionType.WITHDRAWAL}
      />
    </>
  );
}
