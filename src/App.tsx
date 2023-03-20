import AccountInfo from "./components/AccountInfo";
import { Router } from "./Router";
import { HashRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { SidebarNav } from "./components/SideBarMenu";
import classNames from "classnames";
import TopNav from "./components/TopNav";
import AccountContext from "./contexts/accountContext";
import TransactionToast from "./components/TransactionToast";
import { useFirestore } from "./firebase/useFirestore";

export function App() {
  const { account, updateAccount, user, accounts } = useFirestore();

  return (
    <div className={classNames("main-wrapper", "main-wrapper-responsive")}>
      <HashRouter>
        <TopNav /> 
        {user ? <SidebarNav /> : null}
        <main className="m-0 pt-4 p-0 main-container container-fluid">
          <AccountContext.Provider value={{ account, updateAccount, accounts }}>
            <TransactionToast />
            <Container className="App-header fluid justify-content-center me-auto">
              {/* {user ? <AccountInfo /> : null} */}
              <Router />
            </Container>
          </AccountContext.Provider>
        </main>
      </HashRouter>
    </div>
  );
}
