import React from "react";
import AccountInfo from "./components/AccountInfo";
import { Router } from "./Router";
import { HashRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { SidebarNav } from "./components/SideBarMenu";
import classNames from "classnames";
import TopNav from "./components/TopNav";
import { AccountType } from "./types/AccountType";
import AccountContext from "./contexts/accountContext";
import { useState } from "react";
import Account from "./types/Account";
import TransactionToast from "./components/TransactionToast";
import { useFirestore } from "./firebase/useFirestore";

export function App() {
  const [account, setAccount] = useFirestore();

  return (
    <div className={classNames("main-wrapper", "main-wrapper-responsive")}>
      {/* <Layout> */}
      <HashRouter>
        <TopNav />
        <SidebarNav />
        <main className="m-0 p-0 main-container container-fluid">
          {/* {children} */}

          <AccountContext.Provider value={{ account, setAccount }}>
            <TransactionToast />
            <Container className="App-header fluid justify-content-center me-auto">
              {/* <header className="App-header"> */}

              <AccountInfo />
              {/* </header> */}
              <Router />
            </Container>
          </AccountContext.Provider>
          {/* </Layout> */}
        </main>
      </HashRouter>
    </div>
  );
}
