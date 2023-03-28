import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import FirebaseLogin from "../firebase/FirebaseLogin";
import { useFirestore } from "../firebase/useFirestore";
import { FireReactBankBrand } from "../pages/FireReactBankBrand";
import { FirebaseUser } from "../types/User";

export default function LoginFlyout() {
  const { user } = useFirestore();
  const [show, setShow] = useState(false);
  // const [user, setUser] = useState<FirebaseUser | null>(null);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const UserImage = () => {
    return (
      <div
        className="link-primary pe-2"
        onClick={toggleShow}
        style={{ cursor: "pointer" }}
      >
        {user ? (
          user?.photoURL ? (
            <img
              src={user.photoURL ?? ""}
              className="rounded-circle"
              style={{ width: "40px" }}
            />
          ) : (
            // <p className="pe-4">
            user?.email
            // </p>
          )
        ) : (
          "Login"
        )}
      </div>
    );
  };

  return (
    <>
      {<UserImage />}
      <Offcanvas
        show={show}
        placement="end"
        onHide={handleClose}
        scroll={false}
        backDrop={true}
        className="size-sm bg-dark text-light"
        bg="dark"
      >
        <Offcanvas.Header closeButton className="fluid">
          <UserImage />
          <Offcanvas.Title className="me-auto p-2">
            {user?.displayName}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <FireReactBankBrand className="ps-2"/>
          <FirebaseLogin onLogOut={() => console.log("log out")} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
