import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import AccountContext from "../contexts/accountContext";
import Account from "../types/Account";
import TransactionType from "../types/TransactionType";
import AccountInfo from "./AccountInfo";
import PrimaryButton from "./PrimayButton";

export function TransactForm({
  transaction,
  validations,
  transactionType,
}: {
  transaction: (a: Account, x: number) => Account;
  validations: ((x: number) => { passes: boolean; message: string })[];
  transactionType: TransactionType;
}) {
  const [value, setValue] = useState<number | string>("");
  const [isInValid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { account, accounts, setAccount } = useContext(AccountContext);

  useEffect(() => {
    // this is needed for when we navigate via the router
    // from deposit to withdrawal, since they are the same component
    handleValidation();
  });

  const handleValidation = () => {
    if (!value) {
      setIsInvalid(true);
      setErrorMessage("");
      return;
    }

    const failedValidation = validations
      .map((x) => x(Number(value)))
      .find((x) => !x.passes);

    const newIsValid = failedValidation ? true : false;
    setIsInvalid(newIsValid);
    setErrorMessage(failedValidation?.message ?? "");

    console.log(newIsValid);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const submitOnEnterKey = (e: any) => {
    // console.log(e);
    if (e.which !== 13) return;
    console.log("enter key");
    handleSubmit();
  };

  const handleSubmit = () => {
    console.log("submit");
    console.warn(errorMessage);

    const failedValidation = validations
      .map((x) => x(Number(value)))
      .find((x) => !x.passes);

    const newIsValid = failedValidation ? true : false;
    if (newIsValid) return;

    const updatedAccount = transaction(accounts[account], Number(value));
    setAccount(updatedAccount);
    navTo("/")
  };

  const navTo = useNavigate();

  return (
    <>
      <Card bg="dark" className="w-100 shadow text-center">
        <Card.Header className="bg-secondary bg-opacity-25">
          <AccountInfo />
        </Card.Header>
        {/* Text Entry */}
        <div className="d-flex flex-row flex-wrap p-2 ps-3 pr-4">
          <label>{transactionType}</label>
          <input
            data-testid="transaction-amount-input"
            className={`rounded ms-3 me-3 t-entry${
              !isInValid ? "" : " invalid"
            }`}
            type="number"
            placeholder="0.00"
            value={value}
            onChange={handleChange}
            onKeyDown={submitOnEnterKey}
          />
        </div>
        {/* Validation Message */}
        {isInValid ? <div className="error">{errorMessage}</div> : null}

        {/* Buttons */}
        <div className="d-flex flex-row flex-wrap p-2 pl-4 pr-4">
          <PrimaryButton text="Home" action={() => navTo("/")} />
          <PrimaryButton disabled={isInValid} text={transactionType} action={handleSubmit} />
        </div>
      </Card>
    </>
  );
}
