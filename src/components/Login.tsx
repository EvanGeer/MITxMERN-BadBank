import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

export default function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <img
        src="https://yt3.ggpht.com/rs6MPZZxmzc1EqXOiv1I2pzjm501qQOXrS3rr_mgz24U9vFBnfhp1LSuVbtj0P1kNawZRxWIZg=s176-c-k-c0x00ffffff-no-rj"
        onClick={toggleShow}
        className="rounded-circle"
        style={{
          width: "50px",
          cursor: "pointer",

        }}
      />


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
          <img
            src="https://yt3.ggpht.com/rs6MPZZxmzc1EqXOiv1I2pzjm501qQOXrS3rr_mgz24U9vFBnfhp1LSuVbtj0P1kNawZRxWIZg=s176-c-k-c0x00ffffff-no-rj"
            onClick={toggleShow}
            
            className="rounded-circle d-flex"
            style={{
                width: "50px",
                cursor: "pointer",
            }}
          />
            <Offcanvas.Title className="me-auto p-2"> User Name</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <HashRouter> */}
            <Link to={"Personal"}>Personal Info</Link>
            <br/>
            <Link to="LogOut">Log Out</Link>
          {/* </HashRouter> */}
          {/* <br /> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
