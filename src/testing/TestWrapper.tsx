import React from "react";
import AccountContext from "../contexts/accountContext";
import { AccountType } from "../types/AccountType";
import { HashRouter } from "react-router-dom";
import AccountInfo from "../components/AccountInfo";
import Account from "../types/Account";

export function TestWrapper({
  children,
  startingBalance,
}: {
  children: any;
  startingBalance: number;
}) {
  const [account, setAccount] = React.useState<Account>({
    number: "chx123",
    name: "Checking",
    type: AccountType.CHECKING,
    balance: startingBalance,
    ledger: [],
  });

  return (
    <HashRouter>
      <AccountContext.Provider value={{ account, setAccount }}>
        <AccountInfo />

        { children }

      </AccountContext.Provider>
    </HashRouter>
  );
}
