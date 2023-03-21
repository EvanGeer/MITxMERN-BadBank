import logo from "../logo.svg";
import "../App.css";
import { useContext, useEffect } from "react";
import currency from "../modules/currencyFormat";
import AccountContext, { accContext } from "../contexts/accountContext";
import Account from "../types/Account";
import { useFirestore } from "../firebase/useFirestore";
import PrimaryButton from "./PrimayButton";

function AccountInfo() {
  const { account, accounts, setActiveAccount } = useContext(AccountContext);
  // const {accounts, acctIndex } = useFirestore();
  

  useEffect(() => {
    // console.log(`Account Index ${acctIndex}`);
    // console.log(accounts);
    console.log("currentAccount")
    console.log(account);

  }, [account, accounts])

  return (
    <>
      {/* <img src={logo} className="App-logo" alt="logo" />
      <h1 className="text-primary">Welcome to React Bank</h1> */}
      <h2 data-testid="account-balance-header">
        {/* {accounts[acctIndex]?.name}: {currency.format(accounts[acctIndex]?.balance)} */}
        {accounts[account]?.name}: {currency.format(accounts[account]?.balance)}
        {/* {account?.name}: {currency.format(account?.balance)} */}
      </h2>
    </>
  );
}

export default AccountInfo;
