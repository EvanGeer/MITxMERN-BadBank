import AccountInfo from "./components/AccountInfo";
import { Router } from "./Router";
import { HashRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import classNames from "classnames";
import TopNav from "./components/TopNav";
import AccountContext from "./contexts/accountContext";
import TransactionToast from "./components/TransactionToast";
import { useFirestore } from "./firebase/useFirestore";

export function App() {
  const firestore = useFirestore();

  return (
    <div className={classNames("main-wrapper", "main-wrapper-responsive")}>
      <AccountContext.Provider value={firestore}>
        <HashRouter>
          <TopNav />
          {/* {firestore.user ? <SidebarNav /> : null} */}
          <main className="m-0 pt-4 p-0 main-container container-fluid">
            <TransactionToast />
            <Container className="App-header fluid justify-content-center me-auto">
              {/* {firestore.user ? <AccountInfo /> : null} */}
              <Router />
            </Container>
          </main>
        </HashRouter>
      </AccountContext.Provider>
    </div>
  );
}
