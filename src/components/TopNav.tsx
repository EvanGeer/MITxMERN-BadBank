import {
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useFirestore } from "../firebase/useFirestore";
import LoginFlyout from "./LoginFlyout";
import fiREactLogo from "../fiREact.png";
import {
  BoxArrowInDownRight,
  BoxArrowUpRight,
  ClockHistory,
  House,
} from "react-bootstrap-icons";

export default function TopNav() {
  const { user } = useFirestore();

  function TopNavLink({
    id,
    text,
    icon = null,
    to,
    tooltip,
  }: {
    id: string;
    text: string;
    icon?: JSX.Element | null;
    to: string;
    tooltip: string | JSX.Element;
  }) {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={`ToolTip-${id}`}>{tooltip}</Tooltip>}
        placement="bottom"
      >
        <Nav.Link as={NavLink} to={to} data-testid={`Nav-${id}`}>
          <Container className="p-0 d-flex flew-wrap align-items-center">
            <div className="d-flex align-self-center p-1">
              {icon}
            </div>
            <div className="d-none d-sm-block">
              {text}
            </div>
          </Container>
        </Nav.Link>
      </OverlayTrigger>
    );
  }

  return (
    <Navbar
      className="main-header bg-dark text-light p-0 pt-2 pb-2"
      expand={true}
      variant="dark"
    >
      <Navbar.Brand
        title="React-Bootstrap"
        // href="https://github.com/react-bootstrap/react-bootstrap"
        className="d-block flex-row text-light justify-content-center p-0 d-flex"
      >
        <Container className="ms-2 ps-3">
          <img src={fiREactLogo} style={{ height: "30px" }} />
        </Container>
        {/* <span className="react-bootstrap-img" /> */}
      </Navbar.Brand>

      <Nav className="me-auto" variant="pills">
        <TopNavLink
          icon={<House />}
          to="/"
          id="Home"
          text="Home"
          tooltip="Main Menu Page"
        />
        {user ? (
          <>
            <TopNavLink
              icon={<BoxArrowInDownRight />}
              to="/deposit"
              id="Deposit"
              text="Deposit"
              tooltip="Deposit Cash"
            />
            <TopNavLink
              icon={<BoxArrowUpRight />}
              to="/withdrawal"
              id="Withdrawal"
              text="Withdraw"
              tooltip="Withdrawal Cash"
            />
            <TopNavLink
              icon={<ClockHistory />}
              to="/statement"
              id="Statement"
              text="All Data"
              tooltip="View Ledger"
            />
          </>
        ) : (
          <TopNavLink
            to="/create-account"
            id="create-account"
            text="Create Account"
            tooltip={
              <>
                Sign up for fi<u>re</u>Bank
              </>
            }
          />
        )}
      </Nav>

      <Nav className="d-flex">
        <LoginFlyout />
      </Nav>
    </Navbar>
  );
}
