import { Bank, CreditCard, PiggyBank, Plus } from "react-bootstrap-icons";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { JsxChild } from "typescript";
import { useFirestore } from "../firebase/useFirestore";
import currencyFormat from "../modules/currencyFormat";
import { AccountType } from "../types/AccountType";

export function SidebarNav() {
  const { accounts, setAccount, createNewAccount } = useFirestore();

  const AccountLink = ({ name, icon, onClick }: { name: string; icon: JSX.Element, onClick: () => void }) => {
    return (
      <SidebarMenu.Nav.Link eventKey={name} onClick={onClick}>
        <SidebarMenu.Nav.Icon>{icon}</SidebarMenu.Nav.Icon>
        <SidebarMenu.Nav.Title>{name}</SidebarMenu.Nav.Title>
      </SidebarMenu.Nav.Link>
    );
  };

  return (
    <>
      <SidebarMenu
        className="text-muted"
        exclusiveExpand={false}
        collapseOnSelect={false}
        // onSelect={onSelect}
        variant="dark"
        bg="dark"
        rtl={false}
        expand={false}
        defaultExpanded={false}
        // hide="false"
      >
        <SidebarMenu.Collapse>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              title="React-Bootstrap"
              href="https://github.com/react-bootstrap/react-bootstrap"
            >
              {/* <span className="react-bootstrap-img" /> */}
              Accounts
            </SidebarMenu.Brand>
            <SidebarMenu.Toggle />
          </SidebarMenu.Header>
          <SidebarMenu.Body>
            <SidebarMenu.Nav>
              {accounts.map((acct) => (
                <AccountLink 
                  icon={<PiggyBank />} 
                  name={`${acct.number}: ${currencyFormat.format(acct.balance)}`} 
                  onClick={() => setAccount(acct)}
                />
              ))}
              <AccountLink 
                icon={<Plus/>} 
                name={"New Account"} 
                onClick={() => createNewAccount("new account", AccountType.SAVINGS)}
              />
              {/* <SidebarMenu.Nav.Link eventKey="Savings">
                <SidebarMenu.Nav.Icon>
                  <PiggyBank />
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>Savings</SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Link eventKey="usage">
                <SidebarMenu.Nav.Icon>
                  <CreditCard />
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>Credit Card</SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Link eventKey="overview">
                <SidebarMenu.Nav.Icon>
                  <Bank />
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>Checking</SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link> */}
            </SidebarMenu.Nav>
          </SidebarMenu.Body>
          <SidebarMenu.Footer></SidebarMenu.Footer>
        </SidebarMenu.Collapse>
      </SidebarMenu>
    </>
  );
}
