import { Card } from "react-bootstrap";
import currency from "../modules/currencyFormat";
import Transaction from "../types/Transaction";
import TransactionType from "../types/TransactionType";

function TransactionCard({ transaction }: { transaction: Transaction }) {
  const amount = currency.format(transaction.amount);
  const total = currency.format(transaction.newTotal);

  return (
    <div key={`${transaction.date}-${transaction.amount}`} className="row">
      <Card bg="dark p-0 m-1">
        <Card.Header className="bg-secondary bg-opacity-25">
          <small className="text-light text-opacity-75">
            {transaction.date.toDate().toDateString()},{" "}
            {transaction.date.toDate().toLocaleTimeString()}
          </small>
        </Card.Header>
        <Card.Body>
          <div className="row fluid justify-content-end d-flex">
            <div className="col text-muted">{transaction.type}</div>
            <div
              className={`col col-md-auto ${
                transaction.type === TransactionType.DEPOSIT
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {amount}
            </div>
            <div className="col  col-md-auto">{total}</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TransactionCard;
