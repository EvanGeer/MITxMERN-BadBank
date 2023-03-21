import { useNavigate } from "react-router-dom";
import menuButtons from "../types/menuButtons";
import PrimaryButton from "../components/PrimayButton";
import QuickCashButton from "../components/QuickCashButton";
import { Home } from "./Home";
import AccountInfo from "../components/AccountInfo";
import { Container } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth";
import logoGradient from "../logoGradient.svg";
import { useFirestore } from "../firebase/useFirestore";

export function AtmMenu() {
  const routeTo = useNavigate();
  const [loading] = useAuthState(auth);
  const { account, accounts } = useFirestore();

  return (
    <>
      <Home />
      { isNaN(accounts[account].balance) ? (
        <img src={logoGradient} className="App-logo opacity-75" alt="logo" />
      ) : (
        <>
          <AccountInfo />
          <div className="text-muted">Choose a Transaction</div>
          <Container>
            <div className="row">
              <PrimaryButton
                data-testid="atm-deposit"
                text={menuButtons.deposit}
                action={() => routeTo("/deposit")}
              />
              <QuickCashButton amount={80} data-testid="fast-cash-80" />
            </div>
            <div className="row">
              <div
                className="col fluid align-content"
                style={{ width: "300px" }}
              >
                &nbsp;
              </div>

              <PrimaryButton
                text={menuButtons.withdrawal}
                action={() => routeTo("/withdrawal")}
              />
            </div>
            <div className="row">
              <PrimaryButton
                text={menuButtons.statement}
                action={() => routeTo("/statement")}
              />
              <PrimaryButton
                text={menuButtons.transfer}
                action={() => routeTo("/transfer")}
              />
            </div>
          </Container>
        </>
      )}
    </>
  );
}
