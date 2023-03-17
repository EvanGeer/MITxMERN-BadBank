import logo from "../logo.svg";
import "../App.css";
import { useContext } from "react";
import currency from "../modules/currencyFormat";
import AccountContext, { accContext } from "../contexts/accountContext";
import Account from "../types/Account";

function AccountInfo() {
  const { account } = useContext(AccountContext);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="text-primary">Welcome to React Bank</h1>
      <h2 data-testid="account-balance-header">
        {account.name}: {currency.format(account.balance)}
      </h2>
    </>
  );
}

export default AccountInfo;
