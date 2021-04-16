import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
import { useContext } from "react";

import "./mainLayout.css";

function MainLayout({ children }) {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  const onLogout = () => {
    // 2 bước để logout
    localStorage.removeItem("token");
    setUser(null);
    history.push("/login");
  };

  const pushToUpLoad = () => {
    history.push("/create"); // lam hoan toan tren client
  };

  console.log("main layout", user);

  return (
    <div className="main-layout">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">mindX Image</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {!user ? (
              <Nav className="mr-auto">
                <Nav.Item className="mx-2">
                  <Link to="/login">Login</Link>
                </Nav.Item>
                <Nav.Item className="mx-2">
                  <Link to="/signup">Signup</Link>
                </Nav.Item>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <Navbar.Text>Sign in as {user.email}</Navbar.Text>
                <NavDropdown id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={pushToUpLoad}>
                    Upload
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">
        <Container>{children}</Container>
      </div>
    </div>
  );
}

export default MainLayout;
